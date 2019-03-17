const request = require('request-json');
const client = request.createClient('https://www.alphavantage.co/');
const config = require('../../config');
const env = require('../env')
const market = require('../market')

const search = (keyword) => {
    ///query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
    const apiKey = env.tradeApiKey()
    return new Promise((resolve, reject) => {
        client.get(`query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`, function(err, res, body) {
           if(err) {
               return reject(`Could not request trading api ${err}`)
           }
           const matches = parse(body, keyword)
           const pricePromises = matches.map((m)=>{
               return market.price(m.symbol)
           })
           return Promise.all(pricePromises)
           .then((prices)=>{
             return resolve(combine(matches, prices))
           })
        });
    });
}

const combine = (matches, prices) => {
    const dictionary = prices.reduce((acc,p)=>{
        if(p) {
            acc[p.symbol] = p
        }
        return acc
    }, {});
    return matches.map((m)=>{
        const p = dictionary[m.symbol];
        if(p) {
            return Object.assign(m,p)
        }
        return m;
    })
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