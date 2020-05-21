import React, { useState } from "react";
import { RecipeIngredientItem, RecipeIngredient } from "./RecipeIngredientList";
import { Card, Col, Rate, List } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";

export type Recipe = {
    recipeId: string;
    name: string;
    instructions: string;
    rating: number;
    ingredients: RecipeIngredient[];
    createdAt: Date;
    updatedAt?: Date;
};

export type RecipeItemProps = {
    recipe: Recipe;
    refetch: () => void;
};

const gridStyle = {
    width: "100%",
};

// Items.
export const RecipeItem: React.FC<RecipeItemProps> = ({
    recipe: { recipeId, name, instructions, rating, ingredients },
    refetch,
}) => {
    const [redirectToRecipePage, setRedirect] = useState<boolean>(false);

    const onRatingChange = (e: number) => {
        fetch("api/recipe/" + recipeId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                instructions: instructions,
                rating: e,
            }),
        }).then((res) => {
            if (res.status === 200) refetch();
        });
    };

    return (
        <>
            {redirectToRecipePage === true ? (
                <Redirect to={"/recipe/" + recipeId} />
            ) : (
                <Col span={8}>
                    <Card
                        title={name}
                        actions={[
                            <EditOutlined onClick={() => setRedirect(true)} />,
                        ]}
                        extra={
                            <Rate
                                count={5}
                                defaultValue={0}
                                value={rating}
                                onChange={(e) => onRatingChange(e)}
                            ></Rate>
                        }
                    >
                        <Card.Grid hoverable={false} style={gridStyle}>
                            {instructions}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            {ingredients.map((recipeIngredient) => (
                                <RecipeIngredientItem
                                    key={
                                        recipeIngredient.ingredient.ingredientId
                                    }
                                    recipeIngredient={recipeIngredient}
                                ></RecipeIngredientItem>
                            ))}
                        </Card.Grid>
                    </Card>
                </Col>
            )}
        </>
    );
};
