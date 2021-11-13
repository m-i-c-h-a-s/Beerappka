import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../profile/user';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-brewers-list',
  templateUrl: './brewers-list.component.html',
  styleUrls: ['./brewers-list.component.sass']
})
export class BrewersListComponent implements OnInit {
  public allUsers: Array<User> = [];

  totalLength: any;
  page: number = 1;

  constructor(private userService: UserService,
              private router: Router,
              public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = (data as any).results;
      this.totalLength = (data as any).results.length;
    }, err => {
      console.log(err);
    });
  }

}
