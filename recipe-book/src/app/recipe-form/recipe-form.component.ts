// import { Component } from '@angular/core';
// import { RecipeService } from '../recipe.service';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatCardModule } from '@angular/material/card';
// import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { MatIcon } from '@angular/material/icon';
// import { UploaderModule } from 'angular-uploader';
// import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';

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
//     MatIcon,
//     UploaderModule
//   ],
//   templateUrl: './recipe-form.component.html',
//   styleUrls: ['./recipe-form.component.css']
// })
// export class RecipeFormComponent {
//   uploader = Uploader({
//     apiKey: 'free', // <-- Get production-ready API keys from Bytescale
//   });
//   options: UploadWidgetConfig = {
//     multi: false,
//   };
  
//   onComplete = (files: UploadWidgetResult[]) => {
//     if (files.length > 0) {
//       const uploadedUrl = files[0].fileUrl;
//       console.log('Uploaded file URL:', uploadedUrl);
//       this.images.push(this.fb.control(uploadedUrl));  // Add URL to the form array
//     }
//   };

//   // Declare uploadedFileUrl to accept both string and undefined
//   uploadedFileUrl: string | undefined = undefined;

//   recipeForm: FormGroup;
//   lastAddedRecipe: any = null;
//   height!: string;
//   width!: string;
//   onUpdate: ((files: UploadWidgetResult[]) => void) | undefined;

//   constructor(private fb: FormBuilder, private recipeService: RecipeService) {
//     this.recipeForm = this.fb.group({
//       name: [''],
//       ingredients: this.fb.array([]),  // Use FormArray for ingredients
//       instructions: this.fb.array([]),  // Use FormArray for instructions
//       images: this.fb.array([])  // Add FormArray for images
//     });
//   }

//   get ingredients(): FormArray {
//     return this.recipeForm.get('ingredients') as FormArray;
//   }

//   get instructions(): FormArray {
//     return this.recipeForm.get('instructions') as FormArray;
//   }

//   get images(): FormArray {
//     return this.recipeForm.get('images') as FormArray;
//   }

//   addIngredient() {
//     this.ingredients.push(this.fb.control(''));
//   }

//   removeIngredient(index: number) {
//     this.ingredients.removeAt(index);
//   }

//   addInstruction() {
//     this.instructions.push(this.fb.control(''));
//   }

//   removeInstruction(index: number) {
//     this.instructions.removeAt(index);
//   }

//   removeImage(index: number) {
//     this.images.removeAt(index);
//   }

//   onSubmit() {
//     if (this.recipeForm.valid) {
//       this.recipeService.addRecipe(this.recipeForm.value).subscribe(result => {
//         console.log('Recipe added:', result);
//         this.lastAddedRecipe = result; 
//         this.resetFormArrays();
//         this.recipeForm.reset();
//       });
//     }
//   }

//   private resetFormArrays() {
//     // Reset the form arrays to be empty after submission
//     while (this.ingredients.length) {
//       this.ingredients.removeAt(0);
//     }
//     while (this.instructions.length) {
//       this.instructions.removeAt(0);
//     }
//     while (this.images.length) {
//       this.images.removeAt(0);
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
import { UploaderModule } from 'angular-uploader';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';

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
    CommonModule,
    MatIcon,
    UploaderModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  uploader = Uploader({
    apiKey: 'free', // <-- Get production-ready API keys from Bytescale
  });
  options: UploadWidgetConfig = {
    multi: false,
  };

  onComplete = (files: UploadWidgetResult[]) => {
    if (files.length > 0) {
      const uploadedUrl = files[0].fileUrl;
      console.log('Uploaded file URL:', uploadedUrl);
      this.images.push(this.fb.control(uploadedUrl)); // Add URL to the form array
    }
  };

  recipeForm: FormGroup;
  lastAddedRecipe: any = null;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      name: [''],
      ingredients: this.fb.array([]), // Use FormArray for ingredients
      instructions: this.fb.array([]), // Use FormArray for instructions
      images: this.fb.array([]) // Add FormArray for images
    });

    // Initialize the form arrays
    this.addIngredient();
    this.addInstruction();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  get images(): FormArray {
    return this.recipeForm.get('images') as FormArray;
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

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(result => {
        console.log('Recipe added:', result);
        this.lastAddedRecipe = result;
        this.resetFormArrays();
        this.recipeForm.reset();
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
    while (this.images.length) {
      this.images.removeAt(0);
    }
  }
}
