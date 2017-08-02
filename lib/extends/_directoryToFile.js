
"use strict";

// deps

	const { join } = require("path");

	const { extractFiles, extractFilesSync } = require(join(__dirname, "_extractFiles.js"));
	const { filesToFile, filesToFileSync } = require(join(__dirname, "_filesToFile.js"));

// private

	// methods

		/**
		* Async directoryToFile
		* @param {string} dir : directory to work with
		* @param {string} target : file to write in
		* @param {string} separator : used to separate content (can be "")
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _directoryToFile (dir, target, separator, callback) {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
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

					let _callback = callback;

					if ("undefined" === typeof _callback) {
						_callback = separator;
					}

					extractFiles(dir, (err, files) => {

						if (err) {
							_callback(err);
						}
						else {

							filesToFile(files, _target, separator, (_err) => {

								if (_err) {
									_callback(_err);
								}
								else {
									_callback(null);
								}

							});

						}

					});

				}

			}

		}

// module

module.exports = {

	// async version

	"directoryToFile": _directoryToFile,

	// promise version

	"directoryToFileProm": (dir, target, separator) => {

		return new Promise((resolve, reject) => {

			_directoryToFile(dir, target, separator, (err) => {

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

	"directoryToFileSync": (dir, target, separator) => {

		if ("undefined" === typeof dir) {
			throw new ReferenceError("missing \"directory\" argument");
		}
			else if ("string" !== typeof dir) {
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

				return filesToFileSync(extractFilesSync(dir), _target, separator);

			}

		}

	}

};
