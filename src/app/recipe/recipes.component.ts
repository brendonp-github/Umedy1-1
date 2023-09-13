import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
  }

  editRecipe: recipe | null = null;

  ngOnInit() {
  }
}
