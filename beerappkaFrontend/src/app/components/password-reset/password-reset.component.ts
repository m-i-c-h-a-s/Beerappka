import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {PasswordResetErrorsErrors} from './password-reset-errors';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent implements OnInit {
  email = '';
  successMsg = '';
  err: PasswordResetErrorsErrors | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.err = undefined;
    this.userService.passwordReset(this.email).subscribe(data => {
      this.successMsg = (data as any).detail;
    }, err => {
      console.log(err);
      this.err = err.error;
    });
  }

}
