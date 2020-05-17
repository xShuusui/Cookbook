import { Router } from "express";
import { RecipeIngredientController } from "../controller/recipeIngredient.controller";

/** The recipeIngredient router. */
export const recipeIngredientRouter: Router = Router({ mergeParams: true });

/** The recipeIngredient routes. */
recipeIngredientRouter.post(
    "/:ingredientId",
    RecipeIngredientController.addIngredientToRecipe
);
recipeIngredientRouter.patch(
    "/:ingredientId",
    RecipeIngredientController.patchIngredientFromRecipe
);
recipeIngredientRouter.delete(
    "/:ingredientId",
    RecipeIngredientController.removeIngredientFromRecipe
);
