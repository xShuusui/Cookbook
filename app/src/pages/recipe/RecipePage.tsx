import { Form, Input, Rate, Card, Skeleton, Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";

import { AddIngredientToRecipe } from "../../components/AddIngredient";
import { RecipeHeader } from "./components/RecipeHeader";
import { useGetHook } from "../../hooks/UseGetHook";
import { Recipe } from "../../types/Types";
import { patchRecipeFetch } from "../../components/PatchFetch";
import { IngredientList } from "./components/IngredientList";
import { SelectUnit } from "../../components/SelectUnit";
import { InputAmount } from "../../components/InputAmount";
import { InputInstructions } from "../../components/InputInstructions";

export const RecipePage: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [enableInput, setEnableInput] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const [ingredientId, setIngredientId] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");

    // Get data and set states.
    const { data, fetchData } = useGetHook<Recipe>("/api/recipe/" + recipeId);
    useEffect(() => {
        setName(data === null ? "" : data.name);
        setInstructions(data === null ? "" : data.instructions);
        setRating(data === null ? 0 : data.rating);
    }, [data]);

    const onButtonClick = () => {
        patchRecipeFetch(
            "/api/recipe/" + recipeId,
            fetchData,
            name,
            instructions,
            rating
        );
        setEnableInput(false);
    };

    return (
        <>
            {redirect ? (
                <Redirect to="/" />
            ) : (
                <>
                    <RecipeHeader setRedirect={setRedirect} />
                    {data === null ? (
                        <Skeleton />
                    ) : (
                        <Card
                            title={name}
                            style={{ width: "60rem", height: "40rem" }}
                            extra={
                                !enableInput ? (
                                    <Button
                                        size="large"
                                        icon={<EditOutlined />}
                                        onClick={() => setEnableInput(true)}
                                    >
                                        Edit Recipe
                                    </Button>
                                ) : (
                                    <Button
                                        size="large"
                                        icon={<PlusOutlined />}
                                        onClick={onButtonClick}
                                    >
                                        Save Changes
                                    </Button>
                                )
                            }
                        >
                            <Form layout="vertical">
                                <Card.Grid
                                    hoverable={false}
                                    style={{ width: "60%", minHeight: "100%" }}
                                >
                                    <Form.Item label="Name:">
                                        <Input
                                            style={
                                                !enableInput
                                                    ? {
                                                          color: "black",
                                                          border: "0",
                                                      }
                                                    : {
                                                          color: "black",
                                                      }
                                            }
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.currentTarget.value)
                                            }
                                            disabled={
                                                enableInput ? false : true
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item label="Cooking instructions:">
                                        <InputInstructions
                                            instructions={instructions}
                                            setInstructions={setInstructions}
                                            enableInput={enableInput}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Rating:">
                                        <Rate
                                            count={5}
                                            value={rating}
                                            onChange={(e) => setRating(e)}
                                            disabled={
                                                enableInput ? false : true
                                            }
                                        />
                                    </Form.Item>
                                </Card.Grid>

                                <Card.Grid
                                    hoverable={false}
                                    style={{ width: "40%", minHeight: "100%" }}
                                >
                                    <Form.Item label="Ingredients:">
                                        <IngredientList
                                            recipe={data}
                                            enableInput={enableInput}
                                            refetch={fetchData}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Select ingredient:">
                                        <AddIngredientToRecipe
                                            ingredientId={ingredientId}
                                            setIngredientId={setIngredientId}
                                            enableInput={enableInput}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Amount:">
                                        <InputAmount
                                            setAmount={setAmount}
                                            enableInput={enableInput}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Unit:">
                                        <SelectUnit
                                            setUnit={setUnit}
                                            enableInput={enableInput}
                                        />
                                    </Form.Item>
                                </Card.Grid>
                            </Form>

                            <Card.Grid
                                hoverable={false}
                                style={{ width: "50%" }}
                            >
                                Calories: {data?.totalCalories}
                            </Card.Grid>
                            <Card.Grid
                                hoverable={false}
                                style={{ width: "50%" }}
                            >
                                Fat: {data?.totalFat}
                            </Card.Grid>
                            <Card.Grid
                                hoverable={false}
                                style={{ width: "100%" }}
                            >
                                Joke: {data?.joke}
                            </Card.Grid>
                        </Card>
                    )}
                </>
            )}
        </>
    );
};
