async function routes (fastify) {
  const { v4: uuidv4 } = require('uuid')

  // CRUD -Blog
  let posts = [
    { id: '1', title: 'Title one', content: 'Content one' },
    { id: '2', title: 'Title two', content: 'Content two' },
    { id: '3', title: 'Title three', content: 'Content three' },
  ]

  // get all
  fastify.get('/posts', (req, res) => {
    res.send(posts)
  })

  // get one
  fastify.get('/posts/:id', (req, res) => {
    const id = req.params.id
    const result = posts.find(post => post.id === id)

    if (result !== undefined) {
      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'post not found' })
    }
  })

  // add one post
  fastify.post('/posts', (req, res) => {
    let newPost = req.body
    newPost.id = uuidv4().toString()

    posts = [...posts, newPost]
    res.status(201).send({ message: 'new post added successfully' })
  })

  // delete post
  fastify.delete('/posts/:id', (req, res) => {
    const prevLength = posts.length

    posts = posts.filter(post => post.id !== req.params.id)
    if (prevLength > posts.length) {
      res.status(201).send({ message: 'post deleted successfully' })
    } else {
      res.status(404).send({ message: 'post not found' })
    }
  })

  // edit post
  fastify.put('/posts/:id', (req, res) => {
    let index = posts.findIndex(post => post.id === req.params.id)
    posts[index] = {
      ...posts[index],
      title: req.body.title,
      content: req.body.content
    }

    res.status(201).send({ message: 'post edit successfully' })
  })
}

module.exports = routes