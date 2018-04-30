/*
	eslint no-implicit-globals: 0
*/

"use strict";

// deps

	const { writeFile, writeFileSync, unlink, unlinkSync } = require("fs");

	const { isFileProm, isFileSync } = require(require("path").join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async writeJSONFile
		* @param {string} file : file to check
		* @param {function} data : data to write
		* @param {function} callback : operation's result
		* @returns {void}
		*/
		function _writeJSONFile (file, data, callback) {

			if ("undefined" === typeof file) {
				throw new ReferenceError("missing \"file\" argument");
			}
				else if ("string" !== typeof file) {
					throw new TypeError("\"file\" argument is not a string");
				}
				else if ("" === file.trim()) {
					throw new Error("\"file\" argument is empty");
				}

			else if ("undefined" === typeof data) {
				throw new ReferenceError("missing \"data\" argument");
			}
				else if ("undefined" === typeof callback) {
					throw new ReferenceError("missing \"callback\" argument");
				}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}

			else {

				isFileProm(file).then((exists) => {

					return !exists ? Promise.resolve() : new Promise((resolve, reject) => {

						unlink(file, (err) => {
							return err ? reject(err) : resolve();
						});

					});

					}).then(() => {

					return new Promise((resolve, reject) => {

						writeFile(file, JSON.stringify(data), (err) => {
							return err ? reject(err) : resolve();
						});

					});

				}).then(() => {
					callback(null);
				}).catch(callback);

			}

		}

// module

module.exports = {

	// async version

	"writeJSONFile": _writeJSONFile,

	// promise version

	"writeJSONFileProm": (file, data) => {

		return new Promise((resolve, reject) => {

			_writeJSONFile(file, data, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"writeJSONFileSync": (file, data) => {

		if ("undefined" === typeof file) {
			throw new ReferenceError("missing \"file\" argument");
		}
			else if ("string" !== typeof file) {
				throw new TypeError("\"file\" argument is not a string");
			}
			else if ("" === file.trim()) {
				throw new Error("\"file\" argument is empty");
			}

		else if ("undefined" === typeof data) {
			throw new ReferenceError("missing \"data\" argument");
		}

		else {

				if (isFileSync(file)) {
					unlinkSync(file);
				}

				writeFileSync(file, JSON.stringify(data));

		}

	}

};
