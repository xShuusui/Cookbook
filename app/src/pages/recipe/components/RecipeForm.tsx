import React from "react";
import { Card } from "antd";
import { Form, Input, Rate, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

const RecipePageSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    instructions: Yup.string().required("Instructions are required!"),
    rating: Yup.number()
        .min(0, "Rating is too short!")
        .max(5, "Rating is too long!")
        .required("Rating is required!"),
});

type RecipeFormProps = {
    name: string;
    setName: (name: string) => void;
    instructions: string;
    setInstructions: (instructions: string) => void;
    rating: number;
    setRating: (rating: number) => void;
};

export const RecipeForm: React.FC<RecipeFormProps> = ({
    name,
    setName,
    instructions,
    setInstructions,
    rating,
    setRating,
}) => {
    return (
        <Formik
            initialValues={{
                name: name,
                instructions: instructions,
                rating: rating,
            }}
            enableReinitialize={true}
            validationSchema={RecipePageSchema}
            onSubmit={({ name, instructions, rating }, formik) => {
                console.log(name, instructions, rating);
                formik.resetForm();
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
