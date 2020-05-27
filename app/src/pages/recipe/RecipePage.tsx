import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import { Skeleton, Card, Row, Col } from "antd";

import { RecipeHeader } from "./components/RecipeHeader";
import { RecipeForm } from "./components/RecipeForm";
import { useGetHook } from "../../hooks/UseGetHook";
import { Recipe } from "../../types/Types";
import { IngredientForm } from "./components/IngredientForm";
import { RecipeContext } from "../../contexts/RecipeContext";

export const RecipePage: React.FC = () => {
    const [redirect, setRedirect] = useState<boolean>(false);
    //const [enableInput, setEnableInput] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const { Recipe, refetchData } = useContext(RecipeContext);

    //const { data, fetchData } = useGetHook<Recipe>("/api/recipe/" + recipeId);
    useEffect(() => {
        setName(Recipe === null ? "" : Recipe.name);
        setInstructions(Recipe === null ? "" : Recipe.instructions);
        setRating(Recipe === null ? 0 : Recipe.rating);
    }, [Recipe]);

    return (
        <>
            {redirect ? (
                <Redirect to="/" />
            ) : (
                <>
                    <RecipeHeader setRedirect={setRedirect} />
                    {Recipe === null ? (
                        <Skeleton />
                    ) : (
                        <Row gutter={[16, 0]}>
                            <Col span={14}>
                                <RecipeForm
                                    name={name}
                                    setName={setName}
                                    instructions={instructions}
                                    setInstructions={setInstructions}
                                    rating={rating}
                                    setRating={setRating}
                                />
                            </Col>
                            <Col span={10}>
                                <IngredientForm />
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </>
    );
};
