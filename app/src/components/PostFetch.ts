import { message } from "antd";

export const postIngredientFetch = (
    url: string,
    refetch: () => void,
    body: {}
): void => {
    fetch(url, {
        method: "POST",
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
            refetch();
            message.success(json.message);
        });
};
