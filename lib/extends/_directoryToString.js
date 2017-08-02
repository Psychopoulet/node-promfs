
"use strict";

// deps

	const { join } = require("path");

	const { extractFiles, extractFilesSync } = require(join(__dirname, "_extractFiles.js"));
	const { filesToString, filesToStringSync } = require(join(__dirname, "_filesToString.js"));

// private

	// methods

		/**
		* Async directoryToString
		* @param {string} dir : directory to work with
		* @param {string} encoding : encoding to use
		* @param {string} separator : used to separate content (can be "")
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _directoryToString (dir, encoding, separator, callback) {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				let _callback = callback;

				if ("undefined" === typeof _callback) {

					if ("undefined" === typeof separator) {
						_callback = encoding;
					}
					else {
						_callback = separator;
					}

				}

				extractFiles(dir, (err, files) => {

					if (err) {
						_callback(err);
					}
					else {

						filesToString(files, encoding, separator, (_err, content) => {

							if (_err) {
								_callback(_err);
							}
							else {
								_callback(null, content);
							}

						});

					}

				});

			}

		}

// module

module.exports = {

	// async version

	"directoryToString": _directoryToString,

	// promise version

	"directoryToStringProm": (dir, encoding, separator) => {

		return new Promise((resolve, reject) => {

			_directoryToString(dir, encoding, separator, (err, content) => {

				if (err) {
					reject(err);
				}
				else {
					resolve(content);
				}

			});

		});

	},

	// sync version

	"directoryToStringSync": (dir, encoding, separator) => {

		if ("undefined" === typeof dir) {
			throw new ReferenceError("missing \"directory\" argument");
		}
			else if ("string" !== typeof dir) {
				throw new TypeError("\"directory\" argument is not a string");
			}
		else {
			return filesToStringSync(extractFilesSync(dir), encoding, separator);
		}

	}

};
