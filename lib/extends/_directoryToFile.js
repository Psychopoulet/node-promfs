/*
	eslint no-implicit-globals: 0
*/

"use strict";

// deps

	const { join } = require("path");

	const { extractFiles, extractFilesSync } = require(join(__dirname, "_extractFiles.js"));
	const { filesToFile, filesToFileSync } = require(join(__dirname, "_filesToFile.js"));

// private

	// methods

		/**
		* Async directoryToFile
		* @param {string} directory : directory to work with
		* @param {string} target : file to write in
		* @param {string} separator : used to separate content (can be "")
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _directoryToFile (directory, target, separator, callback) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if ("undefined" === typeof target) {
				throw new ReferenceError("missing \"target\" argument");
			}
				else if ("string" !== typeof target) {
					throw new TypeError("\"target\" argument is not a string");
				}
				else if ("" === target.trim()) {
					throw new Error("\"target\" argument is empty");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				let _callback = callback;
				let _separator = separator;

				if ("undefined" === typeof _callback) {
					_callback = separator;
					_separator = " ";
				}

				extractFiles(directory, (err, files) => {
					return err ? _callback(err) : filesToFile(files, target, _separator, _callback);
				});

			}

		}

// module

module.exports = {

	// async version

	"directoryToFile": _directoryToFile,

	// promise version

	"directoryToFileProm": (directory, target, separator) => {

		return new Promise((resolve, reject) => {

			_directoryToFile(directory, target, separator, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"directoryToFileSync": (directory, target, separator) => {

		if ("undefined" === typeof directory) {
			throw new ReferenceError("missing \"directory\" argument");
		}
			else if ("string" !== typeof directory) {
				throw new TypeError("\"directory\" argument is not a string");
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
				return filesToFileSync(extractFilesSync(directory), _target, separator);
			}

		}

	}

};
