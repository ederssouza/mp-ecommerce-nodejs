'use strict'

class MercadoPagoController {
  store (req, res) {
    try {
      const { id, img, title, price, unit } = req.body
      return res.json({ id, img, title, price, unit })
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
