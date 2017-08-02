
"use strict";

// deps

	const { createReadStream, createWriteStream, writeFileSync, readFileSync } = require("fs");

// private

	// methods

		/**
		* Async copyFile
		* @param {string} origin : file to copy
		* @param {string} target : file to copy in
		* @param {Object|null} options : options for fs.createReadStream & fs.createWriteStream
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _copyFile (origin, target, options, callback) {

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
			else if ("undefined" === typeof callback && "undefined" === typeof options) {
				throw new ReferenceError("Missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof options) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				let _callback = callback;
				let _options = options;

				if ("undefined" === typeof _callback) {
					_callback = options;
					_options = {};
				}
				else {
					_options = _options ? _options : {};
				}

				const rd = createReadStream(origin, _options).on("error", (err) => {
					_callback(err);
				});

				const wr = createWriteStream(target, _options).on("error", (err) => {
					_callback(err);
				}).on("close", () => {
					_callback(null);
				});

				rd.pipe(wr);

			}

		}

// module

module.exports = {

	// async version

	"copyFile": _copyFile,

	// promise version

	"copyFileProm": (origin, target, options) => {

		return new Promise((resolve, reject) => {

			_copyFile(origin, target, options, (err) => {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	},

	// sync version

	"copyFileSync": (origin, target, options) => {

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
		else {

			writeFileSync(
				target.trim(),
				readFileSync(origin.trim(), options ? options : null),
				options ? options : null
			);

		}

	}

};
