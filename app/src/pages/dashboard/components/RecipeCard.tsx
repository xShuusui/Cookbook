import React, { useState } from "react";
import { Redirect } from "react-router";
import { Card, Rate } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Recipe } from "../../../types/Types";
import { confirmModal } from "../../../components/ConfirmModal";

/** The type for the recipe card. */
type RecipeCardProps = {
    recipe: Recipe;
    refetchData: () => void;
};

/** A card that shows recipe data. */
export const RecipeCard: React.FC<RecipeCardProps> = ({
    recipe: {
        recipeId,
        name,
        rating,
        totalCalories,
        totalFat,
        createdAt,
        updatedAt,
    },
    refetchData,
}) => {
    const [redirect, setRedirect] = useState<boolean>(false);

    return (
        <>
            {redirect ? (
                <Redirect to={"/recipe/" + recipeId} />
            ) : (
                <Card
                    title={name}
                    extra={<Rate count={5} value={rating} disabled={true} />}
                    actions={[
                        <EditOutlined onClick={() => setRedirect(true)} />,
                        <DeleteOutlined
                            onClick={() =>
                                confirmModal(
                                    "/api/recipe/" + recipeId,
                                    refetchData
                                )
                            }
                        />,
                    ]}
                >
                    <Card.Grid
                        hoverable={false}
                        style={{
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        Calories: {totalCalories}
                    </Card.Grid>
                    <Card.Grid
                        hoverable={false}
                        style={{
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        Fat: {totalFat}
                    </Card.Grid>
                    <Card.Grid
                        hoverable={false}
                        style={{
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ margin: 0 }}>Created at:</p>{" "}
                        {new Date(createdAt).toLocaleString()}
                    </Card.Grid>
                    <Card.Grid
                        hoverable={false}
                        style={{
                            width: "50%",
                            textAlign: "center",
                        }}
                    >
                        <p style={{ margin: 0 }}>Updated at:</p>{" "}
                        {new Date(updatedAt).toLocaleString()}
                    </Card.Grid>
                </Card>
            )}
        </>
    );
};
