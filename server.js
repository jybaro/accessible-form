const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);


server.use(jsonServer.bodyParser)
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.method = 'GET'
    req.query = req.body
  }
  next()
})

server.post('/comments', function (req, res, next) {
  req.method = 'GET'
  req.query = req.body
  next()
})


server.use(router);
server.listen(port);