import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameService } from '../services/game/game.service';
import { IGame } from '../interfaces/IGame';
import { IUser } from '../interfaces/IUser';
import { IBet } from '../interfaces/IBet';
import { IStats } from '../interfaces/IStats';

const TIME_BEFORE_NEXT_GAME = 5;
const GAME_ANIMATION_SPEED = 40;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<IUser>();
  @Input() user!: IUser | null;

  currentMultiplier: number = 0;
  gameIsRunning: boolean = false;
  timeBeforeStart: number = 0;
  betIsMade: boolean = false;
  myMultiplierBet: number | null = null;

  stats: IStats = {
    myBets: [],
    lastMatches: [],
    bestWinnings: {
      otherPlayers: [],
    },
  };

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setGame();
  }

  setGame(): void {
    this.currentMultiplier = 0;
    setTimeout(() => {
      this.timeBeforeStart = TIME_BEFORE_NEXT_GAME;
      this.startGame();
    }, 5000);
  }

  startGame() {
    const gameTimeRemainInterval = setInterval(() => {
      --this.timeBeforeStart;

      if (this.timeBeforeStart <= 0) {
        clearInterval(gameTimeRemainInterval);
        this.gameIsRunning = true;
        this.gameService.getNewGame().subscribe((game: IGame) => {
          this.showAnimation(
            game.explosionValue,
            game.user ? game.user.bet.multiplier : null
          ).then(() => {
            if (game.user) {
              this.showResults(game);
              this.user!.balance = game.user.newBalance;
              this.betIsMade = false;
              this.myMultiplierBet = null;
            }

            this.gameService.getStats().subscribe((newStats: IStats) => {
              this.stats = newStats;
              this.gameIsRunning = false;
              this.setGame();
            });
          });
        });
      }
    }, 1000);
  }

  showAnimation(
    explosionValue: number,
    multiplierBet: number | null
  ): Promise<void> {
    this.myMultiplierBet = multiplierBet;
    return new Promise((resolve) => {
      const animationInterval = setInterval(() => {
        this.currentMultiplier = this.calulateNextValue(
          this.currentMultiplier,
          0.01
        );

        if (this.currentMultiplier >= explosionValue) {
          clearInterval(animationInterval);
          setTimeout(() => {
            resolve();
          }, 1000);
        }
      }, GAME_ANIMATION_SPEED);
    });
  }

  showResults(game: IGame): void {
    if (!game.user) return;

    let snackBarData = {
      message: '',
      class: '',
    };
    if (game.user.result.isWinner) {
      snackBarData.message = `You Win $${game.user.result.prize}`;
      snackBarData.class = 'win-message';
    } else {
      snackBarData.message = `You Lose $${game.user.bet.bet}`;
      snackBarData.class = 'lose-message';
    }

    this.snackBar.open(snackBarData.message, 'Ok', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3500,
      panelClass: ['bet-result', snackBarData.class],
    });
  }

  updateUser(user: IUser): void {
    this.userUpdated.emit(user);
  }

  saveBet(bet: IBet): void {
    this.betIsMade = true;
    this.gameService.makeBet(bet).subscribe();
  }

  private calulateNextValue(actualValue: number, value: number): number {
    return this.gameService.fixDecimals(actualValue + value);
  }
}
