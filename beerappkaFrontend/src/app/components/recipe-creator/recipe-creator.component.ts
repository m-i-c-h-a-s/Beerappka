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

  amountOfBeerInLiters: number | null;
  boilingTimeInMinutes: number | null;;
  evaporationSpeedPercentPerHour: number | null;;
  boilingLossesPercent: number | null;;
  fermentationLossesPercent: number | null;;
  dryHoppingLossesPercent: number | null;;

  // wort - brzeczka
  // sweet wort - brzeczka nastawna
  amountOfBoilingWortInLiters: number | null;
  blgBeforeBoiling: number;
  amountOfSweetWortInLiters: number;
  amountOfBeerBeforeDryHoppingInLiters: number;


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

  constructor() {
    this.amountOfBeerInLiters = null;
    this.boilingTimeInMinutes = null;
    this.evaporationSpeedPercentPerHour = null;
    this.boilingLossesPercent = null;
    this.fermentationLossesPercent = null;
    this.dryHoppingLossesPercent = null;

    this.amountOfBoilingWortInLiters = 0;
    this.blgBeforeBoiling = 0;
    this.amountOfSweetWortInLiters = 0;
    this.amountOfBeerBeforeDryHoppingInLiters = 0;

  }

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
      dryHoppingLossesPercent: this.dryHoppingLossesPercent,

      amountOfBoilingWortInLiters: this.amountOfBoilingWortInLiters,
      blgBeforeBoiling: this.blgBeforeBoiling,
      amountOfSweetWortInLiters: this.amountOfSweetWortInLiters,
      amountOfBeerBeforeDryHoppingInLiters: this.amountOfBeerBeforeDryHoppingInLiters,
    };

    this.recipeName = '';
    this.recipeType = '';
    this.recipeStyle = '';
    this.amountOfBeerInLiters = 0;
    this.boilingTimeInMinutes = 0;
    this.evaporationSpeedPercentPerHour = 0;
    this.boilingLossesPercent = 0;
    this.fermentationLossesPercent = 0;
    this.dryHoppingLossesPercent = 0;

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
    this.hopBoilingTimeInMinutes = undefined;
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

  deleteMalt(malt: Malt) {
    this.malts = this.malts.filter(e => e !== malt);
  }

  deleteHop(hop: Hop) {
    this.hops = this.hops.filter(e => e !== hop);
  }

  deleteYeast(yeast: Yeast) {
    this.yeasts = this.yeasts.filter(e => e !== yeast);
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


  calculateParameters() {
    this.calculateAmountOfBoilingWort();
    this.calculateAmountOfSweetWort();
    this.calculateAmountOfBeerBeforeDryHopping();
  }

  calculateAmountOfBoilingWort() {
    if (this.amountOfBeerInLiters != null)
      this.amountOfBoilingWortInLiters = +this.amountOfBeerInLiters;
    if (this.amountOfBoilingWortInLiters != null && this.boilingTimeInMinutes != null && this.evaporationSpeedPercentPerHour != null)
      this.amountOfBoilingWortInLiters += +this.amountOfBoilingWortInLiters * (this.boilingTimeInMinutes / 60) * (this.evaporationSpeedPercentPerHour / 100);
    if (this.amountOfBoilingWortInLiters != null && this.boilingLossesPercent != null)
      this.amountOfBoilingWortInLiters += +this.amountOfBoilingWortInLiters * (this.boilingLossesPercent / 100);
    if (this.amountOfBeerInLiters != null && this.amountOfBoilingWortInLiters != null && this.fermentationLossesPercent != null)
      this.amountOfBoilingWortInLiters += +this.amountOfBeerInLiters * (this.fermentationLossesPercent / 100);
    if (this.amountOfBeerInLiters != null && this.amountOfBoilingWortInLiters != null && this.dryHoppingLossesPercent != null)
      this.amountOfBoilingWortInLiters += +this.amountOfBeerInLiters * (this.dryHoppingLossesPercent / 100);
  }

  calculateAmountOfSweetWort() {
    if (this.amountOfBeerInLiters != null)
      this.amountOfSweetWortInLiters = +this.amountOfBeerInLiters
    if (this.amountOfBeerInLiters != null && this.fermentationLossesPercent != null)
      this.amountOfSweetWortInLiters += +this.amountOfBeerInLiters * (this.fermentationLossesPercent / 100);
    if (this.amountOfBeerInLiters != null && this.dryHoppingLossesPercent != null)
      this.amountOfSweetWortInLiters += +this.amountOfBeerInLiters * (this.dryHoppingLossesPercent / 100);
  }

  calculateAmountOfBeerBeforeDryHopping() {
    if (this.amountOfBeerInLiters != null)
      this.amountOfBeerBeforeDryHoppingInLiters = +this.amountOfBeerInLiters;
    if (this.amountOfBeerInLiters != null && this.dryHoppingLossesPercent != null)
      this.amountOfBeerBeforeDryHoppingInLiters += +this.amountOfBeerInLiters * (this.dryHoppingLossesPercent / 100);
  }
}


