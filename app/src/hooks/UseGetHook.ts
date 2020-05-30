import { useEffect, useState, useCallback } from "react";
import { message } from "antd";

/** A hook that fetchs data from the backend. */
export function useGetHook<T>(
    url: string
): { data: T | null; fetchData: () => void } {
    const [data, setData] = useState<T | null>(null);

    const fetchData = useCallback(() => {
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.status === 200) return res.json();
                else if (res.status === 400 || res.status === 404)
                    res.json().then((json) => message.error(json.message));
                else message.error(res.status + " " + res.statusText);
            })
            .then((json) => {
                setData(json.data);
            });
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, fetchData };
}
