const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo

// create page
router.get('/create', (req, res) => {
  res.render('create')
})
// create
router.post('/', (req,res) => {
  const UserId = req.user.id
  const { name } = req.body
  Todo.create({
    name,
    UserId
  })
  .then(() => {
    res.redirect('/')
  })
})

// read
router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then(todo => { res.render('detail', { todo: todo.toJSON() }) })
    .catch(error => { console.log(error) })
})

// update
// delete

module.exports = router