import React, { useState, useEffect } from "react";
import { RecipeIngredient } from "./RecipeIngredientList";
import { Card, Col, Rate, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";

export type Recipe = {
    recipeId: string;
    name: string;
    instructions: string;
    rating: number;
    ingredients: RecipeIngredient[];
    createdAt: Date;
    updatedAt: Date;
};

type RecipeItemProps = {
    recipe: Recipe;
    refetch: () => void;
};

const gridStyle = {
    width: "50%",
    "text-align": "center",
};

export const RecipeItem: React.FC<RecipeItemProps> = ({
    recipe: {
        recipeId,
        name,
        instructions,
        rating,
        ingredients,
        createdAt,
        updatedAt,
    },
    refetch,
}) => {
    const [redirectToRecipePage, setRedirect] = useState<boolean>(false);
    let d = new Date(createdAt);
    console.log(new Date(createdAt).toLocaleString());

    let totalCalories = 0;
    let totalFat = 0;
    ingredients.map((recipeIngredient) => {
        totalCalories += recipeIngredient.calories;
        totalFat += recipeIngredient.fat;
    });

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

    const onDeleteClick = () => {
        fetch("api/recipe/" + recipeId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            if (res.status === 200) {
                refetch();
                message.success("Deleted successfully.");
            } else {
                message.error(res.status + " " + res.statusText);
            }
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
                            <DeleteOutlined onClick={onDeleteClick} />,
                        ]}
                        extra={
                            <Rate
                                count={5}
                                defaultValue={0}
                                value={rating}
                                onChange={(e) => onRatingChange(e)}
                            ></Rate>
                        }
                        style={{ margin: "0.5rem 0" }}
                    >
                        <Card.Grid hoverable={false} style={gridStyle}>
                            Calories: {totalCalories}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            Fat: {totalFat}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            Created At: {new Date(createdAt).toLocaleString()}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            Updated At: {new Date(updatedAt).toLocaleString()}
                        </Card.Grid>
                    </Card>
                </Col>
            )}
        </>
    );
};
