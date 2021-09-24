import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissions } from '../../permissions/permissions';
import { Malt } from '../recipe-creator/malt';
import { RecipeMalt } from '../recipe-creator/recipeMalt';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.sass']
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe | undefined;
  public malt: Malt;

  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private router: Router,
              public  permissions: Permissions)
  {
    this.malt = {
      id: 0,
      name: '',
      extractivity: 0,
      type: '',
      color: 0,
      manufacturer: 0,
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.recipeService.getRecipe(id).subscribe(data => {
        this.recipe = data as any;

      }, err => {
        console.log(err);
        if (err.status === 404) {
          this.router.navigate(['/receptury-publiczne']);
        }
      });
    });
  }

  public deleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(data => {
      this.router.navigate(['/receptury-publiczne']);
    }, err => {
      console.log(err);
    })
  }

  public getMalt(id: number): Malt {
    this.recipeService.getMalt(id).subscribe(data => {
      this.malt = (data as any);
    }, err => {
      console.log(err);
    })
    return this.malt;
  }

}
