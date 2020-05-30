import React from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        message.error(res.status + " " + res.statusText);
                    }
                })
                .then((json) => {
                    message.success(json.message);
                    refetchData();
                });
        },
    });
};
