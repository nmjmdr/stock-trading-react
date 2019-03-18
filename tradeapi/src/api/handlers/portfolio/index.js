const store = require('../../../store');
const portfolio = require('../../../portfolio')
const market = require('../../../market')

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

    const assets = Object.keys(current).map((k)=>{
        return current[k]
    })

    const pricePromises = assets.map((asset)=>{
        return market.price(asset.symbol)
    })
    
    Promise.all(pricePromises)
    .then((prices)=>{
      return combine(assets, prices)
    })
    .then((combined)=>{
        res.send(200,{
            "folio": assets,
          });
          return next();
    })
    .catch((err)=>{
        res.send(500,{
            error: err,
        })
    })
    
}


module.exports = {
    get,
}