import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { BatchesService } from 'src/app/services/batches.service';
import { Batch } from '../batch-creator/batch';
import { Recipe } from '../recipe-creator/recipe';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.sass']
})
export class BatchDetailsComponent implements OnInit {
  public batch: Batch | undefined;

  constructor(private batchService: BatchesService,
              private route: ActivatedRoute,
              private router: Router,
              public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.batchService.getBatch(id).subscribe(data => {
        this.batch = (data as any);
        if (this.batch) {
          this.displayFullRecipeTypeName(this.batch?.recipe);
        }
      }, err => {
        console.log(err);
        if (err.status === 404) {
          this.router.navigate(['/moje-warki']);
        }
      });
    });

  }

  public deleteBatch(recipeId: number): void {
    if(confirm("Czy na pewno chcesz usunąć warkę?")) {
      this.batchService.deleteBatch(recipeId).subscribe(data => {
        this.router.navigate(['/moje-warki']);
      }, err => {
        console.log(err);
      })
    }
  }

  public displayFullRecipeTypeName(recipe: Recipe) {
    switch(recipe?.type) {
      case 'm':
        recipe.type = "Zacieranie";
        break;
      case 'e':
        recipe.type = "Ekstrakty";
        break;
      case 'b':
        recipe.type = "Brewkit";
        break;
      default:
        recipe.type = "";
        break;
    }
  }
}
