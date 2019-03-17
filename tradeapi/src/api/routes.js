const status = require('./handlers/status');
const funds = require('./handlers/funds')
const search = require('./handlers/search')
const trade = require('./handlers/trade')
const portfolio = require('./handlers/portfolio')

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

  app.post({ name: "buy",
    path: "/trade/:userID/buy"
  }, [trade.buy]);

  app.get({ name: "folio",
    path: "/folio/:userID"
  }, [portfolio.get]);

}