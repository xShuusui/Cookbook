import { Request, Response, json } from "express";
import { getRepository, Repository } from "typeorm";
import { RecipeIngredient } from "../entity/recipeIngredient";
import { Ingredient } from "../entity/ingredient";
import { Recipe } from "../entity/recipe";
import { validate, ValidationError } from "class-validator";
import { Nutritionix } from "../module/nutritionix";

/**
 * This class holds all methods to modfiy the connection
 * between a recipe and an ingredient.
 */
export class RecipeIngredientController {
    /**
     * Add a given ingredient by its id to a recipe by its id and
     * fetch data from an external api.
     *
     * Possible response codes:
     * - [400]: Validation error
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async addIngredientToRecipe(
        req: Request,
        res: Response
    ): Promise<void> {
        const { recipeId, ingredientId } = req.params;
        const { amount, unit } = req.body;

        const recipeRepository: Repository<Recipe> = getRepository(Recipe);
        try {
            const recipe: Recipe = await recipeRepository.findOneOrFail(
                recipeId
            );
            const ingredient: Ingredient = await getRepository(
                Ingredient
            ).findOneOrFail(ingredientId);

            const recipeIngredient2 = await getRepository(RecipeIngredient)
                .createQueryBuilder("rI")
                .where("rI.recipeId=:recipeId", { recipeId: recipe.recipeId })
                .andWhere("rI.ingredientId=:ingredientId", {
                    ingredientId: ingredient.ingredientId,
                })
                .getOne();

            // Check if recipeIngredient with recipeID and ingredientID exist.
            if (recipeIngredient2 != undefined) {
                res.status(404).send({
                    message: "Ingredient is already in the recipe.",
                });
                return;
            }

            // Create a recipeIngredient and get data from external api.
            const recipeIngredient: RecipeIngredient = new RecipeIngredient();
            recipeIngredient.recipe = recipe;
            recipeIngredient.ingredient = ingredient;
            recipeIngredient.amount = amount;
            recipeIngredient.unit = unit;

            try {
                const data = await Nutritionix.getDataForIngredient(
                    recipeIngredient.amount +
                        " " +
                        recipeIngredient.unit +
                        " " +
                        recipeIngredient.ingredient.name
                );
                recipeIngredient.calories = data.calories;
                recipeIngredient.fat = data.fat;
            } catch (error) {
                console.log(error);
            }

            // Validate the recipeIngredient.
            const validationErrors: ValidationError[] = await validate(
                recipeIngredient
            );
            if (validationErrors.length > 0) {
                delete validationErrors[0].target;
                console.error(validationErrors);
                res.status(400).send({
                    message: "Input is not correct.",
                    error: validationErrors,
                });
                return;
            }
            recipe.ingredients.push(recipeIngredient);

            // Save recipeIngredient in database.
            await recipeRepository.save(recipe);
            const updatedRecipe: Recipe = await recipeRepository.findOneOrFail(
                recipeId
            );
            res.send({
                message: "Add ingredient to recipe successfully.",
                data: updatedRecipe,
            });
        } catch (error) {
            res.status(404).send({
                message: "Recipe or ingredient not found.",
            });
            console.error(error);
        }
    }

    /**
     * Update attributes from a recipeIngredient by the recipe id and the ingredient id and
     * fetch data from an external api.
     *
     * Possible response codes:
     * - [400]: Validation error
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async patchIngredientFromRecipe(
        req: Request,
        res: Response
    ): Promise<void> {
        const { recipeId, ingredientId } = req.params;
        const { amount, unit } = req.body;

        const recipeRepository: Repository<Recipe> = getRepository(Recipe);
        const recipeIngredientRepository: Repository<RecipeIngredient> = getRepository(
            RecipeIngredient
        );
        try {
            const recipe: Recipe = await recipeRepository.findOneOrFail(
                recipeId
            );
            const ingredient: Ingredient = await getRepository(
                Ingredient
            ).findOneOrFail(ingredientId);

            const recipeIngredient = await recipeIngredientRepository
                .createQueryBuilder("rI")
                .where("rI.recipeId=:recipeId", { recipeId: recipe.recipeId })
                .andWhere("rI.ingredientId=:ingredientId", {
                    ingredientId: ingredient.ingredientId,
                })
                .getOne();

            // Check if recipeIngredient with recipeID and ingredientID exist.
            if (recipeIngredient === undefined) {
                res.status(404).send({
                    message: "Ingredient in recipe not found.",
                });
                return;
            }
            recipeIngredient.recipe = recipe;
            recipeIngredient.ingredient = ingredient;
            recipeIngredient.amount = amount;
            recipeIngredient.unit = unit;

            try {
                // Patch the external api data.
                const data = await Nutritionix.getDataForIngredient(
                    recipeIngredient.amount +
                        " " +
                        recipeIngredient.unit +
                        " " +
                        recipeIngredient.ingredient.name
                );
                recipeIngredient.calories = data.calories;
                recipeIngredient.fat = data.fat;
            } catch (error) {
                console.log(error);
            }

            // Validate the recipeIngredient.
            const validationErrors: ValidationError[] = await validate(
                recipeIngredient
            );
            if (validationErrors.length > 0) {
                delete validationErrors[0].target;
                console.error(validationErrors);
                res.status(400).send({
                    message: "Input is not correct.",
                    error: validationErrors,
                });
                return;
            }

            // Patch the recipeIngredient in database.
            await recipeIngredientRepository.save(recipeIngredient);
            const updatedRecipe: Recipe = await recipeRepository.findOneOrFail(
                recipe.recipeId
            );
            res.send({
                message: "Update ingredient from recipe successfully.",
                data: updatedRecipe,
            });
        } catch (error) {
            res.status(404).send({
                message: "Recipe or ingredient not found.",
            });
            console.error(error);
        }
    }

    /**
     * Remove a given ingredient by its id from a recipe by its id.
     *
     * Possible response codes:
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async removeIngredientFromRecipe(
        req: Request,
        res: Response
    ): Promise<void> {
        const { recipeId, ingredientId } = req.params;

        const recipeRepository: Repository<Recipe> = getRepository(Recipe);
        const recipeIngredientRepository: Repository<RecipeIngredient> = getRepository(
            RecipeIngredient
        );
        try {
            const recipe = await recipeRepository.findOneOrFail(recipeId);
            const ingredient = await getRepository(Ingredient).findOneOrFail(
                ingredientId
            );

            const recipeIngredient = await recipeIngredientRepository
                .createQueryBuilder("rI")
                .where("rI.recipeId=:recipeId", { recipeId: recipe.recipeId })
                .andWhere("rI.ingredientId=:ingredientId", {
                    ingredientId: ingredient.ingredientId,
                })
                .getOne();

            // Check if recipeIngredient with recipeID and ingredientID exist.
            if (recipeIngredient === undefined) {
                res.status(404).send({
                    message: "Ingredient in recipe not found.",
                });
                return;
            }

            await recipeIngredientRepository.remove(recipeIngredient);
            const updatedRecipe: Recipe = await recipeRepository.findOneOrFail(
                recipe.recipeId
            );
            res.send({
                message: "Remove ingredient from recipe successfully.",
                data: updatedRecipe,
            });
        } catch (error) {
            res.status(404).send({
                message: "Recipe or ingredient not found.",
            });
            console.error(error);
        }
    }
}
