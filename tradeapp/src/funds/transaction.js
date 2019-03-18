const addFunds = async (delta, userID)  => {
    const url = `http://localhost:8901/funds/${userID}/add`
    const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         "delta": delta,
        })
    });

    if(!response.ok) {
        const errorMessage = await response.json();
        throw new Error('Unable to make request',response.status, errorMessage.error)
    }
    const json = await response.json();
    return json.cash;
}

const withdrawFunds = async (delta, userID)  => {
    const url = `http://localhost:8901/funds/${userID}/withdraw`
    const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         "delta": delta,
        })
    });

    if(!response.ok) {
        const errorMessage = await response.json();
        throw new Error('Unable to make request',response.status, errorMessage.error)
    }
    const json = await response.json();
    return json.cash;
}

const currentFunds = async (userID)  => {
    const url = `http://localhost:8901/funds/${userID}`
    const response = await fetch(url, {
        method: 'get',
    });

    if(!response.ok) {
        const errorMessage = await response.json();
        throw new Error('Unable to make request',response.status, errorMessage.error)
    }
    const json = await response.json();
    return json.cash;
}

const transaction = {
    addFunds,
    withdrawFunds,
    currentFunds,
}

export default transaction;