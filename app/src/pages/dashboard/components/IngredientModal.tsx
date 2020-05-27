import React from "react";
import { Modal, message } from "antd";
import { Formik } from "formik";
import { Form, SubmitButton, InputNumber, Select } from "formik-antd";
import * as Yup from "yup";
import { AddIngredientToRecipe } from "../../../components/AddIngredient";

const IngredientModalSchema = Yup.object().shape({
    ingredientId: Yup.string().required("Ingredient is required."),
    amount: Yup.number()
        .min(1, "Amount is too short!")
        .required("Amound is required!"),
    unit: Yup.string().required("Unit is required!"),
});

type IngredientModalProps = {
    showIngredientModal: boolean;
    setShowIngredientModal: (showIngredientModal: boolean) => void;
    recipeId: string;
    refetchData: () => void;
};

export const IngredientModal: React.FC<IngredientModalProps> = ({
    showIngredientModal,
    setShowIngredientModal,
    recipeId,
    refetchData,
}) => {
    const { Option } = Select;

    return (
        <Formik
            initialValues={{ ingredientId: "", amount: 0, unit: "" }}
            validationSchema={IngredientModalSchema}
            onSubmit={({ ingredientId, amount, unit }, formik) => {
                fetch(
                    "/api/recipe/" + recipeId + "/ingredient/" + ingredientId,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ amount: amount, unit: unit }),
                    }
                )
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            message.error(res.status + " " + res.statusText);
                            message.error(
                                "Ingredient is already in the recipe!"
                            );
                        }
                    })
                    .then((json) => {
                        message.success(json.message);
                        refetchData();
                    })
                    .finally(formik.resetForm);
            }}
        >
            {(formik) => (
                <Modal
                    title={"Add ingredient"}
                    visible={showIngredientModal}
                    onCancel={() => {
                        setShowIngredientModal(false);
                        formik.resetForm();
                    }}
                    footer={[]}
                >
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
                </Modal>
            )}
        </Formik>
    );
};
