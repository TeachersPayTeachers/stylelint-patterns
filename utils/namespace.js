'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = namespace;
var prefix = 'stylelint-patterns';

/**
 * Lock a rule name into the `tpt-stylelint` namespace
 *
 * @param {String} ruleName The name of the rule
 * @return {String}
 */
function namespace(ruleName) {
  return prefix + '/' + ruleName;
}