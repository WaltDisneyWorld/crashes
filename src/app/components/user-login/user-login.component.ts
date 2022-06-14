import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  @Output() userCreated = new EventEmitter<IUser>();

  userNameControl = new FormControl('', [Validators.required]);
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  saveUser(userName: string): void {
    if (!this.userNameControl.valid) return;
    this.userService.setUser(userName).subscribe((user) => {
      this.userCreated.emit(user);
    });
  }
}
