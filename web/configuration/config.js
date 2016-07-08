"use strict"

const _ = require('lodash');
const environment = process.env.NODE_ENV || 'production';

function Config (config) {
    _.assign(this, config);
}

module.exports = new Config(require('./'.concat(environment)).getConfig());