'use strict'

function renderPayload (body) {
  const { id, img, title, price, unit } = body
  return { id, img, title, price, unit }
}

class MercadoPagoController {
  store (req, res) {
    try {
      return res.json(renderPayload(req.body))
    } catch (error) {
      const { status: code, message } = error
      return res.status(status).json({
        code,
        message
      })
    }
  }

  update (req, res) {
    return res.json({})
  }
}

module.exports = new MercadoPagoController()
