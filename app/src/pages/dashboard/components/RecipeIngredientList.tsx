import React from "react";

import { List } from "antd";
import { Recipe } from "./RecipeList";

export type RecipeIngredient = {
    amount: number;
    unit: string;
    calories: number;
    fat: number;
    recipe: Recipe;
    ingredient: Ingredient;
};

export type Ingredient = {
    ingredientId: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type RecipeIngredientItemProps = {
    recipeIngredient: RecipeIngredient;
};

export const RecipeIngredientItem: React.FC<RecipeIngredientItemProps> = (
    args
) => {
    return (
        <List
            dataSource={[
                args.recipeIngredient.ingredient.name +
                    " " +
                    args.recipeIngredient.amount,
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    );
};
