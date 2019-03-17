const search = require('../../../search')

module.exports = (req, res, next) => {
    const keyword = req.body.q
    if(!keyword) {
        res.send(200,{
            "results": []
          });
    }
    search.search(keyword)
    .then((r) => {
        res.send(200,{
            results: r
        });
        return next();
    })
    .catch((e)=>{
        res.send(500,{
            error: `Error encountred: ${e}`
        });
        return;
    })
   
    
}