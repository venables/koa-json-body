'use strict';

var parse = require('co-body');

var initialize = function(opts) {
  opts = opts || { strict: true };

  return function *(next) {
    if (this.method !== 'GET' && this.method !== 'DELETE') {
      this.request.body = yield parse.json(this, opts);
      this.body = this.request.body;
    }

    yield next;
  };
};

module.exports = initialize;
