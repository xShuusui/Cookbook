import React, { useContext } from "react";
import { PageHeader, Button, Modal, message } from "antd";
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

import { RecipeContext } from "../../../contexts/RecipeContext";

/** The header of the recipe page. */
export const RecipeHeader: React.FC<{
    setRedirect: (redirect: boolean) => void;
}> = ({ setRedirect }) => {
    const { Recipe } = useContext(RecipeContext);

    return (
        <PageHeader
            style={{ width: "80rem" }}
            title={"Recipe"}
            onBack={() => setRedirect(true)}
            backIcon={
                <Button
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    shape="circle"
                ></Button>
            }
            extra={
                <Button
                    size={"large"}
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        const { confirm } = Modal;

                        confirm({
                            title: "Are you sure you want to delete this item?",
                            icon: <ExclamationCircleOutlined />,
                            okText: "Yes",
                            cancelText: "No",
                            onOk() {
                                fetch("/api/recipe/" + Recipe?.recipeId, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                    .then((res) => {
                                        if (res.status === 200)
                                            return res.json();
                                        else if (
                                            res.status === 400 ||
                                            res.status === 404
                                        )
                                            res.json().then((json) =>
                                                message.error(json.message)
                                            );
                                        else
                                            message.error(
                                                res.status +
                                                    " " +
                                                    res.statusText
                                            );
                                    })
                                    .then((json) => {
                                        message.success(json.message);
                                        setRedirect(true);
                                    });
                            },
                        });
                    }}
                >
                    Delete recipe
                </Button>
            }
        />
    );
};
