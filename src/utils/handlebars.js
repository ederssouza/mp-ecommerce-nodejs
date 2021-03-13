'use strict'

const Handlebars = require('handlebars')
const fs = require('fs')
const { join } = require('path')

const partialsDir = join(__dirname, '..', '..', 'views', 'partials')
const filenames = fs.readdirSync(partialsDir)

Handlebars.registerHelper('ifvalue', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

filenames.forEach(function (filename) {
  const matches = /^([^.]+).handlebars$/.exec(filename)
  if (!matches) return
  const name = matches[1]
  const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8')
  Handlebars.registerPartial(name, template)
})
