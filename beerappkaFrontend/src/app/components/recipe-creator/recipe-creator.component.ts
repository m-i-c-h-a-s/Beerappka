import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { Malt } from './malt';
import { Hop } from './hop';
import { Yeast } from './yeast';
import { BeerStyle } from './beerStyle';
import { BeerStylesService } from '../../services/beer-styles.service';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../profile/user';
import { RecipeForCreateUpdate } from './recipe-for-create-update';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.sass']
})

export class RecipeCreatorComponent implements OnInit {
  public beerStyles: Array<BeerStyle> | undefined;
  public style: BeerStyle;
  public recipe: RecipeForCreateUpdate;

  // wort - brzeczka
  // sweet wort - brzeczka nastawna
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

  constructor(
    private beerStylesService: BeerStylesService,
    private recipesService: RecipesService,
    private router: Router,
    private userService: UserService
  ) {
    this.blgBeforeBoiling = 0;
    this.amountOfSweetWortInLiters = 0;
    this.amountOfBeerBeforeDryHoppingInLiters = 0;

    this.style = {
      id: 0,
      name: '',
      fermentation_type: '',
      min_blg: 0,
      max_blg: 0,
      min_ibu: 0,
      max_ibu: 0,
    }

    this.recipe = {
      name: '',
      type: '',
      is_public: false,
      boiling_time: 0,
      expected_beer_amount: 0,
      boiled_wort_amount: 0,
      evaporation_rate: 0,
      boiling_losses: 0,
      fermentation_losses: 0,
      cold_hop_losses: 0,
      mashing_performance: 0,
      water_to_grain_ratio: 0,
      notes: '',
      blg: 0,
      abv: 0,
      ebc: 0,
      style: this.style
    }

  }

  ngOnInit(): void {
    this.beerStylesService.getAllBeerStyles().subscribe(data => {
      this.beerStyles = (data as any).results;
    }, err => {
      console.log(err);
    });
  }


  createRecipe() {

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
    if (this.recipe.expected_beer_amount != null)
      this.recipe.boiled_wort_amount = +this.recipe.expected_beer_amount;
    if (this.recipe.boiled_wort_amount != null && this.recipe.boiling_time != null && this.recipe.evaporation_rate != null)
      this.recipe.boiled_wort_amount += +this.recipe.boiled_wort_amount * (this.recipe.boiling_time / 60) * (this.recipe.evaporation_rate / 100);
    if (this.recipe.boiled_wort_amount != null && this.recipe.boiling_losses != null)
      this.recipe.boiled_wort_amount += +this.recipe.boiled_wort_amount * (this.recipe.boiling_losses / 100);
    if (this.recipe.expected_beer_amount != null && this.recipe.boiled_wort_amount != null && this.recipe.fermentation_losses != null)
      this.recipe.boiled_wort_amount += +this.recipe.expected_beer_amount * (this.recipe.fermentation_losses / 100);
    if (this.recipe.expected_beer_amount != null && this.recipe.boiled_wort_amount != null && this.recipe.cold_hop_losses != null)
      this.recipe.boiled_wort_amount += +this.recipe.expected_beer_amount * (this.recipe.cold_hop_losses / 100);
  }

  calculateAmountOfSweetWort() {
    if (this.recipe.expected_beer_amount != null)
      this.amountOfSweetWortInLiters = +this.recipe.expected_beer_amount
    if (this.recipe.expected_beer_amount != null && this.recipe.fermentation_losses != null)
      this.amountOfSweetWortInLiters += +this.recipe.expected_beer_amount * (this.recipe.fermentation_losses / 100);
    if (this.recipe.expected_beer_amount != null && this.recipe.cold_hop_losses != null)
      this.amountOfSweetWortInLiters += +this.recipe.expected_beer_amount * (this.recipe.cold_hop_losses / 100);
  }

  calculateAmountOfBeerBeforeDryHopping() {
    if (this.recipe.expected_beer_amount != null)
      this.amountOfBeerBeforeDryHoppingInLiters = +this.recipe.expected_beer_amount;
    if (this.recipe.expected_beer_amount != null && this.recipe.cold_hop_losses != null)
      this.amountOfBeerBeforeDryHoppingInLiters += +this.recipe.expected_beer_amount * (this.recipe.cold_hop_losses / 100);
  }
}


