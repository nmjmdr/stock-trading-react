const status = require('./handlers/status');
const funds = require('./handlers/funds')
const search = require('./handlers/search')

exports.create = (app) => {
  app.get({ name: "status",
    path: "/status"
  }, [status]);

  app.get({ name: "get-funds",
    path: "/funds/:userID"
  }, [funds.current]);

  app.post({ name: "add-funds",
    path: "/funds/:userID/add"
  }, [funds.add]);

  app.post({ name: "withdraw-funds",
    path: "/funds/:userID/withdraw"
  }, [funds.withdraw]);

  app.post({ name: "search",
    path: "/search"
  }, [search]);

}