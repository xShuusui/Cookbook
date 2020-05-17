import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";
import { IsInt, Min, Max, IsString, IsNotEmpty } from "class-validator";

/**
 * This class represents a recipe.
 */
@Entity()
export class Recipe {
    /** The recipeId which uses a universally unique identifier. */
    @PrimaryGeneratedColumn("uuid")
    public recipeId: string;

    /** The name of the recipe. */
    @Column()
    @IsString({ message: "The name must be a string." })
    @IsNotEmpty({ message: "The name cannot be empty." })
    public name: string;

    /** The recipe instruction list. */
    @Column("text")
    @IsString({ message: "The instructions must be a string." })
    public instructions: string;

    /** The recipe rating. */
    @Column({ default: 0, nullable: true })
    @IsInt({ message: "The rating must be a number." })
    @Min(0, { message: "The rating must be minimum 0." })
    @Max(5, { message: "The rating must be maximum 5." })
    public rating: number;

    /** A food joke from an external api. */
    @Column({ default: "" })
    public joke: string;

    /** A creation timestamp. */
    @CreateDateColumn()
    public createdAt: string;

    /** An update timestamp. */
    @UpdateDateColumn()
    public updatedAt: string;

    /** List of all assigned ingredients for this recipe. */
    @OneToMany(
        (type) => RecipeIngredient,
        (recipeIngredient) => recipeIngredient.recipe,
        { eager: true, cascade: true }
    )
    public ingredients: RecipeIngredient[];
}
