/** A type that represents a recipe from the database. */
export type Recipe = {
    recipeId: string;
    name: string;
    instructions: string;
    rating: number;
    totalCalories: number;
    totalFat: number;
    joke: string;
    ingredients: RecipeIngredient[];
    createdAt: Date;
    updatedAt: Date;
};

/** A type that represents a recipeIngredient from the database. */
export type RecipeIngredient = {
    recipeIngredientId: string;
    amount: number;
    unit: string;
    calories: number;
    fat: number;
    recipe: Recipe;
    ingredient: Ingredient;
};

/** A type that represents an ingredient from the database. */
export type Ingredient = {
    ingredientId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};
