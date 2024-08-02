// import { Component } from '@angular/core';
// import { RecipeService } from '../recipe.service';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatCardModule } from '@angular/material/card';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-recipe-form',
//   standalone: true,
//   imports: [
//     MatButtonModule,
//     MatDialogModule,
//     MatInputModule,
//     MatFormFieldModule,
//     MatCardModule,
//     ReactiveFormsModule,
//     CommonModule,
//   ],
//   templateUrl: './recipe-form.component.html',
//   styleUrls: ['./recipe-form.component.css']
// })
// export class RecipeFormComponent {
//   recipeForm: FormGroup;
// lastAddedRecipe: any = null;

//   constructor(private fb: FormBuilder, private recipeService: RecipeService) {
//     this.recipeForm = this.fb.group({
//       name: [''],
//       ingredients: [''],
//       instructions: ['']
//     });



//   }

//   onSubmit() {
//     if (this.recipeForm.valid) {
//       this.recipeService.addRecipe(this.recipeForm.value).subscribe(result => {
//         console.log('Recipe added:', result);
//         this.recipeForm.reset();
//         this.lastAddedRecipe = result; 
//       });
//     }
//   }
// }
import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule, MatIcon,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  recipeForm: FormGroup;
  lastAddedRecipe: any = null;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      name: [''],
      ingredients: this.fb.array([]),  // Use FormArray for ingredients
      instructions: this.fb.array([])  // Use FormArray for instructions
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control(''));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(result => {
        console.log('Recipe added:', result);
        this.recipeForm.reset();
        this.lastAddedRecipe = result; 
        this.resetFormArrays();
      });
    }
  }

  private resetFormArrays() {
    // Reset the form arrays to be empty after submission
    while (this.ingredients.length) {
      this.ingredients.removeAt(0);
    }
    while (this.instructions.length) {
      this.instructions.removeAt(0);
    }
  }
}
