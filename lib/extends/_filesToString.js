
"use strict";

// deps

	const fs = require("fs");
	const { basename, join } = require("path");

	const { isFile, isFileSync } = require(join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Specific to "filesToString" method, read all files content
		* @param {Array} files : files to read
		* @param {string} encoding : encoding to use
		* @param {string} separator : used to separate content (can be "")
		* @param {string} content : content read
		* @returns {Promise} Operation's result
		*/
		function _readContentProm (files, encoding, separator, content) {

			if (0 >= files.length) {
				return Promise.resolve(content);
			}
			else {

				const file = files.shift().trim();

				return new Promise((resolve, reject) => {

					isFile(file, (err, exists) => {

						if (err) {
							reject(err);
						}
						else if (!exists) {
							reject(new Error("\"" + file + "\" does not exist"));
						}
						else {

							fs.readFile(file, encoding, (_err, filecontent) => {

								if (_err) {
									reject(_err);
								}
								else if (-1 < separator.indexOf("{{filename}}")) {

									_readContentProm(
										files, encoding, separator,
										content + separator.replace("{{filename}}", basename(file)) + filecontent
									)
										.then(resolve)
										.catch(reject);

								}
								else {

									_readContentProm(
										files, encoding, separator,
										"" === content ? filecontent : content + separator + filecontent
									)
										.then(resolve)
										.catch(reject);

								}

							});

						}

					});

				});

			}

		}

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

				_readContentProm(
					files,
					"string" === typeof encoding ? encoding.trim() : "utf8",
					"string" === typeof separator ? separator : " ",
					""
				).then((content) => {
					_callback(null, content);
				}).catch((err) => {
					_callback(err);
				});

			}

		}

// module

module.exports = {

	// async version

	"filesToString": _filesToString,

	// promise version

	"filesToStringProm": (files, encoding, separator) => {

		return new Promise(files, encoding, separator, (resolve, reject) => {

			_filesToString((err, content) => {

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

	"filesToStringSync": (files, target, separator) => {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		}
			else if ("object" !== typeof files || !(files instanceof Array)) {
				throw new TypeError("\"files\" argument is not an Array");
			}
		else if ("undefined" === typeof target) {
			throw new ReferenceError("missing \"target\" argument");
		}
			else if ("string" !== typeof target) {
				throw new TypeError("\"target\" argument is not a string");
			}
		else {

			const _target = target.trim();

			if ("" === _target) {
				throw new Error("\"target\" argument is empty");
			}
			else {

				const _separator = "string" === typeof separator ? separator : " ";

				if (isFileSync(_target)) {
					fs.unlinkSync(_target);
				}

				fs.writeFileSync(_target, "");

				files.forEach((file, key) => {

					const _file = file.trim();

					if (!isFileSync(_file)) {
						throw new Error("\"" + _file + "\" does not exist");
					}
					else if (-1 < _separator.indexOf("{{filename}}")) {
						fs.appendFileSync(_target, _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file));
					}
					else {
						fs.appendFileSync(_target, 0 < key ? _separator + fs.readFileSync(_file) : fs.readFileSync(_file));
					}

				});

			}

		}

	}

};
