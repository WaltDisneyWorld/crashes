import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/IUser';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appName: string = 'The Crash Game';
  user: IUser | null = null;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: IUser | null) => {
      this.user = user;
    });
  }

  updateUser(user: IUser): void {
    this.user = user;
  }
}
