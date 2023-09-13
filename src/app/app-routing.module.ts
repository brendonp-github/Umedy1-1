import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipe/recipes.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent }
  , {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent }
      , { path: 'new', component: RecipeEditComponent}
      , { path: ':index', component: RecipeDetailComponent }
      , { path: ':index/edit', component: RecipeEditComponent }
    ]
  }
  , { path: 'shopping', component: ShoppingListComponent }
  , { path: 'login', component: AuthComponent}
  //, { path: '', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
