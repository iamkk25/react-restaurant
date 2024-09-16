export async function sendHttpRequest(url, errorMsg, options) {
    try{
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(errorMsg || 'Failed to fetch data!');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getMeals(errorMsg, options) {
    try {
        const data = await sendHttpRequest('http://localhost:3000/meals', errorMsg, { ...options });
        return data;
    } catch (err) {
        // console.error(err)
        throw new Error(errorMsg || err.message)
    }
}

export async function postOrder(errMsg, options) {
    try{
        const data = await sendHttpRequest('http://localhost:3000/orders',errMsg, { ...options });
        return data;
    } catch (err) {
        throw new Error(errMsg || err.message);
    }
}