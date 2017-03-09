/**
 * global || window
 */

var root = typeof global !== 'undefined'
  ? global
  : window;

/**
 * toString.
 */

var toString = Object.prototype.toString;

/**
 * Check if `input` is String, Function or Object.
 *
 * @param {String} type
 * @param {Mixed} input
 * @returns {Boolean}
 * @api private
 */

function is(type, input) {
  if (type === 'Object') return Object(input) === input;
  return toString.call(input) === '[object ' + type + ']';
}

/**
 * Check if `input` is a string and if so, either
 * refer to the global scope or `require` it. Then
 * call `instance` again in case the exported object
 * is a function.
 *
 * @param {Mixed} input
 * @api private
 */

function str(input) {
  if (!is('String', input)) return;
  return instance(root[input] || require(input));
}

/**
 * Check if `input` is a function and if so instantiate it.
 *
 * @param {Mixed} input
 * @api private
 */

function fn(input) {
  if (!is('Function', input)) return;
  return new input;
}

/**
 * Check if `input` is an object and if so assume it
 * is already an instance of something and return it
 * back;
 *
 * @param {Mixed} input
 * @api private
 */

function obj(input) {
  if (!is('Object', input)) return;
  return input;
}

/**
 * Raise error.
 *
 * @param {Mixed} input
 * @api private
 */

function raise(input) {
  throw new TypeError("Can't handle: " + input);
}

/**
 * input is String    - instnace(global[input] || require(input))
 * input is Function  - `new input`
 * input is Object    - return input
 * else raise hell
 *
 * @param {Mixed} input
 * @returns {Object}
 * @api public
 */

function instance(input) {
  return str(input)
    || fn(input)
    || obj(input)
    || raise(input);
};

/**
 * Primary export.
 */

module.exports = instance;
