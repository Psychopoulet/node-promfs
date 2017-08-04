
"use strict";

// deps

var _require = require("path"),
    join = _require.join;

var _require2 = require(join(__dirname, "_extractFiles.js")),
    extractFiles = _require2.extractFiles,
    extractFilesSync = _require2.extractFilesSync;

var _require3 = require(join(__dirname, "_filesToString.js")),
    filesToString = _require3.filesToString,
    filesToStringSync = _require3.filesToStringSync;

// private

// methods

/**
* Async directoryToString
* @param {string} directory : directory to work with
* @param {string} encoding : encoding to use
* @param {string} separator : used to separate content (can be "")
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _directoryToString(directory, encoding, separator, callback) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _callback = callback;

		if ("undefined" === typeof _callback) {

			if ("undefined" === typeof separator) {
				_callback = encoding;
			} else {
				_callback = separator;
			}
		}

		process.nextTick(function () {

			extractFiles(directory, function (err, files) {

				if (err) {
					_callback(err);
				} else {

					filesToString(files, encoding, separator, function (_err, content) {

						if (_err) {
							_callback(_err);
						} else {
							_callback(null, content);
						}
					});
				}
			});
		});
	}
}

// module

module.exports = {

	// async version

	"directoryToString": _directoryToString,

	// promise version

	"directoryToStringProm": function directoryToStringProm(directory, encoding, separator) {

		return new Promise(function (resolve, reject) {

			_directoryToString(directory, encoding, separator, function (err, content) {

				if (err) {
					reject(err);
				} else {
					resolve(content);
				}
			});
		});
	},

	// sync version

	"directoryToStringSync": function directoryToStringSync(directory, encoding, separator) {

		if ("undefined" === typeof directory) {
			throw new ReferenceError("missing \"directory\" argument");
		} else if ("string" !== typeof directory) {
			throw new TypeError("\"directory\" argument is not a string");
		} else {
			return filesToStringSync(extractFilesSync(directory), encoding, separator);
		}
	}

};