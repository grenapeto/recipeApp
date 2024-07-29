import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MOCK_RECIPES } from '../mock-recipes';
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  recipes = MOCK_RECIPES;
}
