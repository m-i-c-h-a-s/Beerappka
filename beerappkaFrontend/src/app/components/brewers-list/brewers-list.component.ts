import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../profile/user';

@Component({
  selector: 'app-brewers-list',
  templateUrl: './brewers-list.component.html',
  styleUrls: ['./brewers-list.component.sass']
})
export class BrewersListComponent implements OnInit {
  public allUsers: Array<User> = [];
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = (data as any).results;
    }, err => {
      console.log(err);
    });
  }

}
