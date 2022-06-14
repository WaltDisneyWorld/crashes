import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { IBestWinnning } from 'src/app/interfaces/IBestWinning';
import { IBet } from 'src/app/interfaces/IBet';
import { IGame } from 'src/app/interfaces/IGame';
import { ILastMatch } from 'src/app/interfaces/ILastMatch';
import { IMyBetStat } from 'src/app/interfaces/IMyBetStat';
import { IStats } from 'src/app/interfaces/IStats';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  bet: IBet | null = null;
  lastMatches: ILastMatch[] = [];
  otherPlayersBestWinnings: IBestWinnning[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  makeBet(newBet: IBet): Observable<void> {
    this.bet = newBet;
    return of();
  }

  getNewGame(): Observable<IGame> {
    let game: IGame = {
      explosionValue: this.getRandomFloatNumber(0, 5),
    };

    this.addLastMatch(game.explosionValue);

    if (this.bet) {
      game.user = this.calculateUserResults(game.explosionValue, this.bet);
      this.bet = null;
    }

    return this.generateOtherPlayersResults(game.explosionValue).pipe(
      map(() => {
        return game;
      })
    );
  }

  getStats(): Observable<IStats> {
    let data: IStats = {
      myBets: this.userService.getBets(),
      lastMatches: [...this.lastMatches],
      bestWinnings: {
        user: this.userService.getBestWinning(),
        otherPlayers: [...this.otherPlayersBestWinnings],
      },
    };

    return of(data);
  }

  private calculateUserResults(explosionValue: number, bet: IBet): any {
    let userGame = {
      bet: bet,
      result: {
        isWinner: false,
        prize: 0,
      },
      newBalance: 0,
    };

    if (bet.multiplier < explosionValue) {
      userGame.result = {
        isWinner: true,
        prize: this.fixDecimals(userGame.bet.bet * userGame.bet.multiplier),
      };
    }

    let userBalance = this.userService.getBalance();

    userGame.newBalance = this.fixDecimals(
      userGame.result.isWinner
        ? userBalance + userGame.result.prize
        : userBalance - userGame.bet.bet
    );

    this.userService.updateBalance(userGame.newBalance);

    let userBetStat: IMyBetStat = {
      amount: userGame.bet.bet,
      multiplier: userGame.bet.multiplier,
      isWinner: userGame.result.isWinner,
      total: userGame.result.isWinner
        ? userGame.result.prize
        : userGame.bet.bet,
    };

    this.userService.addBet(userBetStat);
    return userGame;
  }

  private generateOtherPlayersResults(explosionValue: number): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((users) => {
          this.otherPlayersBestWinnings = users
            .map((user: any) => {
              let multiplier = this.getRandomFloatNumber(1.5, 4.9);
              let isWinner = multiplier < explosionValue;

              return {
                userName: user.username,
                isWinner: isWinner,
                multiplier: multiplier,
                total: isWinner
                  ? this.fixDecimals(
                      multiplier * this.getRandomFloatNumber(10, 50)
                    )
                  : 0,
              };
            })
            .filter((userBet: any) => userBet.isWinner)
            .sort((a: IBestWinnning, b: IBestWinnning) => b.total - a.total);

          return;
        })
      );
  }

  private addLastMatch(multiplier: number): void {
    let position = this.lastMatches.length;
    if (position == 7) {
      this.lastMatches.pop();
    }
    this.lastMatches.unshift({
      gameNumber: position + 1,
      maxMultiplier: multiplier,
    });
  }

  private getRandomFloatNumber(min: number, max: number): number {
    let value = Math.random() * (max - min) + min;
    return this.fixDecimals(value);
  }

  fixDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
