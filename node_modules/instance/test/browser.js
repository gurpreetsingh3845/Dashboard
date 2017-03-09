it('can handle objects', function() {
  var obj = {};
  assert(instance(obj) === obj);
});

it('can handle constructors', function() {
  var fn = function Foo(){}
  var actual = instance(fn);

  assert(actual.constructor.name === 'Foo');
});

it('can handle strings available in the global scope', function() {
  window.foo = {};
  assert(instance('foo') === global.foo);
  global.foo = null;
});

it('can handle strings not available in the global scope', function() {
  var expected = require('chai');
  var actual = instance('chai');
  assert(expected === actual);
});

it('raises an error when unsupported type is given', function() {
  assert.throw(function() {
    instance(undefined);
  });

  assert.throw(function() {
    instance(NaN);
  });

  assert.throw(function() {
    instance(null);
  });
});
