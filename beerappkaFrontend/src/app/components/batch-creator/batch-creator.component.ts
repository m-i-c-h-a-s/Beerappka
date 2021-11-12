import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BatchesService } from 'src/app/services/batches.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { BatchForCreateUpdate } from './batch-for-create-update';
import { MashingForCreateUpdate } from './mashing-for-create-update';
import { MeasurementBLGForCreateUpdate } from './measurementBLG-for-create-update';

@Component({
  selector: 'app-batch-creator',
  templateUrl: './batch-creator.component.html',
  styleUrls: ['./batch-creator.component.sass']
})
export class BatchCreatorComponent implements OnInit {
  public batch: BatchForCreateUpdate;
  public recipeId: number;
  public recipe: Recipe | undefined;
  public mashing: MashingForCreateUpdate;
  public measurementBLG: MeasurementBLGForCreateUpdate;
  public mashings: Array<MashingForCreateUpdate> = [];
  public measurementsBLG: Array<MeasurementBLGForCreateUpdate> = [];

  constructor(private recipeService: RecipesService,
              private batchesService: BatchesService,
              private router: Router,
              public sanitizer: DomSanitizer
  ) {
    this.recipeId = history.state.recipeId;

    this.batch = {
      name: '',
      number: undefined,
      brewing_date: '',
      bottling_date: undefined,
      recipe: this.recipeId,
    }

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
    if (this.recipeId)
      this.recipeService.getRecipe(this.recipeId).subscribe(data => {
        this.recipe = data as any;
      }, err => {
        console.log(err);
      });
  }

  createBatch() {
    this.batchesService.createBatch(this.batch).subscribe(data => {
      this.router.navigate(['/moje-warki']);
    }, err => {
      console.log(err);
    });
  }

  addMashing() {
    if (this.mashing.time != 0 && this.mashing.temperature != 0 && this.mashing.time != null && this.mashing.temperature != null) {
      const mashing: MashingForCreateUpdate = {
        time: this.mashing.time,
        temperature: this.mashing.temperature,
      };
      this.mashings.push(mashing);

      this.mashing = {
        time: 0,
        temperature: 0,
      }
    }
  }

  addMeasurementBLG() {
    if (this.measurementBLG.date != '' && this.measurementBLG.blg != 0 && this.measurementBLG.beer_temperature != 0 && this.measurementBLG.ambient_temperature != 0) {
      const measurementBLG: MeasurementBLGForCreateUpdate = {
        date: this.measurementBLG.date,
        blg: this.measurementBLG.blg,
        beer_temperature: this.measurementBLG.beer_temperature,
        ambient_temperature: this.measurementBLG.ambient_temperature,
      };
      this.measurementsBLG.push(measurementBLG);

      this.measurementBLG = {
        date: '',
        blg: 0,
        beer_temperature: 0,
        ambient_temperature: 0,
      }
    }
  }
}
