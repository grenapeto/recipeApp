// import { Component, ChangeDetectionStrategy, inject, Input } from '@angular/core';
// import { RecipeService } from '../recipe.service';
// import { MOCK_RECIPES } from '../mock-recipes';
// import {MatButtonModule} from '@angular/material/button';
// import {MatDialog, MatDialogModule} from '@angular/material/dialog';
// import { CommonModule, NgFor } from '@angular/common';
// @Component({
//   selector: 'app-recipe-detail',
//   standalone: true,
//   imports: [MatButtonModule, MatDialogModule, NgFor, CommonModule],
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
//   imports: [MatDialogModule, MatButtonModule, CommonModule, NgFor, CommonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ShowMorePopup {
//     recipe: any;
//   recipeDescription = MOCK_RECIPES;

//   constructor(private recipeService: RecipeService) { }
//   getRecipeDetails() {
//     this.recipeService.getRecipeById
//   }

// }


import { Component, ChangeDetectionStrategy, inject, Input, Inject } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MOCK_RECIPES } from '../mock-recipes';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, NgFor, CommonModule],
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
      data: { id: this.recipeId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(this.recipeId);
    });
  }
}

@Component({
  selector: 'show-more-popup',
  templateUrl: 'show-more-popup.component.html',
  standalone: true,
  styleUrl: './recipe-detail.component.css',
  imports: [MatDialogModule, MatButtonModule, CommonModule, NgFor, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMorePopup {
    recipe: any;
 

  constructor(private recipeService: RecipeService, 
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
) { }

ngOnInit() {
  this.getRecipeDetails(this.data.id);
}
getRecipeDetails(id: number) {
  this.recipeService.getRecipeById(id).subscribe(recipe => {
    this.recipe = recipe;
  });
}
}