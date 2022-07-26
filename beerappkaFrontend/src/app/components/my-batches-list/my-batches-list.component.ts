import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { BatchesService } from 'src/app/services/batches.service';
import { UserService } from 'src/app/services/user.service';
import { Batch } from '../batch-creator/batch';
import { User } from '../profile/user';

@Component({
  selector: 'app-my-batches-list',
  templateUrl: './my-batches-list.component.html',
  styleUrls: ['./my-batches-list.component.sass']
})
export class MyBatchesListComponent implements OnInit {
  public currentUser: User | undefined;
  public batches: Array<Batch> = [];

  totalLength: any;
  page: number = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private batchesService: BatchesService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;

      if (this.currentUser)
        this.getBatches(1);
    }, err => {
      console.log(err);
    });
  }

  getBatches(pageNumber: number) {
    if (this.currentUser)
      this.batchesService.getUserBatches(this.currentUser.id, pageNumber).subscribe(data => {
        this.batches = (data as any).results;
        this.displayFullRecipeTypeName(this.batches);
        this.totalLength = (data as any).count;
      }, err => {
        console.log(err);
      });
  }

  onPageChange(event: number): void {
    this.page = event;
    this.getBatches(this.page);
  }

  public displayFullRecipeTypeName(recipes: Array<Batch>) {
    recipes.forEach(batch => {
      switch(batch?.recipe.type) {
        case 'm':
          batch.recipe.type = "Zacieranie";
          break;
        case 'e':
          batch.recipe.type = "Ekstrakty";
          break;
        case 'b':
          batch.recipe.type = "Brewkit";
          break;
        default:
          batch.recipe.type = "";
          break;
      }
    });
  }
}
