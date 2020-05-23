import React, { useState } from "react";
import { Card, Col, Rate } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";
import { deleteFetch } from "../../../components/DeleteFetch";
import { patchRecipeFetch } from "../../../components/PatchFetch";

export type Recipe = {
    recipeId: string;
    name: string;
    instructions: string;
    rating: number;
    totalCalories: number;
    totalFat: number;
    createdAt: Date;
    updatedAt: Date;
};

const gridStyle = {
    width: "50%",
    "text-align": "center",
};

type RecipeItemProps = {
    recipe: Recipe;
    refetch: () => void;
};

export const RecipeItem: React.FC<RecipeItemProps> = ({
    recipe: {
        recipeId,
        name,
        instructions,
        rating,
        totalCalories,
        totalFat,
        createdAt,
        updatedAt,
    },
    refetch,
}) => {
    const [redirectToRecipePage, setRedirect] = useState<boolean>(false);

    const onRatingChange = (e: number) => {
        patchRecipeFetch(
            "/api/recipe/" + recipeId,
            refetch,
            name,
            instructions,
            e
        );
    };

    const onDeleteClick = () => {
        deleteFetch("/api/recipe/" + recipeId, refetch);
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
