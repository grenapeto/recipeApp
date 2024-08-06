import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    MatListModule, 
    CommonModule, 
    MatCardModule, 
    RecipeDetailComponent,
    DetailsComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'] 
})
export class RecipeListComponent implements OnInit {

  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data; 
    });
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    });
  }
}
