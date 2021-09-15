import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissions } from 'src/app/permissions/permissions';

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
              public  permissions: Permissions) { }

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

}
