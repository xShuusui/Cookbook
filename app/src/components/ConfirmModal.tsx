import React from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

/** A modal that displays a warning when you delete something. */
export const confirmModal = (url: string, refetchData: () => void): void => {
    const { confirm } = Modal;

    confirm({
        title: "Are you sure you want to delete this item?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        cancelText: "No",
        onOk() {
            fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => {
                    if (res.status === 200) return res.json();
                    else if (res.status === 400 || res.status === 404)
                        res.json().then((json) => message.error(json.message));
                    else message.error(res.status + " " + res.statusText);
                })
                .then((json) => {
                    message.success(json.message);
                    refetchData();
                });
        },
    });
};
