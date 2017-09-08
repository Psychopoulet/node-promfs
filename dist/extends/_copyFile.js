
"use strict";

// deps

var _require = require("fs"),
    createReadStream = _require.createReadStream,
    createWriteStream = _require.createWriteStream,
    writeFileSync = _require.writeFileSync,
    readFileSync = _require.readFileSync;

var _require2 = require(require("path").join(__dirname, "_isFile.js")),
    isFile = _require2.isFile,
    isFileSync = _require2.isFileSync;

// private

// methods

/**
* Async copyFile
* @param {string} origin : file to copy
* @param {string} target : file to copy in
* @param {Object|null} options : options for fs.createReadStream & fs.createWriteStream
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _copyFile(origin, target, options, callback) {

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
	} else if ("undefined" === typeof callback && "undefined" === typeof options) {
		throw new ReferenceError("Missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof options) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _callback = callback;
		var _options = options;

		if ("undefined" === typeof _callback) {
			_callback = options;
			_options = {};
		} else {
			_options = _options ? _options : {};
		}

		process.nextTick(function () {

			isFile(origin, function (err, exists) {

				if (err) {
					_callback(err);
				} else if (!exists) {
					_callback(new Error("There is no origin file \"" + origin + "\""));
				} else {

					var error = false;

					var readStream = createReadStream(origin, _options).once("error", function (_err) {
						error = true;
						_callback(_err);
					});

					var writeStream = createWriteStream(target, _options).once("error", function (_err) {

						error = true;
						writeStream.close();

						_callback(_err);
					}).once("close", function () {

						if (!error) {
							_callback(null);
						}
					});

					readStream.pipe(writeStream);
				}
			});
		});
	}
}

// module

module.exports = {

	// async version

	"copyFile": _copyFile,

	// promise version

	"copyFileProm": function copyFileProm(origin, target, options) {

		return new Promise(function (resolve, reject) {

			_copyFile(origin, target, options, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"copyFileSync": function copyFileSync(origin, target, options) {

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

			writeFileSync(target.trim(), readFileSync(origin.trim(), options ? options : null), options ? options : null);
		}
	}

};