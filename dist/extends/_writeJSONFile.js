
"use strict";

// deps

var _require = require("fs"),
    writeFile = _require.writeFile,
    writeFileSync = _require.writeFileSync,
    unlink = _require.unlink,
    unlinkSync = _require.unlinkSync;

var _require2 = require(require("path").join(__dirname, "_isFile.js")),
    isFileProm = _require2.isFileProm,
    isFileSync = _require2.isFileSync;

// private

// methods

/**
* Async writeJSONFile
* @param {string} file : file to check
* @param {function} data : data to write
* @param {function} callback : operation's result
* @returns {void}
*/


function _writeJSONFile(file, data, callback) {

	if ("undefined" === typeof file) {
		throw new ReferenceError("missing \"file\" argument");
	} else if ("string" !== typeof file) {
		throw new TypeError("\"file\" argument is not a string");
	} else if ("" === file.trim()) {
		throw new Error("\"file\" argument is empty");
	} else if ("undefined" === typeof data) {
		throw new ReferenceError("missing \"data\" argument");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		isFileProm(file).then(function (exists) {

			return !exists ? Promise.resolve() : new Promise(function (resolve, reject) {

				unlink(file, function (err) {
					return err ? reject(err) : resolve();
				});
			});
		}).then(function () {

			return new Promise(function (resolve, reject) {

				writeFile(file, JSON.stringify(data), function (err) {
					return err ? reject(err) : resolve();
				});
			});
		}).then(function () {
			callback(null);
		}).catch(callback);
	}
}

// module

module.exports = {

	// async version

	"writeJSONFile": _writeJSONFile,

	// promise version

	"writeJSONFileProm": function writeJSONFileProm(file, data) {

		return new Promise(function (resolve, reject) {

			_writeJSONFile(file, data, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"writeJSONFileSync": function writeJSONFileSync(file, data) {

		if ("undefined" === typeof file) {
			throw new ReferenceError("missing \"file\" argument");
		} else if ("string" !== typeof file) {
			throw new TypeError("\"file\" argument is not a string");
		} else if ("" === file.trim()) {
			throw new Error("\"file\" argument is empty");
		}
		if ("undefined" === typeof data) {
			throw new ReferenceError("missing \"data\" argument");
		} else {

			if (isFileSync(file)) {
				unlinkSync(file);
			}

			writeFileSync(file, JSON.stringify(data));
		}
	}

};