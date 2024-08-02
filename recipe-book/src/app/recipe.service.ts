// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { MOCK_RECIPES } from './mock-recipes';

// @Injectable({
//   providedIn: 'root'
// })
// export class RecipeService {
//   private recipes = MOCK_RECIPES;

//   constructor() { }

//   getRecipes(): Observable<any[]> {
//     return of(this.recipes);
//   }

//   getRecipeById(id: number): Observable<any> {
//     const recipe = this.recipes.find((r) => r.id === id);
//     return of(recipe);
//   }

//   addRecipe(recipe: any): Observable<any> {
//     recipe.id = this.recipes.length + 1;
//     this.recipes.push(recipe);
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
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_RECIPES } from './mock-recipes'; // Ensure this is an array of recipe objects

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes = MOCK_RECIPES || []; // Ensure an empty array if undefined

  constructor() {}

  // Get all recipes
  getRecipes(): Observable<any[]> {
    return of(this.recipes);
  }

  // Get a recipe by ID
  getRecipeById(id: number): Observable<any> {
    const recipe = this.recipes.find((r) => r.id === id);
    return of(recipe);
  }

  // Add a new recipe
  addRecipe(recipe: any): Observable<any> {
    recipe.id = this.recipes.length ? Math.max(...this.recipes.map(r => r.id)) + 1 : 1; // Ensure unique ID
    this.recipes.push(recipe);
    console.log('Recipes after addition:', this.recipes); // Debugging: Check recipes array
    return of(recipe);
  }

  // Update an existing recipe
  updateRecipe(updatedRecipe: any): Observable<any> {
    const index = this.recipes.findIndex((r) => r.id === updatedRecipe.id);
    if (index > -1) {
      this.recipes[index] = updatedRecipe;
      return of(updatedRecipe);
    }
    return of(null);
  }

  // Delete a recipe by ID
  deleteRecipe(id: number): Observable<any> {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    return of({ id });
  }
}
