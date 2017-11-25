
"use strict";

// deps

	const { readFile, readFileSync } = require("fs");

	const { isFile } = require(require("path").join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async readJSONFile
		* @param {string} file : file to check
		* @param {function} callback : operation's result
		* @returns {void}
		*/
		function _readJSONFile (file, callback) {

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

				process.nextTick(() => {

					isFile(file, (err, exists) => {

						if (err) {
							callback(err);
						}
						else if (!exists) {
							callback(new Error("The file does not exist"));
						}
						else {

							readFile(file, (_err, content) => {

								if (_err) {
									callback(_err);
								}
								else {

									try {
										callback(null, JSON.parse(content));
									}
									catch (e) {
										callback(e);
									}

								}

							});

						}

					});

				});

			}

		}

// module

module.exports = {

	// async version

	"readJSONFile": _readJSONFile,

	// promise version

	"readJSONFileProm": (file) => {

		return new Promise((resolve, reject) => {

			_readJSONFile(file, (err, exists) => {
				return err ? reject(err) : resolve(exists);
			});

		});

	},

	// sync version

	"readJSONFileSync": (file) => {

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
			return JSON.parse(readFileSync(file));
		}

	}

};
