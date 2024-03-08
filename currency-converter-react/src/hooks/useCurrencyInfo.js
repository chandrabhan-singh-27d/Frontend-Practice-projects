import { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
    const [data, setData] = useState({});

    useEffect(() => {
        (async () => {
            let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;

            try {
                const response = await fetch(url);
                const resData = await response.json();
                setData(resData[currency]);

            } catch (error) {
                console.log("error in fetching currency data", error)
            }
        })();
    }, [currency]);
    return data;
}

export default useCurrencyInfo;