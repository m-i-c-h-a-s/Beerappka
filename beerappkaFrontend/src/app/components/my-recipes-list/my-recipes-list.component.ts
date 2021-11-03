import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { UserService } from 'src/app/services/user.service';
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

  totalLength: any;
  page: number = 1;


  constructor(private userService: UserService,
              private router: Router,
              private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserData().subscribe(data => {
      this.currentUser = data as any;

      if (this.currentUser)
        this.recipesService.getUserRecipes(this.currentUser.id).subscribe(data => {
          this.recipes = (data as any).results;
          this.totalLength = (data as any).results.length;
          this.displayFullRecipeTypeName(this.recipes);
        }, err => {
          console.log(err);
        });

    }, err => {
      console.log(err);
    });
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
