import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-viewer',
  templateUrl: './game-viewer.component.html',
  styleUrls: ['./game-viewer.component.css'],
})
export class GameViewerComponent implements OnInit {
  @Input() multiplier: number = 0;
  @Input() time: number = 0;
  @Input() gameIsRunning: boolean = false;
  @Input() multiplierBet: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  setColor(): string {
    if (!this.multiplierBet) return '';

    return this.multiplierBet && this.multiplierBet < this.multiplier
      ? 'money-color-light'
      : 'danger-color';
  }
}
