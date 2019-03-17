const env = require('../env')
const request = require('request-json');
const client = request.createClient('https://www.alphavantage.co/');

const price = (symbol) => {
    const apiKey = env.tradeApiKey()
    return new Promise((resolve, reject) => {
        client.get(`query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`, function(err, res, body) {
           if(err) {
               return reject(`Could not request trading api ${err}`)
           }
           return resolve(parse(body, symbol))
        });
    });
}

const parse = (body, symbol) => {
    if(!body["Global Quote"]) {
        console.log(`No records found for ${symbol}`)
        return null
    }
    const m = body["Global Quote"];
    return  {
        symbol: m["01. symbol"],
        price: m["05. price"],
        change: m["10. change percent"],
    }
}

module.exports = {
    price,
}