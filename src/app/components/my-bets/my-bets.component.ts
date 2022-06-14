import { Component, Input } from '@angular/core';
import { IMyBetStat } from 'src/app/interfaces/IMyBetStat';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css'],
})
export class MyBetsComponent {
  @Input() dataSource: IMyBetStat[] = [];

  displayedColumns: string[] = ['Amount', 'Multiplier', 'Result', 'Total'];
  constructor() {}
}
