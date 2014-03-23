'use strict';

var coBody = require('co-body');

var initialize = function(opts) {
  opts = opts || {};

  return function *(next) {
    try {
      if (this.is('application/json')) {
        this.request.body = yield coBody.json(this, opts);
      }
    } catch() {}

    yield next;
  }
}

module.exports = initialize;
