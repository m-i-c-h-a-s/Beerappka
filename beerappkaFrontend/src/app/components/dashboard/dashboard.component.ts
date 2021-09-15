import { Component, OnInit } from '@angular/core';
import { RecipeCreatorComponent } from '../recipe-creator/recipe-creator.component';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../profile/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
  public currentUser: User | undefined;

  date = new Date();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;
    }, err => {
      console.log(err);
    });
  }
}
