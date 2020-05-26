import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Col, Rate } from "antd";
import React, { useState } from "react";
import { Redirect } from "react-router";

import { deleteFetch } from "../../../components/DeleteFetch";
import { Recipe } from "../../../types/Types";

const gridStyle = {
    width: "50%",
    //"text-align": "center",
};

type DashboardCardProps = {
    recipe: Recipe;
    refetch: () => void;
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
    recipe: {
        recipeId,
        name,
        rating,
        totalCalories,
        totalFat,
        createdAt,
        updatedAt,
    },
    refetch,
}) => {
    const [redirectToRecipePage, setRedirect] = useState<boolean>(false);

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
                            <Rate count={5} value={rating} disabled={true} />
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
