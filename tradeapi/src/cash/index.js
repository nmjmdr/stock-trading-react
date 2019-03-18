const instance = (store) => {
   
    const add = (userID, amount) => {
        const key = `cash_${userID}`
        let current = store.get(key)
        if(!current) {
            current = 0;
        }
        store.upsert(key, (current+amount))
        return current + amount
    }

    const withdraw = (userID, amount) => {
        const key = `cash_${userID}`
        let current = store.get(key)
        if(!current) {
            current = 0;
        }
        if(current < amount) {
            return current;
        }
        store.upsert(key, (current-amount))
        return current - amount
    }

    const current = (userID) => {
        const key = `cash_${userID}`
        const current = store.get(key)
        if(!current) {
            return 0
        }
        return current
    }

    return {
        add,
        withdraw,
        current,
    }
}

module.exports = {
    instance,
}