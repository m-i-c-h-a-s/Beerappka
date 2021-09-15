import { Injectable } from '@angular/core';
import {UserData} from '../components/login-page/user-data';
import {Article} from '../components/articles-list/article';
import { Recipe } from '../components/recipe-creator/recipe';

@Injectable({
  providedIn: 'root'
})
export class Permissions {
  currentUser: UserData;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('current_user') as string);
  }

  isArticleAuthor(article: Article): boolean {
    return article.author.id === this.currentUser.id;
  }

  isRecipeAuthor(recipe: Recipe): boolean {
    return recipe.user.id === this.currentUser.id;
  }
}
