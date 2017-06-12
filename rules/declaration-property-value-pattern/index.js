'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.ruleName = undefined;

exports.default = function (whitelist) {
  var errors = 0;

  return function (root, result) {
    root.walkDecls(function (decl) {
      var prop = decl.prop,
          value = decl.value;

      var unprefixedProp = _postcss.vendor.unprefixed(prop);
      var patternWhitelist = whitelist[unprefixedProp];
      var parentIdentifier = parentProperties[unprefixedProp];
      if (parentIdentifier && (0, _lodash.isEmpty)(patternWhitelist)) {
        patternWhitelist = whitelist[parentIdentifier];
      }
      if (!patternWhitelist || (0, _lodash.isEmpty)(patternWhitelist)) {
        return;
      }

      // Create a mass regular expression that encapsulates all given patterns
      var reStr = patternWhitelist.map(function (pattern) {
        var patternBody = pattern;
        if (patternBody.startsWith('/') && patternBody.endsWith('/')) {
          patternBody = patternBody.slice(1, -1);
        }
        return '(' + patternBody + ')';
      }).join('|');
      var re = new RegExp('(' + reStr + ')+');

      // Go through each part of the value and test it against the new regex
      value.split(' ').forEach(function (val) {
        if (!re.test(val)) {
          (0, _utils.report)({
            message: messages.rejected(prop, val, patternWhitelist),
            node: decl,
            result: result,
            ruleName: ruleName
          });

          errors += 1;
        }
      });
    });
  };
};

var _postcss = require('postcss');

var _lodash = require('lodash');

var _utils = require('../../utils');

var parentProperties = {
  'margin-top': 'margin',
  'margin-left': 'margin',
  'margin-bottom': 'margin',
  'margin-right': 'margin',
  'padding-top': 'padding',
  'padding-left': 'padding',
  'padding-bottom': 'padding',
  'padding-right': 'padding'
};
// Utilities
// Libraries
var ruleName = exports.ruleName = 'declaration-property-value-pattern';

var messages = exports.messages = (0, _utils.ruleMessages)(ruleName, {
  rejected: function rejected(property, value, patterns) {
    return 'Unexpected value "' + value + '" for property "' + property + '".';
  }
});