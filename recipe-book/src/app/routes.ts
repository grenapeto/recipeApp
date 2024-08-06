import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { DetailsComponent } from './details/details.component';



const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'recipe-detail',
    component: RecipeDetailComponent,
    title: 'Recipe Detail page',
  },
  {
    path: 'add-recipe',
    component: RecipeFormComponent,
    title: 'Recipe Form page',
  },
  {
    path: 'recipe-list',
    component: RecipeListComponent,
    title: 'Recipe List page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details page',
  },
];

export default routeConfig;
