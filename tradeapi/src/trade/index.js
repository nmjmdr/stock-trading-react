const env = require('../env')
const market = require('../market')
const cash = require('../cash')

const instance = (store) => {
    const buy = (userID, symbol, amount) => {
        return market.price(symbol)
        .then((priceData)=>{
            if(!priceData) {
                throw new Error(`No price data fouund for ${symbol}`)
            }
            const cost = priceData.price * amount
            const cashInstance = caches.instance(store)
            if(cost > cashInstance.current()) {
                throw new Error("Insufficient funds")
            }
            cash.withdraw(userID, cost)
            portfolio.add(userID, symbol, quantity, priceData.price)
        })
        return true
    }
    return {
        buy,
    }
}

module.exports = {
    instance,
}