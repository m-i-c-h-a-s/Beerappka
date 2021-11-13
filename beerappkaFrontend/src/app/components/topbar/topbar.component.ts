import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Router} from '@angular/router';
import {UserData} from "../login-page/user-data";
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {
  public userData: UserData | undefined;

  constructor(private userService: UserService,
              private router: Router,
              public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('current_user');
    if (userData) {
      this.userData = JSON.parse(userData);
    }
  }

  logout(): void {
    this.userService.logout().subscribe(data => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }

}
