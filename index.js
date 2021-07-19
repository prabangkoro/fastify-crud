const fastify = require('fastify')({
  logger: true
})

fastify.get('/', (req, res) => {
  res.send('Hello world')
})

fastify.register(require('./posts'))


fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})