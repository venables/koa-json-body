'use strict'

const body = require('co-body')

module.exports = function (opts) {
  opts = opts || { strict: true }

  return (ctx, next) => {
    if (ctx.method === 'GET' || ctx.method === 'DELETE') {
      return next()
    }

    return body.json(ctx.req, opts).then((body) => {
      ctx.request.body = body
      return next()
    }, (err) => {
      return next(err)
    })
  }
}
