import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";
import { IsString, IsNotEmpty } from "class-validator";

/**
 * This class represents an ingredient.
 */
@Entity()
export class Ingredient {
    /** The ingredientId which uses a universally unique identifier. */
    @PrimaryGeneratedColumn("uuid")
    public ingredientId: string;

    /** The name of the ingredient. */
    @Column()
    @IsString({ message: "The name must be a string." })
    @IsNotEmpty({ message: "The name cannot be empty." })
    public name: string;

    /** A creation timestamp. */
    @CreateDateColumn()
    public createdAt: string;

    /** An update timespamp. */
    @UpdateDateColumn()
    public updatedAt: string;

    /** List of all assigned recipes for this ingredient. */
    @OneToMany(
        (type) => RecipeIngredient,
        (recipeIngredient) => recipeIngredient.ingredient
    )
    public recipes: RecipeIngredient[];
}
