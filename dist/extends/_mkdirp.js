
"use strict";

// deps

var _require = require("fs"),
    mkdir = _require.mkdir,
    mkdirSync = _require.mkdirSync;

var _require2 = require("path"),
    dirname = _require2.dirname,
    join = _require2.join;

var _require3 = require(join(__dirname, "_isDirectory.js")),
    isDirectory = _require3.isDirectory,
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
		} else {
			_mode = _mode ? _mode : 511;
		}

		process.nextTick(function () {

			isDirectory(directory, function (err, exists) {

				if (err) {
					_callback(err);
				} else if (exists) {
					_callback(null);
				} else {

					var SUB_DIRECTORY = dirname(directory);

					isDirectory(SUB_DIRECTORY, function (_err, _exists) {

						if (_err) {
							_callback(_err);
						} else if (_exists) {

							mkdir(directory, _mode, function (__err) {

								if (__err) {
									_callback(__err);
								} else {
									_callback(null);
								}
							});
						} else {

							_mkdirp(SUB_DIRECTORY, _mode, function (__err) {

								if (__err) {
									_callback(__err);
								} else {

									mkdir(directory, _mode, function (___err) {

										if (___err) {
											_callback(___err);
										} else {
											_callback(null);
										}
									});
								}
							});
						}
					});
				}
			});
		});
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

				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	// sync version

	"mkdirpSync": _mkdirpSync

};