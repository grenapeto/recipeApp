import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { RouterModule } from '@angular/router';

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
  @Input() recipeId: any;
  recipes = MOCK_RECIPES;
  
  // tu musis zobrat recept z recipes podla recipeId a poslat to do DetailsComponent
}
