import React, { useState } from "react";
import { RecipeItem, Recipe } from "./components/RecipeList";
import { Row, Skeleton, PageHeader, Button, Modal } from "antd";
import { useGetHook } from "../../hooks/UseGetHook";
import { PlusOutlined } from "@ant-design/icons";

export const DashboardPage: React.FC = () => {
    const [showDashboardModal, setDashboardModal] = useState<boolean>(false);

    const { data, fetchData } = useGetHook<Recipe[]>("/api/recipe");

    return (
        <>
            <Modal
                visible={showDashboardModal}
                onCancel={() => {
                    setDashboardModal(false);
                }}
            />
            <PageHeader
                title="Dashboard"
                extra={
                    <Button
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => setDashboardModal(true)}
                    >
                        Add Recipe
                    </Button>
                }
            />
            <Row gutter={16}>
                {data === null ? (
                    <Skeleton />
                ) : (
                    data.map((recipe) => (
                        <RecipeItem
                            key={recipe.recipeId}
                            recipe={recipe}
                            refetch={fetchData}
                        ></RecipeItem>
                    ))
                )}
            </Row>
        </>
    );
};
