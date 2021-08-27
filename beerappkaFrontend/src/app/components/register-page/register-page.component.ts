import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit {
  public user: any;

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
    this.userService.register(this.user).subscribe(
      data => {
        this.router.navigate(['logowanie']);
      },
        err => {
        console.log(err);
      }
    );
  }

}
