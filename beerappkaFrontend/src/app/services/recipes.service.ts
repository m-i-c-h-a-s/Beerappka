import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';
import { Recipe } from '../components/recipe-creator/recipe';
import { RecipeForCreateUpdate } from '../components/recipe-creator/recipe-for-create-update';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends BaseService {

  constructor(private http: HttpClient) {
    super();
   }

  public getAllPublicRecipes(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/recipes/only_public/`), this.httpOptions);
  }

  public getUserRecipes(userId: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/recipes/?user__id=${userId}`), this.httpOptions);
  }

  public getRecipe(id: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/recipes/${id}`), this.httpOptions);
  }

  public createRecipe(newRecipe: RecipeForCreateUpdate): Observable<ArrayBuffer> {
    return this.http.post(this.getAPIUrl(`/recipes/`), newRecipe, this.httpOptions);
  }

  public updateRecipe(id: number, recipe: RecipeForCreateUpdate): Observable<ArrayBuffer> {
    return this.http.put(this.getAPIUrl(`/recipes/${id}/`), recipe, this.httpOptions);
  }

  public deleteRecipe(recipeId: number): Observable<ArrayBuffer> {
    return this.http.delete(this.getAPIUrl(`/recipes/${recipeId}/`), this.httpOptions);
  }


  public getAllMalts(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/malts/`), this.httpOptions);
  }

  public getDefaultMalts(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/default-malts/`), this.httpOptions);
  }

  public getMalt(id: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/malts/${id}`), this.httpOptions);
  }


  public getAllHops(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/hops/`), this.httpOptions);
  }

  public getHop(id: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/hops/${id}`), this.httpOptions);
  }


  public getAllYeast(): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/yeast/`), this.httpOptions);
  }

  public getYeast(id: number): Observable<ArrayBuffer> {
    return this.http.get(this.getAPIUrl(`/yeast/${id}`), this.httpOptions);
  }
}
