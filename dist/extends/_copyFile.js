
"use strict";

// deps

var _require = require("fs"),
    createReadStream = _require.createReadStream,
    createWriteStream = _require.createWriteStream,
    writeFileSync = _require.writeFileSync,
    readFileSync = _require.readFileSync;

var _require2 = require(require("path").join(__dirname, "_isFile.js")),
    isFileProm = _require2.isFileProm,
    isFileSync = _require2.isFileSync;

// private

// methods

/**
* Async copyFile
* @param {string} origin : file to copy
* @param {string} target : file to copy in
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _copyFile(origin, target, callback) {

	if ("undefined" === typeof origin) {
		throw new ReferenceError("Missing \"origin\" argument");
	} else if ("string" !== typeof origin) {
		throw new TypeError("\"origin\" argument is not a string");
	} else if ("" === origin.trim()) {
		throw new TypeError("\"origin\" argument is empty");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("Missing \"target\" argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("\"target\" argument is not a string");
	} else if ("" === target.trim()) {
		throw new Error("\"target\" argument is empty");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("Missing \"callback\" argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		isFileProm(origin).then(function (exists) {
			return exists ? Promise.resolve() : Promise.reject(new Error("There is no origin file \"" + origin + "\""));
		}).then(function () {

			var error = false;

			var writeStream = createWriteStream(target).once("error", function (_err) {

				error = true;
				writeStream.close();

				callback(_err);
			}).once("close", function () {

				if (!error) {
					callback(null);
				}
			});

			createReadStream(origin).once("error", function (_err) {
				error = true;callback(_err);
			}).pipe(writeStream);
		}).catch(callback);
	}
}

// module

module.exports = {

	// async version

	"copyFile": _copyFile,

	// promise version

	"copyFileProm": function copyFileProm(origin, target) {

		return new Promise(function (resolve, reject) {

			_copyFile(origin, target, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"copyFileSync": function copyFileSync(origin, target) {

		if ("undefined" === typeof origin) {
			throw new ReferenceError("Missing \"origin\" argument");
		} else if ("string" !== typeof origin) {
			throw new TypeError("\"origin\" argument is not a string");
		} else if ("" === origin.trim()) {
			throw new TypeError("\"origin\" argument is empty");
		} else if ("undefined" === typeof target) {
			throw new ReferenceError("Missing \"target\" argument");
		} else if ("string" !== typeof target) {
			throw new TypeError("\"target\" argument is not a string");
		} else if ("" === target.trim()) {
			throw new TypeError("\"target\" argument is empty");
		} else if (!isFileSync(origin)) {
			throw new Error("There is no origin file \"" + origin + "\"");
		} else {

			writeFileSync(target.trim(), readFileSync(origin.trim()));
		}
	}

};