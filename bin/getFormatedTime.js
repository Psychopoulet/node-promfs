"use strict";

// deps

	// locals
	const padleft = require(require("path").join(__dirname, "padleft.js"));

// module

module.exports = () => {

	const date = new Date();

	return "[" +
		padleft(date.getHours()) + ":" +
		padleft(date.getMinutes()) + ":" +
		padleft(date.getSeconds()) +
	"]";

};
