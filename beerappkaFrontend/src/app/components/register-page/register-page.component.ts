import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {LoginPageErrors} from "../login-page/login-page-errors";
import {RegisterPageErrors} from "./register-page-errors";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit {
  public user: any;
  public err: RegisterPageErrors | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    };
  }
  register(): void {
    this.err = undefined;
    this.userService.register(this.user).subscribe(
      data => {
        this.router.navigate(['logowanie']);
      },
        err => {
        this.err = err.error;
        console.log(err);
      }
    );
  }

}
