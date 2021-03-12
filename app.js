'use strict'

const express = require('express')
const exphbs = require('express-handlebars')
const { join } = require('path')

const MercadoPagoController = require('./src/controllers/MercadoPagoController')

const port = process.env.PORT || 3000
const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('assets'))

app.use('/assets', express.static(join(__dirname, 'assets')))

// handlebars views
app.get('/', (req, res) => res.render('home'))
app.get('/detail', (req, res) => res.render('detail', req.query))
app.get('/checkout/pagamento-rejeitado', (req, res) => res.render('payment-rejected', req.query))
app.get('/checkout/pagamento-pendente', (req, res) => res.render('pending-payment', req.query))
app.get('/checkout/pagamento-aprovado', (req, res) => res.render('payment-accept', req.query))

// mercado pago
app.get('/api/v1/mercadopago/index', MercadoPagoController.index)
app.get('/api/v1/mercadopago/show', MercadoPagoController.show)
app.post('/api/v1/mercadopago/store', MercadoPagoController.store)
app.put('/api/v1/mercadopago/update', MercadoPagoController.update)
app.delete('/api/v1/mercadopago/delete', MercadoPagoController.delete)

app.listen(port)
