import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { ingredient } from "../../shared/ingredient.model";

@Injectable({ providedIn: 'root' })

export class ShoppingListService {
  constructor(private http: HttpClient) { }

  private baseURL = environment.apiBaseURL + "/Ingredient";

  listChanged = new Subject<ingredient[]>();
  itemSelected = new Subject<number>();

  public raiseListChanged() {
    this.getIngredients().subscribe(
      (result: ingredient[]) => {
        this.listChanged.next(result);
      }
    );
  }

  getIngredients() {
    return this.http.get<ingredient[]>(this.baseURL);
  }

  getIngredient(ingredientID: number) {
    return this.http.get<ingredient>(this.baseURL + '/' + ingredientID);
  }

  setIngredient(ingredientID: number, data: ingredient) {
    return this.http.put<ingredient>(this.baseURL + '/' + ingredientID, data);
  }

  deleteIngredient(ingredientID: number) {
    return this.http.delete<ingredient>(this.baseURL + '/' + ingredientID);
  }

  addIngredient(data: ingredient) {
    return this.http.post<ingredient>(this.baseURL, data);
  }

  //getIngredients() {
  //  return this.ingredients.slice();
  //}

  //getIngredient(index: number): ingredient {
  //  return this.ingredients[index];
  //}

  //setIngredient(index: number, existingIngredient: ingredient) {
  //  this.ingredients[index] = existingIngredient;
  //  this.listChanged.next(this.getIngredients());
  //}

  //deleteIngredient(index: number) {
  //  this.ingredients.splice(index, 1);
  //  this.listChanged.next(this.getIngredients());
  //}

  //private addIngredient_Private(ingredient: ingredient) {
  //  var existingIngredient = this.findIngredient(ingredient.name);
  //  if (existingIngredient != null) {
  //    existingIngredient.amount += ingredient.amount;
  //  }
  //  else {
  //    this.ingredients.push(ingredient);
  //  }
  //  this.listChanged.next(this.getIngredients());
  //}

  //addIngredient(newIngredient: ingredient) {
  //  this.addIngredient_Private(newIngredient);
  //  this.listChanged.next(this.getIngredients());
  //}

  //addIngredients(newIngredients: ingredient[]) {
  //  for (let newIngredient of newIngredients) {
  //    this.addIngredient_Private(newIngredient);
  //  }
  //  this.listChanged.next(this.getIngredients());
  //}

  //private findIngredient(name: string): ingredient | null {
  //  for (let ingredient of this.ingredients) {
  //    if (ingredient.name == name) {
  //      return ingredient;
  //    }
  //  }
  //  return null;
  //}


}
