import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { IMyBetStat } from 'src/app/interfaces/IMyBetStat';
import { IBestWinnning } from 'src/app/interfaces/IBestWinning';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  bets: IMyBetStat[] = [];

  constructor() {}

  getUser(): Observable<IUser | null> {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      return of(null);
    }

    const user: IUser = {
      name: userName,
      balance: this.getBalance(),
    };

    return of(user);
  }

  setUser(userName: string): Observable<IUser> {
    const user = {
      name: userName,
      balance: 1000,
    };
    localStorage.setItem('userName', user.name);
    localStorage.setItem('balance', user.balance.toString());
    return of(user);
  }

  getBets(): IMyBetStat[] {
    return [...this.bets];
  }

  addBet(bet: IMyBetStat): void {
    this.bets.unshift(bet);
  }

  getBalance(): number {
    let balance = localStorage.getItem('balance');
    return balance ? parseFloat(balance) : 0;
  }

  updateBalance(newBalance: number): void {
    localStorage.setItem('balance', newBalance.toString());
  }

  getBestWinning(): IBestWinnning {
    let bestBet: IBestWinnning = {
      userName: localStorage.getItem('userName') || '',
      multiplier: 0,
      total: 0,
    };

    for (let i = 0; i < this.bets.length; i++) {
      const bet: IMyBetStat = this.bets[i];
      if (bet.isWinner && bet.total > bestBet.total) {
        bestBet.multiplier = bet.multiplier;
        bestBet.total = bet.total;
      }
    }
    return bestBet;
  }
}
