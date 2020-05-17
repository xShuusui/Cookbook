import { Router } from "express";
import { IngredientController } from "../controller/ingredient.controller";

/** The ingredient router. */
export const ingredientRouter: Router = Router({ mergeParams: true });

/** The ingredient routes. */
ingredientRouter.get("/", IngredientController.getIngredients);
ingredientRouter.post("/", IngredientController.createIngredient);
ingredientRouter.get("/:ingredientId", IngredientController.getIngredient);
ingredientRouter.patch("/:ingredientId", IngredientController.patchIngredient);
ingredientRouter.delete(
    "/:ingredientId",
    IngredientController.deleteIngredient
);
