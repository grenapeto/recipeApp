// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { MOCK_RECIPES } from './mock-recipes';
// import { map } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root',
// })
// export class RecipeService {
//   private recipes = MOCK_RECIPES || [];

//   constructor() {}

//   getRecipes(): Observable<any[]> {
//     return of(this.recipes);
//   }

//   getRecipeById(id: number): Observable<any> {
//     console.log('Fetching recipe with ID:', id);

//     const recipe = this.recipes.find((r) => r.id === id);

//     if (recipe) {
//       console.log('Found Recipe:', recipe.name);
//     } else {
//       console.log('Recipe not found for ID:', id);
//     }

//     return of(recipe);
//   }

//   addRecipe(recipe: any): Observable<any> {
//     recipe.id = this.recipes.length
//       ? Math.max(...this.recipes.map((r) => r.id)) + 1
//       : 1;

//     recipe.image = recipe.image || `image${recipe.id}.jpg`;

//     this.recipes.push(recipe);

//     console.log('Recipes after addition:', this.recipes);

//     return of(recipe);
//   }

//   updateRecipe(updatedRecipe: any): Observable<any> {
//     const index = this.recipes.findIndex((r) => r.id === updatedRecipe.id);
//     if (index > -1) {
//       this.recipes[index] = updatedRecipe;
//       return of(updatedRecipe);
//     }
//     return of(null);
//   }

//   deleteRecipe(id: number): Observable<any> {
//     this.recipes = this.recipes.filter((r) => r.id !== id);
//     return of({ id });
//   }
// }

import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: any[] = [];
  recipe: any;

  httpClient = inject(HttpClient);
  private apiUrl =
    'https://api.edamam.com/api/recipes/v2?type=public&app_id=d78a8854&app_key=%20e8e08c0ff7ca76b4c80dccce32b4f755';
  constructor() {}

  fetchRecipesFromApi(): Observable<any[]> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      map((response) => response.hits.map((hit: any) => hit.recipe)),
      map((recipes) => {
        this.recipes = recipes;
        return this.recipes;
      })
    );
  }

  getRecipes(): Observable<any[]> {
    if (this.recipes.length) {
      return of(this.recipes);
    } else {
      return this.fetchRecipesFromApi();
    }
  }

  getRecipeById(href: string): Observable<any> {
    return this.httpClient.get(href);
  }

  addRecipe(recipe: any): Observable<any> {
    recipe.uri = `recipe_${Math.random().toString(36).substring(2)}`;
    recipe.image = recipe.image || 'default-image.jpg';

    this.recipes.push(recipe);
    return of(recipe);
  }

  updateRecipe(updatedRecipe: any): Observable<any> {
    const index = this.recipes.findIndex((r) => r.uri === updatedRecipe.uri);
    if (index > -1) {
      this.recipes[index] = updatedRecipe;
      return of(updatedRecipe);
    }
    return of(null);
  }

  deleteRecipe(uri: string): Observable<any> {
    this.recipes = this.recipes.filter((r) => r.uri !== uri);
    return of({ uri });
  }
}
