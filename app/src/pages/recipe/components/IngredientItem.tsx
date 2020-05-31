import React, { useContext, useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { Form, InputNumber, Select, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import { RecipeContext } from "../../../contexts/RecipeContext";
import { confirmModal } from "../../../components/ConfirmModal";
import { RecipeIngredient } from "../../../types/Types";

const RecipeIngredientItem = styled.div`
    margin: 5px;
    display: flex;
    align-items: center;
`;
const NameSpan = styled.span`
    flex: 2;
`;
const AmountUnitSpan = styled.span`
    flex: 2;
`;
const ButtonSpan = styled.span`
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

/** The validation schema for the ingredient item. */
const IngredientItemSchema = Yup.object().shape({
    amount: Yup.number()
        .min(1, "Amount is too short!")
        .required("Amount is required!"),
    unit: Yup.string().required("Unit is required!"),
});

/** The type for the ingredient item. */
type IngredientItemProps = {
    recipeIngredient: RecipeIngredient;
};

/** To show, edit and delete an ingredient in a recipe.  */
export const IngredientItem: React.FC<IngredientItemProps> = ({
    recipeIngredient,
}) => {
    const { Option } = Select;
    const [enableEdit, setEnableEdit] = useState<boolean>(false);

    const [ingredientId, setIngredientId] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");

    const { Recipe, refetchData } = useContext(RecipeContext);

    useEffect(() => {
        setIngredientId(recipeIngredient.ingredient.ingredientId);
        setAmount(recipeIngredient.amount);
        setUnit(recipeIngredient.unit);
    }, [recipeIngredient]);

    const onDeleteButtonClick = () => {
        confirmModal(
            "/api/recipe/" +
                Recipe?.recipeId +
                "/ingredient/" +
                recipeIngredient.ingredient.ingredientId,
            refetchData
        );
    };

    return (
        <RecipeIngredientItem>
            <Formik
                initialValues={{
                    amount: amount,
                    unit: unit,
                }}
                enableReinitialize={true}
                validationSchema={IngredientItemSchema}
                onSubmit={({ amount, unit }) => {
                    fetch(
                        "/api/recipe/" +
                            Recipe?.recipeId +
                            "/ingredient/" +
                            ingredientId,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                amount: amount,
                                unit: unit,
                            }),
                        }
                    )
                        .then((res) => {
                            if (res.status === 200) return res.json();
                            else if (res.status === 400 || res.status === 404)
                                res.json().then((json) =>
                                    message.error(json.message)
                                );
                            else
                                message.error(
                                    res.status + " " + res.statusText
                                );
                        })
                        .then((json) => {
                            message.success(json.message);
                            refetchData();
                        });
                }}
            >
                {(formik) => (
                    <>
                        <NameSpan>{recipeIngredient.ingredient.name}</NameSpan>
                        {enableEdit ? (
                            <Form
                                layout={"inline"}
                                onSubmitCapture={formik.submitForm}
                            >
                                <Form.Item name={"amount"}>
                                    <InputNumber
                                        name={"amount"}
                                        min={0}
                                        value={amount}
                                        onChange={(e: any) => setAmount(e)}
                                    />
                                </Form.Item>
                                <Form.Item name={"unit"}>
                                    <Select
                                        name={"unit"}
                                        style={{ width: "120px" }}
                                        value={unit}
                                        onSelect={(e: string) => setUnit(e)}
                                    >
                                        <Option value="g">gram</Option>
                                        <Option value="kg">kilogram</Option>
                                        <Option value="ml">milliliter</Option>
                                        <Option value="l">liter</Option>
                                        <Option value="cup">cup</Option>
                                        <Option value="teaspoon">
                                            teaspoon
                                        </Option>
                                        <Option value="tablespoon">
                                            tablespoon
                                        </Option>
                                    </Select>
                                </Form.Item>
                                <ButtonSpan>
                                    <SubmitButton
                                        icon={<SaveOutlined />}
                                        onClick={() =>
                                            formik.isValid
                                                ? (setEnableEdit(false),
                                                  formik.submitForm())
                                                : {}
                                        }
                                    >
                                        Save
                                    </SubmitButton>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={onDeleteButtonClick}
                                    />
                                </ButtonSpan>
                            </Form>
                        ) : (
                            <>
                                <AmountUnitSpan>
                                    {amount} {unit}
                                </AmountUnitSpan>
                                <ButtonSpan>
                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={() => setEnableEdit(true)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={onDeleteButtonClick}
                                    />
                                </ButtonSpan>
                            </>
                        )}
                    </>
                )}
            </Formik>
        </RecipeIngredientItem>
    );
};
