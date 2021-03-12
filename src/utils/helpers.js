'use strict'

module.exports = {
  isValidObject (val) {
    return Boolean(val && typeof val === 'object' && Object.keys(val).length)
  }
}
