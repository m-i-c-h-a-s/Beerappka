import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { Malt } from './malt';
import { Hop } from './hop';
import { Yeast } from './yeast';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.sass']
})

export class RecipeCreatorComponent implements OnInit {

  recipeName = '';
  recipeType = '';
  recipeStyle = '';
  amountOfBeerInLiters: number | undefined;
  boilingTimeInMinutes: number | undefined;
  evaporationSpeedPercentPerHour: number | undefined;
  boilingLossesPercent: number | undefined;
  fermentationLossesPercent: number | undefined;
  coldHoppingLossesPercent: number | undefined;

  maltName = '';
  maltType = '';
  maltAmountInKilograms: number | undefined;
  maltColourEBC: number | undefined;
  maltExtractivityPercent: number | undefined;
  hopName = '';
  hopUsedFor = '';
  hopAmountInGrams: number | undefined;
  hopBoilingTimeInMinutes: number | undefined;
  hopAplhaAcidsPercent: number | undefined;
  yeastName = '';
  yeastType = '';
  yeastForm = '';
  yeastAmountInGrams: number | undefined;
  yeastLaboratory = '';

  malts: Malt[] = [];

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

    this.recipeName = '';
    this.recipeType = '';
    this.recipeStyle = '';
    this.amountOfBeerInLiters = undefined;
    this.boilingTimeInMinutes = undefined;
    this.evaporationSpeedPercentPerHour = undefined;
    this.boilingLossesPercent = undefined;
    this.fermentationLossesPercent = undefined;
    this.coldHoppingLossesPercent = undefined;

  }

  addMalt() {
    const malt: Malt = {
      name: this.maltName,
      type: this.maltType,
      amountInKilograms: this.maltAmountInKilograms,
      colourEBC: this.maltColourEBC,
      extractivityPercent: this.maltExtractivityPercent,
    };

    this.malts.push(malt);

    this.maltName = '';
    this.maltType = '';
    this.maltAmountInKilograms = undefined;
    this.maltColourEBC = undefined;
    this.maltExtractivityPercent = undefined;
  }

  deleteMalts() {
    this.malts = [];
  }

}
