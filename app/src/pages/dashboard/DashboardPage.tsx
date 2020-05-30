import React, { useState } from "react";
import { Row, Skeleton, Empty, Col } from "antd";

import { DashboardHeader } from "./components/DashboardHeader";
import { IngredientModal } from "./components/IngredientModal";
import { RecipeModal } from "./components/RecipeModal";
import { RecipeCard } from "./components/RecipeCard";
import { useGetHook } from "../../hooks/UseGetHook";
import { Recipe } from "../../types/Types";

/** The main react component for the dashboard page. */
export const DashboardPage: React.FC = () => {
    const [showRecipeModal, setShowRecipeModal] = useState<boolean>(false);
    const [showIngredientModal, setShowIngredientModal] = useState<boolean>(
        false
    );
    const [recipeId, setRecipeId] = useState<string>("");

    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const [filterByIngredient, setFilterByIngredient] = useState<string>("");
    const [filterByRating, setFilerByRating] = useState<number[]>([]);

    // Build the ratingQuery for the backend.
    let ratingQuery: string = "";
    filterByRating.forEach((element) => {
        ratingQuery = ratingQuery + element + ",";
    });

    const { data, fetchData } = useGetHook<Recipe[]>(
        "/api/recipe?sortBy=" +
            sortBy +
            "&filterByIngredient=" +
            filterByIngredient +
            "&filterByRating=" +
            ratingQuery
    );

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
                filterByIngredient={filterByIngredient}
                setFilterByIngredient={setFilterByIngredient}
                filterByRating={filterByRating}
                setFilterByRating={setFilerByRating}
                setShowModal={setShowRecipeModal}
            />

            {data === null ? (
                <Skeleton />
            ) : data.length === 0 ? (
                <Empty description="No recipes found!" />
            ) : (
                <Row gutter={[16, 16]}>
                    {data.map((recipe) => (
                        <Col span={8} key={recipe.recipeId}>
                            <RecipeCard
                                recipe={recipe}
                                refetchData={fetchData}
                            ></RecipeCard>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};
