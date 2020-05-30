import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { Skeleton, Row, Col, Card } from "antd";

import { RecipeHeader } from "./components/RecipeHeader";
import { RecipeForm } from "./components/RecipeForm";
import { IngredientForm } from "./components/IngredientForm";
import { RecipeContext } from "../../contexts/RecipeContext";

/** The main react component for the recipe page. */
export const RecipePage: React.FC = () => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const { Recipe } = useContext(RecipeContext);

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
                        <Row gutter={[16, 16]}>
                            <Col span={14}>
                                <RecipeForm />
                            </Col>
                            <Col span={10}>
                                <IngredientForm />
                            </Col>
                            <Col span={24}>
                                <Card>
                                    <Card.Grid
                                        hoverable={false}
                                        style={{ width: "50%" }}
                                    >
                                        Calories: {Recipe.totalCalories}
                                    </Card.Grid>
                                    <Card.Grid
                                        hoverable={false}
                                        style={{ width: "50%" }}
                                    >
                                        Fat: {Recipe.totalFat}
                                    </Card.Grid>
                                    <Card.Grid
                                        hoverable={false}
                                        style={{ width: "100%" }}
                                    >
                                        Joke: {Recipe.joke}
                                    </Card.Grid>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </>
    );
};
