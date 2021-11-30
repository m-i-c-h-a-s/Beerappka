import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { User } from '../profile/user';
import { Recipe } from '../recipe-creator/recipe';

@Component({
  selector: 'app-my-recipes-list',
  templateUrl: './my-recipes-list.component.html',
  styleUrls: ['./my-recipes-list.component.sass']
})
export class MyRecipesListComponent implements OnInit {
  public currentUser: User | undefined;
  public recipes: Array<Recipe> = [];

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 6;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    let current_user = localStorage.getItem('current_user');
    if (current_user)
      this.currentUser = JSON.parse(current_user);

    this.getRecipes();
  }

  getRecipes() {
    if (this.currentUser)
      this.recipesService.getUserRecipes(this.currentUser.id, this.currentPage).subscribe(data => {
        this.recipes = (data as any).results;
        this.totalItems = (data as any).count;

        this.displayFullRecipeTypeName(this.recipes);
      }, err => {
        console.log(err);
      });
  }

  onTableDataChange(event: any) {
    this.currentPage = event;
    this.getRecipes();
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
