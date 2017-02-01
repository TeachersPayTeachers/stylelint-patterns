import { createPlugin } from 'stylelint';
import { namespace } from './utils';
import rules from './rules';

export const rulesPlugins = Object.keys(rules).map(ruleName =>
  createPlugin(namespace(ruleName), rules[ruleName]));
