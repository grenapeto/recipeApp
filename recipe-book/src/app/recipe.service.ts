import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = MOCK_RECIPES;

  constructor() { }

  getRecipes(): Observable<any[]> {
    return of(this.recipes);
  }

  getRecipeById(id: number): Observable<any> {
    const recipe = this.recipes.find((r) => r.id === id);
    return of(recipe);
  }

  addRecipe(recipe: any): Observable<any> {
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
    return of(recipe);
  }

  updateRecipe(updatedRecipe: any): Observable<any> {
    const index = this.recipes.findIndex((r) => r.id === updatedRecipe.id);
    if (index > -1) {
      this.recipes[index] = updatedRecipe;
      return of(updatedRecipe);
    }
    return of(null);
  }

  deleteRecipe(id: number): Observable<any> {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    return of({ id });
  }
}