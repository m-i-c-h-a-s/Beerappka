import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchesService } from 'src/app/services/batches.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { BatchForCreateUpdate } from '../batch-creator/batch-for-create-update';
import { MashingForCreateUpdate } from '../batch-creator/mashing-for-create-update';
import { MeasurementBLGForCreateUpdate } from '../batch-creator/measurementBLG-for-create-update';
import { Batch } from '../batch-creator/batch';

@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.sass']
})
export class BatchUpdateComponent implements OnInit {

  public batch: Batch | undefined;
  public batchForUpdate: BatchForCreateUpdate  | undefined;
  public recipe: Recipe | undefined;
  public mashing: MashingForCreateUpdate;
  public measurementBLG: MeasurementBLGForCreateUpdate;
  public mashings: Array<MashingForCreateUpdate> = [];
  public measurementsBLG: Array<MeasurementBLGForCreateUpdate> = [];

  constructor(private recipeService: RecipesService,
              private batchesService: BatchesService,
              private router: Router,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer
  ) {
    this.measurementBLG = {
      date: '',
      blg: 0,
      beer_temperature: 0,
      ambient_temperature: 0,
    }

    this.mashing = {
      time: 0,
      temperature: 0,
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.batchesService.getBatch(id).subscribe(data => {
        this.batch = (data as any) as Batch;
        this.displayFullRecipeTypeName(this.batch.recipe);
      }, err => {
        console.log(err);
      });
    });
  }

  updateBatch() {
    if (this.batch) {
      this.batchForUpdate = {
        name: this.batch.name,
        number: this.batch.number,
        brewing_date: this.batch.brewing_date,
        bottling_date: this.batch.bottling_date,
        mashings: this.batch.mashings,
        measurements_blg: this.batch.measurements_blg,
        recipe: this.batch.recipe.id
      };

      const batchId = this.batch.id;
      this.batchesService.updateBatch(batchId, this.batchForUpdate).subscribe(data => {
        this.router.navigate(['/moje-warki']);
      }, err => {
        console.log(err);
      });
    }
  }

  addMashing() {
    if (this.batch) {
      if (this.mashing.time != 0 && this.mashing.temperature != 0 && this.mashing.time != null && this.mashing.temperature != null) {
        const mashing: MashingForCreateUpdate = {
          time: this.mashing.time,
          temperature: this.mashing.temperature,
        };
        this.batch.mashings.push(mashing);

        this.mashing = {
          time: 0,
          temperature: 0,
        }
      }
    }
  }

  deleteMashing(mashing: MashingForCreateUpdate) {
    if (this.batch)
      this.batch.mashings = this.batch.mashings.filter(e => e !== mashing);
  }

  addMeasurementBLG() {
    if (this.batch) {
      if (this.measurementBLG.date != '' && this.measurementBLG.blg != 0 && this.measurementBLG.beer_temperature != 0 && this.measurementBLG.ambient_temperature != 0) {
        const measurementBLG: MeasurementBLGForCreateUpdate = {
          date: this.measurementBLG.date,
          blg: this.measurementBLG.blg,
          beer_temperature: this.measurementBLG.beer_temperature,
          ambient_temperature: this.measurementBLG.ambient_temperature,
        };
        this.batch.measurements_blg.push(measurementBLG);

        this.measurementBLG = {
          date: '',
          blg: 0,
          beer_temperature: 0,
          ambient_temperature: 0,
        }
      }
    }
  }

  deleteMeasurementBLG(measurementBLG: MeasurementBLGForCreateUpdate) {
    if (this.batch)
      this.batch.measurements_blg = this.batch.measurements_blg.filter(e => e !== measurementBLG);
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
