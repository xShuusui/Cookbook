import { message } from "antd";

export const useDeleteHook = (url: string, refetch: () => void): void => {
    fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        if (res.status === 200) {
            refetch();
            message.success("Deleted successfully.");
        } else {
            message.error(res.status + " " + res.statusText);
        }
    });
};
