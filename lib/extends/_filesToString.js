
"use strict";

// deps

	const fs = require("fs");
	const { basename, join } = require("path");

	const { filesToStream } = require(join(__dirname, "_filesToStream.js"));
	const { isFileSync } = require(join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async filesToString
		* @param {Array} files : files to read
		* @param {string} encoding : encoding
		* @param {string} separator : files separator
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _filesToString (files, encoding, separator, callback) {

			if ("undefined" === typeof files) {
				throw new ReferenceError("missing \"files\" argument");
			}
				else if ("object" !== typeof files || !(files instanceof Array)) {
					throw new TypeError("\"files\" argument is not an Array");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				filesToStream(files, "string" === typeof separator ? separator : " ", (err, stream) => {

					let _callback = callback;

					if ("undefined" === typeof _callback) {

						if ("undefined" === typeof separator) {
							_callback = encoding;
						}
						else {
							_callback = separator;
						}

					}

					if (err) {
						_callback(err);
					}
					else {

						let data = "";
						stream.once("error", _callback).on("data", (chunk) => {
							data += chunk.toString("string" === typeof encoding ? encoding : "utf8");
						}).once("close", () => {
							_callback(null, data);
						});

					}

				});

			}

		}

// module

module.exports = {

	// async version

	"filesToString": _filesToString,

	// promise version

	"filesToStringProm": (files, encoding, separator) => {

		return new Promise((resolve, reject) => {

			_filesToString(files, encoding, separator, (err, content) => {
				return err ? reject(err) : resolve(content);
			});

		});

	},

	// sync version

	"filesToStringSync": (files, encoding, separator) => {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		}
			else if ("object" !== typeof files || !(files instanceof Array)) {
				throw new TypeError("\"files\" argument is not an Array");
			}
		else {

			const _encoding = "string" === typeof encoding ? encoding : null;
			const _separator = "string" === typeof separator ? separator : " ";

			let result = "";

				files.forEach((file, key) => {

					const _file = file.trim();

					if (isFileSync(_file)) {

						if (-1 < _separator.indexOf("{{filename}}")) {
							result += _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file, _encoding);
						}
						else {
							result += 0 < key ? _separator + fs.readFileSync(_file, _encoding) : fs.readFileSync(_file, _encoding);
						}

					}

				});

			return result;

		}

	}

};
