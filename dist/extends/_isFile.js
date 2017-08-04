
"use strict";

// deps

var _require = require("fs"),
    lstat = _require.lstat,
    lstatSync = _require.lstatSync;

// private

// methods

/**
* Async isFile
* @param {string} file : file to check
* @param {function} callback : operation's result
* @returns {void}
*/


function _isFile(file, callback) {

	if ("undefined" === typeof file) {
		throw new ReferenceError("missing \"file\" argument");
	} else if ("string" !== typeof file) {
		throw new TypeError("\"file\" argument is not a string");
	} else if ("" === file.trim()) {
		throw new Error("\"file\" argument is empty");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		process.nextTick(function () {

			lstat(file, function (err, stats) {

				if (err || !stats.isFile()) {
					callback(null, false);
				} else {
					callback(null, true);
				}
			});
		});
	}
}

// module

module.exports = {

	// async version

	"isFile": _isFile,

	// promise version

	"isFileProm": function isFileProm(file) {

		return new Promise(function (resolve, reject) {

			_isFile(file, function (err, exists) {

				if (err) {
					reject(err);
				} else {
					resolve(exists);
				}
			});
		});
	},

	// sync version

	"isFileSync": function isFileSync(file) {

		if ("undefined" === typeof file) {
			throw new ReferenceError("missing \"file\" argument");
		} else if ("string" !== typeof file) {
			throw new TypeError("\"file\" argument is not a string");
		} else if ("" === file.trim()) {
			throw new Error("\"file\" argument is empty");
		} else {

			var result = false;

			try {

				var stats = lstatSync(file);

				if (stats.isFile()) {
					result = true;
				}
			} catch (e) {
				// nothing to do here
			}

			return result;
		}
	}

};