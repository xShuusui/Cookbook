import { Router } from "express";
import { RecipeController } from "../controller/recipe.controller";
import { recipeIngredientRouter } from "./recipeIngredient.router";

/** The recipe router. */
export const recipeRouter: Router = Router({ mergeParams: true });

/** The recipeIngredient routes.*/
recipeRouter.use("/:recipeId/ingredient", recipeIngredientRouter);

/** The recipe routes. */
recipeRouter.get("/", RecipeController.getRecipes);
recipeRouter.post("/", RecipeController.createRecipe);
recipeRouter.get("/:recipeId", RecipeController.getRecipe);
recipeRouter.patch("/:recipeId", RecipeController.patchRecipe);
recipeRouter.delete("/:recipeId", RecipeController.deleteRecipe);
