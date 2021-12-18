import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';

@Component({
  selector: 'app-public-recipes-list',
  templateUrl: './public-recipes-list.component.html',
  styleUrls: ['./public-recipes-list.component.sass']
})
export class PublicRecipesListComponent implements OnInit {
  public recipes: Array<Recipe> = [];

  page: number = 1;
  count: number = 0;
  pageSize: number = 6;

  constructor(
    private recipesService: RecipesService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.getRecipes(1);
  }

  getRecipes(pageNumber: number) {
    this.recipesService.getAllPublicRecipes(pageNumber).subscribe(data => {
      this.recipes = (data as any).results;
      this.displayFullRecipeTypeName(this.recipes);
      this.count = (data as any).count;
    }, err => {
      console.log(err);
    });
  }

  onPageChange(event: number): void {
    this.page = event;
    this.getRecipes(this.page);
  }

  public displayFullRecipeTypeName(recipes: Array<Recipe>) {
    recipes.forEach(recipe => {
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
    });
  }
}
