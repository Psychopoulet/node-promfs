
"use strict";

// deps

	const { lstat, lstatSync } = require("fs");

// private

	// methods

		/**
		* Async isDirectory
		* @param {string} directory : directory to check
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _isDirectory (directory, callback) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				process.nextTick(() => {

					lstat(directory, (err, stats) => {

						if (err || !stats.isDirectory()) {
							callback(null, false);
						}
						else {
							callback(null, true);
						}

					});

				});

			}

		}

// module

module.exports = {

	// async version

	"isDirectory": _isDirectory,

	// promise version

	"isDirectoryProm": (directory) => {

		return new Promise((resolve, reject) => {

			_isDirectory(directory, (err, exists) => {

				if (err) {
					reject(err);
				}
				else {
					resolve(exists);
				}

			});

		});

	},

	// sync version

	"isDirectorySync": (directory) => {

		if ("undefined" === typeof directory) {
			throw new ReferenceError("missing \"directory\" argument");
		}
			else if ("string" !== typeof directory) {
				throw new TypeError("\"directory\" argument is not a string");
			}
			else if ("" === directory.trim()) {
				throw new Error("\"directory\" argument is empty");
			}
		else {

			let result = false;

				try {

					const stats = lstatSync(directory);

					if (stats.isDirectory()) {
						result = true;
					}

				}
				catch (e) {
					// nothing to do here
				}

			return result;

		}

	}

};
