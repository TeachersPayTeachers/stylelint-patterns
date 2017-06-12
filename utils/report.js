'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var ruleName = _ref.ruleName,
      result = _ref.result,
      message = _ref.message,
      line = _ref.line,
      node = _ref.node,
      index = _ref.index,
      word = _ref.word;

  result.stylelint = result.stylelint || {};

  // In quiet mode, mere warnings are ignored
  if (result.stylelint.quiet && result.stylelint.ruleSeverities[ruleName] !== 'error') {
    return;
  }

  // If a line is not passed, use the node.positionBy method to get the
  // line number that the complaint pertains to
  var startLine = line || node.positionBy({ index: index }).line;

  if (result.stylelint.disabledRanges) {
    var ranges = result.stylelint.disabledRanges[ruleName] || result.stylelint.disabledRanges.all;
    for (var range in ranges) {
      if (ranges.hasOwnProperty(range)
      // If the violation is within a disabledRange,
      // and that disabledRange's rules include this one,
      // do not register a warning
      && range.start <= startLine && (range.end >= startLine || range.end === undefined) && (!range.rules || range.rules.indexOf(ruleName) !== -1)) {
        return;
      }
    }
  }

  var severity = (0, _lodash.get)(result.stylelint, ['ruleSeverities', ruleName], 'ignore');

  if (typeof severity === 'undefined') {
    throw new Error('The rule name \'' + ruleName + '\' has no corresponding registered severity.\n\n' + 'This is most likely a bug in stylelint: please file an issue with this stack trace ' + 'at\nhttps://github.com/stylelint/stylelint/issues');
  }

  if (!result.stylelint.stylelintError && severity === 'error') {
    result.stylelint.stylelintError = true;
  }

  var warningProperties = {
    severity: severity,
    rule: ruleName
  };

  if (node) {
    warningProperties.node = node;
  }

  if (index) {
    warningProperties.index = index;
  }

  if (word) {
    warningProperties.word = word;
  }

  var warningMessage = (0, _lodash.get)(result.stylelint, ['customMessages', ruleName], message);
  result.warn(warningMessage, warningProperties);
};

var _lodash = require('lodash');