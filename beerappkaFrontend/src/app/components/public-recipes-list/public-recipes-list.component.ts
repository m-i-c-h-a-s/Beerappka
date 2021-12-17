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

  totalLength: any;
  page: number = 1;

  recipesUrl = "http://localhost:8000/api/v1/recipes/only_public/";
  next: string = '';
  previous: string = '';

  constructor(
    private recipesService: RecipesService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.setRecipes(this.recipesUrl);

    // this.recipesService.getAllPublicRecipes().subscribe(data => {
    //   this.recipes = (data as any).results;
    //   this.totalLength = (data as any).results.length;
    //   this.displayFullRecipeTypeName(this.recipes);
    // }, err => {
    //   console.log(err);
    // });
  }

  setRecipes(url: string) {
    this.recipesService.getAllPublicRecipes2(url).subscribe(data => {
      this.recipes = (data as any).results;
      this.totalLength = (data as any)
      this.displayFullRecipeTypeName(this.recipes);

      if ((data as any).next)
        this.next = (data as any).next;

      if ((data as any).previous)
        this.previous = (data as any).previous;
    });
  }

  fetchNext() {
    this.setRecipes(this.next);
  }

  fetchPrevious() {
    this.setRecipes(this.previous);
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
