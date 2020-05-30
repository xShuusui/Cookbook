import React from "react";
import { Modal, message } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateModalSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

type CreateModalProps = {
    showCreateModal: boolean;
    setShowCreateModal: (showModal: boolean) => void;
    refetchData: () => void;
};

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
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            message.error(res.status + " " + res.statusText);
                            message.error("Ingredient already exist!");
                        }
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
