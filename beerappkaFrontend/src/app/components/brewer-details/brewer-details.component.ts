import { Component, OnInit } from '@angular/core';
import {User} from '../profile/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-brewer-details',
  templateUrl: './brewer-details.component.html',
  styleUrls: ['./brewer-details.component.sass']
})
export class BrewerDetailsComponent implements OnInit {
  public userData: User | undefined;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params.username;
      this.userService.getUserData(username).subscribe(data => {
        this.userData = data as any;
      }, err => {
        console.log(err);
      });
    });
  }

}
