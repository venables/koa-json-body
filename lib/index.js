'use strict'

const body = require('co-body')

/**
 * Enable the koa-json-body middleware
 *
 * @params {Object} [opts] - The options object (optional)
 * @returns {Function} - The koa-json-body middleware
 */
module.exports = function (opts) {
  let _opts = opts || { strict: true, limit: '1mb', fallback: false }

  return (ctx, next) => {
    if (_opts.fallback) {
      ctx.request.body = {}
    }

    if (ctx.method === 'GET' || ctx.method === 'DELETE') {
      return next()
    }

    return body.json(ctx.req, _opts).then((body) => {
      ctx.request.body = body
      return next()
    }, (err) => {
      if (err.statusCode) {
        ctx.throw(err)
      }

      return next(err)
    })
  }
}
