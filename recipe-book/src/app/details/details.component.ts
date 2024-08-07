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
import { MatCard } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatDialogModule, // For dialog functionality
    MatButtonModule, // For buttons
    MatCardModule, // For card layout
    MatListModule, // For lists
    MatDividerModule, // For dividers
    MatInputModule, // For input fields
    MatIconModule, // For icons
    CommonModule, // Common Angular directives (NgIf, NgFor)
    FormsModule,
    MatCard,
    RouterModule,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  recipe: any = null; // Initialize recipe to null
  editMode: boolean = false; // Initialize editMode to false
  id: number | null = null; // Use number for ID
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : null; // Convert ID to number
      if (this.id !== null) {
        this.getRecipeDetails(this.id);
      }
    });
  }

  getRecipeDetails(id: number) {
    this.recipeService.getRecipeById(id).subscribe(
      (recipe) => {
        console.log('Fetched Recipe:', recipe);
        this.recipe = { ...recipe };
      },
      (error: any) => {
        console.log('Error fetching recipe details: ', error);
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode; // Toggle editMode between true and false
  }

  addIngredient() {
    if (this.recipe) {
      this.recipe.ingredients.push('');
    }
  }

  removeIngredient(index: number) {
    if (this.recipe) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  addInstruction() {
    if (this.recipe) {
      this.recipe.instructions.push('');
    }
  }

  removeInstruction(index: number) {
    if (this.recipe) {
      this.recipe.instructions.splice(index, 1);
    }
  }

  saveChanges() {
    // Save the changes and exit edit mode
    // Implement the logic to update the recipe in the service or backend
    console.log('Changes saved:', this.recipe);
    this.editMode = false;
  }

  cancelChanges() {
    // Revert any unsaved changes and exit edit mode
    this.getRecipeDetails(this.recipe.id); // Reload the recipe details
    this.editMode = false;
  }
}
