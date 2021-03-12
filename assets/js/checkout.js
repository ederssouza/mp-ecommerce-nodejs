(function () {
  'use strict'

  const $paymentButton = document.querySelector('[data-js="payment-button"]')
  $paymentButton.addEventListener('click', createCheckout, false)

  function getUrlParam (param) {
    const url = new URL(window.location.href)
    return url.searchParams.get(param)
  }

  function renderPaylod () {
    const id = getUrlParam('id') ? Number(getUrlParam('id')) : null
    const img = getUrlParam('img') ? location.origin + getUrlParam('img') : null
    const title = getUrlParam('title') || null
    const price = getUrlParam('price') ? Number(getUrlParam('price')) : null
    const unit = getUrlParam('unit') ? Number(getUrlParam('unit')) : null

    return {
      id,
      img,
      title,
      price,
      unit
    }
  }

  function createCheckout (e) {
    e.preventDefault()
    const url = location.origin + '/api/v1/mercadopago/create'

    window.axios.post(url, renderPaylod())
      .then(function (response) {
        redirectToCheckout(response.data.init_point)
      }).catch(function (error) {
        console.log(error)
      })
  }

  function redirectToCheckout (href) {
    const $a = document.createElement('a')
    $a.href = href
    $a.target = '_blank'
    $a.click()
    $a.remove()
  }
})()
