/*
	eslint no-implicit-globals: 0, no-sync: 0
*/

"use strict";

// deps

	const { readdir, readdirSync } = require("fs");
	const { join } = require("path");

	const { isFileProm, isFileSync } = require(join(__dirname, "_isFile.js"));
	const { isDirectoryProm, isDirectorySync } = require(join(__dirname, "_isDirectory.js"));

// private

	// methods

		/**
		* Specific to "extractFiles" method, return only the existing files
		* @param {string} dir : directory to work with
		* @param {Array} givenFiles : files detected in the directory
		* @param {Array} realFiles : files detected as real files
		* @param {function|null} callback : operation's result
		* @returns {Promise} Operation's result
		*/
		function _extractRealFiles (dir, givenFiles, realFiles, callback) {

			if (0 >= givenFiles.length) {
				callback(null, realFiles);
			}
			else {

				const file = join(dir, givenFiles.shift()).trim();

				isFileProm(file).then((exists) => {

					if (exists) {
						realFiles.push(file);
					}

					_extractRealFiles(dir, givenFiles, realFiles, callback);

				}).catch(callback);

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
				else if ("" === dir.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				const _dir = dir.trim();

				isDirectoryProm(_dir).then((exists) => {
					return exists ? Promise.resolve() : Promise.reject(new Error("\"" + _dir + "\" is not a valid directory"));
				}).then(() => {

					readdir(_dir, (_err, files) => {
						return _err ? callback(_err) : _extractRealFiles(_dir, files, [], callback);
					});

				}).catch(callback);

			}

		}

// module

module.exports = {

	// async version

	"extractFiles": _extractFiles,

	// promise version

	"extractFilesProm": (dir) => {

		return new Promise((resolve, reject) => {

			_extractFiles(dir, (err, result) => {
				return err ? reject(err) : resolve(result);
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
