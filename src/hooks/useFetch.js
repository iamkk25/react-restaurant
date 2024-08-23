import { useEffect, useState } from "react";
import { getMeals } from "../http/https";

export default function useFetch(errMsg,) {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function fetchMeals() {
            setIsFetching(true);
            try {
                const data = await getMeals(errMsg || "Failed to get data!🍽️", {
                    signal: controller.signal,
                });
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
            fetchMeals();
        }

        return () => {
            controller.abort();
        };
    }, [errMsg, data.length]);

    return { data, isFetching, error, setError }
}