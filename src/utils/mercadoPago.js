'use strict'

const mercadopago = require('mercadopago')

module.exports = {
  async mercadoPagoInit () {
    await mercadopago.configure({
      sandbox: true,
      access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      integrator_id: process.env.MERCADO_PAGO_INTEGRATOR_ID
      // 'x-integrator-id': process.env.MERCADO_PAGO_INTEGRATOR_ID
    })
  },

  renderPayload (body) {
    const { id, img, title, price, unit } = body

    return {
      items: [
        {
          id,
          title,
          currency_id: 'BRL',
          picture_url: img,
          description: title,
          category_id: 'mobile',
          quantity: unit,
          unit_price: price
        }
      ],
      payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: 'test_user_92801501@testuser.com',
        phone: {
          area_code: '55',
          number: 985298743
        },
        identification: {
          type: 'CPF',
          number: '27482519033'
        },
        address: {
          street_name: 'Insurgentes Sur',
          street_number: 1602,
          zip_code: '78134-190'
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'amex'
          }
        ],
        installments: 6
      },
      back_urls: {
        success: 'https://ederssouza-mp-ecommerce-nodejs.herokuapp.com/checkout/pagamento-aprovado',
        pending: 'https://ederssouza-mp-ecommerce-nodejs.herokuapp.com/checkout/pagamento-pendente',
        failure: 'https://ederssouza-mp-ecommerce-nodejs.herokuapp.com/checkout/pagamento-rejeitado'
      },
      auto_return: 'approved',
      notification_url: 'https://ederssouza-mp-ecommerce-nodejs.herokuapp.com/api/v1/mercadopago/notifications',
      // notification_url: 'https://webhook.site/3710f3f0-5853-4892-a828-cb548cb05b1f',
      statement_descriptor: 'Tienda e-commerce',
      external_reference: 'edersampaio@outlook.com.br' // TO DO
    }
  }
}
