const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User

// login page
router.get('/login', (req, res) => {
  res.render('login')
})
// login
router.post('/login', (req, res) => {

})
// logout

// register page
router.get('/register', (req, res) => {
  res.render('register')
})
// register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({
    name, email, password
  })
    .then(user => res.redirect('/'))
})

module.exports = router
