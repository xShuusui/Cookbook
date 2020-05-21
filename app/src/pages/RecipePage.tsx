import React, { useState } from "react";
import { useGetHook } from "../hooks/UseGetHook";
import { Recipe } from "./dashboard/components/RecipeList";
import { PageHeader, Button } from "antd";
import { Redirect } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const RecipePage: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const [redirectToDashboardPage, setRedirect] = useState<boolean>(false);

    const { data, fetchData } = useGetHook<Recipe>("/api/recipe/" + recipeId);

    return (
        <>
            {redirectToDashboardPage === true ? (
                <Redirect to="/api/recipe" />
            ) : (
                <PageHeader
                    title={data?.name}
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
