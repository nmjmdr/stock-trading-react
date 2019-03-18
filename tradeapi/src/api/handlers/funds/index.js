const store = require('../../../store');
const cash = require('../../../cash')

const add = (req, res, next) => {
    // update cash
    const userID = req.params.userID
    if(!userID) {
        return res.send(400,{
            error: "Missing userID parameter in URL"
        })
    }
    const delta = req.body && req.body.delta
    if(!delta) {
        return res.send(400,{
            error: "Missing delta variable in body"
        })
    }
    const storeInstance = store.getInstance()
    const deltaAmount = parseFloat(delta)
    const updated = cash.instance(storeInstance).add(userID, deltaAmount)

    res.send(200,{
      "cash": updated,
    });
    return next();
}

const withdraw = (req, res, next) => {
    // update cash
    const userID = req.params.userID
    if(!userID) {
        res.send(400,{
            error: "missing userID parameter in URL"
        })
        return next()
    }
    const delta = req.body && req.body.delta
    if(!delta) {
        res.send(400,{
            error: "missing delta variable in body"
        })
        return next()
    }
    const storeInstance = store.getInstance()
    const deltaAmount = parseFloat(delta)
    const current = cash.instance(storeInstance).current(userID)
    if(deltaAmount > current) {
        res.send(400,{
            error: "Insufficient funds"
        })
        return next()
    }
    const updated = cash.instance(storeInstance).withdraw(userID, deltaAmount)
    
    res.send(200,{
      "cash": updated,
    });
    return next();
}

const current = (req, res, next) => {
    // update cash
    const userID = req.params.userID
    if(!userID) {
        res.send(400,{
            error: "Missing userID parameter in URL"
        })
        return next()
    }
    
    const storeInstance = store.getInstance()
    const current = cash.instance(storeInstance).current(userID)
   
    res.send(200,{
      "cash": current,
    });
    return next();
}


module.exports = {
    add,
    withdraw,
    current,
}