import React from "react";
import { RecipeIngredient } from "../../../types/Types";
import styled from "styled-components";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteFetch } from "../../../components/DeleteFetch";

const RecipeIngredientItem = styled.div`
    margin: 5px;
    display: flex;
    align-items: center;
`;

const NameSpan = styled.span`
    flex: 2;
`;
const AmountUnitSpan = styled.span`
    flex: 1;
`;

type IngredientItemProps = {
    recipeIngredient: RecipeIngredient;
    enableInput: boolean;
    refetch: () => void;
    recipeId: string;
};

export const IngredientItem: React.FC<IngredientItemProps> = ({
    recipeIngredient: { ingredient, amount, unit },
    enableInput,
    refetch,
    recipeId,
}) => {
    const onDeleteClick = () => {
        //TODO: Delete erst bei save changes.
        deleteFetch(
            "/api/recipe/" +
                recipeId +
                "/ingredient/" +
                ingredient.ingredientId,
            refetch
        );
    };

    return (
        <RecipeIngredientItem>
            <NameSpan>{ingredient.name}</NameSpan>
            <AmountUnitSpan>
                {amount} {unit}
            </AmountUnitSpan>
            <Button
                disabled={enableInput ? false : true}
                style={{ flex: "1" }}
                icon={<DeleteOutlined />}
                onClick={onDeleteClick}
            />
        </RecipeIngredientItem>
    );
};
