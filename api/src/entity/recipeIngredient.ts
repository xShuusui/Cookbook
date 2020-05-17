import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./recipe";
import { Ingredient } from "./ingredient";
import { IsPositive, IsNotEmpty, IsString, IsIn } from "class-validator";

/**
 * This class represents a connection between a recipe and an ingredient.
 */
@Entity()
export class RecipeIngredient {
    /** The recipeId which uses a universally unique identifier. */
    @PrimaryGeneratedColumn("uuid")
    public recipeIngredientId: string;

    /** The amount of an ingredient in a recipe. */
    @Column()
    @IsPositive({ message: "The amount must be a positive number." })
    @IsNotEmpty({ message: "The amount cannot be empty." })
    public amount: number;

    /** The unit of the amount of an ingredient in a recipe. */
    @Column()
    @IsString({ message: "The unit must be a string." })
    @IsIn(["g", "kg", "ml", "l", "cup", "teaspoon", "tablespoon"], {
        message:
            "The unit must be on of these types: g, kg, ml, l, cup, teaspoon or tablespoon.",
    })
    @IsNotEmpty({ message: "The unit cannot be empty." })
    public unit: "g" | "kg" | "ml" | "l" | "cup" | "teaspoon" | "tablespoon";

    /** The calories from a recipeIngredient from an external api. */
    @Column("double", { default: 0 })
    public calories: number;

    /** The fat from a recipeIngredient from an external api. */
    @Column("double", { default: 0 })
    public fat: number;

    /** The recipeId. */
    @ManyToOne((type) => Recipe, (recipe) => recipe.ingredients, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "recipeID" })
    public recipe: Recipe;

    /** The ingredientId. */
    @ManyToOne((type) => Ingredient, (ingredient) => ingredient.recipes, {
        eager: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "ingredientID" })
    public ingredient: Ingredient;
}
