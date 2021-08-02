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
  hopAlphaAcidsPercent: number | undefined;
  yeastName = '';
  yeastType = '';
  yeastForm = '';
  yeastAmountInGrams: number | undefined;
  yeastLaboratory = '';

  malts: Malt[] = [];
  hops: Hop[] = [];
  yeasts: Yeast[] = [];

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

  addHop() {
    const hop: Hop = {
      name: this.hopName,
      usedFor: this.hopUsedFor,
      amountInGrams: this.hopAmountInGrams,
      boilingTimeInMinutes: this.hopBoilingTimeInMinutes,
      alphaAcidsPercent: this.hopAlphaAcidsPercent,
    };

    this.hops.push(hop);

    this.hopName = '';
    this.hopUsedFor = '';
    this.hopAmountInGrams = undefined;
    this.boilingTimeInMinutes = undefined;
    this.hopAlphaAcidsPercent = undefined;
  }

  addYeast() {
    const yeast: Yeast = {
      name: this.yeastName,
      type: this.yeastType,
      form: this.yeastForm,
      amountInGrams: this.yeastAmountInGrams,
      laboratory: this.yeastLaboratory,
    };

    this.yeasts.push(yeast);

    this.yeastName = '';
    this.yeastType = '';
    this.yeastForm = '';
    this.yeastAmountInGrams = undefined;
    this.yeastLaboratory = '';
  }

  deleteMalts() {
    this.malts = [];
  }

  deleteHops() {
    this.hops = [];
  }

  deleteYeasts() {
    this.yeasts = [];
  }

}
