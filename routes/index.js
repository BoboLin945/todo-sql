const express = require('express')
const router = express.Router()

const { authentication } = require('../middleware/auth')

const home = require('./modules/home')
const users = require('./modules/users')
const todos = require('./modules/todos')
const auth = require('./modules/auth')

router.use('/auth', auth)
router.use('/users', users)
router.use('/todos', authentication, todos)
router.use('/', authentication, home)

module.exports = router