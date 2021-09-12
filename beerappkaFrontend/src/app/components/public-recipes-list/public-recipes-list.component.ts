import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../recipe-creator/recipe';

@Component({
  selector: 'app-public-recipes-list',
  templateUrl: './public-recipes-list.component.html',
  styleUrls: ['./public-recipes-list.component.sass']
})
export class PublicRecipesListComponent implements OnInit {
  public recipes: Array<Recipe> = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.getAllRecipes().subscribe(data => {
      this.recipes = (data as any).results;
    }, err => {
      console.log(err);
    });
  }

}