
"use strict";

// deps

var _require = require("fs"),
    lstat = _require.lstat,
    lstatSync = _require.lstatSync;

// private

// methods

/**
* Async isDirectory
* @param {string} directory : directory to check
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _isDirectory(directory, callback) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		process.nextTick(function () {

			lstat(directory, function (err, stats) {

				if (err || !stats.isDirectory()) {
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

	"isDirectory": _isDirectory,

	// promise version

	"isDirectoryProm": function isDirectoryProm(directory) {

		return new Promise(function (resolve, reject) {

			_isDirectory(directory, function (err, exists) {
				return err ? reject(err) : resolve(exists);
			});
		});
	},

	// sync version

	"isDirectorySync": function isDirectorySync(directory) {

		if ("undefined" === typeof directory) {
			throw new ReferenceError("missing \"directory\" argument");
		} else if ("string" !== typeof directory) {
			throw new TypeError("\"directory\" argument is not a string");
		} else if ("" === directory.trim()) {
			throw new Error("\"directory\" argument is empty");
		} else {

			var result = false;

			try {

				var stats = lstatSync(directory);

				if (stats.isDirectory()) {
					result = true;
				}
			} catch (e) {
				// nothing to do here
			}

			return result;
		}
	}

};