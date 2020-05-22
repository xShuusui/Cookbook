import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Recipe } from "../entity/recipe";
import { validate, ValidationError } from "class-validator";
import { Spoonacular } from "../module/spoonacular";

/**
 * This class holds all methods to modify a recipe.
 */
export class RecipeController {
    /**
     * Get all available recipes.
     *
     * @param _ The request object.
     * @param res The response object.
     */
    public static async getRecipes(req: Request, res: Response): Promise<void> {
        const sortBy = req.query.sortBy;

        const recipes: Recipe[] = await getRepository(Recipe).find({
            order: {
                rating: sortBy == "rating" ? "DESC" : undefined,
                createdAt: sortBy == "createdAt" ? "DESC" : undefined,
                name: sortBy == "name" ? "ASC" : undefined,
            },
        });
        res.send({ message: "Get recipes successfully.", data: recipes });
    }

    /**
     * Create a new recipe and fetch data from an external api.
     *
     * Possible response codes:
     * - [400]: Validation error
     *
     * @param req The reqeust object.
     * @param res The response object.
     */
    public static async createRecipe(
        req: Request,
        res: Response
    ): Promise<void> {
        const { name, instructions, rating } = req.body;

        // Create a recipe.
        let recipe: Recipe = new Recipe();
        recipe.name = name;
        recipe.instructions = instructions;
        recipe.rating = rating;

        try {
            const data = await Spoonacular.getJoke();
            recipe.joke = data.joke;
        } catch (error) {
            console.log(error);
        }

        // Validate the recipe.
        const validationErrors: ValidationError[] = await validate(recipe);
        if (validationErrors.length > 0) {
            delete validationErrors[0].target;
            console.error(validationErrors);
            res.status(400).send({
                message: "Input is not correct.",
                error: validationErrors,
            });
            return;
        }

        // Save the recipe in the database.
        const createdRecipe: Recipe = await getRepository(Recipe).save(recipe);
        res.send({
            message: "Create recipe successfully.",
            data: createdRecipe,
        });
    }

    /**
     * Get a single recipe by its id.
     *
     * Possible response codes:
     * - [404]: Data not found error
     *
     * @param req The request Object.
     * @param res The response Object.
     */
    public static async getRecipe(req: Request, res: Response): Promise<void> {
        const recipeId: string = req.params.recipeId;

        try {
            const recipe: Recipe = await getRepository(Recipe).findOneOrFail(
                recipeId
            );
            res.send({ message: "Get recipe successfully.", data: recipe });
        } catch (error) {
            res.status(404).send({ message: "Recipe not found." });
            console.error(error);
        }
    }

    /**
     * Update attributes of a recipe by its id.
     *
     * Possible response codes:
     * - [400]: Validation error
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async patchRecipe(
        req: Request,
        res: Response
    ): Promise<void> {
        const recipeId: string = req.params.recipeId;
        const { name, instructions, rating } = req.body;

        const recipeRepository: Repository<Recipe> = getRepository(Recipe);
        try {
            // Patch the recipe.
            const recipe: Recipe = await recipeRepository.findOneOrFail(
                recipeId
            );
            recipe.name = name;
            recipe.instructions = instructions;
            recipe.rating = rating;

            // Validate the recipe.
            const validationErrors: ValidationError[] = await validate(recipe);
            if (validationErrors.length > 0) {
                delete validationErrors[0].target;
                console.error(validationErrors);
                res.status(400).send({
                    message: "Input is not correct.",
                    error: validationErrors,
                });
                return;
            }

            // Save the recipe in the database.
            const updatedRecipe: Recipe = await recipeRepository.save(recipe);
            res.send({
                message: "Update recipe successfully.",
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
     * Delete a recipe by its id.
     *
     * Possible response codes:
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async deleteRecipe(
        req: Request,
        res: Response
    ): Promise<void> {
        const recipeId: string = req.params.recipeId;
        const recipeRepository: Repository<Recipe> = getRepository(Recipe);

        try {
            const recipe: Recipe = await recipeRepository.findOneOrFail(
                recipeId
            );
            await recipeRepository.remove(recipe);
            res.send({ message: "Delete recipe successfully." });
        } catch (error) {
            res.status(404).send({ message: "Recipe not found." });
            console.error(error);
        }
    }
}
