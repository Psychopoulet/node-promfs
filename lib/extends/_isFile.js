"use strict";

// deps

	// natives
	const { lstat, lstatSync } = require("fs");

// private

	// methods

		/**
		* Async isFile
		* @param {string} file : file to check
		* @param {function} callback : operation's result
		* @returns {void}
		*/
		function _isFile (file, callback) {

			if ("undefined" === typeof file) {
				throw new ReferenceError("missing \"file\" argument");
			}
				else if ("string" !== typeof file) {
					throw new TypeError("\"file\" argument is not a string");
				}
				else if ("" === file.trim()) {
					throw new Error("\"file\" argument is empty");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				lstat(file, (err, stats) => {
					return callback(null, Boolean(!err && stats.isFile()));
				});

			}

		}

// module

module.exports = {

	// async version

	"isFile": _isFile,

	// promise version

	"isFileProm": (file) => {

		return new Promise((resolve, reject) => {

			_isFile(file, (err, exists) => {
				return err ? reject(err) : resolve(exists);
			});

		});

	},

	// sync version

	"isFileSync": (file) => {

		if ("undefined" === typeof file) {
			throw new ReferenceError("missing \"file\" argument");
		}
			else if ("string" !== typeof file) {
				throw new TypeError("\"file\" argument is not a string");
			}
			else if ("" === file.trim()) {
				throw new Error("\"file\" argument is empty");
			}
		else {

			let result = false;

				try {

					const stats = lstatSync(file);

					if (stats.isFile()) {
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
