const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  // 初始化
  app.use(passport.initialize())
  app.use(passport.session())

  // local login strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'The email is not registered!' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) { 
              console.log('password incorrect.')
              return done(null, false, { message: 'Email or Password incorrect.' }) }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id) // find user by id
      .then(user => {
        user = user.toJSON() // user 物件轉為 plain object，回傳給 req
        done(null, user)
      })
      .catch(err => done(err, null))
  })
}