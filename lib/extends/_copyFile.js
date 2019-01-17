"use strict";

// deps

	// natives
	const { createReadStream, createWriteStream, writeFileSync, readFileSync } = require("fs");

	// locals
	const { isFileProm, isFileSync } = require(require("path").join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async copyFile
		* @param {string} origin : file to copy
		* @param {string} target : file to copy in
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _copyFile (origin, target, callback) {

			if ("undefined" === typeof origin) {
				throw new ReferenceError("Missing \"origin\" argument");
			}
				else if ("string" !== typeof origin) {
					throw new TypeError("\"origin\" argument is not a string");
				}
				else if ("" === origin.trim()) {
					throw new TypeError("\"origin\" argument is empty");
				}
			else if ("undefined" === typeof target) {
				throw new ReferenceError("Missing \"target\" argument");
			}
				else if ("string" !== typeof target) {
					throw new TypeError("\"target\" argument is not a string");
				}
				else if ("" === target.trim()) {
					throw new Error("\"target\" argument is empty");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("Missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				isFileProm(origin).then((exists) => {
					return exists ? Promise.resolve() : Promise.reject(new Error("There is no origin file \"" + origin + "\""));
				}).then(() => {

					let error = false;

					const writeStream = createWriteStream(target).once("error", (_err) => {

						error = true;
						writeStream.close();

						callback(_err);

					}).once("close", () => {
						return error ? null : callback(null);
					});

					createReadStream(origin).once("error", (_err) => {
						error = true; callback(_err);
					}).pipe(writeStream);

				}).catch(callback);

			}

		}

// module

module.exports = {

	// async version

	"copyFile": _copyFile,

	// promise version

	"copyFileProm": (origin, target) => {

		return new Promise((resolve, reject) => {

			_copyFile(origin, target, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"copyFileSync": (origin, target) => {

		if ("undefined" === typeof origin) {
			throw new ReferenceError("Missing \"origin\" argument");
		}
			else if ("string" !== typeof origin) {
				throw new TypeError("\"origin\" argument is not a string");
			}
			else if ("" === origin.trim()) {
				throw new TypeError("\"origin\" argument is empty");
			}
		else if ("undefined" === typeof target) {
			throw new ReferenceError("Missing \"target\" argument");
		}
			else if ("string" !== typeof target) {
				throw new TypeError("\"target\" argument is not a string");
			}
			else if ("" === target.trim()) {
				throw new TypeError("\"target\" argument is empty");
			}
		else if (!isFileSync(origin)) {
			throw new Error("There is no origin file \"" + origin + "\"");
		}
		else {

			writeFileSync(
				target.trim(),
				readFileSync(origin.trim())
			);

		}

	}

};
