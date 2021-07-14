import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.sass']
})

export class RecipeCreatorComponent implements OnInit {
  recipeName = '';
  recipeType = '';
  recipeStyle = '';
  amountOfBeerInLiters = 0;
  boilingTimeInMinutes = 0;
  evaporationSpeedPercentPerHour = 0;
  boilingLossesPercent = 0;
  fermentationLossesPercent = 0;
  coldHoppingLossesPercent = 0;

  maltName = '';
  maltType = '';
  maltAmountInKilograms = 0;
  maltColourEBC = 0;
  maltExtractivityPercent = 0;
  hopName = '';
  hopUsedFor = '';
  hopAmountInGrams = 0;
  hopBoilingTimeInMinutes = 0;
  hopAplhaAcidsPercent = 0;
  yeastName = '';
  yeastType = '';
  yeastForm = '';
  yeastAmountInGrams = 0;
  yeastLaboratory = '';

  constructor() { }

  ngOnInit(): void {
  }


  createRecipe() {
    const recipe: Recipe = {
      name: this.recipeName,
      type: this.recipeType,
      style: this.recipeStyle,
      amountOfBeerInLiters: this.amountOfBeerInLiters,
      boilingTimeInMinutes: this.boilingTimeInMinutes,
      evaporationSpeedPercentPerHour: this.evaporationSpeedPercentPerHour,
      boilingLossesPercent: this.boilingLossesPercent,
      fermentationLossesPercent: this.fermentationLossesPercent,
      coldHoppingLossesPercent: this.coldHoppingLossesPercent,
    };


  }
}
