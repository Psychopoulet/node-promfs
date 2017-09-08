
"use strict";

// deps

var _require = require("path"),
    join = _require.join;

var _require2 = require(join(__dirname, "_extractFiles.js")),
    extractFiles = _require2.extractFiles,
    extractFilesSync = _require2.extractFilesSync;

var _require3 = require(join(__dirname, "_filesToFile.js")),
    filesToFile = _require3.filesToFile,
    filesToFileSync = _require3.filesToFileSync;

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


function _directoryToFile(directory, target, separator, callback) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing \"target\" argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("\"target\" argument is not a string");
	} else if ("" === target.trim()) {
		throw new Error("\"target\" argument is empty");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _callback = callback;
		var _separator = separator;

		if ("undefined" === typeof _callback) {
			_callback = separator;
			_separator = " ";
		}

		process.nextTick(function () {

			extractFiles(directory, function (err, files) {

				if (err) {
					_callback(err);
				} else {

					filesToFile(files, target, _separator, function (_err) {
						_callback(_err ? _err : null);
					});
				}
			});
		});
	}
}

// module

module.exports = {

	// async version

	"directoryToFile": _directoryToFile,

	// promise version

	"directoryToFileProm": function directoryToFileProm(directory, target, separator) {

		return new Promise(function (resolve, reject) {

			_directoryToFile(directory, target, separator, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"directoryToFileSync": function directoryToFileSync(directory, target, separator) {

		if ("undefined" === typeof directory) {
			throw new ReferenceError("missing \"directory\" argument");
		} else if ("string" !== typeof directory) {
			throw new TypeError("\"directory\" argument is not a string");
		} else if ("undefined" === typeof target) {
			throw new ReferenceError("missing \"target\" argument");
		} else if ("string" !== typeof target) {
			throw new TypeError("\"target\" argument is not a string");
		} else {

			var _target = target.trim();

			if ("" === _target) {
				throw new Error("\"target\" argument is empty");
			} else {

				return filesToFileSync(extractFilesSync(directory), _target, separator);
			}
		}
	}

};