import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {ChangePassword} from './change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordFields: ChangePassword;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.changePasswordFields = {
      old_password: '',
      new_password1: '',
      new_password2: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.changeUserPassword(this.changePasswordFields).subscribe(data => {
      console.log(data);
      return this.router.navigate(['/profil']);
    }, err => {
      console.log(err);
    });
  }

}
