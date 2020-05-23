import React, { useState } from "react";
import {
    Modal,
    Input,
    Rate,
    Form,
    message,
    InputNumber,
    Select,
    Divider,
    Empty,
} from "antd";
import { FormProvider } from "antd/lib/form/context";
import { FormInstance } from "antd/lib/form";
import { useGetHook } from "../../../hooks/UseGetHook";
import { Ingredient } from "./RecipeIngredientList";
import { PlusOutlined } from "@ant-design/icons";

const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

/** The type for the DashboardModal. */
type DashboardModalProps = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    refetch: () => void;
};

/** The form to create a recipe. */
const RecipeForm: React.FC<{ form: FormInstance }> = ({ form }) => {
    return (
        <Form {...formLayout} form={form} name="recipeForm">
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
                <Input />
            </Form.Item>
            <Form.Item
                label="Instructions"
                name="instructions"
                rules={[
                    {
                        required: true,
                        message:
                            "Please insert the cooking instructions of the recipe.",
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item initialValue={0} label="Rating" name="rating">
                <Rate allowClear={true} />
            </Form.Item>
        </Form>
    );
};

/** The form to add an ingredient to a recipe. */
const IngredientForm: React.FC<{ form: FormInstance }> = ({ form }) => {
    const [ingredientName, setIngredientName] = useState<string>("");

    const { Option } = Select;
    const { data, fetchData } = useGetHook<Ingredient[]>("/api/ingredient");

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientName(e.target.value);
    };

    const addIngredientToRecipe = () => {
        fetch("/api/ingredient", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: ingredientName,
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
                fetchData();
                message.success(json.message);
            });
    };

    return (
        <Form {...formLayout} form={form} name="ingredientForm">
            <Form.Item label="Ingredient" name="ingredientId">
                <Select
                    placeholder="Select ingredient"
                    style={{ width: "20rem" }}
                    dropdownRender={(menu) => {
                        return (
                            <div>
                                {menu}
                                <Divider style={{ margin: "4px 0" }} />
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "nowrap",
                                        padding: 8,
                                    }}
                                >
                                    <Input
                                        style={{ flex: "auto" }}
                                        value={ingredientName}
                                        onChange={(e) => onNameChange(e)}
                                    />
                                    <a
                                        style={{
                                            flex: "none",
                                            padding: "8px",
                                            display: "block",
                                            cursor: "pointer",
                                        }}
                                        onClick={addIngredientToRecipe}
                                    >
                                        <PlusOutlined>
                                            Create ingredient
                                        </PlusOutlined>
                                    </a>
                                </div>
                            </div>
                        );
                    }}
                >
                    {data?.map((ingredient) => {
                        return (
                            <Option
                                key={ingredient.ingredientId}
                                value={ingredient.ingredientId}
                            >
                                {ingredient.name}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item initialValue={0} label="Amount" name="amount">
                <InputNumber style={{ width: "150px" }} min={0} />
            </Form.Item>
            <Form.Item label="Unit" name="unit">
                <Select style={{ width: "150px" }}>
                    <Option value="g">gram</Option>
                    <Option value="kg">kilogram</Option>
                    <Option value="ml">milliliter</Option>
                    <Option value="l">liter</Option>
                    <Option value="cup">cup</Option>
                    <Option value="teaspoon">teaspoon</Option>
                    <Option value="tablespoon">tablespoon</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export const DashboardModal: React.FC<DashboardModalProps> = ({
    showModal,
    setShowModal,
    refetch,
}) => {
    const [changeForm, setchangeForm] = useState<boolean>(false);
    const [recipeId, setRecipeId] = useState<string>("");
    const [form] = Form.useForm();

    const onFormFinish = (formName: string, info: any) => {
        if (formName === "recipeForm") {
            fetch("api/recipe/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: info.values.name,
                    instructions: info.values.instructions,
                    rating: info.values.rating,
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
                    setchangeForm(true);
                    message.success(json.message);
                });
        } else if (formName === "ingredientForm") {
            console.log(recipeId, info.values.ingredientId);
            fetch(
                "api/recipe/" +
                    recipeId +
                    "/ingredient/" +
                    info.values.ingredientId,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: info.values.amount,
                        unit: info.values.unit,
                    }),
                }
            )
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
        }
    };

    /** Cancel a modal. */
    const onCancelModal = () => {
        setShowModal(false);
        form.resetFields();
        if (changeForm) setchangeForm(false);
    };

    return (
        <Modal
            title={!changeForm ? "Add Recipe" : "Add Ingredient To Recipe"}
            visible={showModal}
            okText={!changeForm ? "Add Recipe" : "Add Ingredient"}
            onOk={() => form.submit()}
            onCancel={onCancelModal}
            width={"40%"}
        >
            <FormProvider
                onFormFinish={(formName, info) => onFormFinish(formName, info)}
            >
                {changeForm === false ? (
                    <RecipeForm form={form} />
                ) : (
                    <IngredientForm form={form} />
                )}
            </FormProvider>
        </Modal>
    );
};
