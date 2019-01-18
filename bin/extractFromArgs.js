"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const getFormatedTime = require(join(__dirname, "getFormatedTime.js"));
	const execute = require(join(__dirname, "execute.js"));

// consts

	const ALLOWED = [
		"access",
		"append-file",
		"chmod",
		"chown",
		"copy-file",
		"directory-to-file",
		"directory-to-string",
		"extract-files",
		"files-to-file",
		"files-to-string",
		"is-directory",
		"is-file",
		"link",
		"lstat",
		"mkdir",
		"mkdirp",
		"mkdtemp",
		"read-file",
		"readdir",
		"realpath",
		"rename",
		"rmdir",
		"rmdirp",
		"stat",
		"truncate",
		"unlink",
		"utimes",
		"write-file"
	];

// private

	// methods

		/**
		* Synchronously execute commands
		* @param {boolean} showDetails : show execution's details in console
		* @param {Array} cmds : all commands to execute
		* @returns {void}
		*/
		function _executeCommands (showDetails, cmds) {

			if (cmds.length) {

				const cmd = cmds.shift();

				execute(showDetails, cmd.cmd, cmd.options).then((...data) => {

					if (data.length && undefined !== data[0]) {

						if (1 === data.length && "boolean" === typeof data[0]) {

							if (showDetails) {
								(0, console).log(getFormatedTime(), "=>", data[0]);
							}
							else {
								(0, console).log(data[0] ? "1" : "0");
							}

						}
						else if (showDetails) {
							(0, console).log(getFormatedTime(), "=>", ...data);
						}
						else {
							(0, console).log(...data);
						}

					}

					_executeCommands(showDetails, cmds);

				}).catch((err) => {
					(0, console).error(err);
					(0, process).exitCode = 1;
				});

			}

		}

// module

module.exports = (args) => {

	if (args.includes("--help")) {

		(0, console).log("[HELP]");

		(0, console).log("");
		(0, console).log("[options]");
		(0, console).log("--help", "=>", "Show documentation (must be the first command)");
		(0, console).log("--no-details", "=>", "Disable details printing in the terminal (must be the first command)");

		(0, console).log("");
		(0, console).log("[allowed methods]");
		ALLOWED.forEach((allowed) => {
			(0, console).log(allowed);
		});

	}
	else {

		// console options
		const showDetails = !("--no-details" === args[0]);

		if (!showDetails) {
			args.splice(0, 1);
		}
		else {
			(0, console).log("");
		}

		// extract commands
		const cmds = [];
		while (args.length) {

			const firstCmdAt = args.findIndex((element) => {
				return ALLOWED.includes(element);
			});

			if (-1 >= firstCmdAt) {
				break;
			}
			else {

				const nextCmdAt = args.slice(firstCmdAt + 1, args.length).findIndex((element) => {
					return ALLOWED.includes(element);
				}) + firstCmdAt + 1;

				const options = args.slice(firstCmdAt + 1, firstCmdAt < nextCmdAt ? nextCmdAt : args.length);

				cmds.push({
					"cmd": args[firstCmdAt],
					"options": options
				});

				args.splice(firstCmdAt, 1 + options.length);

			}

		}

		// execute commands
		_executeCommands(showDetails, cmds);

	}

};
