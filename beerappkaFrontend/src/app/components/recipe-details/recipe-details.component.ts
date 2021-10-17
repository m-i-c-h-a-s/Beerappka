import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissions } from '../../permissions/permissions';
import { Malt } from '../recipe-creator/malt';
import { RecipeMalt } from '../recipe-creator/recipeMalt';
import { RecipeHop } from '../recipe-creator/recipeHop';
import { RecipeYeast } from '../recipe-creator/recipeYeast';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.sass']
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe | undefined;


  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private router: Router,
              public  permissions: Permissions)
  {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.recipeService.getRecipe(id).subscribe(data => {
        this.recipe = data as any;
        if(this.recipe != undefined) {
          this.displayFullRecipeTypeName(this.recipe);
          this.displayFullMaltTypeName(this.recipe?.malts);
          this.displayFullHopUsedForName(this.recipe?.hops);
          this.displayFullYeastFormName(this.recipe?.yeast);
          this.displayFullYeastTypeName(this.recipe?.yeast);
        }
      }, err => {
        console.log(err);
        if (err.status === 404) {
          this.router.navigate(['/receptury-publiczne']);
        }
      });
    });
  }

  public deleteRecipe(recipeId: number): void {
    if(confirm("Czy na pewno chcesz usunąć recepturę?")) {
      this.recipeService.deleteRecipe(recipeId).subscribe(data => {
        this.router.navigate(['/receptury-publiczne']);
      }, err => {
        console.log(err);
      })
    }
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

  public displayFullMaltTypeName(malts: Array<RecipeMalt>) {
    malts.forEach(malt => {
      switch(malt?.malt.type) {
        case 'gr':
          malt.malt.type = "Ziarno";
          break;
        case 'de':
          malt.malt.type = "Ekstrakt suchy";
          break;
        case 'le':
          malt.malt.type = "Ekstrakt suchy";
          break;
        case 'su':
          malt.malt.type = "Cukier";
          break;
        default:
          malt.malt.type = "";
          break;
      }
    })
  }

  public displayFullHopUsedForName(hops: Array<RecipeHop>) {
    hops.forEach(hop => {
      switch(hop?.used_for) {
        case 'ma':
          hop.used_for = "Zacieranie";
          break;
        case 'fw':
          hop.used_for = "Brzeczka przednia";
          break;
        case 'bo':
          hop.used_for = "Gotowanie";
          break;
        case 'ar':
          hop.used_for = "Aromat";
          break;
        case 'wh':
          hop.used_for = "Whirpool";
          break;
        case 'co':
          hop.used_for = "Na zimno";
          break;
        default:
          hop.used_for = "";
          break;
      }
    })
  }

  public displayFullYeastFormName(yeasts: Array<RecipeYeast>) {
    yeasts.forEach(yeast => {
      switch(yeast?.form) {
        case 'dr':
          yeast.form = "Suche";
          break;
        case 'li':
          yeast.form = "Płynne";
          break;
        case 'th':
          yeast.form = "Gęstwa";
          break;
        case 'sp':
          yeast.form = "Fermentacja spontaniczna";
          break;
        default:
          yeast.form = "";
          break;
      }
    })
  }

  public displayFullYeastTypeName(yeasts: Array<RecipeYeast>) {
    yeasts.forEach(yeast => {
      switch(yeast?.yeast.type) {
        case 'uf':
          yeast.yeast.type = "Ale";
          break;
        case 'lf':
          yeast.yeast.type = "Lager";
          break;
        default:
          yeast.yeast.type = "";
          break;
      }
    })
  }
}
