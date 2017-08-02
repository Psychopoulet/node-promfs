
"use strict";

// deps

	const { readdir, readdirSync } = require("fs");
	const { join } = require("path");

	const { isFile, isFileSync } = require(join(__dirname, "_isFile.js"));
	const { isDirectory, isDirectorySync } = require(join(__dirname, "_isDirectory.js"));

// private

	// methods

		/**
		* Specific to "extractFiles" method, return only the existing files
		* @param {string} dir : directory to work with
		* @param {Array} givenFiles : files detected in the directory
		* @param {Array} realFiles : files detected as real files
		* @returns {Promise} Operation's result
		*/
		function _extractRealFilesProm (dir, givenFiles, realFiles) {

			if (0 >= givenFiles.length) {
				return Promise.resolve(realFiles);
			}
			else {

				const file = join(dir, givenFiles.shift()).trim();

				return new Promise((resolve, reject) => {

					isFile(file, (err, exists) => {

						if (err) {
							reject(err);
						}
						else {

							if (exists) {
								realFiles.push(file);
							}

							_extractRealFilesProm(dir, givenFiles, realFiles)
								.then(resolve)
								.catch(reject);

						}

					});

				});

			}

		}

		/**
		* Async extractFiles
		* @param {string} dir : directory to analyse
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _extractFiles (dir, callback) {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				const _dir = dir.trim();

				isDirectory.isDirectory(_dir, (err, exists) => {

					if (err) {
						callback(err);
					}
					else if (!exists) {
						callback(new Error("\"" + _dir + "\" is not a valid directory"));
					}
					else {

						readdir(_dir, (_err, files) => {

							if (_err) {
								callback(_err);
							}
							else {

								_extractRealFilesProm(_dir, files, []).then((data) => {
									callback(null, data);
								}).catch((__err) => {
									callback(__err);
								});

							}

						});

					}

				});

			}

		}

// module

module.exports = {

	// async version

	"extractFiles": _extractFiles,

	// promise version

	"extractFilesProm": (dir) => {

		return new Promise((resolve, reject) => {

			_extractFiles(dir, (err) => {

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

	"extractFilesSync": (dir) => {

		if ("undefined" === typeof dir) {
			throw new ReferenceError("missing \"directory\" argument");
		}
			else if ("string" !== typeof dir) {
				throw new TypeError("\"directory\" argument is not a string");
			}
		else {

			const _dir = dir.trim();

			if (!isDirectorySync(_dir)) {
				throw new Error("\"" + _dir + "\" is not a valid directory");
			}
			else {

				const result = [];

					readdirSync(_dir).forEach((file) => {

						const _file = join(_dir, file);

						if (isFileSync(_file)) {
							result.push(_file);
						}

					});

				return result;

			}

		}

	}

};
