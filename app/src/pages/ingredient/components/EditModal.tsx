import React from "react";
import { Modal, message } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

/** The validation schema for the edit modal. */
const EditModalSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

/** The type for the edit modal. */
type EditModalProps = {
    showEditModal: boolean;
    setShowEditModal: (showEditModal: boolean) => void;
    ingredientId: string;
    refetchData: () => void;
};

/** A modal to edit an ingredient. */
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
