const prefix = 'stylelint-patterns';

/**
 * Lock a rule name into the `tpt-stylelint` namespace
 *
 * @param {String} ruleName The name of the rule
 * @return {String}
 */
export default function namespace(ruleName) {
  return `${prefix}/${ruleName}`;
}
