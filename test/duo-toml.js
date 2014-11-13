/**
 * Module Dependencies
 */

var join = require('path').join;
var assert = require('assert');
var toml = require('../');
var Duo = require('duo');
var vm = require('vm');

/**
 * Tests
 */

describe('duo-toml', function() {

  it('should support json', function (done) {
    var duo = build('toml')
    duo.use(toml());
    duo.run(function(err, js) {
      if (err) return done(err);
      var ctx = evaluate(js).main;
      var out = require(join(path('toml'), 'build.json'));
      assert.deepEqual(ctx, out);
      done();
    })
  });
})

/**
 * Build js `fixture` and return `str`.
 *
 * @param {String} fixture
 * @return {String}
 */

function build(fixture, file){
  var root = path(fixture);
  var duo = Duo(root).entry(file || 'index.js').cache(false);
  return duo;
}

/**
 * Path to `fixture`
 */

function path(fixture){
  return join(__dirname, 'fixtures', fixture);
}

/**
 * Evaluate `js`.
 *
 * @return {Object}
 */

function evaluate(js, ctx){
  var ctx = { window: {}, document: {} };
  vm.runInNewContext('main =' + js + '(1)', ctx, 'main.vm');
  vm.runInNewContext('require =' + js + '', ctx, 'require.vm');
  return ctx;
}
