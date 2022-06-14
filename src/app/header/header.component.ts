import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() user: IUser | null = null;
  @Input() appName: string = '';

  constructor() {}

  ngOnInit(): void {
  }
}
