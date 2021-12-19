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
import { RecipeCreateUpdateErrors } from '../recipe-creator/recipe-create-update-errors';

import { calculateIBU } from '../recipe-creator/calculators/ibuCalculator';
import { calculateBLG } from '../recipe-creator/calculators/blgCalculator';
import { calculateEBC } from '../recipe-creator/calculators/ebcCalculator';

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrls: ['./recipe-update.component.sass']
})

export class RecipeUpdateComponent implements OnInit {
  public beerStyles: Array<BeerStyle> = [];
  public style: BeerStyle | undefined;
  public manufacturer: Manufacturer;
  public recipe: Recipe | undefined;
  public recipeForUpdate: RecipeForCreateUpdate | undefined;
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
      min_carbonation: 0,
      max_carbonation: 0,
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
        ibu: this.recipe.ibu,
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
        this.err = err.error;
      });
    }
  }



  addMalt() {
    if (this.recipe)
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
        if (this.recipe.expected_beer_amount) {
          this.recipe.blg = calculateBLG(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.expected_beer_amount);
          this.recipe.ebc = calculateEBC(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.boiled_wort_amount);
          this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
        }
      }
  }

  deleteMalt(recipeMalt: RecipeMalt) {
    if (this.recipe) {
      this.recipe.malts = this.recipe.malts.filter(e => e !== recipeMalt);
    if (this.recipe.expected_beer_amount) {
      this.recipe.blg = calculateBLG(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.expected_beer_amount);
      this.recipe.ebc = calculateEBC(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.boiled_wort_amount);
      this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
    }
    }
  }

  deleteAllMalts() {
    if (this.recipe) {
      this.recipe.malts.length = 0;
      if (this.recipe.expected_beer_amount) {
          this.recipe.blg = calculateBLG(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.expected_beer_amount);
          this.recipe.ebc = calculateEBC(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.boiled_wort_amount);
          this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
      }
    }
  }


  addHop() {
    if (this.recipe)
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
      if (this.recipe)
        this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
  }

  deleteHop(recipeHop: RecipeHop) {
    if (this.recipe) {
      this.recipe.hops = this.recipe.hops.filter(e => e !== recipeHop);
      this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
    }
  }

  deleteAllHops() {
    if (this.recipe) {
      this.recipe.hops.length = 0;
      this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
    }
  }


  addYeast() {
    if (this.recipe)
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
    if (this.recipe)
      this.recipe.yeast = this.recipe.yeast.filter(e => e !== recipeYeast);
  }

  deleteAllYeasts() {
    if (this.recipe)
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
    if (this.recipe)
      this.recipe.ibu = calculateIBU(this.recipe.boiled_wort_amount, this.recipe.blg, this.recipe.hops);
    if (this.recipe && this.recipe.expected_beer_amount) {
        this.recipe.blg = calculateBLG(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.expected_beer_amount);
        this.recipe.ebc = calculateEBC(this.recipe.malts, this.recipe.mashing_efficiency, this.recipe.boiled_wort_amount);
    }
  }

  calculateAmountOfBoilingWort() {
    if (this.recipe) {
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
  }

  calculateAmountOfSweetWort() {
    if (this.recipe) {
      if (this.recipe.expected_beer_amount != null)
        this.amountOfSweetWortInLiters = +this.recipe.expected_beer_amount
      if (this.recipe.expected_beer_amount != null && this.recipe.fermentation_losses != null)
        this.amountOfSweetWortInLiters += +this.recipe.expected_beer_amount * (this.recipe.fermentation_losses / 100);
      if (this.recipe.expected_beer_amount != null && this.recipe.cold_hop_losses != null)
        this.amountOfSweetWortInLiters += +this.recipe.expected_beer_amount * (this.recipe.cold_hop_losses / 100);
      }
  }

  calculateAmountOfBeerBeforeDryHopping() {
    if (this.recipe) {
      if (this.recipe.expected_beer_amount != null)
        this.amountOfBeerBeforeDryHoppingInLiters = +this.recipe.expected_beer_amount;
      if (this.recipe.expected_beer_amount != null && this.recipe.cold_hop_losses != null)
        this.amountOfBeerBeforeDryHoppingInLiters += +this.recipe.expected_beer_amount * (this.recipe.cold_hop_losses / 100);
      }
  }


  selectBeerStyle(item: BeerStyle) {
    if (this.recipe)
      this.recipe.style = item;
  }

}



