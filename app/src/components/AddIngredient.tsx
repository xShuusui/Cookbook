import { Divider, Input, message } from "antd";
import { Select } from "formik-antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { useGetHook } from "../hooks/UseGetHook";
import { Ingredient } from "../types/Types";

type AddIngredientToRecipeProps = {
    enableInput?: boolean;
};

export const AddIngredientToRecipe: React.FC<AddIngredientToRecipeProps> = ({
    enableInput,
}) => {
    const [ingredientName, setIngredientName] = useState<string>("");

    const { Option } = Select;
    const { data, fetchData } = useGetHook<Ingredient[]>("/api/ingredient");

    return (
        <>
            <Select
                name="ingredientId"
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
                                    onChange={(e) =>
                                        setIngredientName(e.target.value)
                                    }
                                />
                                <a
                                    style={{
                                        flex: "none",
                                        padding: "8px",
                                        display: "block",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        fetch("/api/ingredient", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                ingredientName,
                                            }),
                                        })
                                            .then((res) => {
                                                if (res.status === 200)
                                                    return res.json();
                                                else
                                                    message.error(
                                                        res.status +
                                                            " " +
                                                            res.statusText
                                                    );
                                            })
                                            .then((json) => {
                                                message.success(json.message);
                                                fetchData();
                                            });
                                    }}
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
        </>
    );
};
