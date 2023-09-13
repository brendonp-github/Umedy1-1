import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {
    this.selectedID = null;
  }

  form!: FormGroup;
  nameControl() { return this.form.get("name"); }
  amountControl() { return this.form.get("amount"); }
  selectedID: number | null;
  itemSelectedSub!: Subscription;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required])
      , amount: new FormControl("", [Validators.required, CustomValidators.isValidAmount.bind(this)])
    });
    this.itemSelectedSub = this.shoppingListService.itemSelected.subscribe(
      (index: number) => {
        this.selectedID = index;
        this.shoppingListService.getIngredient(this.selectedID).subscribe(
          (result: ingredient) => {
            this.form.setValue({
              name: result.name,
              amount: result.amount
            });
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.itemSelectedSub.unsubscribe();
  }

  onSubmit() {
    let addEditIngredient = new ingredient(this.form.value.name, Number.parseInt(this.form.value.amount));
    if (this.selectedID == null) {
      this.shoppingListService.addIngredient(addEditIngredient).subscribe(
        (blah: any) => {
          this.shoppingListService.raiseListChanged();
        }
      );
    }
    else {
      this.shoppingListService.setIngredient(this.selectedID, addEditIngredient).subscribe(
        (blah: any) => {
          this.shoppingListService.raiseListChanged();
        }
      );
      this.resetForm();
    }
  }

  private resetForm() {
    this.form.reset();
    this.selectedID = null;
  }

  onDeleteClick() {
    this.shoppingListService.deleteIngredient(this.selectedID!).subscribe(
      (blah: any) => {
        this.shoppingListService.raiseListChanged();
      }
    );
    this.resetForm();
  }

  onClearClick() {
    this.resetForm();
  }
}
