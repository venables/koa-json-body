koa-json-body
=============

[![Version](https://img.shields.io/npm/v/koa-json-body.svg?style=flat-square)](https://www.npmjs.com/package/koa-json-body)
[![Dependency Status](https://img.shields.io/david/venables/koa-json-body/master.svg?style=flat-square)](https://david-dm.org/venables/koa-json-body)
[![Downloads](https://img.shields.io/npm/dm/koa-json-body.svg?style=flat-square)](https://www.npmjs.com/package/koa-json-body)

Simple [koa](https://github.com/koajs/koa) middleware wrapper around [co-body](https://github.com/visionmedia/co-body) for parsing JSON request bodies.

This will not parse anythig but valid JSON request bodies.  If there is a JSON parsing error, the middleware will set `ctx.request.body` to `{}` and continue.

Installation
------------

```bash
npm install koa-json-body --save
```

Options
-------

Available via [co-body](https://github.com/visionmedia/co-body):

* `limit` - number or string representing the request size limit (default: `1mb`)

Usage
-----

On a every route:

```javascript
var jsonBody = require('koa-json-body');

app.use(jsonBody({ limit: '10kb' }));

app.use(function(ctx, next) {
  console.log(ctx.request.body);
});
```

On a per-route basis (using [koa-router](https://github.com/alexmingoia/koa-router)):

```javascript
var jsonBody = require('koa-json-body')({ limit: '10kb' });

app.post('/users', jsonBody, function(ctx, next) {
  console.log(ctx.request.body);
});
```

Made for koa 2
--------------

For koa 0.x and 1.x support, see the [koa-1](https://github.com/venables/koa-json-body/tree/koa-1) branch.


Versioning
----------

Major versions will map to co-body major versions (e.g. koa-json-helmet 4.x.x uses co-body 4.y.y)
