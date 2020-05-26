import { Row, Skeleton, Empty } from "antd";
import React, { useState } from "react";

import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardModal } from "./components/DashboardModal";
import { DashboardCard } from "./components/DashboardCard";
import { useGetHook } from "../../hooks/UseGetHook";
import { Recipe } from "../../types/Types";
import { RecipeModal } from "./components/RecipeModal";
import { IngredientModal } from "./components/IngredientModal";

export const DashboardPage: React.FC = () => {
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const [filterBy, setFilterBy] = useState<string>("");

    const [showRecipeModal, setShowRecipeModal] = useState<boolean>(false);
    const [showIngredientModal, setShowIngredientModal] = useState<boolean>(
        false
    );
    const [recipeId, setRecipeId] = useState<string>("");

    const { data, fetchData } = useGetHook<Recipe[]>(
        "/api/recipe?sortBy=" + sortBy + "&filterBy=" + filterBy
    );

    //     <DashboardModal
    //     showModal={showModal}
    //     setShowModal={setShowModal}
    //     refetch={fetchData}
    // />
    return (
        <>
            <RecipeModal
                showRecipeModal={showRecipeModal}
                setShowRecipeModal={setShowRecipeModal}
                setShowIngredientModal={setShowIngredientModal}
                setRecipeId={setRecipeId}
                refetchData={fetchData}
            />
            <IngredientModal
                showIngredientModal={showIngredientModal}
                setShowIngredientModal={setShowIngredientModal}
                recipeId={recipeId}
                refetchData={fetchData}
            />
            <DashboardHeader
                setSortBy={setSortBy}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                setShowModal={setShowRecipeModal}
            />

            <Row gutter={16}>
                {data === null ? (
                    <Skeleton />
                ) : data.length === 0 ? (
                    <Empty
                        description="No recipes found."
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) : (
                    data.map((recipe) => (
                        <DashboardCard
                            key={recipe.recipeId}
                            recipe={recipe}
                            refetch={fetchData}
                        ></DashboardCard>
                    ))
                )}
            </Row>
        </>
    );
};
