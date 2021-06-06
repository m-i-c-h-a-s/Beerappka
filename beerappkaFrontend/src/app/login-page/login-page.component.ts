import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  public user: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
  }
  login(): void {
    this.userService.login(this.user).subscribe(
      data => {
        localStorage.setItem('auth_token', (data as any).key);
        return this.router.navigate(['dashboard']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
