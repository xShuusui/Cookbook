import { message } from "antd";

export const deleteFetch = (url: string, refetch: () => void): void => {
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
            refetch();
            message.success(json.message);
        });
};
