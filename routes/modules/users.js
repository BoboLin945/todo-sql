const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const bcrypt = require('bcryptjs')

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
  User.findOne({ where: { email } })
    .then((user => {
      if (user) {
        console.log('User is already exists.')
        return res.render('register', { name, email, password, confirmPassword })
      }
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      })
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error))
    }))
})

module.exports = router
