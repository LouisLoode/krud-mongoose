'use strict';

var path = require('path');
var responseTime = require('koa-response-time');
var logger = require('koa-logger');
var cors = require('koa-cors');

var genres = require('./libs/responses');

module.exports = function(app, config) {
  if (!config.server.keys) { throw new Error('Please add session secret key in the config file!'); }
  app.keys = config.server.keys;

  if (config.server.env !== 'test') {
    app.use(logger());
  }

  app.use(cors());

  app.use(genres());

  app.use(responseTime());

};
