import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { Ingredient } from "../entity/ingredient";
import { validate, ValidationError } from "class-validator";

/**
 * This class holds all methods to modify an ingredient.
 */
export class IngredientController {
    /**
     * Get all available ingredients.
     *
     * @param _ The request object.
     * @param res The response object.
     */
    public static async getIngredients(
        _: Request,
        res: Response
    ): Promise<void> {
        const ingredients: Ingredient[] = await getRepository(
            Ingredient
        ).find();
        res.send({
            message: "Get ingredients successfully.",
            data: ingredients,
        });
    }

    /**
     * Create a new ingredient.
     *
     * Possible response codes:
     * - [400]: Validation error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async createIngredient(
        req: Request,
        res: Response
    ): Promise<void> {
        const name: string = req.body.name;

        // Check if ingredient already exist.
        let ingredient = await getRepository(Ingredient).findOne({
            where: [{ name: name }],
        });

        if (ingredient) {
            res.status(400).send({ message: "Ingredient already exist." });
            return;
        }

        // Create an ingredient.
        ingredient = new Ingredient();
        ingredient.name = name;

        // Validate the ingredient.
        const validationErrors: ValidationError[] = await validate(ingredient);
        if (validationErrors.length > 0) {
            delete validationErrors[0].target;
            console.error(validationErrors);
            res.status(400).send({
                message: "Input is not correct.",
                error: validationErrors,
            });
            return;
        }

        // Save the ingredient in the database.
        const createdIngredient: Ingredient = await getRepository(
            Ingredient
        ).save(ingredient);
        res.send({
            message: "Create ingredient successfully.",
            data: createdIngredient,
        });
    }

    /**
     * Get a single ingredient by its id.
     *
     * Possible response codes:
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async getIngredient(
        req: Request,
        res: Response
    ): Promise<void> {
        const ingredientId: string = req.params.ingredientId;

        try {
            const ingredient: Ingredient = await getRepository(
                Ingredient
            ).findOneOrFail(ingredientId);
            res.send({
                message: "Get ingredient successfully.",
                data: ingredient,
            });
        } catch (error) {
            res.status(404).send({ status: "Ingredient not found." });
            console.error(error);
        }
    }

    /**
     * Update attributes of a ingredient by its id.
     *
     * Possible response codes:
     * - [400]: Validation error
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async patchIngredient(
        req: Request,
        res: Response
    ): Promise<void> {
        const ingredientId: string = req.params.ingredientId;
        const { name } = req.body;

        const ingredientRepository: Repository<Ingredient> = getRepository(
            Ingredient
        );
        try {
            // Patch the ingredient.
            const ingredient: Ingredient = await ingredientRepository.findOneOrFail(
                ingredientId
            );
            ingredient.name = name;

            // Validate the ingredient.
            const validationErrors: ValidationError[] = await validate(
                ingredient
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

            // Save the ingredient in the database.
            const updatedIngredient: Ingredient = await ingredientRepository.save(
                ingredient
            );
            res.send({
                message: "Update ingredient successfully.",
                data: updatedIngredient,
            });
        } catch (error) {
            res.status(404).send({ message: "Ingredient not found." });
            console.error(error);
        }
    }

    /**
     * Delete a ingredient by its id.
     *
     * Possible response codes:
     * - [404]: Data not found error
     *
     * @param req The request object.
     * @param res The response object.
     */
    public static async deleteIngredient(
        req: Request,
        res: Response
    ): Promise<void> {
        const ingredientId: string = req.params.ingredientId;
        const ingredientRepository: Repository<Ingredient> = getRepository(
            Ingredient
        );

        try {
            const ingredient: Ingredient = await ingredientRepository.findOneOrFail(
                ingredientId
            );
            await ingredientRepository.remove(ingredient);
            res.send({ message: "Delete ingredient successfully." });
        } catch (error) {
            res.status(404).send({ status: "Ingredient not found." });
            console.error(error);
        }
    }
}
