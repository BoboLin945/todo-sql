const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// index
app.get('/', (req, res) => {
  res.send(`hello world!`)
})

// login page
app.get('/users/login', (req, res) => {
  res.render('login')
})
// login
app.post('/users/login', (req,res) => {
  
})
// logout

// register page
app.get('/users/register', (req, res) => {
  res.render('register')
})
// register
app.post('/users/register', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})