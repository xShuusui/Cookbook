import { Divider, Input } from "antd";
import { Select } from "formik-antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { useGetHook } from "../hooks/UseGetHook";
import { Ingredient } from "../types/Types";
import { postIngredientFetch } from "./PostFetch";

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
                disabled={!enableInput ? false : true}
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
                                    onClick={() =>
                                        postIngredientFetch(
                                            "/api/ingredient",
                                            fetchData,
                                            ingredientName
                                        )
                                    }
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
