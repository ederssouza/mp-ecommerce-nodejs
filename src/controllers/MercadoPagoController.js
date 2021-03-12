'use strict'

class MercadoPagoController {
  index (req, res) {
    return res.json({
      path: 'index',
      status: 'ok'
    })
  }

  show (req, res) {
    return res.json({
      path: 'show',
      status: 'ok'
    })
  }

  store (req, res) {
    return res.json({
      path: 'store',
      status: 'ok'
    })
  }

  update (req, res) {
    return res.json({
      path: 'update',
      status: 'ok'
    })
  }

  delete (req, res) {
    return res.json({
      path: 'delete',
      status: 'ok'
    })
  }
}

module.exports = new MercadoPagoController()
