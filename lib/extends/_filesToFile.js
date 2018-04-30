/*
	eslint no-implicit-globals: 0, no-sync: 0
*/

"use strict";

// deps

	const fs = require("fs");
	const { basename, join } = require("path");

	const { filesToStreamProm } = require(join(__dirname, "_filesToStream.js"));
	const { isFileProm, isFileSync } = require(join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Async filesToFile
		* @param {Array} files : files to read
		* @param {string} target : file to write in
		* @param {string} separator : files separator
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _filesToFile (files, target, separator, callback) {

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
			else if ("undefined" === typeof callback && "undefined" === typeof separator) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				const _target = target.trim();

				if ("" === _target) {
					throw new Error("\"target\" argument is empty");
				}
				else {

					const _callback = "undefined" === typeof callback ? separator : callback;

					Promise.resolve().then(() => {
						return isFileProm(_target);
					}).then((exists) => {

						return !exists ? Promise.resolve() : new Promise((resolve, reject) => {

							fs.unlink(_target, (err) => {
								return err ? reject(err) : resolve();
							});

						});

					}).then(() => {

						if (!files.length) {

							return new Promise((resolve, reject) => {

								fs.writeFile(_target, "", (err) => {
									return err ? reject(err) : resolve();
								});

							});

						}
						else {

							return filesToStreamProm(files, "string" === typeof separator ? separator : " ").then((readStream) => {

								return new Promise((resolve, reject) => {

									let error = false;
									readStream.once("error", (_err) => {
										error = true; reject(_err);
									}).pipe(fs.createWriteStream(_target, { "flags": "a" }).once("error", (_err) => {
										error = true; reject(_err);
									}).once("close", () => {

										if (!error) {
											resolve();
										}

									}));

								});

							});

						}

					}).then(() => {
						_callback(null);
					}).catch(_callback);

				}

			}

		}

// module

module.exports = {

	// async version

	"filesToFile": _filesToFile,

	// promise version

	"filesToFileProm": (files, target, separator) => {

		return new Promise((resolve, reject) => {

			_filesToFile(files, target, separator, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"filesToFileSync": (files, target, separator) => {

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

				if (isFileSync(_target)) {
					fs.unlinkSync(_target);
				}

				if (!files.length) {
					fs.writeFileSync(_target, "");
				}

				files.forEach((file, key) => {

					const _file = file.trim();
					const _separator = "string" === typeof separator ? separator : " ";

					if (isFileSync(_file)) {

						if (-1 < _separator.indexOf("{{filename}}")) {
							fs.appendFileSync(_target, _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file));
						}
						else {
							fs.appendFileSync(_target, 0 < key ? _separator + fs.readFileSync(_file) : fs.readFileSync(_file));
						}

					}

				});

			}

		}

	}

};
