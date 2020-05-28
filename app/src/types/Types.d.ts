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

export type RecipeIngredient = {
    recipeIngredientId: string;
    amount: number;
    unit: string;
    calories: number;
    fat: number;
    recipe: Recipe;
    ingredient: Ingredient;
};

export type Ingredient = {
    ingredientId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};
