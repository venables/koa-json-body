koa-json-body
=============

[![Version](https://img.shields.io/npm/v/koa-json-body.svg)](https://www.npmjs.com/package/koa-json-body)
[![Build Status](https://img.shields.io/travis/venables/koa-json-body/master.svg)](https://travis-ci.org/venables/koa-json-body)
[![Coverage Status](https://img.shields.io/coveralls/venables/koa-json-body.svg)](https://coveralls.io/github/venables/koa-json-body)
[![Dependency Status](https://img.shields.io/david/venables/koa-json-body/master.svg)](https://david-dm.org/venables/koa-json-body)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Downloads](https://img.shields.io/npm/dm/koa-json-body.svg)](https://www.npmjs.com/package/koa-json-body)

----------

A single-purpose [koa](https://github.com/koajs/koa) middleware to only parse JSON request bodies and nothing else.

By default, this libarary parses all **valid** JSON bodies on `POST`, `PUT`, and `PATCH` requests, and assigns the value to `ctx.request.body`.

If there is a JSON parsing error, or if the request is not of valid type, `ctx.request.body` is not set, and will be `undefined`. If the JSON request payload is too large (by [default](#options), the limit is `1mb`), a `413 Payload Too Large` error will be thrown.

To ensure `ctx.request.body` contains an empty object `{}` (rather than `undefined`) on missing/invalid payloads, you can set the [`fallback` option](#options) to `true`.

Installation
------------

```bash
yarn add koa-json-body
```

or via npm:

```bash
npm install koa-json-body --save
```

Options
-------

* `fallback` - when set to `true`, `ctx.request.body` will always contain `{}` upon missing or invalid payloads. (default: `false`)
* `limit` - number or string representing the request size limit (default: `1mb`)
* `strict` - when set to `true`, koa-json-body will only accept arrays and objects. (default: `true`)

Additional options available via [co-body](https://github.com/cojs/co-body).

Usage
-----

On a every route:

```javascript
const body = require('koa-json-body')

app.use(body({ limit: '10kb', fallback: true }))

app.use((ctx, next) => {
  console.log(ctx.request.body)
})
```

On a per-route basis (this example uses [koa-router](https://github.com/alexmingoia/koa-router)):

```javascript
const body = require('koa-json-body')({ limit: '10kb' })

app.post('/users', body, (ctx, next) => {
  console.log(ctx.request.body)
})
```


Testing
-------

To test, simply run

```
yarn test
```


Made for koa 2 and beyond
-------------------------

For koa 0.x and 1.x support, see the [koa-1](https://github.com/venables/koa-json-body/tree/koa-1) branch.
