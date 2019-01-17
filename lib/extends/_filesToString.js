"use strict";

// deps

	// natives
	const { readFileSync } = require("fs");
	const { basename, join } = require("path");

	// locals
	const { filesToStreamProm } = require(join(__dirname, "_filesToStream.js"));
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

				let _callback = callback;

				if ("undefined" === typeof _callback) {

					if ("undefined" === typeof separator) {
						_callback = encoding;
					}
					else {
						_callback = separator;
					}

				}

				filesToStreamProm(files, "string" === typeof separator ? separator : " ").then((readStream) => {

					return new Promise((resolve, reject) => {

						let data = "";
						let error = false;

						readStream.once("error", (_err) => {

							error = true;
							reject(_err);

						}).on("data", (chunk) => {
							data += chunk.toString("string" === typeof encoding ? encoding : "utf8");
						}).once("end", () => {

							if (!error) {
								resolve(data);
							}

						});

					});

				}).then((data) => {
					_callback(null, data);
				}).catch(_callback);

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
							result += _separator.replace("{{filename}}", basename(_file)) + readFileSync(_file, _encoding);
						}
						else {
							result += 0 < key ? _separator + readFileSync(_file, _encoding) : readFileSync(_file, _encoding);
						}

					}

				});

			return result;

		}

	}

};
