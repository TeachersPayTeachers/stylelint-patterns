'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matchesStringOrRegExp;
function testAgainstString(value, comparison) {
  var comparisonIsRegex = comparison[0] === '/' && comparison[comparison.length - 1] === '/';

  if (comparisonIsRegex) {
    var valueMatches = new RegExp(comparison.slice(1, -1)).test(value);
    return valueMatches ? { match: value, pattern: comparison } : false;
  }

  return value === comparison ? { match: value, pattern: comparison } : false;
}

function testAgainstStringOrArray(value, comparison) {
  if (!Array.isArray(comparison)) {
    return testAgainstString(value, comparison);
  }

  for (var _iterator = comparison, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var comparisonItem = _ref;

    var testResult = testAgainstString(value, comparisonItem);
    if (testResult) {
      return testResult;
    }
  }

  return false;
}

/**
 * Compares a string to a second value that, if it fits a certain convention,
 * is converted to a regular expression before the comparison.
 * If it doesn't fit the convention, then two strings are compared.
 *
 * Any strings starting and ending with `/` are interpreted
 * as regular expressions.
 *
 * @param {string|array} input
 * @param {string|regexp|array} comparison
 * @return {boolean|object} `false` if no match is found.
 *   If a match is found, returns an object with these properties:
 *   - `match`: the `input` value that had a match
 *   - `pattern`: the `comparison` pattern that had a match
 */
function matchesStringOrRegExp(input, comparison) {
  if (!Array.isArray(input)) {
    return testAgainstStringOrArray(input, comparison);
  }

  for (var _iterator2 = input, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var inputItem = _ref2;

    var testResult = testAgainstStringOrArray(inputItem, comparison);
    if (testResult) {
      return testResult;
    }
  }

  return false;
}