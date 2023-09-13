import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecipeService } from './recipe/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //recipesVisible: boolean = false;
  //shoppingListVisible: boolean = false;

//  onMenuClicked(menuName: string) {
//    this.recipesVisible = menuName == "Recipes";
//    this.shoppingListVisible = menuName == "Shopping";
//  }
}
