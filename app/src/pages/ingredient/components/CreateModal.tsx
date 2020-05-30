import React from "react";
import { Modal, message } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

/** The validation schema of the create modal. */
const CreateModalSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

/** The type of the create modal. */
type CreateModalProps = {
    showCreateModal: boolean;
    setShowCreateModal: (showModal: boolean) => void;
    refetchData: () => void;
};

/** A modal to create an ingredient. */
export const CreateModal: React.FC<CreateModalProps> = ({
    showCreateModal,
    setShowCreateModal,
    refetchData,
}) => {
    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={CreateModalSchema}
            onSubmit={(values, formik) => {
                fetch("/api/ingredient", {
                    method: "POST",
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

                        setShowCreateModal(true);
                    })
                    .finally(formik.resetForm);
            }}
        >
            {(formik) => (
                <Modal
                    title={"Create ingredient"}
                    visible={showCreateModal}
                    onCancel={() => {
                        setShowCreateModal(false);
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
                        <SubmitButton>Create ingredient</SubmitButton>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
};
