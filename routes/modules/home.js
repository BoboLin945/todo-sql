const express = require('express')
const router = express.Router()

// index
router.get('/', (req, res) => {
  res.send(`hello world!`)
})

module.exports = router