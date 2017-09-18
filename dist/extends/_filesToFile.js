
"use strict";

// deps

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require("fs");

var _require = require("path"),
    basename = _require.basename,
    join = _require.join;

var _require2 = require(join(__dirname, "_filesToStream.js")),
    filesToStreamProm = _require2.filesToStreamProm;

var _require3 = require(join(__dirname, "_isFile.js")),
    isFileProm = _require3.isFileProm,
    isFileSync = _require3.isFileSync;

// private

// methods

/**
* Async filesToFile
* @param {Array} files : files to read
* @param {string} target : file to write in
* @param {string} separator : files separator
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _filesToFile(files, target, separator, callback) {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing \"files\" argument");
	} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
		throw new TypeError("\"files\" argument is not an Array");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing \"target\" argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("\"target\" argument is not a string");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _target = target.trim();

		if ("" === _target) {
			throw new Error("\"target\" argument is empty");
		} else {

			var _callback = "undefined" === typeof callback ? separator : callback;

			Promise.resolve().then(function () {
				return isFileProm(_target);
			}).then(function (exists) {

				return !exists ? Promise.resolve() : new Promise(function (resolve, reject) {

					fs.unlink(_target, function (err) {
						return err ? reject(err) : resolve();
					});
				});
			}).then(function () {

				if (!files.length) {

					return new Promise(function (resolve, reject) {

						fs.writeFile(_target, "", function (err) {
							return err ? reject(err) : resolve();
						});
					});
				} else {

					return filesToStreamProm(files, "string" === typeof separator ? separator : " ").then(function (readStream) {

						return new Promise(function (resolve, reject) {

							var error = false;
							readStream.once("error", function (_err) {
								error = true;reject(_err);
							}).pipe(fs.createWriteStream(_target, { "flags": "a" }).once("error", function (_err) {
								error = true;reject(_err);
							}).once("close", function () {

								if (!error) {
									resolve();
								}
							}));
						});
					});
				}
			}).then(function () {
				_callback(null);
			}).catch(_callback);
		}
	}
}

// module

module.exports = {

	// async version

	"filesToFile": _filesToFile,

	// promise version

	"filesToFileProm": function filesToFileProm(files, target, separator) {

		return new Promise(function (resolve, reject) {

			_filesToFile(files, target, separator, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"filesToFileSync": function filesToFileSync(files, target, separator) {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
			throw new TypeError("\"files\" argument is not an Array");
		} else if ("undefined" === typeof target) {
			throw new ReferenceError("missing \"target\" argument");
		} else if ("string" !== typeof target) {
			throw new TypeError("\"target\" argument is not a string");
		} else {

			var _target = target.trim();

			if ("" === _target) {
				throw new Error("\"target\" argument is empty");
			} else {

				if (isFileSync(_target)) {
					fs.unlinkSync(_target);
				}

				if (!files.length) {
					fs.writeFileSync(_target, "");
				}

				files.forEach(function (file, key) {

					var _file = file.trim();
					var _separator = "string" === typeof separator ? separator : " ";

					if (!isFileSync(_file)) {
						throw new Error("\"" + _file + "\" does not exist");
					} else if (-1 < _separator.indexOf("{{filename}}")) {
						fs.appendFileSync(_target, _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file));
					} else {
						fs.appendFileSync(_target, 0 < key ? _separator + fs.readFileSync(_file) : fs.readFileSync(_file));
					}
				});
			}
		}
	}

};