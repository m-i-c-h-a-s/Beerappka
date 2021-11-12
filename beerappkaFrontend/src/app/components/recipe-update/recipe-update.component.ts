import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-creator/recipe';
import { Malt } from '../recipe-creator/malt';
import { Hop } from '../recipe-creator/hop';
import { Yeast } from '../recipe-creator/yeast';
import { BeerStyle } from '../recipe-creator/beerStyle';
import { BeerStylesService } from '../../services/beer-styles.service';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeForCreateUpdate } from '../recipe-creator/recipe-for-create-update';
import { RecipeMalt } from '../recipe-creator/recipeMalt';
import { RecipeHop } from '../recipe-creator/recipeHop';
import { RecipeYeast } from '../recipe-creator/recipeYeast';
import { Manufacturer } from '../recipe-creator/manufacturer';
import { MaltToAdd } from '../recipe-creator/maltToAdd';
import { HopToAdd } from '../recipe-creator/hopToAdd';
import { YeastToAdd } from '../recipe-creator/yeastToAdd';
import { Permissions } from '../../permissions/permissions';
import { initEditor } from '../tinymce-editor/editor';

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrls: ['./recipe-update.component.sass']
})

export class RecipeUpdateComponent implements OnInit {
  public recipe: Recipe | undefined;
  public recipeForUpdate: RecipeForCreateUpdate | undefined;
  public initEditor = initEditor;

  public beerStyles: Array<BeerStyle> = [];
  public malts: Array<Malt> = [];
  public hops: Array<Hop> = [];
  public yeasts: Array<Yeast> = [];

  public style: BeerStyle | undefined;
  public manufacturer: Manufacturer;

  public malt: MaltToAdd;
  public hop: HopToAdd;
  public yeast: YeastToAdd;

  public recipeMalt: RecipeMalt;
  public recipeHop: RecipeHop;
  public recipeYeast: RecipeYeast;

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
    private route: ActivatedRoute,
    private router: Router,
    private permissions: Permissions
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

    this.manufacturer = {
      id: 0,
      name: '',
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
    this.route.params.subscribe(params => {
      const id = params.id;
      this.recipesService.getRecipe(id).subscribe(data => {
        this.recipe = (data as any) as Recipe;
        if (!this.permissions.isRecipeAuthor(this.recipe)) {
          this.router.navigate(['/receptury-publiczne']);
        }
      }, err => {
        console.log(err);
        if (err.status === 404) {
          this.router.navigate(['/receptury-publiczne']);
        }
      });
    });


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


  updateRecipe() {
    if (this.recipe) {
      this.recipeForUpdate = {
        name: this.recipe.name,
        type: this.recipe.type,
        is_public: this.recipe.is_public,
        boiling_time: this.recipe.boiling_time,
        expected_beer_amount: this.recipe.expected_beer_amount,
        boiled_wort_amount: this.recipe.boiled_wort_amount,
        evaporation_rate: this.recipe.evaporation_rate,
        boiling_losses: this.recipe.boiling_losses,
        fermentation_losses: this.recipe.fermentation_losses,
        cold_hop_losses: this.recipe.cold_hop_losses,
        mashing_efficiency: this.recipe.mashing_efficiency,
        water_to_grain_ratio: this.recipe.water_to_grain_ratio,
        notes: this.recipe.notes,
        blg: this.recipe.blg,
        abv: this.recipe.abv,
        ebc: this.recipe.ebc,
        style: this.recipe.style.id,
        malts: this.recipe.malts,
        hops: this.recipe.hops,
        yeast: this.recipe.yeast
      };
      const recipeId = this.recipe.id;
      this.recipesService.updateRecipe(this.recipe.id, this.recipeForUpdate).subscribe(data => {
        this.router.navigate([`/receptury/${recipeId}`]);
      }, err => {
        console.log(err);
      });
    }
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
    if (this.recipe)
      this.recipe.malts = this.recipe.malts.filter(e => e !== recipeMalt);
  }

  deleteAllMalts() {
    if (this.recipe)
      this.recipe.malts = [];
  }


  addHop() {
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
    this.recipeHops.push(recipeHop);

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

  deleteHop(recipeHop: RecipeHop) {
    if (this.recipe)
      this.recipe.hops = this.recipe.hops.filter(e => e !== recipeHop);
  }

  deleteAllHops() {
    if (this.recipe)
      this.recipe.hops = [];
  }


  addYeast() {
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
    this.recipeYeasts.push(recipeYeast);

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

  deleteYeast(recipeYeast: RecipeYeast) {
    if (this.recipe)
      this.recipe.yeast = this.recipe.yeast.filter(e => e !== recipeYeast);
  }

  deleteAllYeasts() {
    if (this.recipe)
      this.recipe.yeast = [];
  }

  confirmCancellation() {
    if (confirm("Czy na pewno chcesz anulować edytowanie receptury?")) {
      this.router.navigate(['/moje-receptury']);
    }
  }

  calculateParameters() {
    //this.calculateAmountOfBoilingWort();
    //this.calculateAmountOfSweetWort();
    //this.calculateAmountOfBeerBeforeDryHopping();
  }

 /*
  calculateAmountOfBoilingWort() {
    if (this.recipeForUpdate.expected_beer_amount != null)
      this.recipeForUpdate.boiled_wort_amount = +this.recipeForUpdate.expected_beer_amount;
    if (this.recipeForUpdate.boiled_wort_amount != null && this.recipeForUpdate.boiling_time != null && this.recipeForUpdate.evaporation_rate != null)
      this.recipeForUpdate.boiled_wort_amount += +this.recipe.boiled_wort_amount * (this.recipeForUpdate.boiling_time / 60) * (this.recipeForUpdate.evaporation_rate / 100);
    if (this.recipeForUpdate.boiled_wort_amount != null && this.recipe.boiling_losses != null)
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
    blg = 100 * extract / worthWeight;
  }
  */

  selectBeerStyle(item: BeerStyle) {
    if (this.recipeForUpdate)
      this.recipeForUpdate.style = item.id;
  }

}



