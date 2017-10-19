import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome',
        'http://www.dvo.com/link/0630_155947172.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]
        ),
        new Recipe('Big Fat Burger',
        'What else you need to say?',
        'http://bk-ca-prd.s3.amazonaws.com/sites/burgerking.ca/files/THMB-QUAD%20Stacker_0.png',
        [
            new Ingredient('Buns', 2),
            new Ingredient ('Meat', 1)
        ]
        )
      ];

    constructor(private slcService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slcService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }


}