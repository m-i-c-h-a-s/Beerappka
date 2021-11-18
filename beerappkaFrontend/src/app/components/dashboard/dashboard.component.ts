import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../profile/user';
import { RecipesService } from 'src/app/services/recipes.service';
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
        this.batchesService.getUserBatches(this.currentUser.id).subscribe(data => {
          this.batches = (data as any).results;
          this.checkCurrentBatches();
        }, err => {
          console.log(err);
        });
    }, err => {
      console.log(err);
    });
  }

  private checkCurrentBatches() {
    if (this.batches) {
      this.batches.forEach(batch => {
        if (batch.bottling_date)
          if (this.batches)
            this.batches = this.batches.filter(e => e !== batch);
      });
    }
  }
}
