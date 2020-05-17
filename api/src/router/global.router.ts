import { Router, Request, Response } from "express";
import { recipeRouter } from "./recipe.router";
import { ingredientRouter } from "./ingredient.router";

/** The globale router. */
export const globalRouter: Router = Router({ mergeParams: true });

/** The main route. */
globalRouter.get("/", (_: Request, res: Response) => {
    res.send("Welcome to my Cookbook API.");
});

/** The recipe and ingredient routes. */
globalRouter.use("/recipe", recipeRouter);
globalRouter.use("/ingredient", ingredientRouter);
