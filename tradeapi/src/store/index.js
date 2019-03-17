// in memory store simulating a db

const store = () => {
    const m = {}

    const upsert = (key, val) => {
        m[key] = val;
    }
    const del = (key) => {
        delete m[key];
    }
    const get = (key) => {
        return m[key]
    }

    return {
        upsert,
        del,
        get,
    }
}

const instance = store()

module.exports = {
    getInstance: () => {
        return instance;
    }
}

