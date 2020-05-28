import React, { useState, useEffect, useContext } from "react";
import { Card, message } from "antd";
import { Form, Input, Rate, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

import { RecipeContext } from "../../../contexts/RecipeContext";

const RecipeFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    instructions: Yup.string().required("Instructions are required!"),
    rating: Yup.number()
        .min(0, "Rating is too short!")
        .max(5, "Rating is too long!")
        .required("Rating is required!"),
});

export const RecipeForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const { Recipe } = useContext(RecipeContext);
    useEffect(() => {
        setName(Recipe === null ? "" : Recipe.name);
        setInstructions(Recipe === null ? "" : Recipe.instructions);
        setRating(Recipe === null ? 0 : Recipe.rating);
    }, [Recipe]);

    return (
        <Formik
            initialValues={{
                name: name,
                instructions: instructions,
                rating: rating,
            }}
            enableReinitialize={true}
            validationSchema={RecipeFormSchema}
            onSubmit={({ name, instructions, rating }, formik) => {
                fetch("/api/recipe/" + Recipe?.recipeId, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, instructions, rating }),
                })
                    .then((res) => {
                        if (res.status === 200) return res.json();
                        else if (res.status === 404)
                            res.json().then((json) =>
                                message.error(json.message)
                            );
                        else message.error(res.status + " " + res.statusText);
                    })
                    .then((json) => {
                        message.success(json.message);
                    })
                    .finally(formik.resetForm);
            }}
        >
            {(formik) => (
                <Card title={name}>
                    <Form
                        layout={"vertical"}
                        onSubmitCapture={formik.handleSubmit}
                    >
                        <Form.Item label={"Name:"} name={"name"}>
                            <Input
                                name={"name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label={"Cooking instructions:"}
                            name={"instructions"}
                        >
                            <Input.TextArea
                                name={"instructions"}
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 15,
                                }}
                                value={instructions}
                                onChange={(e) =>
                                    setInstructions(e.target.value)
                                }
                            />
                        </Form.Item>
                        <Form.Item label={"Rating:"} name={"rating"}>
                            <Rate
                                name={"rating"}
                                value={rating}
                                onChange={(e) => setRating(e)}
                            />
                        </Form.Item>
                        <SubmitButton>Edit</SubmitButton>
                    </Form>
                </Card>
            )}
        </Formik>
    );
};
