import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.sass']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.deleteUserAccount().subscribe(data => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
      return this.router.navigate(['']);
    }, err => {
      console.log(err);
    });
  }

}
