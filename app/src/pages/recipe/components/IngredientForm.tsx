import React, { useContext } from "react";
import { Card, Skeleton, message } from "antd";
import { Form, InputNumber, Select, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

import { IngredientSelect } from "../../../components/IngredientSelect";
import { IngredientItem } from "./IngredientItem";
import { RecipeContext } from "../../../contexts/RecipeContext";

/** The validation schema for the ingredient form. */
const IngredientFormSchema = Yup.object().shape({
    ingredientId: Yup.string().required("Ingredient is required!"),
    amount: Yup.number()
        .min(1, "Amount is too short!")
        .required("Amount is required!"),
    unit: Yup.string().required("Unit is required!"),
});

/** A form to add an ingredient to a recipe. */
export const IngredientForm: React.FC = () => {
    const { Recipe, refetchData } = useContext(RecipeContext);

    const { Option } = Select;
    return (
        <Formik
            initialValues={{
                ingredientId: "",
                amount: 0,
                unit: "",
            }}
            enableReinitialize={true}
            validationSchema={IngredientFormSchema}
            onSubmit={({ ingredientId, amount, unit }, formik) => {
                fetch(
                    "/api/recipe/" +
                        Recipe?.recipeId +
                        "/ingredient/" +
                        ingredientId,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount, unit }),
                    }
                )
                    .then((res) => {
                        if (res.status === 200) return res.json();
                        else if (res.status === 400 || res.status === 404)
                            res.json().then((json) =>
                                message.error(json.message)
                            );
                        else message.error(res.status + " " + res.statusText);
                    })
                    .then((json) => {
                        message.success(json.message);
                        refetchData();
                    })
                    .finally(formik.resetForm);
            }}
        >
            {(formik) => (
                <Card title={"Ingredients:"}>
                    {Recipe === null ? (
                        <Skeleton />
                    ) : (
                        <Card.Grid hoverable={false} style={{ width: "100%" }}>
                            {Recipe.ingredients.map((recipeIngredient) => (
                                <IngredientItem
                                    key={recipeIngredient.recipeIngredientId}
                                    recipeIngredient={recipeIngredient}
                                />
                            ))}
                        </Card.Grid>
                    )}
                    <Card.Grid hoverable={false} style={{ width: "100%" }}>
                        <Form
                            layout={"vertical"}
                            onSubmitCapture={formik.handleSubmit}
                        >
                            <Form.Item
                                label={"Ingredient:"}
                                name={"ingredientId"}
                            >
                                <IngredientSelect />
                            </Form.Item>
                            <Form.Item label={"Amount:"} name={"amount"}>
                                <InputNumber
                                    name={"amount"}
                                    min={0}
                                    style={{ width: "150px" }}
                                />
                            </Form.Item>
                            <Form.Item label={"Unit:"} name={"unit"}>
                                <Select
                                    name={"unit"}
                                    style={{ width: "150px" }}
                                >
                                    <Option value="g">gram</Option>
                                    <Option value="kg">kilogram</Option>
                                    <Option value="ml">milliliter</Option>
                                    <Option value="l">liter</Option>
                                    <Option value="cup">cup</Option>
                                    <Option value="teaspoon">teaspoon</Option>
                                    <Option value="tablespoon">
                                        tablespoon
                                    </Option>
                                </Select>
                            </Form.Item>
                            <SubmitButton>Add ingredient</SubmitButton>
                        </Form>
                    </Card.Grid>
                </Card>
            )}
        </Formik>
    );
};
