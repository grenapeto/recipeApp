
//  import { CommonModule } from '@angular/common';
//  import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
//  import { FormsModule } from '@angular/forms';
//  import { MatButtonModule } from '@angular/material/button';
//  import { MatCardModule } from '@angular/material/card';
//  import { MatDialogModule } from '@angular/material/dialog';
//  import { MatDividerModule } from '@angular/material/divider';
//  import { MatIconModule } from '@angular/material/icon';
//  import { MatInputModule } from '@angular/material/input';
//  import { MatListModule } from '@angular/material/list';
//  import { RecipeService } from '../recipe.service';
//  import { MatCard } from '@angular/material/card';
//  import { ActivatedRoute, RouterModule } from '@angular/router';
//  import {MatCheckboxModule} from '@angular/material/checkbox';

// @Component({
//   selector: 'app-details',
//   standalone: true,
//   imports: [
//     MatDialogModule, 
//     MatButtonModule, 
//     MatCardModule, 
//     MatListModule, 
//     MatDividerModule, 
//     MatInputModule, 
//     MatIconModule, 
//     CommonModule, 
//     FormsModule,
//     MatCard,
//     RouterModule,
//     MatCheckboxModule
//   ],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './details.component.html',
//   styleUrl: './details.component.css',
// })
// export class DetailsComponent implements OnInit {
//   recipe: any = null; 
//   editMode: boolean = false; 
//   id: number | null = null; 
//   constructor(
//     private recipeService: RecipeService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       const idParam = params.get('id');
//       this.id = idParam ? +idParam : null; 
//       if (this.id !== null) {
//         this.getRecipeDetails(this.id);
//       }
//     });
//   }

//   getRecipeDetails(id: number) {
//     this.recipeService.getRecipeById(id).subscribe(
//       (recipe) => {
//         console.log('Fetched Recipe:', recipe);
//         this.recipe = { ...recipe };
//       },
//       (error: any) => {
//         console.log('Error fetching recipe details: ', error);
//       }
//     );
//   }
//   toggleEditMode() {
//     this.editMode = !this.editMode; 
//   }

//   addIngredient() {
//     if (this.recipe) {
//       this.recipe.ingredients.push('');
//     }
//   }

//   removeIngredient(index: number) {
//     if (this.recipe) {
//       this.recipe.ingredients.splice(index, 1);
//     }
//   }

//   addInstruction() {
//     if (this.recipe) {
//       this.recipe.instructions.push('');
//     }
//   }

//   removeInstruction(index: number) {
//     if (this.recipe) {
//       this.recipe.instructions.splice(index, 1);
//     }
//   }

//   saveChanges() {
    
//     console.log('Changes saved:', this.recipe);
//     this.editMode = false;
//   }

//   cancelChanges() {
   
//     this.getRecipeDetails(this.recipe.id); 
//     this.editMode = false;
//   }
// }



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
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'], // Note: Changed from `styleUrl` to `styleUrls`
})
export class DetailsComponent implements OnInit {
  recipe: any = null; 
  editMode: boolean = false; 
  uri: string | null = null; 

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const uriParam = params.get('uri');
      this.uri = uriParam; 
      if (this.uri !== null) {
        this.getRecipeDetails(this.uri);
      }
    });
  }

  getRecipeDetails(uri: string) {
    this.recipeService.getRecipeByUri(uri).subscribe(
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
    this.editMode = !this.editMode; 
  }

  addIngredient() {
    if (this.recipe) {
      this.recipe.ingredientLines.push('');
    }
  }

  removeIngredient(index: number) {
    if (this.recipe) {
      this.recipe.ingredientLines.splice(index, 1);
    }
  }

  addInstruction() {
    if (this.recipe) {
      if (!this.recipe.instructions) {
        this.recipe.instructions = [];
      }
      this.recipe.instructions.push('');
    }
  }

  removeInstruction(index: number) {
    if (this.recipe && this.recipe.instructions) {
      this.recipe.instructions.splice(index, 1);
    }
  }

  saveChanges() {
    console.log('Changes saved:', this.recipe);
    this.recipeService.updateRecipe(this.recipe).subscribe(() => {
      this.editMode = false;
    });
  }

  cancelChanges() {
    if (this.uri) {
      this.getRecipeDetails(this.uri); 
    }
    this.editMode = false;
  }
}




