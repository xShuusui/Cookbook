import React, { useState } from "react";
import { RecipeItem, Recipe } from "./components/RecipeList";
import { Row, Skeleton } from "antd";
import { useGetHook } from "../../hooks/UseGetHook";
import { DashboardHeader } from "./components/DashboardHeader";

export const DashboardPage: React.FC = () => {
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);

    const { data, fetchData } = useGetHook<Recipe[]>(
        "/api/recipe?sortBy=" + sortBy
    );

    return (
        <>
            <DashboardHeader setSortBy={setSortBy} />
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
