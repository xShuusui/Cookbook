import { message } from "antd";
import { useState } from "react";

export const apiFetch = (
    url: string,
    method: string,
    body: {},
    refetchData: () => void
) => {
    const data = fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                message.error(res.status + " " + res.statusText);
            }
        })
        .then((json) => {
            refetchData();
            message.success(json.message);
            return json.data;
        });

    return data;
};
