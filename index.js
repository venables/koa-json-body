'use strict';

var coBody = require('co-body');

var initialize = function(opts) {
  opts = opts || {};

  return function *(next) {
    this.request.body = {};

    try {
      if (this.is('application/json')) {
        this.request.body = yield coBody.json(this, opts);
      }
    } catch(e) {
    }

    yield next;
  }
}

module.exports = initialize;
