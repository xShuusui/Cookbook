import { message, Form, Select, InputNumber } from "antd";
import React, { useState } from "react";

import { AddIngredientToRecipe } from "../../../components/AddIngredient";
import { SelectUnit } from "../../../components/SelectUnit";
import { InputAmount } from "../../../components/InputAmount";

const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

type AddIngredientProps = {
    refetch: () => void;
    recipeId: string;
    submitForm: boolean;
    setSubmitForm: (submitForm: boolean) => void;
};

export const AddIngredient: React.FC<AddIngredientProps> = ({
    refetch,
    recipeId,
    submitForm,
    setSubmitForm,
}) => {
    const [form] = Form.useForm();

    if (submitForm) {
        form.submit();
        setSubmitForm(false);
    }

    const [ingredientId, setIngredientId] = useState<string>("");
    const [ingredientName, setIngredientName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");
    //const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const onAddIngredientFinish = () => {
        fetch("api/recipe/" + recipeId + "/ingredient/" + ingredientId, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: amount,
                unit: unit,
            }),
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    message.error(res.status + " " + res.statusText);
                }
            })
            .then((json) => {
                form.resetFields();
                refetch();
                message.success(json.message);
            });
    };

    return (
        <Form
            {...formLayout}
            form={form}
            name="ingredientForm"
            onFinish={onAddIngredientFinish}
        >
            <Form.Item label="Ingredient" name="ingredientId">
                <AddIngredientToRecipe
                    // ingredientId={ingredientId}
                    // setIngredientId={setIngredientId}
                    enableInput={true}
                />
            </Form.Item>
            <Form.Item label="Amount" name="amount">
                <InputAmount setAmount={setAmount} enableInput={true} />
            </Form.Item>
            <Form.Item label="Unit" name="unit">
                <SelectUnit setUnit={setUnit} enableInput={true} />
            </Form.Item>
        </Form>
    );
};
