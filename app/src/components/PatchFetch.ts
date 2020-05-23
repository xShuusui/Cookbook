import { message } from "antd";

export const patchRecipeFetch = (
    url: string,
    refetch: () => void,
    name: string,
    instructions: string,
    rating: number
): void => {
    fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            instructions: instructions,
            rating: rating,
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
            refetch();
            message.success(json.message);
        });
};
