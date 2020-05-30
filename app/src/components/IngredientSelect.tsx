import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, message, Button } from "antd";
import { Select } from "formik-antd";
import styled from "styled-components";

import { useGetHook } from "../hooks/UseGetHook";
import { Ingredient } from "../types/Types";

const CustomDiv = styled.div`
    display: flex;
    padding: 8px;
`;

export const IngredientSelect: React.FC = () => {
    const { Option } = Select;

    const [ingredientName, setIngredientName] = useState<string>("");
    const { data, fetchData } = useGetHook<Ingredient[]>("/api/ingredient");

    const onButtonClick = () => {
        fetch("/api/ingredient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: ingredientName,
            }),
        })
            .then((res) => {
                if (res.status === 200) return res.json();
                else if (res.status === 400)
                    res.json().then((json) => message.error(json.message));
                else message.error(res.status + " " + res.statusText);
            })
            .then((json) => {
                message.success(json.message);
                fetchData();
            });
    };

    return (
        <Select
            name="ingredientId"
            placeholder="Select ingredient"
            style={{ width: "50%" }}
            showSearch={true}
            filterOption={(input, option) =>
                option?.children.toUpperCase().indexOf(input.toUpperCase()) >= 0
            }
            dropdownRender={(options) => {
                return (
                    <>
                        {options}
                        <Divider style={{ margin: "4px 0px" }} />
                        <CustomDiv>
                            <Input
                                placeholder={"Create ingredient"}
                                style={{ flex: "auto" }}
                                allowClear={true}
                                value={ingredientName}
                                onChange={(e) =>
                                    setIngredientName(e.target.value)
                                }
                            />
                            <Button
                                icon={<PlusOutlined />}
                                size={"large"}
                                style={{
                                    border: "0",
                                    color: "#1890ff",
                                }}
                                onClick={onButtonClick}
                            />
                        </CustomDiv>
                    </>
                );
            }}
        >
            {data?.map((ingredient) => (
                <Option
                    key={ingredient.ingredientId}
                    value={ingredient.ingredientId}
                >
                    {ingredient.name}
                </Option>
            ))}
        </Select>
    );
};
