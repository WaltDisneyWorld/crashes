import { Component, Input } from '@angular/core';
import { ILastMatch } from 'src/app/interfaces/ILastMatch';

@Component({
  selector: 'app-last-matches',
  templateUrl: './last-matches.component.html',
  styleUrls: ['./last-matches.component.css'],
})
export class LastMatchesComponent {
  @Input() dataSource: ILastMatch[] = [];

  displayedColumns: string[] = ['Number', 'Max multiplier'];
  constructor() {}
}
