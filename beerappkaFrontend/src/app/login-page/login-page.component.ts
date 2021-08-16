import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import {UserData} from './user-data';
import {LoginPageErrors} from './LoginPageErrors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  public user: any;
  public err: LoginPageErrors | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
  }
  login(): void {
    this.err = undefined;
    this.userService.login(this.user).subscribe(
      data => {
        localStorage.setItem('auth_token', (data as any).key);
        this.userService.getUserData(this.user.username).subscribe(userData => {
          const currentUser: UserData = {
            id: (userData as any).id,
            username: this.user.username,
            picture_thumb_50x50: (userData as any).profile.picture_thumb_50x50,
            profile_id: (userData as any).profile.id
          };
          localStorage.setItem('current_user', JSON.stringify(currentUser));
          this.router.navigate(['dashboard']);
        }, err => {
          console.log(err);
        });
      },
      err => {
        console.log(err);
        this.err = err.error;
      }
    );
  }

}
