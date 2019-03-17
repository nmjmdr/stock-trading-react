const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
});


function setup(server) {
  server.pre(cors.preflight)
  server.use(cors.actual)
  server.pre(restify.pre.sanitizePath());

  server.use(restify.plugins.queryParser({ mapParams: true }));
  server.use(restify.plugins.bodyParser({ mapParams: false }));
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.requestLogger());
  server.on('NotFound', function (req, res, err, cb) {
    return cb();
  });
  server.on('uncaughtException', function(req, res, route, err) {
    console.log(err);
    if (res._header) {
      return res.end();
    } else {
    return res.send(503, 'Service not available');
    }
  });
}

exports.create = () => {
  const server = restify.createServer();
  setup(server);
  return server;
}