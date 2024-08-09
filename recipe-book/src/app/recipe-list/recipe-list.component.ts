import { Component, inject, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { DetailsComponent } from '../details/details.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    MatListModule, 
    CommonModule, 
    MatCardModule, 
    RecipeDetailComponent,
    DetailsComponent,
    MatIconModule,

    
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'] 
})
export class RecipeListComponent implements OnInit {

  recipes: any[] = [];
httpClient = inject(HttpClient); //nowe
data: any[] = []
  constructor(private recipeService: RecipeService) {}

  ngOnInit():void {
    this.fetchData(); //nowe
    this.loadRecipes();
   
  }

  fetchData() {
    this.httpClient.get('https://api.edamam.com/api/recipes/v2?type=public&app_id=d78a8854&app_key=%20e8e08c0ff7ca76b4c80dccce32b4f755%09&cuisineType=American&cuisineType=Asian&cuisineType=British&cuisineType=Central%20Europe&cuisineType=Chinese&cuisineType=Eastern%20Europe&cuisineType=French&cuisineType=Indian&cuisineType=Italian&cuisineType=Japanese&cuisineType=Kosher&cuisineType=Mediterranean&cuisineType=Mexican&cuisineType=Middle%20Eastern&cuisineType=Nordic&cuisineType=South%20American&cuisineType=South%20East%20Asian&mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&dishType=Biscuits%20and%20cookies&dishType=Bread&dishType=Cereals&dishType=Condiments%20and%20sauces&dishType=Desserts&dishType=Drinks&dishType=Main%20course&dishType=Pancake&dishType=Sandwiches&dishType=Side%20dish&dishType=Soup&dishType=Starter&dishType=Sweets&imageSize=REGULAR&imageSize=SMALL')
    .subscribe((data: any) => {
console.log(data);
this.data = data.hits.map((hit: any) => hit.recipe);

    }); ///nowe
  }


  loadRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data; 
    });
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    });
  }
}
