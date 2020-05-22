import React, { useState } from "react";
import { useGetHook } from "../hooks/UseGetHook";
import { Recipe } from "./dashboard/components/RecipeList";
import { PageHeader, Button, Modal } from "antd";
import { Redirect } from "react-router";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";

export const RecipePage: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const [showDashboardModal, setDashboardModal] = useState<boolean>(false);
    const [redirectToDashboardPage, setRedirect] = useState<boolean>(false);

    const { data, fetchData } = useGetHook<Recipe>("/api/recipe/" + recipeId);

    return (
        <>
            <Modal
                visible={showDashboardModal}
                onCancel={() => {
                    setDashboardModal(false);
                }}
            />
            {redirectToDashboardPage === true ? (
                <Redirect to="/" />
            ) : (
                <PageHeader
                    title={data?.name}
                    extra={
                        <Button
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => setDashboardModal(true)}
                        >
                            Add Ingredient
                        </Button>
                    }
                    onBack={() => setRedirect(true)}
                    backIcon={
                        <Button
                            size="large"
                            icon={<ArrowLeftOutlined />}
                            shape="circle"
                        ></Button>
                    }
                ></PageHeader>
            )}
        </>
    );
};
