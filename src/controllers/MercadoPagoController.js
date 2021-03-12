'use strict'

const mercadopago = require('mercadopago')
const { isValidObject } = require('../utils/helpers')
const { mercadoPagoInit, renderPayload } = require('../utils/mercadoPago')

class MercadoPagoController {
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
    return res.json({})
  }
}

module.exports = new MercadoPagoController()
