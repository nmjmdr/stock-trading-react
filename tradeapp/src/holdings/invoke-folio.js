

const currentFolio = async (userID)  => {
    const url = `http://localhost:8901/folio/${userID}`
    const response = await fetch(url, {
        method: 'get',
    });

    if(!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage)
        throw new Error('Unable to make request',response.status, errorMessage.error)
    }
    const json = await response.json();
    return json.folio;
}

const portfolio = {
    currentFolio,
}

export default portfolio;