import { Component, OnInit } from '@angular/core';
import { RecipeCreatorComponent } from '../recipe-creator/recipe-creator.component';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../profile/user';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { Batch } from '../batch-creator/batch';
import { BatchesService } from 'src/app/services/batches.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements OnInit {
  public currentUser: User | undefined;
  public numberOfRecipes: any;
  public numberOfBatches: any;
  public latestRecipe: any;
  public latestBatch: any;
  public batches: Array<Batch> | undefined;

  date = new Date();

  constructor(private userService: UserService,
              private router: Router,
              private recipesService: RecipesService,
              private batchesService: BatchesService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;
      this.numberOfRecipes = this.currentUser?.number_of_recipes;
      this.numberOfBatches = this.currentUser?.number_of_batches;

      if (this.currentUser)
        this.recipesService.getUserRecipes(this.currentUser.id).subscribe(data => {
          this.latestRecipe = (data as any).results[0];
        }, err => {
          console.log(err);
        });

      if (this.currentUser)
        this.batchesService.getUserBatches(this.currentUser.id).subscribe(data => {
          this.latestBatch = (data as any).results[0];
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
