/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Export `assert`.
 */

global.assert = chai.assert;

/**
 * Do not show diffs.
 */

chai.Assertion.showDiff = false;

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Export the subject.
 */

global.instance = require('../../');
