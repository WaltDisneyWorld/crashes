import { Component, Input } from '@angular/core';
import { IBestWinnning } from 'src/app/interfaces/IBestWinning';

@Component({
  selector: 'app-best-winning-bets',
  templateUrl: './best-winning-bets.component.html',
  styleUrls: ['./best-winning-bets.component.css'],
})
export class BestWinningBetsComponent{
  @Input() otherPlayers: IBestWinnning[] = [];
  @Input() user: IBestWinnning | null = null;

  displayedColumns: string[] = ['User', 'Multiplier', 'Earned'];
  constructor() {}
}
