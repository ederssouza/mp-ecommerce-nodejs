'use strict'

const mercadopago = require('mercadopago')
const { isValidObject } = require('../utils/helpers')
const { mercadoPagoInit, renderPayload } = require('../utils/mercadoPago')

class MercadoPagoController {
  async show (req, res) {
    try {
      await mercadoPagoInit()
      const orderId = req.params.id

      if (!orderId) {
        return res.status(400).json({ error: 'Order id is required' })
      }

      const { body } = await mercadopago.payment.get(orderId)
      return res.json(body)
    } catch (error) {
      return res.json(error)
    }
  }

  async store (req, res) {
    try {
      await mercadoPagoInit()

      const payload = renderPayload(req.body)
      const response = await mercadopago.preferences.create(payload)
      const data = response && isValidObject(response.body) ? response.body : {}

      return res.json({
        init_point: response.body.init_point,
        sandbox_init_point: response.body.sandbox_init_point,
        body: data
      })
    } catch (error) {
      return res.json(error)
    }
  }

  update (req, res) {
    const notification = { ...req.body }
    console.log(notification)
    return res.json(notification)
  }
}

module.exports = new MercadoPagoController()
