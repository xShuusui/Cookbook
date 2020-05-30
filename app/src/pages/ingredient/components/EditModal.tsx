import React from "react";
import { Modal, message } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

const EditModalSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

type EditModalProps = {
    showEditModal: boolean;
    setShowEditModal: (showEditModal: boolean) => void;
    ingredientId: string;
    refetchData: () => void;
};

export const EditModal: React.FC<EditModalProps> = ({
    showEditModal,
    setShowEditModal,
    ingredientId,
    refetchData,
}) => {
    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={EditModalSchema}
            onSubmit={(values, formik) => {
                fetch("/api/ingredient/" + ingredientId, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            message.error(res.status + " " + res.statusText);
                            message.error(
                                "Ingredient with this name already exist!"
                            );
                        }
                    })
                    .then((json) => {
                        message.success(json.message);
                        refetchData();

                        setShowEditModal(false);
                    })
                    .finally(formik.resetForm);
            }}
        >
            {(formik) => (
                <Modal
                    title={"Edit ingredient"}
                    visible={showEditModal}
                    onCancel={() => {
                        setShowEditModal(false);
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
                        <SubmitButton>Save changes</SubmitButton>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
};
