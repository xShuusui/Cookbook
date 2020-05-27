import React, { useContext } from "react";
import { Card, Skeleton } from "antd";
import { Form, InputNumber, Select, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { AddIngredientToRecipe } from "../../../components/AddIngredient";
import { IngredientItem } from "./IngredientItem";
import { RecipeContext } from "../../../contexts/RecipeContext";

const IngredientFormSchema = Yup.object().shape({
    ingredientId: Yup.string().required("Ingredient is required!"),
    amount: Yup.number()
        .min(0, "Amount is too short!")
        .required("Amount is required!"),
    unit: Yup.string().required("Unit is required!"),
});

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
                console.log(ingredientId, amount, unit);
            }}
        >
            {(formik) => (
                <Card title={"Ingredients:"}>
                    {Recipe === null ? (
                        <Skeleton />
                    ) : (
                        Recipe.ingredients.map((recipeIngredient) => (
                            <IngredientItem
                                recipeIngredient={recipeIngredient}
                            />
                        ))
                    )}
                    <Form
                        layout={"vertical"}
                        onSubmitCapture={formik.handleSubmit}
                    >
                        <Form.Item label={"Ingredient:"} name={"ingredientId"}>
                            {/* TODO: Schöner machen */}
                            <AddIngredientToRecipe />
                        </Form.Item>
                        <Form.Item label={"Amount:"} name={"amount"}>
                            <InputNumber
                                name={"amount"}
                                min={0}
                                style={{ width: "150px" }}
                            />
                        </Form.Item>
                        <Form.Item label={"Unit:"} name={"unit"}>
                            <Select name={"unit"} style={{ width: "150px" }}>
                                <Option value="g">gram</Option>
                                <Option value="kg">kilogram</Option>
                                <Option value="ml">milliliter</Option>
                                <Option value="l">liter</Option>
                                <Option value="cup">cup</Option>
                                <Option value="teaspoon">teaspoon</Option>
                                <Option value="tablespoon">tablespoon</Option>
                            </Select>
                        </Form.Item>
                        <SubmitButton>Add ingredient</SubmitButton>
                    </Form>
                </Card>
            )}
        </Formik>
    );
};
