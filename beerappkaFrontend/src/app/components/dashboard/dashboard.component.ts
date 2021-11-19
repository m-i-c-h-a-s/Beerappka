import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../profile/user';
import { Batch } from '../batch-creator/batch';
import { BatchesService } from 'src/app/services/batches.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
  public currentUser: User | undefined;
  public batches: Array<Batch> | undefined;

  date = new Date();

  constructor(private userService: UserService,
              private batchesService: BatchesService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;

      if (this.currentUser)
        this.batchesService.getNotBottledBatches().subscribe(data => {
          this.batches = (data as any).results;
        }, err => {
          console.log(err);
        });
    }, err => {
      console.log(err);
    });
  }

}
