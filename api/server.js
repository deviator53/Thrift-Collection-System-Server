// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = router.db.get('users').find({ id: userId }).value();
  
    if (user) {
      res.jsonp(user);
    } else {
      res.status(404).jsonp({ error: 'User not found' });
    }
  });
  
  server.use('/api', router);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/users/:id': '/users/:id',
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server
