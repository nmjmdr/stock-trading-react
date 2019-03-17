const instance = (store) => {
   
    const add = (userID, symbol, quantity, price) => {
        const key = `portfolio_${userID}`
        let folio = store.get(key)
        if(!folio) {
            folio = {};
        }
        folio[symbol] = {
            symbol,
            quantity,
            price,
        }
        store.upsert(key, folio)
        return folio
    }

    const current = (userID) => {
        const key = `portfolio_${userID}`
        const folio = store.get(key)
        if(!folio) {
            return {}
        }
        return folio
    }

    return {
        add,
        current,
    }
}

module.exports = {
    instance,
}