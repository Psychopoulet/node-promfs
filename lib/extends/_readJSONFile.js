"use strict";

// deps

	// natives
	const { readFile, readFileSync } = require("fs");

	// locals
	const { isFileProm } = require(require("path").join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async readJSONFile
		* @param {string} file : file to check
		* @param {function|null|object} opts : operation's result or options
		* @param {function} cb : operation's result
		* @returns {void}
		*/
		function _readJSONFile (file, opts, cb) {

			if ("undefined" === typeof file) {
				throw new ReferenceError("missing \"file\" argument");
			}
				else if ("string" !== typeof file) {
					throw new TypeError("\"file\" argument is not a string");
				}
				else if ("" === file.trim()) {
					throw new Error("\"file\" argument is empty");
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

						return !exists ?
							Promise.reject(new Error("The file does not exist")) :
							new Promise((resolve, reject) => {

								readFile(file, options, (err, content) => {
									return err ? reject(err) : resolve(content);
								});

							});

					}).then((content) => {
						callback(null, JSON.parse(content));
					}).catch(callback);

				}

			}


		}

// module

module.exports = {

	// async version

	"readJSONFile": _readJSONFile,

	// promise version

	"readJSONFileProm": (file, options = null) => {

		return new Promise((resolve, reject) => {

			_readJSONFile(file, options, (err, content) => {
				return err ? reject(err) : resolve(content);
			});

		});

	},

	// sync version

	"readJSONFileSync": (file, options = null) => {

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
			return JSON.parse(readFileSync(file, options));
		}

	}

};
