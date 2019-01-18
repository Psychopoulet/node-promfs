"use strict";

// deps

	// locals
	const getFormatedTime = require(require("path").join(__dirname, "getFormatedTime.js"));

// module

module.exports = (cmd, method, args) => {

	(0, console).log(getFormatedTime(), cmd, "\"" + args.join("\" \"") + "\"");

	return method(...args);

};
