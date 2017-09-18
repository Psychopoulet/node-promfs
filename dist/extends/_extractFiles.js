
"use strict";

// deps

var _require = require("fs"),
    readdir = _require.readdir,
    readdirSync = _require.readdirSync;

var _require2 = require("path"),
    join = _require2.join;

var _require3 = require(join(__dirname, "_isFile.js")),
    isFile = _require3.isFile,
    isFileSync = _require3.isFileSync;

var _require4 = require(join(__dirname, "_isDirectory.js")),
    isDirectory = _require4.isDirectory,
    isDirectorySync = _require4.isDirectorySync;

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


function _extractRealFiles(dir, givenFiles, realFiles, callback) {

	if (0 >= givenFiles.length) {
		callback(null, realFiles);
	} else {

		var file = join(dir, givenFiles.shift()).trim();

		isFile(file, function (err, exists) {

			if (err) {
				callback(err);
			} else {

				if (exists) {
					realFiles.push(file);
				}

				_extractRealFiles(dir, givenFiles, realFiles, callback);
			}
		});
	}
}

/**
* Async extractFiles
* @param {string} dir : directory to analyse
* @param {function|null} callback : operation's result
* @returns {void}
*/
function _extractFiles(dir, callback) {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === dir.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _dir = dir.trim();

		isDirectory(_dir, function (err, exists) {

			if (err) {
				callback(err);
			} else if (!exists) {
				callback(new Error("\"" + _dir + "\" is not a valid directory"));
			} else {

				readdir(_dir, function (_err, files) {

					if (_err) {
						callback(_err);
					} else {
						_extractRealFiles(_dir, files, [], callback);
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

	"extractFilesProm": function extractFilesProm(dir) {

		return new Promise(function (resolve, reject) {

			_extractFiles(dir, function (err, result) {

				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	},

	// sync version

	"extractFilesSync": function extractFilesSync(dir) {

		if ("undefined" === typeof dir) {
			throw new ReferenceError("missing \"directory\" argument");
		} else if ("string" !== typeof dir) {
			throw new TypeError("\"directory\" argument is not a string");
		} else {

			var _dir = dir.trim();

			if (!isDirectorySync(_dir)) {
				throw new Error("\"" + _dir + "\" is not a valid directory");
			} else {

				var result = [];

				readdirSync(_dir).forEach(function (file) {

					var _file = join(_dir, file);

					if (isFileSync(_file)) {
						result.push(_file);
					}
				});

				return result;
			}
		}
	}

};