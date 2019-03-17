const store = require('../../../trade');

const buy = (req, res, next) => {
    // update cash
    const userID = req.params.userID
    if(!userID) {
        return res.send(400,{
            error: "Missing userID parameter in URL"
        })
    }
    const symbol = req.body && req.body.symbol
    if(!symbol) {
        return res.send(400,{
            error: "Missing symbol variable in body"
        })
    }

    const quantity = req.body && req.body.quantity
    if(!quantity) {
        return res.send(400,{
            error: "Missing quantity variable in body"
        })
    }

    const storeInstance = store.getInstance()
    const quantityInt = parseFloat(quantity)
    const result = trade.instance(storeInstance).buy(userID,symbol,quantityInt)

    res.send(200,{
      "result": result,
    });
    return next();
}

module.exports = {
    buy,
}