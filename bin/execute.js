/*
	eslint no-unreachable: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const fs = require(join(__dirname, "..", "lib", "main.js"));
	const argToMethod = require(join(__dirname, "argToMethod.js"));
	const getFormatedTime = require(join(__dirname, "getFormatedTime.js"));

// module

module.exports = (showDetails, cmd, args) => {

	const method = fs[argToMethod(cmd)];

	switch (cmd) {

		case "access":
		case "mkdir":
		case "mkdirp":
		case "truncate":

			if (1 < args.length) {

				const mode = parseInt(args[1], 10);

				if (showDetails) {
					(0, console).log(getFormatedTime(), cmd, "\"" + args[0] + "\"", mode);
				}

				return method(args[0], mode);

			}

			if (showDetails) {
				(0, console).log(getFormatedTime(), cmd, "\"" + args[0] + "\"");
			}

			return method(args[0]);

		break;

		case "chown": {

			const uid = parseInt(args[1], 10);
			const gid = parseInt(args[2], 10);

			if (showDetails) {
				(0, console).log(getFormatedTime(), cmd, "\"" + args[0] + "\"", uid, gid);
			}

			return method(args[0], uid, gid);

		} break;

		case "chmod": {

			const mode = parseInt(args[1], 10);

			if (showDetails) {
				(0, console).log(getFormatedTime(), cmd, "\"" + args[0] + "\"", mode);
			}

			return method(args[0], mode);

		} break;

		case "files-to-string":

			if (showDetails) {
				(0, console).log(getFormatedTime(), cmd, args);
			}

			return method(args);

		break;

		case "files-to-file":

			if (showDetails) {
				(0, console).log(getFormatedTime(), cmd, args.slice(0, args.length - 1), args[args.length - 1]);
			}

			return method(args.slice(0, args.length - 1), args[args.length - 1]);

		break;

		default:

			if (showDetails) {
				(0, console).log(getFormatedTime(), cmd, "\"" + args.join("\" \"") + "\"");
			}

			return method(...args);

		break;

	}

};
