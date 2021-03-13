'use strict'

const express = require('express')
const exphbs = require('express-handlebars')
const { join } = require('path')
require('dotenv/config')
require('./src/utils/handlebars')

const MercadoPagoController = require('./src/controllers/MercadoPagoController')

const port = process.env.PORT || 3000
const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('assets'))
app.use('/assets', express.static(join(__dirname, 'assets')))

// handlebars views
app.get('/', (req, res) => res.render('home'))
app.get('/detail', (req, res) => res.render('detail', req.query))
app.get('/checkout/pagamento-rejeitado', (req, res) => res.render('payment-rejected', req.query))
app.get('/checkout/pagamento-pendente', (req, res) => res.render('pending-payment', req.query))
app.get('/checkout/pagamento-aprovado', (req, res) => res.render('payment-accept', req.query))

// mercado pago
app.post('/api/v1/mercadopago/create', MercadoPagoController.store)
app.post('/api/v1/mercadopago/notifications', MercadoPagoController.update)

app.listen(port)
