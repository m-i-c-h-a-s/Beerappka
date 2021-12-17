import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-page-top-bar',
  templateUrl: './page-top-bar.component.html',
  styleUrls: ['./page-top-bar.component.sass']
})
export class PageTopBarComponent implements OnInit {
  public isLoggedIn = false;

  constructor(
    public userService: UserService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

}
