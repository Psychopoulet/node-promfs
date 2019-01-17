"use strict";

// deps

	// natives
	const { mkdir, mkdirSync } = require("fs");
	const { dirname, join } = require("path");

	// locals
	const { isDirectoryProm, isDirectorySync } = require(join(__dirname, "_isDirectory.js"));

// const

	const DEFAULT_OPTION = 0o777;

// private

	// methods

		/**
		* Async mkdirp
		* @param {string} directory : directory path
		* @param {number} mode : creation mode
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _mkdirp (directory, mode, callback) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if ("undefined" !== typeof callback && "number" !== typeof mode) {
				throw new TypeError("\"mode\" argument is not a number");
			}
			else if ("undefined" === typeof callback && "undefined" === typeof mode) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof mode) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				let _callback = callback;
				let _mode = mode;

				if ("undefined" === typeof _callback) {
					_callback = mode;
					_mode = DEFAULT_OPTION;
				}

				isDirectoryProm(directory).then((exists) => {

					return exists ? Promise.resolve() : Promise.resolve().then(() => {

						const SUB_DIRECTORY = dirname(directory);

						return isDirectoryProm(SUB_DIRECTORY).then((_exists) => {

							return _exists ? new Promise((resolve, reject) => {

								mkdir(directory, _mode, (err) => {
									return err ? reject(err) : resolve();
								});

							}) : new Promise((resolve, reject) => {

								_mkdirp(SUB_DIRECTORY, _mode, (err) => {

									return err ? reject(err) : mkdir(directory, _mode, (_err) => {
										return _err ? reject(_err) : resolve();
									});

								});

							});

						});

					});

				}).then(() => {
					_callback(null);
				}).catch(callback);

			}

		}

		/**
		* Recursive mkdirpSync
		* @param {string} directory : directory path
		* @param {number} mode : creation mode
		* @returns {void}
		*/
		function _mkdirpSync (directory, mode) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if ("undefined" !== typeof mode && "number" !== typeof mode) {
				throw new TypeError("\"mode\" argument is not a number");
			}
			else if (!isDirectorySync(directory)) {

				const SUB_DIRECTORY = dirname(directory);

				if (!isDirectorySync(SUB_DIRECTORY)) {
					_mkdirpSync(SUB_DIRECTORY);
				}

				mkdirSync(directory, mode ? mode : DEFAULT_OPTION);

			}

		}

// module

module.exports = {

	// async version

	"mkdirp": _mkdirp,

	// promise version

	"mkdirpProm": (directory, mode) => {

		return new Promise((resolve, reject) => {

			_mkdirp(directory, mode ? mode : DEFAULT_OPTION, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"mkdirpSync": _mkdirpSync

};
