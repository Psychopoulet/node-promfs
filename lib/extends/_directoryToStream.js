/*
	eslint no-implicit-globals: 0
*/

"use strict";

// deps

	const { join } = require("path");

	const { extractFiles, extractFilesSync } = require(join(__dirname, "_extractFiles.js"));
	const { filesToStream, filesToStreamSync } = require(join(__dirname, "_filesToStream.js"));

// private

	// methods

		/**
		* Async directoryToStream
		* @param {string} directory : directory to work with
		* @param {string} separator : used to separate content (can be "")
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _directoryToStream (directory, separator, callback) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}

			else if ("undefined" === typeof callback && "undefined" === typeof separator) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator) {
					throw new TypeError("\"callback\" argument is not a function");
				}

			else {

				extractFiles(directory, (err, files) => {
					const _callback = "undefined" === typeof callback ? separator : callback;
					return err ? _callback(err) : filesToStream(files, separator, _callback);
				});

			}

		}

// module

module.exports = {

	// async version

	"directoryToStream": _directoryToStream,

	// promise version

	"directoryToStreamProm": (directory, separator) => {

		return new Promise((resolve, reject) => {

			_directoryToStream(directory, separator, (err, stream) => {
				return err ? reject(err) : resolve(stream);
			});

		});

	},

	// sync version

	"directoryToStreamSync": (directory, separator) => {

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

			return filesToStreamSync(extractFilesSync(directory), separator);

		}

	}

};
