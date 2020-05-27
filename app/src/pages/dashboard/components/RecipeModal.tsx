import React from "react";
import { Modal, message } from "antd";
import { Form, Input, Rate, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

const RecipeModalSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    instructions: Yup.string().required("Instructions are required!"),
    rating: Yup.number()
        .min(0, "Rating is too short!")
        .max(5, "Rating is too long!")
        .required("Rating is required!"),
});

type RecipeModalProps = {
    showRecipeModal: boolean;
    setShowRecipeModal: (showRecipeModal: boolean) => void;
    setShowIngredientModal: (showIngredientModal: boolean) => void;
    setRecipeId: (recipeId: string) => void;
    refetchData: () => void;
};

export const RecipeModal: React.FC<RecipeModalProps> = ({
    showRecipeModal,
    setShowRecipeModal,
    setShowIngredientModal,
    setRecipeId,
    refetchData,
}) => {
    return (
        <Formik
            initialValues={{ name: "", instructions: "", rating: 0 }}
            validationSchema={RecipeModalSchema}
            onSubmit={({ name, instructions, rating }, formik) => {
                fetch("/api/recipe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, instructions, rating }),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            message.error(res.status + " " + res.statusText);
                        }
                    })
                    .then((json) => {
                        message.success(json.message);
                        refetchData();

                        setRecipeId(json.data.recipeId);
                        setShowRecipeModal(false);
                        setShowIngredientModal(true);
                    })
                    .finally(formik.resetForm);
            }}
        >
            {(formik) => (
                <Modal
                    title={"Create recipe"}
                    visible={showRecipeModal}
                    onCancel={() => {
                        setShowRecipeModal(false);
                        formik.resetForm();
                    }}
                    footer={[]}
                >
                    <Form
                        layout={"vertical"}
                        onSubmitCapture={formik.handleSubmit}
                    >
                        <Form.Item label={"Name:"} name={"name"}>
                            <Input name={"name"} />
                        </Form.Item>
                        <Form.Item
                            label={"Instructions:"}
                            name={"instructions"}
                        >
                            <Input.TextArea
                                name={"instructions"}
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 15,
                                }}
                            />
                        </Form.Item>
                        <Form.Item label={"Rating:"} name={"rating"}>
                            <Rate name={"rating"} />
                        </Form.Item>
                        <SubmitButton>Create recipe</SubmitButton>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
};
