'use strict';

var path = require('path');
var _ = require('lodash');

var specific = {
    server: {
      protocol: 'http',
      host: '127.0.0.1:8000',
      url: 'http://127.0.0.1:8000',
      port: 8000,
      name: 'Starter Koa - Dev',
      keys: [ 'super-secret' ],
      secret: 'secret for JWT'
    },
    front: {
      url : 'http://localhost:8080'
    },
    db: {
      mongo: {
        user: '',
        pass: '',
        host: '127.0.0.1',
        port: 27017,
        database: 'secret-project'
      }
    }
  };

module.exports = _.merge(specific);
