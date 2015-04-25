'use strict';

var _ = require('lodash');
var Css = require('html/Css');
var Events = require('events/Events');
var UpdateStyle = require('./actions/UpdateStyle');

var id = 0;
function Component(node, options) {
	this.id = ++id;
	_.extend(this, Events);
	if (typeof node === 'string') {
		options = options || {};
		this.nodeName = node;
		this.content = '';
		this.style = {};
		this.classes = [];

		_.extend(this, options);
	} else { // have a node with content
		this.nodeName = node.nodeName;
		this.content = node.innerHTML;
		this.style = Css.textToObject(node.style.cssText);
		this.classes = node.className.split(' ');
	}
}

Component.prototype = {
	addClass(klass) {

	},

	updateStyle(newStyle) {
		_.assign(this.style, newStyle);
    this.trigger('change');
		// UpdateStyle(this, newStyle);
	},

	updateStyleUndoable(newStyle) {
		UpdateStyle(this, newStyle);
	},

	replaceStyle(newStyle) {
		this.style = newStyle;
	},

	replaceContent() {

	},

	setSelected(val) {
		if (val === this.selected) return;
		this.selected = val;
		this.trigger('change');
	}
};

module.exports = Component;
