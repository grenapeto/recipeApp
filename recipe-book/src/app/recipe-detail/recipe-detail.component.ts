// import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
// import { MOCK_RECIPES } from '../mock-recipes';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { DetailsComponent } from '../details/details.component';
// import { RouterModule } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { RecipeService } from '../recipe.service';
// import { of } from 'rxjs';

// @Component({
//   selector: 'app-recipe-detail',
//   standalone: true,
//   imports: [MatButtonModule, MatDialogModule, CommonModule, DetailsComponent, 
//     RouterModule],
//   templateUrl: './recipe-detail.component.html',
//   styleUrl: './recipe-detail.component.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class RecipeDetailComponent {
//   @Input() recipeId!: number;



//   recipes: any[] = [];
//   httpClient = inject(HttpClient); 
//   data: any[] = []
//     constructor(private recipeService: RecipeService) {}
  
//     ngOnInit():void {
//       this.fetchData(); 
//     }
  
//     fetchData() {
//       this.httpClient.get('https://api.edamam.com/api/recipes/v2?type=public&app_id=d78a8854&app_key=%20e8e08c0ff7ca76b4c80dccce32b4f755%09&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&imageSize=REGULAR&imageSize=SMALL')
//       .subscribe((data: any) => {
//   console.log(data);
//   this.data = data.hits.map((hit: any) => hit.recipe);
  
//       });
//     }
  
  

// }


import { Component, ChangeDetectionStrategy, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule, DetailsComponent, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent {
  @Input() recipeId!: string;

  // recipes: any[] = [];
  // httpClient = inject(HttpClient); 
 

  // constructor(private recipeService: RecipeService) {}

  

 
}