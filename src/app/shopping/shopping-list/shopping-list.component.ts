import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private listChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.loading = true;
    this.listChangedSub = shoppingListService.listChanged.subscribe(
      (ingredients: ingredient[]) => {
        this.ingredients = ingredients;
        this.loading = false;
      }
    );
  }

  ingredients: ingredient[] = [];
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.shoppingListService.getIngredients().subscribe(
      (result: ingredient[]) => {
        this.ingredients = result;
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.listChangedSub.unsubscribe();
  }

  onEditClick(selectedIndex: number) {
    this.shoppingListService.itemSelected.next(selectedIndex);
  }
}
