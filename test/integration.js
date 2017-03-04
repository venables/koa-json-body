'use strict'

/* eslint-env mocha */

const body = require('../')
const Koa = require('koa')
const request = require('supertest')

describe('integration', function () {
  let app

  before(function () {
    app = new Koa()
    app.use(body())
    app.use((ctx) => {
      ctx.body = ctx.request.body
    })
  })

  it('does nothing on a GET request', function () {
    return request(app.listen())
      .get('/')
      .expect(204)
  })

  it('does nothing on a DELETE request', function () {
    return request(app.listen())
      .delete('/')
      .expect(204)
  })

  it('parses JSON and assigns it to ctx.request.body', function () {
    return request(app.listen())
      .post('/')
      .send({
        something: 'awesome'
      })
      .expect(200, { something: 'awesome' })
  })

  it('silently handles invalid JSON', function () {
    return request(app.listen())
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send('{ "not": "json"')
      .expect(204)
  })
})
