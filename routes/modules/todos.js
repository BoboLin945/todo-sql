const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo

// create page
router.get('/create', (req, res) => {
  res.render('create')
})

// create function
router.post('/', (req, res) => {
  const UserId = req.user.id
  const { name } = req.body
  Todo.create({
    name,
    UserId
  })
    .then(() => {
      req.flash('success_msg', '新增成功。')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// read
router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then(todo => { res.render('detail', { todo: todo.toJSON() }) })
    .catch(error => { console.log(error) })
})

// update page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.toJSON() }))
    .catch(err => console.log(err))
})

// update function
router.put('/:id', (req, res) => {
  const { name, isDone } = req.body
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if (isDone === 'on') { todo.isDone = true } 
      // else { todo.isDone = false }
      return todo.save()
    })
    .then(() => {
      req.flash('success_msg', '修改成功。')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const UserId = req.user.id
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      todo.destroy()
    })
    .then(() => {
      req.flash('success_msg', '刪除成功。')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

module.exports = router