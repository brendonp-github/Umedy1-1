import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { recipe } from './recipe.model';

@Injectable({providedIn: 'root'})

export class RecipeService {
  constructor(private http: HttpClient) { }

  private baseURL = environment.apiBaseURL + "/Recipe";

  listChanged = new Subject<recipe[]>();

  raiseListChanged() {
    this.getRecipes().subscribe(
      (recipes: recipe[]) => {
        this.listChanged.next(recipes);
      }
    );
  }

  public getRecipes() {
    return this.http.get<recipe[]>(this.baseURL);
  }

  public getRecipe(recipeID: number) {
    return this.http.get<recipe>(this.baseURL + '/' + recipeID);
  }

  public deleteRecipe(recipeID: number) {
    return this.http.delete(this.baseURL + '/' + recipeID);
  }

  public updateRecipe(recipeID: number, item: recipe) {
    return this.http.put<number>(this.baseURL + '/' + recipeID, item);
  }

  public addRecipe(item: recipe) {
    return this.http.post<number>(this.baseURL, item);
  }

  //private recipes: recipe[] = [
  //  new recipe("Kyoto during the day", "Around Gion", "https://media.timeout.com/images/105240237/image.jpg",
  //    [
  //      new ingredient("Sun", 1)
  //      , new ingredient("Houses", 1000)
  //      , new ingredient("Tourists", 100)
  //    ]
  //  )
  //  , new recipe("Kyoto in the evening", "Gion in the evening", "https://content.api.news/v3/images/bin/21c5db52cfe31ffb654ce8ef4dcdbbe0",
  //    [
  //      new ingredient("Houses", 1000)
  //      , new ingredient("Tourists", 10)
  //    ]
  //  )
  //  , new recipe("Mount Fuji", "At sunset", "https://imageio.forbes.com/specials-images/imageserve/632d891161b9efabbc7d2c23/Japan-reopening-tourism/0x0.jpg?format=jpg&crop=2200,1232,x398,y0,safe&width=960",
  //    [
  //      new ingredient("Mountain", 1)
  //      , new ingredient("Sun", 1)
  //    ]
  //  )
  //  , new recipe("Torii Gate", "In the water", "https://www.usnews.com/object/image/00000161-00f5-deb3-a1eb-88f5bda10000/bc18.countries_japan_crop.jpg?update-time=1516140295042&size=superhero-medium",
  //    [
  //      new ingredient("Wood", 4)
  //      , new ingredient("Red paint", 1)
  //    ]
  //  )
  //  , new recipe("Tokyo", "Mount Fuji is aboout 50 km away", "https://www.planetware.com/wpimages/2020/08/japan-best-cities-tokyo.jpg",
  //    [
  //      new ingredient("Houses", 10000)
  //      , new ingredient("Tourists", 1000)
  //    ]
  //  )
  //  , new recipe("Kinkaji", "The golden pavillion", "https://i.natgeofe.com/n/f748e222-6a05-4e4f-b87f-d611ecdae0de/01_Japan.jpg?w=2880&h=1914",
  //    [
  //      new ingredient("House", 1)
  //    ]
  //  )
  //  , new recipe("Kumado Kodo", "A Torii gate", "https://www.twowanderingsoles.com/wp-content/uploads/2021/07/img_60ee7b5bbe14b.jpg",
  //    [
  //      new ingredient("Path", 1)
  //      , new ingredient("Trees", 1000)
  //    ]
  //  )
  //];

//  private listChange() {
//    this.listChanged.next(this.recipes.slice());
//  }

//  public getRecipes() {
//    return this.recipes.slice();
//  }

//  public getRecipe(recipeID: number) {
//    return this.recipes[recipeID];
//  }

//  public deleteRecipe(recipeID: number) {
//    this.recipes.splice(recipeID, 1);
//    this.listChange();
//  }

//  public updateRecipe(recipeID: number, item: recipe) {
//    this.recipes[recipeID] = item;
//    this.listChange();
//  }

//  public addRecipe(recipeID: recipe): number {
//    this.recipes.push(recipeID);
//    this.listChange();
//    return this.recipes.length - 1;
//  }
}
