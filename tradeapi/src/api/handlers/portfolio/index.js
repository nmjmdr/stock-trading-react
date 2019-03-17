const store = require('../../../store');
const portfolio = require('../../../portfolio')


const get = (req, res, next) => {
    const userID = req.params.userID
    if(!userID) {
        res.send(400,{
            error: "Missing userID parameter in URL"
        })
        return next()
    }
    
    const storeInstance = store.getInstance()
    const current = portfolio.instance(storeInstance).current(userID)
   
    res.send(200,{
      "folio": current,
    });
    return next();
}


module.exports = {
    get,
}