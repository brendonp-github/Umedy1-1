import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping/shopping-list/shopping-list.service';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
    this.loading = true;
    route.params.subscribe(
      (params: Params) => {
        this.index = params["index"];
        this.recipeService.getRecipe(this.index).subscribe(
          (item: recipe) => {
            this.selectedRecipe = item;
          }
        );
        this.loading = false;
      }
    );
  }

  index!: number;
  loading = false;

  selectedRecipe = new recipe('', '', '', []);

  ngOnInit() {
    var index = this.route.snapshot.params["index"];
    this.recipeService.getRecipe(Number.parseInt(index)).subscribe(
      (item: recipe) => {
        this.selectedRecipe = item;
      }
    );
  }

  addToShopping() {
    for (let ingredient of this.selectedRecipe.ingredients) {
      this.shoppingListService.addIngredient(ingredient).subscribe(
        (newItem: ingredient) => { }
      );
    }
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index).subscribe(
      () => {
        this.recipeService.raiseListChanged();
      }
    );
    this.router.navigate(['/recipes']);
  }
}
