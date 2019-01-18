"use strict";

// deps

	// locals
	const getFormatedTime = require(require("path").join(__dirname, "getFormatedTime.js"));

// module

module.exports = (cmd, method, args) => {


	switch (cmd) {

		case "access":

			if (1 < args.length) {

				const mode = parseInt(args[1], 10);

				(0, console).log(getFormatedTime(), cmd, "\"" + args[0] + "\"", mode);
				return method(args[0], mode);

			}

			(0, console).log(getFormatedTime(), cmd, "\"" + args[0] + "\"");
			return method(args[0]);

		break;

		case "files-to-string":
			(0, console).log(getFormatedTime(), cmd, args);
			return method(args);
		break;

		case "files-to-file":
			(0, console).log(getFormatedTime(), cmd, args.slice(0, args.length - 1), args[args.length - 1]);
			return method(args.slice(0, args.length - 1), args[args.length - 1]);
		break;

		default :
			(0, console).log(getFormatedTime(), cmd, "\"" + args.join("\" \"") + "\"");
			return method(...args);
		break;

	}

};
