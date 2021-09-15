import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from './user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  public currentUser: User | undefined;

  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;
    }, err => {
      console.log(err);
    });
  }

}
