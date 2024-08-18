import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  recipe: any = null;
  editMode: boolean = false;
  id: string | null = null;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam;
      if (this.id !== null) {
        console.log(this.id);
        this.getRecipeDetails(this.id);
      }
    });
  }

  getRecipeDetails(id: string) {
    this.recipeService.getRecipeById(id).subscribe(
      (recipe) => {
        this.recipe = recipe;
        console.log('Fetched Recipe:', this.recipe);
      },
      (error: any) => {
        console.log('Error fetching recipe details: ', error);
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  addIngredient() {
    if (this.recipe) {
      this.recipe.recipe.ingredientLines.push('');
    }
  }

  removeIngredient(index: number) {
    if (this.recipe) {
      this.recipe.recipe.ingredientLines.splice(index, 1);
    }
  }

  addMealType() {
    if (this.recipe) {
      this.recipe.recipe.mealType.push('');
    }
  }

  removeMealType(index: number) {
    if (this.recipe) {
      this.recipe.recipe.mealType.splice(index, 1);
    }
  }

  addCuisineType() {
    if (this.recipe) {
      this.recipe.recipe.cuisineType.push('');
    }
  }

  removeCuisineType(index: number) {
    if (this.recipe) {
      this.recipe.recipe.cuisineType.splice(index, 1);
    }
  }

  saveChanges() {
    console.log('Changes saved:', this.recipe);
    this.recipeService.updateRecipe(this.recipe).subscribe(() => {
      this.editMode = false;
    });
  }

  cancelChanges() {
    if (this.id) {
      this.getRecipeDetails(this.id);
    }
    this.editMode = false;
  }
}
