'use strict';

var createPlugin = require('stylelint').createPlugin;
var namespace = require('./utils').namespace;
var rules = require('./rules');

var rulesPlugins = Object.keys(rules).map(function (ruleName) {
	return createPlugin(namespace(ruleName), rules[ruleName]);
});

module.exports = rulesPlugins;