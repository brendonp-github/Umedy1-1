export class ingredient {
  constructor(public name: string = '', public amount: number = 0) {
    this.ingredientID = 0;
    this.recipeID = 0;
  }
  public ingredientID: number;
  public recipeID: number;
}
