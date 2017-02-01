// Libraries
import { vendor } from 'postcss';
import { isObject, isEmpty, find } from 'lodash';
// Utilities
import {
  matchesStringOrRegExp,
  report,
  ruleMessages
} from '../../utils';

const parentProperties = {
  'margin-top': 'margin',
  'margin-left': 'margin',
  'margin-bottom': 'margin',
  'margin-right': 'margin',
  'padding-top': 'padding',
  'padding-left': 'padding',
  'padding-bottom': 'padding',
  'padding-right': 'padding'
};

export const ruleName = 'declaration-property-value-pattern';

export const messages = ruleMessages(ruleName, {
  rejected(property, value, patterns) {
    return `Unexpected value "${value}" for property "${property}".`;
  }
});

export default function (whitelist) {
  let errors = 0;

  return (root, result) => {
    root.walkDecls((decl) => {
      const { prop, value } = decl;
      const unprefixedProp = vendor.unprefixed(prop);
      let patternWhitelist = whitelist[unprefixedProp];
      const parentIdentifier = parentProperties[unprefixedProp];
      if (parentIdentifier && isEmpty(patternWhitelist)) {
        patternWhitelist = whitelist[parentIdentifier];
      }
      if (!patternWhitelist || isEmpty(patternWhitelist)) {
        return;
      }

      // Create a mass regular expression that encapsulates all given patterns
      const reStr = patternWhitelist.map((pattern) => {
        let patternBody = pattern;
        if (patternBody.startsWith('/') && patternBody.endsWith('/')) {
          patternBody = patternBody.slice(1, -1);
        }
        return `(${patternBody})`;
      }).join('|');
      const re = new RegExp(`(${reStr})+`);

      // Go through each part of the value and test it against the new regex
      value.split(' ').forEach((val) => {
        if (!re.test(val)) {
          report({
            message: messages.rejected(prop, val, patternWhitelist),
            node: decl,
            result,
            ruleName
          });

          errors += 1;
        }
      });
    });
  };
}
