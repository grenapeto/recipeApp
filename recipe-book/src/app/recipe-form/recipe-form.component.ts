import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class RecipeFormComponent implements OnInit, OnDestroy {
  uploader = Uploader({
    apiKey: 'free', // Use a production API key for deployment
  });
  options: UploadWidgetConfig = {
    multi: false,
  };

  recipeForm: FormGroup;
  lastAddedRecipe: any = null;
  private handleScroll: () => void;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)], Validators.required),
      instructions: this.fb.array([this.fb.control('', Validators.required)], Validators.required),
      images: this.fb.array([], Validators.required),
    });

    this.handleScroll = () => {
      console.log('Scroll event detected');
    };
  }

  ngOnInit(): void {
    // Add passive scroll listener
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Load the last added recipe from localStorage on initialization
    const savedRecipe = localStorage.getItem('lastAddedRecipe');
    if (savedRecipe) {
      this.lastAddedRecipe = JSON.parse(savedRecipe);
    }
  }

  ngOnDestroy(): void {
    // Remove scroll listener
    window.removeEventListener('scroll', this.handleScroll);
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
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control('', Validators.required));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  onComplete = (files: UploadWidgetResult[]) => {
    if (files.length > 0) {
      const uploadedUrl = files[0].fileUrl;
      console.log('Uploaded file URL:', uploadedUrl);
      this.images.push(this.fb.control(uploadedUrl, Validators.required));
    }
  };

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(result => {
        console.log('Recipe added:', result);
        this.lastAddedRecipe = result;

        // Save the last added recipe to localStorage
        localStorage.setItem('lastAddedRecipe', JSON.stringify(this.lastAddedRecipe));

        this.resetFormArrays();
        this.recipeForm.reset();
        this.addIngredient();  // Ensure at least one ingredient field
        this.addInstruction(); // Ensure at least one instruction field
      });
    } else {
      console.error('Form is invalid');
      this.recipeForm.markAllAsTouched(); // Mark all fields as touched to show errors
    }
  }

  private resetFormArrays() {
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
