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
import { initEditor } from '../tinymce-editor/editor';
import { RecipeCreateUpdateErrors } from './recipe-create-update-errors';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.sass']
})

export class RecipeCreatorComponent implements OnInit {
  public beerStyles: Array<BeerStyle> = [];
  public style: BeerStyle | undefined;
  public manufacturer: Manufacturer;
  public recipe: RecipeForCreateUpdate;
  public initEditor = initEditor;
  public err: RecipeCreateUpdateErrors | undefined;

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

  constructor(
    private beerStylesService: BeerStylesService,
    private recipesService: RecipesService,
    private router: Router,
    private userService: UserService
  ) {
    this.initEditor.height = 200;
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
      mashing_efficiency: 0,
      water_to_grain_ratio: 0,
      notes: '',
      blg: 0,
      abv: 0,
      ebc: 0,
      style: this.style.id,
      malts: [],
      hops: [],
      yeast: [],
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

    this.recipesService.getDefaultHops().subscribe(data => {
      this.hops = (data as any).results;
    }, err => {
      console.log(err);
    });

    this.recipesService.getDefaultYeasts().subscribe(data => {
      this.yeasts = (data as any).results;
    }, err => {
      console.log(err);
    });
  }


  createRecipe() {
    this.recipesService.createRecipe(this.recipe).subscribe(data => {
      this.router.navigate(['/moje-receptury']);
    }, err => {
      console.log(err);
      this.err = err.error;
    });
  }


  addMalt() {
    if (this.malt.name != '' && this.recipeMalt.quantity !== 0 && this.malt.color !== 0 && this.malt.extractivity !== 0) {
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
      this.recipe.malts.push(recipeMalt);

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
  }

  deleteMalt(recipeMalt: RecipeMalt) {
    this.recipe.malts = this.recipe.malts.filter(e => e !== recipeMalt);
  }

  deleteAllMalts() {
    this.recipe.malts.length = 0;
  }


  addHop() {
    if (this.hop.name != '' && this.recipeHop.used_for != '' && this.recipeHop.quantity != 0 && this.recipeHop.boiling_time != 0 && this.hop.alpha_acids != 0) {
      const recipeHop: RecipeHop = {
        hops: {
          name: this.hop.name,
          type: this.hop.type,
          origin: this.hop.origin,
          alpha_acids: this.hop.alpha_acids,
          manufacturer: this.hop.manufacturer,
          is_default: false,
        },
        quantity: this.recipeHop.quantity,
        used_for: this.recipeHop.used_for,
        boiling_time: this.recipeHop.boiling_time
      };
      this.recipe.hops.push(recipeHop);

      this.hop = {
        name: '',
        type: '',
        origin: '',
        alpha_acids: 0,
        manufacturer: 0,
        is_default: false,
      }
      this.recipeHop = {
        hops: this.hop,
        quantity: 0,
        used_for: '',
        boiling_time: 0
      }
    }
  }

  deleteHop(recipeHop: RecipeHop) {
    this.recipe.hops = this.recipe.hops.filter(e => e !== recipeHop);
  }

  deleteAllHops() {
    this.recipe.hops.length = 0;
  }


  addYeast() {
    if (this.yeast.name != '' && this.yeast.type != '' && this.recipeYeast.form != '' && this.recipeYeast.quantity !== 0) {
      const recipeYeast: RecipeYeast = {
        yeast: {
          name: this.yeast.name,
          type: this.yeast.type,
          manufacturer: this.yeast.manufacturer,
          is_default: false,
        },
        quantity: this.recipeYeast.quantity,
        form: this.recipeYeast.form
      };
      this.recipe.yeast.push(recipeYeast);

      this.manufacturer = {
        id: 0,
        name: '',
      }
      this.yeast = {
        name: '',
        type: '',
        manufacturer: this.manufacturer,
        is_default: false,
      }
      this.recipeYeast = {
        yeast: this.yeast,
        quantity: 0,
        form: ''
      }
    }
  }

  deleteYeast(recipeYeast: RecipeYeast) {
    this.recipe.yeast = this.recipe.yeast.filter(e => e !== recipeYeast);
  }

  deleteAllYeasts() {
    this.recipe.yeast.length = 0;
  }

  confirmCancellation() {
    if (confirm("Czy na pewno chcesz anulować tworzenie receptury?")) {
      this.router.navigate(['/moje-receptury']);
    }
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

  calcBlg(malts: Array<RecipeMalt>, mashingEfficiency: number, beerAmountInLiters: number) {
    let extract = 0;
    let extract_ml = 0;
    let water = 0;
    let blg = 0;
    malts.forEach(malt => {
      extract += (malt.quantity * malt.malt.extractivity * mashingEfficiency) / 10;
    });
    extract_ml = extract / 1.587;
    water = beerAmountInLiters * 1000 - extract_ml;
    let worthWeight = water + extract;
    this.recipe.blg = 100 * extract / worthWeight;
  }

  selectBeerStyle(item: BeerStyle) {
    this.recipe.style = item.id;
  }
}



