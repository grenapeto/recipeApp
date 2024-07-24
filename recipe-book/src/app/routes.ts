import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
        path: 'recipe-detail',
        component: RecipeDetailComponent,
        title: 'Recipe Detail page'
      },
      {
        path: 'recipe-form',
        component: RecipeFormComponent,
        title: 'Recipe Form page'
      },
      {
        path: 'recipe-list',
        component: RecipeListComponent,
        title: 'Recipe List page'
      },

  ];
  
  export default routeConfig;