import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor(private recipesService: RecipeService) { }

  recipes: recipe[] = [];
  recipeListChangedSub!: Subscription;

  ngOnInit() {
    this.recipesService.getRecipes().subscribe(
      (recipes: recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipeListChangedSub = this.recipesService.listChanged.subscribe(
      (newList: recipe[]) => {
        this.recipes = newList;
      }
    );
  }

  ngOnDestroy() {
    this.recipeListChangedSub.unsubscribe();
  }
}
