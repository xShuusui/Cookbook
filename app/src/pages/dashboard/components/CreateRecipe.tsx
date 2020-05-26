import { Input, Rate, Form, message } from "antd";
import React, { useState } from "react";
import { InputInstructions } from "../../../components/InputInstructions";

type CreateRecipeProps = {
    refetch: () => void;
    setRecipeId: (recipeId: string) => void;
    setChangeForm: (changeForm: boolean) => void;
    submitForm: boolean;
    setSubmitForm: (submitForm: boolean) => void;
};

export const CreateRecipe: React.FC<CreateRecipeProps> = ({
    refetch,
    setRecipeId,
    setChangeForm,
    submitForm,
    setSubmitForm,
}) => {
    const [form] = Form.useForm();

    if (submitForm) {
        form.submit();
        setSubmitForm(false);
    }

    // Recipe states
    const [recipeName, setRecipeName] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const onCreateRecipeFinish = () => {
        fetch("api/recipe/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: recipeName,
                instructions: instructions,
                rating: rating,
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
                setRecipeId(json.data.recipeId);
                setChangeForm(true);
                message.success(json.message);
            });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="recipeForm"
            onFinish={onCreateRecipeFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please insert the name of the recipe.",
                    },
                ]}
            >
                <Input
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </Form.Item>
            <Form.Item label="Instructions" name="instructions">
                <InputInstructions
                    instructions={instructions}
                    setInstructions={setInstructions}
                    enableInput={true}
                />
            </Form.Item>
            <Form.Item label="Rating" name="rating">
                <Rate
                    value={rating}
                    onChange={(e) => setRating(e)}
                    allowClear={true}
                />
            </Form.Item>
        </Form>
    );
};
