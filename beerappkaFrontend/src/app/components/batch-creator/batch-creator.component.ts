import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchesService } from 'src/app/services/batches.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { BatchForCreateUpdate } from './batch-for-create-update';
import { MashingForCreateUpdate } from './mashing-for-create-update';
import { MeasurementBLGForCreateUpdate } from './measurementBLG-for-create-update';

import { FormControl, FormGroup, Validators } from '@angular/forms';

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
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer
  ) {
    this.recipeId = history.state.recipeId;

    this.batch = {
      name: '',
      number: undefined,
      brewing_date: '',
      bottling_date: undefined,
      recipe: this.recipeId,
      mashings: [],
      measurements_blg: [],
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
    this.route.params.subscribe(params => {
      this.recipeId = params.id;
      if (this.recipeId)
      this.recipeService.getRecipe(this.recipeId).subscribe(data => {
        this.recipe = data as any;
        if (this.recipe)
          this.displayFullRecipeTypeName(this.recipe);
      }, err => {
        console.log(err);
      });
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
      this.batch.mashings.push(mashing);

      this.mashing = {
        time: 0,
        temperature: 0,
      }
    } else {
      //(<HTMLInputElement>document.getElementById("mashingTime")).setAttribute("class", "input-group border-bottom-danger rounded");
    }
  }

  deleteMashing(mashing: MashingForCreateUpdate) {
    this.batch.mashings = this.batch.mashings.filter(e => e !== mashing);
  }

  addMeasurementBLG() {
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

  deleteMeasurementBLG(measurementBLG: MeasurementBLGForCreateUpdate) {
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
