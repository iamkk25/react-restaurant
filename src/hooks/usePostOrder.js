import { useState } from "react";

export default function usePostOrder() {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");
    `${(Math.random() * 1000).toString()}-${crypto.randomUUID()}`

    async function sendHttpRequest(url, errMsg, options) {
        setIsFetching(true);
        try {
            const response = await fetch(url, {
                ...options
            });

            if (!response.ok) {
                throw new Error(errMsg || "Something went wrong");
            }

            const data = await response.json();
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

    function resetOrder() {
        setData(null)
        setError("")
        setIsFetching(false)
    }

    return { data, isSending: isFetching, error, postOrder: sendHttpRequest, resetOrder };
}