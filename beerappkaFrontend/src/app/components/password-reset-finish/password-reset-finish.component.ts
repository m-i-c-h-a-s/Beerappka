import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {PasswordResetFinish} from "./password-reset-finish";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-reset-finish',
  templateUrl: './password-reset-finish.component.html',
  styleUrls: ['./password-reset-finish.component.sass']
})
export class PasswordResetFinishComponent implements OnInit {
  successMsg = '';
  newPassword1 = '';
  newPassword2 = '';
  uid = '';
  token = '';
  err: any | undefined;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  resetFinish(): void {
    const dataForPasswordReset: PasswordResetFinish = {
      new_password1: this.newPassword1,
      new_password2: this.newPassword1,
      uid: this.uid,
      token: this.token,
    };
    this.userService.passwordResetFinish(dataForPasswordReset).subscribe(data => {
      console.log(data);
      this.successMsg = (data as any).detail;
    }, err => {
      console.log(err);
    });
    this.newPassword1 = '';
    this.newPassword2 = '';
  }

}
