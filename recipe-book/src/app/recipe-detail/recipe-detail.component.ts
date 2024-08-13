import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, DetailsComponent, 
    RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  @Input() recipeId!: number;
  recipes = MOCK_RECIPES;
  
  
}