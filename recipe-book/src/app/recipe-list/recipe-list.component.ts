import { Component, Input, signal } from '@angular/core';
import { RecipeService } from '../recipe.service';
import {MatListModule} from '@angular/material/list';
import { MOCK_RECIPES } from '../mock-recipes';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ShowMorePopup } from "../recipe-detail/recipe-detail.component";
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MatListModule, CommonModule, NgFor, MatCardModule, ShowMorePopup, RecipeDetailComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
recipes = MOCK_RECIPES;

}
