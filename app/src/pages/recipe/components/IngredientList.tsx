import { Divider } from "antd";
import React from "react";

import { Recipe } from "../../../types/Types";
import { IngredientItem } from "./IngredientItem";

type IngredientListProps = {
    recipe: Recipe;
    enableInput: boolean;
    refetch: () => void;
};

export const IngredientList: React.FC<IngredientListProps> = ({
    recipe,
    enableInput,
    refetch,
}) => {
    return (
        <>
            {recipe.ingredients.map((recipeIngredient) => (
                <>
                    <Divider
                        style={{
                            margin: "2px",
                        }}
                    />
                    <IngredientItem
                        key={recipeIngredient.ingredient.ingredientId}
                        recipeIngredient={recipeIngredient}
                        enableInput={enableInput}
                        refetch={refetch}
                        recipeId={recipe.recipeId}
                    />
                </>
            ))}
        </>
    );
};
