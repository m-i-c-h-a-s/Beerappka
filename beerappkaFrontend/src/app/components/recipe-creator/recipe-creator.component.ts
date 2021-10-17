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
import { RecipeForCreateUpdate } from './recipe-for-create-update';
import { RecipeMalt } from './recipeMalt';
import { RecipeHop } from './recipeHop';
import { RecipeYeast } from './recipeYeast';
import { Manufacturer } from './manufacturer';
import { MaltToAdd } from './maltToAdd';
import { HopToAdd } from './hopToAdd';
import { YeastToAdd } from './yeastToAdd';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.sass']
})

export class RecipeCreatorComponent implements OnInit {
  public beerStyles: Array<BeerStyle> | undefined;
  public style: BeerStyle | undefined;
  public manufacturer: Manufacturer | undefined;
  public recipe: RecipeForCreateUpdate;

  public malt: MaltToAdd;
  public hop: HopToAdd;
  public yeast: YeastToAdd;

  public recipeMalt: RecipeMalt;
  public recipeHop: RecipeHop;
  public recipeYeast: RecipeYeast;

  public malts: Array<Malt> = [];
  public hops: Array<Hop> = [];
  public yeasts: Array<Yeast> = [];

  public recipeMalts: Array<RecipeMalt> = [];
  public recipeHops: Array<RecipeHop> = [];
  public recipeYeasts: Array<RecipeYeast> = [];


  // wort - brzeczka
  // sweet wort - brzeczka nastawna
  blgBeforeBoiling: number;
  amountOfSweetWortInLiters: number;
  amountOfBeerBeforeDryHoppingInLiters: number;

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
      style: this.style.id,
      malts: this.recipeMalts,
      hops: this.recipeHops,
      yeast: this.recipeYeasts,
    }

    this.manufacturer = {
      id: 0,
      name: ''
    }

    this.malt = {
      name: '',
      extractivity: 0,
      type: '',
      color: 0,
      manufacturer: 0,
      is_default: false,
    }

    this.hop = {
      name: '',
      type: '',
      origin: '',
      alpha_acids: 0,
      manufacturer: 0,
      is_default: false,
    }

    this.yeast = {
      name: '',
      type: '',
      manufacturer: this.manufacturer,
      is_default: false,
    }

    this.recipeMalt = {
      malt: this.malt,
      quantity: 0
    }

    this.recipeHop = {
      hops: this.hop,
      quantity: 0,
      used_for: '',
      boiling_time: 0
    }

    this.recipeYeast = {
      yeast: this.yeast,
      quantity: 0,
      form: ''
    }
  }

  ngOnInit(): void {
    this.beerStylesService.getAllBeerStyles().subscribe(data => {
      this.beerStyles = (data as any).results;
    }, err => {
      console.log(err);
    });

    this.recipesService.getDefaultMalts().subscribe(data => {
      this.malts = (data as any).results;
    }, err => {
      console.log(err);
    });
  }


  createRecipe() {
    this.recipesService.createRecipe(this.recipe).subscribe(data => {
      this.router.navigate(['/receptury-publiczne']);
    }, err => {
      console.log(err);
    });
  }


  addMalt() {
    const recipeMalt: RecipeMalt = {
      malt: {
        name: this.malt.name,
        extractivity: this.malt.extractivity,
        type: this.malt.type,
        color: this.malt.color,
        manufacturer: this.malt.manufacturer,
        is_default: false,
      },
      quantity: this.recipeMalt.quantity,
    };
    this.recipeMalts.push(recipeMalt);

    this.malt = {
      name: '',
      extractivity: 0,
      type: '',
      color: 0,
      manufacturer: 0,
      is_default: false,
    }
    this.recipeMalt = {
      malt: this.malt,
      quantity: 0
    }
  }

  deleteMalt(recipeMalt: RecipeMalt) {
    this.recipeMalts = this.recipeMalts.filter(e => e !== recipeMalt);
  }

  deleteMalts() {
    this.recipeMalts = [];
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


