import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MOCK_RECIPES } from '../mock-recipes';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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
  recipes = MOCK_RECIPES;

  readonly dialog = inject(MatDialog);

  showMore() {
    const dialogRef = this.dialog.open(ShowMorePopup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'show-more-popup',
  templateUrl: 'show-more-popup.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMorePopup {
  recipeDescription = MOCK_RECIPES;
}

