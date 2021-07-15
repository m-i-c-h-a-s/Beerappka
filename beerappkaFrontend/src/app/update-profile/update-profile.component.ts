import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.sass']
})
export class UpdateProfileComponent implements OnInit {
  public currentUser: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data;
    }, err => {
      console.log(err);
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.currentUser).subscribe(data => {
      return this.router.navigate(['profil']);
    }, err => {
      console.log(err);
    });
  }

}
