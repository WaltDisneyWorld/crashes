import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IBet } from 'src/app/interfaces/IBet';

@Component({
  selector: 'app-bets-form',
  templateUrl: './bets-form.component.html',
  styleUrls: ['./bets-form.component.css'],
})
export class BetsFormComponent implements OnInit {
  @Output() betMade = new EventEmitter<IBet>();
  @Input() balance!: number;
  @Input() gameIsRunning: boolean = false;
  @Input() betIsMade: boolean = false;

  betForm = new FormGroup({
    bet: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(this.balance)]),
    multiplier: new FormControl('1.5', [
      Validators.required,
      Validators.min(1.5),
      Validators.max(4.9),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  makeBet(form: FormGroup): void {
    if (this.gameIsRunning) return;
    this.betMade.emit(form.value);
  }
}
