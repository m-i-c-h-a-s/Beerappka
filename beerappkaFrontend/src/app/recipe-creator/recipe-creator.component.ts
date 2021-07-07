import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.sass']
})

export class RecipeCreatorComponent implements OnInit {
  recipeName = '';
  recipeType = '';
  recipeStyle = '';
  amountOfBeer = 0;
  boilingTime = 0;
  evaporationSpeed = 0;
  boilingLosses = 0;
  fermentationLosses = 0;
  coldHoppingLosses = 0;


  constructor() { }

  ngOnInit(): void {
  }


  createRecipe() {
    const recipe: Recipe = {
      name: this.recipeName,
      type: this.recipeType,
      style: this.recipeStyle,
      amountOfBeer: this.amountOfBeer,
      boilingTime: this.boilingTime,
      evaporationSpeed: this.evaporationSpeed,
      boilingLosses: this.boilingLosses,
      fermentationLosses: this.fermentationLosses,
      coldHoppingLosses: this.coldHoppingLosses,
    };


  }
}
