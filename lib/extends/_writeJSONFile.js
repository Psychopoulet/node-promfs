/*
	eslint max-params: 0
*/

"use strict";

// deps

	// natives
	const { writeFile, writeFileSync, unlink, unlinkSync } = require("fs");

	// locals
	const { isFileProm, isFileSync } = require(require("path").join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async writeJSONFile
		* @param {string} file : file to check
		* @param {any} data : data to write
		* @param {function|null|object} opts : operation's result or options
		* @param {function} cb : operation's result
		* @returns {void}
		*/
		function _writeJSONFile (file, data, opts, cb) {

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

			else if ("undefined" === typeof opts) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("undefined" === typeof cb && "function" !== typeof opts) {
					throw new TypeError("\"callback\" argument is not a function");
				}

			else {

				const callback = "function" === typeof cb ? cb : opts;
				const options = "function" === typeof cb ? opts : null;

				if ("function" !== typeof callback) {
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

							writeFile(file, JSON.stringify(data,
								options && options.replacer ? options.replacer : null, options && options.space ? options.space : null
							), options, (err) => {
								return err ? reject(err) : resolve();
							});

						});

					}).then(() => {
						callback(null);
					}).catch(callback);

				}

			}

		}

// module

module.exports = {

	// async version

	"writeJSONFile": _writeJSONFile,

	// promise version

	"writeJSONFileProm": (file, data, options = null) => {

		return new Promise((resolve, reject) => {

			_writeJSONFile(file, data, options, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"writeJSONFileSync": (file, data, options = null) => {

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

			writeFileSync(file, JSON.stringify(
				data, options && options.replacer ? options.replacer : null, options && options.space ? options.space : null
			), options);

		}

	}

};
