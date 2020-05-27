import React, { useContext } from "react";
import { RecipeIngredient } from "../../../types/Types";
import styled from "styled-components";
import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { RecipeContext } from "../../../contexts/RecipeContext";

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
};

export const IngredientItem: React.FC<IngredientItemProps> = ({
    recipeIngredient: { ingredient, amount, unit },
}) => {
    const { Recipe, refetchData } = useContext(RecipeContext);

    return (
        <RecipeIngredientItem>
            <NameSpan>{ingredient.name}</NameSpan>
            <AmountUnitSpan>
                {amount} {unit}
            </AmountUnitSpan>
            <Button
                style={{ flex: "1" }}
                icon={<DeleteOutlined />}
                onClick={() =>
                    fetch(
                        "/api/recipe/" +
                            Recipe?.recipeId +
                            "/ingredient/" +
                            ingredient.ingredientId,
                        {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                        }
                    )
                        .then((res) => {
                            if (res.status === 200) {
                                return res.json();
                            } else {
                                message.error(
                                    res.status + " " + res.statusText
                                );
                                res.json().then((json) =>
                                    message.error(json.message)
                                );
                            }
                        })
                        .then((json) => {
                            message.success(json.message);
                            refetchData();
                        })
                }
            />
        </RecipeIngredientItem>
    );
};
