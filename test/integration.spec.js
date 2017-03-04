'use strict'

/* eslint-env mocha */

const body = require('../')
const Koa = require('koa')
const request = require('supertest')

describe('integration', function () {
  let app

  describe('default options', function () {
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

    it('parses JSON Objects and assigns it to ctx.request.body', function () {
      return request(app.listen())
        .post('/')
        .send({
          something: 'awesome'
        })
        .expect(200)
        .expect({ something: 'awesome' })
    })

    it('parses JSON Arrays and assigns it to ctx.request.body', function () {
      return request(app.listen())
        .post('/')
        .send(['a', 'b', 'c'])
        .expect(200)
        .expect(['a', 'b', 'c'])
    })

    it('ignores invalid JSON', function () {
      return request(app.listen())
        .post('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send('{ "not": "json"')
        .expect(204)
    })

    it('ignores non-object or array JSON by default', function () {
      return request(app.listen())
        .post('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send('not an object')
        .expect(204)
    })
  })

  describe('the `fallback` option', function () {
    before(function () {
      app = new Koa()
      app.use(body({ fallback: true }))
      app.use((ctx) => {
        ctx.body = ctx.request.body
      })
    })

    it('sets ctx.request.body to {} on a GET request', function () {
      return request(app.listen())
        .get('/')
        .expect(200)
        .expect({})
    })

    it('sets ctx.request.body to {} on a DELETE request', function () {
      return request(app.listen())
        .delete('/')
        .expect(200)
        .expect({})
    })

    it('parses JSON Objects and assigns it to ctx.request.body', function () {
      return request(app.listen())
        .post('/')
        .send({
          something: 'awesome'
        })
        .expect(200)
        .expect({ something: 'awesome' })
    })

    it('parses JSON Arrays and assigns it to ctx.request.body', function () {
      return request(app.listen())
        .post('/')
        .send(['a', 'b', 'c'])
        .expect(200)
        .expect(['a', 'b', 'c'])
    })

    it('ignores invalid JSON, and sets ctx.request.body to {}', function () {
      return request(app.listen())
        .post('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send('{ "not": "json"')
        .expect(200)
        .expect({})
    })

    it('ignores non-object or array JSON, and sets ctx.request.body to {}', function () {
      return request(app.listen())
        .post('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send('not an object')
        .expect(200)
        .expect({})
    })
  })

  describe('the `limit` option', function () {
    before(function () {
      app = new Koa()
      app.use(body({ limit: '10' }))
      app.use((ctx) => {
        ctx.body = ctx.request.body
      })
    })

    it('handles anything less than the limit', function () {
      return request(app.listen())
        .post('/')
        .send({
          a: 'ok'
        })
        .expect(200)
        .expect({ a: 'ok' })
    })

    it('returns a `413 "Payload Too Large" error if the limit is exceeded', function () {
      return request(app.listen())
        .post('/')
        .send({
          too: 'large'
        })
        .expect(413)
    })
  })

  describe('the `strict` option', function () {
    before(function () {
      app = new Koa()
      app.use(body({ strict: false }))
      app.use((ctx) => {
        ctx.body = ctx.request.body
      })
    })

    it('allows for non-object bodies', function () {
      return request(app.listen())
        .post('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(1234567)
        .expect(200)
        .expect('1234567')
    })
  })
})
