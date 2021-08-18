const express = require('express')
const router = express.Router()
const db = require('../../models')
const User = db.User
const bcrypt = require('bcryptjs')
const passport = require('passport')

// login page
router.get('/login', (req, res) => {
  res.render('login')
})
// login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'logout successful!')
  res.redirect('/users/login')
})
// register page
router.get('/register', (req, res) => {
  res.render('register')
})
// register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  let errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  } else {
    return User.findOne({ where: { email } })
      .then((user => {
        if (user) {
          errors.push({ message: 'Email 已被註冊過。' })
          return res.render('register', { name, email, password, confirmPassword, errors })
        }
        return User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })
          .then(() => res.redirect('/'))
          .catch((error) => console.log(error))
      }))
  }
})

module.exports = router
