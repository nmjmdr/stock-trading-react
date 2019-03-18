const env = require('../env')
const market = require('../market')
const cash = require('../cash')
const portfolio = require('../portfolio');

const instance = (store) => {
    const cashInstance = cash.instance(store)
    const portfolioInstance = portfolio.instance(store)

    const buy = (userID, symbol, amount) => {
        return market.price(symbol)
        .then((priceData)=>{
            if(!priceData) {
                throw new Error(`No price data fouund for ${symbol}`)
            }
            const cost = priceData.price * amount
            
            const cashHeld = cashInstance.current(userID);
            if(cost > cashHeld) {
                return {
                    success: false,
                    reason: "Insufficient funds",
                }
            }
            try {
            cashInstance.withdraw(userID, cost)
            portfolioInstance.add(userID, symbol, amount, priceData.price)
            } catch(err) {
                return {
                    success: false,
                    error: err,
                }
            }
            return {
                success: true,
            }
        })
    }
    return {
        buy,
    }
}

module.exports = {
    instance,
}