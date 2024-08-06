import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_RECIPES } from './mock-recipes'; // Ensure this is an array of recipe objects

@Injectable({
  providedIn: 'root',
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
    // Log the ID being fetched to verify it's correct
    console.log('Fetching recipe with ID:', id);

    // Find the recipe with the specified ID
    const recipe = this.recipes.find((r) => r.id === id);

    // Log the found recipe or undefined
    if (recipe) {
      console.log('Found Recipe:', recipe.name); // Log the name of the found recipe
    } else {
      console.log('Recipe not found for ID:', id); // Log a message if the recipe is not found
    }

    return of(recipe);
  }

  // Add a new recipe
  addRecipe(recipe: any): Observable<any> {
    // Ensure a unique ID for the new recipe
    recipe.id = this.recipes.length
      ? Math.max(...this.recipes.map((r) => r.id)) + 1
      : 1;

    // Add an image if necessary; otherwise, set a default
    recipe.image = recipe.image || `image${recipe.id}.jpg`;

    // Push the new recipe into the in-memory array
    this.recipes.push(recipe);

    // Debugging: Log the recipes array after addition
    console.log('Recipes after addition:', this.recipes);

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
