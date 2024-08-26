export async function sendHttpRequest(url, errorMsg, options) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(errorMsg || 'Failed to fetch data!');
    }

    const data = await response.json();
    return data;
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