
"use strict";

// deps

var _require = require("fs"),
    mkdir = _require.mkdir,
    mkdirSync = _require.mkdirSync;

var _require2 = require("path"),
    dirname = _require2.dirname,
    join = _require2.join;

var _require3 = require(join(__dirname, "_isDirectory.js")),
    isDirectoryProm = _require3.isDirectoryProm,
    isDirectorySync = _require3.isDirectorySync;

// private

// methods

/**
* Async mkdirp
* @param {string} directory : directory path
* @param {number} mode : creation mode
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _mkdirp(directory, mode, callback) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" !== typeof callback && "number" !== typeof mode) {
		throw new TypeError("\"mode\" argument is not a number");
	} else if ("undefined" === typeof callback && "undefined" === typeof mode) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof mode) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _callback = callback;
		var _mode = mode;

		if ("undefined" === typeof _callback) {
			_callback = mode;
			_mode = 511;
		}

		isDirectoryProm(directory).then(function (exists) {

			return exists ? Promise.resolve() : Promise.resolve().then(function () {

				var SUB_DIRECTORY = dirname(directory);

				return isDirectoryProm(SUB_DIRECTORY).then(function (_exists) {

					return new Promise(function (resolve, reject) {

						if (_exists) {

							mkdir(directory, _mode, function (err) {
								return err ? reject(err) : resolve();
							});
						} else {

							_mkdirp(SUB_DIRECTORY, _mode, function (err) {

								return err ? reject(err) : mkdir(directory, _mode, function (__err) {
									return __err ? reject(__err) : resolve();
								});
							});
						}
					});
				});
			});
		}).then(function () {
			_callback(null);
		}).catch(callback);
	}
}

/**
* Recursive mkdirpSync
* @param {string} directory : directory path
* @param {number} mode : creation mode
* @returns {void}
*/
function _mkdirpSync(directory, mode) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" !== typeof mode && "number" !== typeof mode) {
		throw new TypeError("\"mode\" argument is not a number");
	} else if (!isDirectorySync(directory)) {

		var SUB_DIRECTORY = dirname(directory);

		if (!isDirectorySync(SUB_DIRECTORY)) {
			_mkdirpSync(SUB_DIRECTORY);
		}

		mkdirSync(directory, mode ? mode : 511);
	}
}

// module

module.exports = {

	// async version

	"mkdirp": _mkdirp,

	// promise version

	"mkdirpProm": function mkdirpProm(directory, mode) {

		return new Promise(function (resolve, reject) {

			_mkdirp(directory, mode ? mode : 511, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"mkdirpSync": _mkdirpSync

};