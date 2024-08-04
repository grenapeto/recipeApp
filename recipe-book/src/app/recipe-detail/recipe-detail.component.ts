// import { Component, ChangeDetectionStrategy, inject, Input, Inject } from '@angular/core';
// import { RecipeService } from '../recipe.service';
// import { MOCK_RECIPES } from '../mock-recipes';
// import { MatButtonModule } from '@angular/material/button';
// import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { CommonModule, NgFor, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-recipe-detail',
//   standalone: true,
//   imports: [MatButtonModule, MatDialogModule, CommonModule],
//   templateUrl: './recipe-detail.component.html',
//   styleUrl: './recipe-detail.component.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class RecipeDetailComponent {
//   @Input() recipeId: any;
//   recipes = MOCK_RECIPES;
//   readonly dialog = inject(MatDialog);

//   showMore() {
//     const dialogRef = this.dialog.open(ShowMorePopup, {
//       data: { id: this.recipeId }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//       console.log(this.recipeId);
//     });
//   }
// }

// @Component({
//   selector: 'show-more-popup',
//   templateUrl: 'show-more-popup.component.html',
//   standalone: true,
//   styleUrl: './recipe-detail.component.css',
//   imports: [MatDialogModule, MatButtonModule,
//     CommonModule, NgIf, NgFor, CommonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ShowMorePopup {
//     recipe: any;

//   constructor(private recipeService: RecipeService,
//     @Inject(MAT_DIALOG_DATA) public data: { id: number }
// ) { }

// ngOnInit() {
//   this.getRecipeDetails(this.data.id);
// }
// getRecipeDetails(id: number) {
//   this.recipeService.getRecipeById(id).subscribe(recipe => {
//     this.recipe = recipe;
//   });
// }

// }

import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Input,
  Inject,
} from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MOCK_RECIPES } from '../mock-recipes';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, NgIf, NgFor],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  @Input() recipeId: any;
  recipes = MOCK_RECIPES;
  readonly dialog = inject(MatDialog);

  showMore() {
    const dialogRef = this.dialog.open(ShowMorePopup, {
      data: { id: this.recipeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(this.recipeId);
    });
  }
}

@Component({
  selector: 'show-more-popup',
  templateUrl: './show-more-popup.component.html',
  standalone: true,
  styleUrls: ['./recipe-detail.component.css'],
  imports: [
    MatDialogModule, // For dialog functionality
    MatButtonModule, // For buttons
    MatCardModule, // For card layout
    MatListModule, // For lists
    MatDividerModule, // For dividers
    MatInputModule, // For input fields
    MatIconModule, // For icons
    CommonModule, // Common Angular directives (NgIf, NgFor)
    FormsModule, // For ngModel directive
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMorePopup {
  recipe: any = null; // Initialize recipe to null
  editMode: boolean = false; // Initialize editMode to false

  constructor(
    private recipeService: RecipeService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit() {
    this.getRecipeDetails(this.data.id);
  }

  getRecipeDetails(id: number) {
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      // Clone the recipe to avoid direct modification before saving
      this.recipe = { ...recipe };
    });
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
    this.getRecipeDetails(this.data.id); // Reload the recipe details
    this.editMode = false;
  }
}
