const vars = require('dotenv').config().parsed;
let apiKey = ""

const loadVars = () => {
    apiKey =vars['APLHA_KEY'];
    if(!apiKey) {
        console.log("API Key for Alphavantage should be set as environment varibale `ALPHA_KEY`")
        console.log("Exiting")
        process.exit(1)
    }
}

module.exports = {
    loadVars,
    tradeApiKey: () => apiKey,
}