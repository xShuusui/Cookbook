import { useEffect, useState } from "react";
import { message } from "antd";

export function useGetHook<T>(
    url: string
): { data: T | null; fetchData: () => void } {
    const [data, setData] = useState<T | null>(null); // Speichern der Variablen in einem State fürs rerendering();

    const fetchData = () => {
        fetch(url, {
            method: "GET",
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
                setData(json.data); // Triggert immer rerendering.
            });
    };

    useEffect(() => {
        fetchData();
    }, [url]); //Immer wenn url ändert, wird useFetch neu ausgeführt.

    return { data, fetchData };
}
