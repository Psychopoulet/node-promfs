"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const fs = require(join(__dirname, "..", "lib", "main.js"));
	const execute = require(join(__dirname, "execute.js"));
	const getFormatedTime = require(join(__dirname, "getFormatedTime.js"));

// consts

	const CMDS = Object.keys(fs).filter((cmd) => {
		return "function" === typeof fs[cmd] && "Prom" === cmd.slice(cmd.length - 4, cmd.length);
	}).map((cmd) => {

		return {
			"cmd": cmd.replace("Prom", "").replace("JSON", "-json").replace(/([A-Z])/g, (correspondance, p1, decalage) => {
				return (0 < decalage ? "-" : "") + p1.toLowerCase();
			}),
			"method": fs[cmd]
		};

	}).sort((a, b) => {

		if (a.cmd < b.cmd) {
			return -1;
		}
		else if (a.cmd > b.cmd) {
			return 1;
		}
		else {
			return 0;
		}

	});

	const CMDS_KEYS = CMDS.map((cmd) => {
		return cmd.cmd;
	});

// private

	// methods

		/**
		* Extract arguments and execute linked method
		* @param {Array} args : all arguments
		* @returns {void}
		*/
		function _extractFromArgs (args) {

			const firstCmdAt = args.findIndex((element) => {
				return CMDS_KEYS.includes(element);
			});

			if (0 <= firstCmdAt) {

				const nextCmdAt = args.slice(firstCmdAt + 1, args.length).findIndex((element) => {
					return CMDS_KEYS.includes(element);
				}) + 1;

				const endCmdAt = firstCmdAt < nextCmdAt ? nextCmdAt : args.length;

				execute(args[firstCmdAt], CMDS.find((element) => {
					return args[firstCmdAt] === element.cmd;
				}).method, args.slice(1, endCmdAt)).then(() => {
					_extractFromArgs(args.slice(endCmdAt, args.length));
				}).catch((err) => {

					(0, console).error(getFormatedTime(), "=>", err.toString());
					(0, process).exitCode = 1;

				});

			}

		}

// module

module.exports = _extractFromArgs;
