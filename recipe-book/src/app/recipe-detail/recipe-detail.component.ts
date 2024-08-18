import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    DetailsComponent,
    RouterModule,
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeId!: string;

  ngOnInit(): void {
    // console.log(this.recipeId);
  }
}
