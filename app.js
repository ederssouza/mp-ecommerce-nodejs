'use strict'

const express = require('express')
const exphbs = require('express-handlebars')
const { join } = require('path')

const port = process.env.PORT || 3000
const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('assets'))

app.use('/assets', express.static(join(__dirname, 'assets')))

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/detail', function (req, res) {
  res.render('detail', req.query)
})

app.listen(port)
