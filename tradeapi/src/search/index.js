const request = require('request-json');
const client = request.createClient('https://www.alphavantage.co/');
const config = require('../../config')

const search = (keyword) => {
    ///query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
    const apiKey = config.trading.apiKey
    return new Promise((resolve, reject) => {
        client.get(`query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`, function(err, res, body) {
           if(err) {
               return reject(`Could not request trading api ${err}`)
           }
           return resolve(parse(body, keyword))
        });
    });
}

const parse = (body, keyword) => {
    if(!body.bestMatches || body.bestMatches.length === 0) {
        console.log(`No records found for ${keyword}`)
        return []
    }
    return  body.bestMatches.map((m)=>{
        return {
            symbol: m['1. symbol'],
            name: m['2. name'],
            type: m['3. type'],
            matchScore: m['9. matchScore']
        }
    })
}

module.exports = {
    search,
}