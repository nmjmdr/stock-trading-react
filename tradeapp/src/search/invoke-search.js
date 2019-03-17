const search = async (keyword)  => {
    const url = `http://localhost:8901/search`
    const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
         "q": keyword,
        })
    });

    if(!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage)
        throw new Error('Unable to make request',response.status, errorMessage.error)
    }
    const json = await response.json();
    return json.results;
}


const searchApi = {
    search,
}

export default searchApi;