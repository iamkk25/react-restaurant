import { useEffect, useState } from "react";

export default function useFetch(url,errMsg,options) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function sendHttpRequest() {
            setIsFetching(true);
            try {
                const response = await fetch(url,{
                    signal: controller.signal,
                    ...options
                });

                if(!response.ok){
                    throw new Error(errMsg || "Something went wrong");
                }

                const data = response.json();
                setData(data);
                setError("");
            } catch (err) {
                console.log(err.name);
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsFetching(false);
            }
        }

        if (data.length === 0) {
            sendHttpRequest();
        }

        return () => {
            controller.abort();
        };
    }, [url,errMsg, data.length,options]);

    return { data, isFetching, error, setError }
}