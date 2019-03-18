const buy = async (userID,symbol,quantity)  => {
    const url = `http://localhost:8901/trade/${userID}/buy`
    const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         "symbol": symbol,
         "quantity": quantity,
        })
    });

    if(!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage)
        throw new Error('Unable to make request',response.status, errorMessage.error)
    }
    const json = await response.json();
    return json.result;
}


const tradeApi = {
    buy,
}

export default tradeApi;