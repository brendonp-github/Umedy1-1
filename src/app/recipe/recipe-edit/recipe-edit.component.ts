import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ingredient } from '../../shared/ingredient.model';
import { CustomValidators } from '../../shopping/shopping-list/shopping-edit/custom-validators';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  selectedID: number | null = null;
  isEditMode() { return this.selectedID != null; };
  form!: FormGroup;
  displayedImagePath: string = "";
  ingredientControlsValid = true;

  get ingredientControls() { // a getter!
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  refreshIngredientValidity() {
    if (this.form == null || this.form.get('ingredients') == null || this.ingredientControls == null) {
      this.ingredientControlsValid = true;
      return;
    }
    for (let control of this.ingredientControls) {
      if (!control.valid) {
        this.ingredientControlsValid = false;
        return;
      }
    }
    this.ingredientControlsValid = true;
  }

  private setSelectedID(index: string) {
    this.selectedID = Number.parseInt(this.route.snapshot.params["index"]);
    if (isNaN(this.selectedID)) {
      this.selectedID = null;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.setSelectedID(params["index"]);
        console.log(this.isEditMode());
      }
    );
    this.setSelectedID(this.route.snapshot.params["index"]);
    this.initForm();
  }

  private initForm() {
    var recipeIngredientsArray: FormGroup[] = [];
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      imagePath: new FormControl("", [Validators.required]),
      ingredients: new FormArray(recipeIngredientsArray)
    });
    if (this.selectedID != null) {
      this.recipeService.getRecipe(this.selectedID).subscribe(
        (item: recipe) => {
          this.setEditControls(item);
          this.refreshDisplayedImage();
        }
      );
    }
    else {
      this.refreshDisplayedImage();
    }
  }

  private setEditControls(item: recipe) {
    var recipeIngredientsArray: FormGroup[] = [];
    if (item.ingredients && item.ingredients.length > 0) {
      for (let ingredientItem of item.ingredients) {
        recipeIngredientsArray.push(
          new FormGroup({
            name: new FormControl(ingredientItem.name, [Validators.required]),
            amount: new FormControl(ingredientItem.amount, [Validators.required, CustomValidators.isValidAmount.bind(this)])
          })
        );
      }
    }
    this.form = new FormGroup({
      name: new FormControl(item.name, [Validators.required]),
      description: new FormControl(item.description, [Validators.required]),
      imagePath: new FormControl(item.imagePath, [Validators.required]),
      ingredients: new FormArray(recipeIngredientsArray)
    });
  }

  onSubmit() {
    var ingredients: ingredient[] = [];
    this.ingredientControls.forEach(ingredientForm => {
      ingredients.push(new ingredient(ingredientForm.value.name, ingredientForm.value.amount));
    });

    var item = new recipe(this.form.value.name, this.form.value.description, this.form.value.imagePath, ingredients);
    if (this.isEditMode()) {
      this.recipeService.updateRecipe(this.selectedID!, item).subscribe(
        (recipeID: number) => {
          this.recipeService.raiseListChanged();
          this.router.navigate(['recipes/' + recipeID]);
        }
      );
    }
    else {
      this.recipeService.addRecipe(item).subscribe(
        (recipeID: number) => {
          this.recipeService.raiseListChanged();
          this.router.navigate(['recipes/' + recipeID]);
        }
      );
    }
  }

  resetForm() {
    this.form.reset();
  }

  onCancel() {
    if (this.isEditMode()) {
      this.router.navigate(['recipes/' + this.selectedID]);
    }
    else {
      this.router.navigate(['recipes/']);
    }
  }

  refreshDisplayedImage() {
    if (this.form.get('imagePath')?.valid) {
      this.displayedImagePath = this.form.value.imagePath;
    }
    else {
      this.displayedImagePath = "";
    }
  }

  onAddIngredient() {
    var frmGrp = new FormGroup({
      name: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required, CustomValidators.isValidAmount.bind(this)])
    });
    this.ingredientControls.push(frmGrp);
    this.refreshIngredientValidity();
  }

  onDeleteIngredient(controlIndex: number) {
    var controls = <FormArray>this.form.get('ingredients');
    controls.removeAt(controlIndex);
    //this.ingredientControls.slice(controlIndex, 1);
  }
}
