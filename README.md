koa-json-body
=============

[![Version](https://img.shields.io/npm/v/koa-json-body.svg?style=flat-square)](https://www.npmjs.com/package/koa-json-body)
[![Dependency Status](https://img.shields.io/david/venables/koa-json-body/master.svg?style=flat-square)](https://david-dm.org/venables/koa-json-body)
[![Build Status](https://img.shields.io/travis/venables/koa-json-body/master.svg?style=flat-square)](https://travis-ci.org/venables/koa-json-body)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Downloads](https://img.shields.io/npm/dm/koa-json-body.svg?style=flat-square)](https://www.npmjs.com/package/koa-json-body)

Simple [koa](https://github.com/koajs/koa) middleware wrapper around [co-body](https://github.com/visionmedia/co-body) for parsing JSON request bodies.

This will not parse anythig but valid JSON request bodies on `POST`, `PUT`, and `PATCH` requests (any non `GET` or `DELETE` request).

If there is a JSON parsing error, or if the request is not of valid type, `ctx.request.body` is not set, and will be `undefined`.

If the JSON request payload is too large, a `413 Payload Too Large` error will be thrown.

Installation
------------

```bash
npm install koa-json-body --save
```

Options
-------

* `limit` - number or string representing the request size limit (default: `1mb`)
* `strict` - when set to `true`, koa-json-body will only accept arrays and objects. (default: `true`)

Additional options available via [co-body](https://github.com/cojs/co-body).

Usage
-----

On a every route:

```javascript
var jsonBody = require('koa-json-body')

app.use(jsonBody({ limit: '10kb' }))

app.use(function (ctx, next) {
  console.log(ctx.request.body)
})
```

On a per-route basis (using [koa-router](https://github.com/alexmingoia/koa-router)):

```javascript
var jsonBody = require('koa-json-body')({ limit: '10kb' })

app.post('/users', jsonBody, function (ctx, next) {
  console.log(ctx.request.body)
})
```

Made for koa 2
--------------

For koa 0.x and 1.x support, see the [koa-1](https://github.com/venables/koa-json-body/tree/koa-1) branch.


Versioning
----------

Major versions will map to co-body major versions (e.g. koa-json-helmet 4.x.x uses co-body 4.y.y)
