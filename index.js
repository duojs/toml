/**
 * Module Dependencies
 */

var TOML = require('toml');

/**
 * Export `plugin`
 */

module.exports = plugin;

/**
 * TOML plugin
 *
 * @param {Object} opts
 * @return {Function}
 * @api public
 */

function plugin(opts) {
  opts = opts || {};

  return function toml(file) {
    if ('toml' != file.type) return;
    file.src = JSON.stringify(TOML.parse(file.src));
    file.type = 'json';
  }
}
