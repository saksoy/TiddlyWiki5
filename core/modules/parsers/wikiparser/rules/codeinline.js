/*\
title: $:/core/modules/parsers/wikiparser/rules/codeinline.js
type: application/javascript
module-type: wikirule

Wiki text inline rule for code runs. For example:

{{{
	This is a {{{code run}}} and `so is this`.
}}}

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.name = "codeinline";
exports.types = {inline: true};

exports.init = function(parser) {
	this.parser = parser;
	// Regexp to match
	this.matchRegExp = /(\{\{\{)|(`)/mg;
};

exports.parse = function() {
	// Move past the match
	this.parser.pos = this.matchRegExp.lastIndex;
	var reEnd;
	if(this.match[0] === "{{{") {
		reEnd = /(\}\}\})/mg;
	} else {
		reEnd = /(`)/mg;
	}
	// Look for the end marker
	reEnd.lastIndex = this.parser.pos;
	var match = reEnd.exec(this.parser.source),
		text;
	// Process the text
	if(match) {
		text = this.parser.source.substring(this.parser.pos,match.index);
		this.parser.pos = match.index + match[0].length;
	} else {
		text = this.parser.source.substr(this.parser.pos);
		this.parser.pos = this.parser.sourceLength;
	}
	return [{
		type: "element",
		tag: "code",
		children: [{
			type: "text",
			text: text
		}]
	}];
};

})();