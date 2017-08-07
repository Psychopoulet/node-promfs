
"use strict";

// deps

var _require = require("fs"),
    readdir = _require.readdir,
    readdirSync = _require.readdirSync,
    rmdir = _require.rmdir,
    rmdirSync = _require.rmdirSync,
    unlink = _require.unlink,
    unlinkSync = _require.unlinkSync;

var _require2 = require("path"),
    join = _require2.join;

var _require3 = require(join(__dirname, "_isDirectory.js")),
    isDirectory = _require3.isDirectory,
    isDirectorySync = _require3.isDirectorySync;

// private

// methods

/**
* Async empty directory
* @param {string} directory : directory path
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _emptyDirectory(directory, callback) {

	process.nextTick(function () {

		readdir(directory, function (err, files) {

			if (err) {
				callback(err);
			} else if (!files.length) {
				callback(null);
			} else {

				var countFilesDeleted = 0;

				files.forEach(function (_file) {

					var file = join(directory, _file);

					isDirectory(file, function (_err, exists) {

						if (countFilesDeleted >= files.length) {
							// nothing to do here
						} else if (_err) {
							countFilesDeleted = files.length;
							callback(_err);
						} else if (exists) {

							_rmdirp(file, function (__err) {

								if (countFilesDeleted >= files.length) {
									// nothing to do here
								} else if (__err) {
									countFilesDeleted = files.length;
									callback(__err);
								} else {

									++countFilesDeleted;

									if (countFilesDeleted >= files.length) {
										callback(null);
									}
								}
							});
						} else {

							unlink(file, function (__err) {

								if (countFilesDeleted >= files.length) {
									// nothing to do here
								} else if (__err) {
									countFilesDeleted = files.length;
									callback(__err);
								} else {

									++countFilesDeleted;

									if (countFilesDeleted >= files.length) {
										callback(null);
									}
								}
							});
						}
					});
				});
			}
		});
	});
}

/**
* Async rmdirp
* @param {string} directory : directory path
* @param {function|null} callback : operation's result
* @returns {void}
*/
function _rmdirp(directory, callback) {

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

			isDirectory(directory, function (errIsDirectory, existsIsDirectory) {

				if (errIsDirectory) {
					callback(errIsDirectory);
				} else if (!existsIsDirectory) {
					callback(null);
				} else {

					_emptyDirectory(directory, function (err) {

						if (err) {
							callback(err);
						} else {
							rmdir(directory, callback);
						}
					});
				}
			});
		});
	}
}

/**
* Recursive rmdirpSync
* @param {string} directory : directory path
* @returns {void}
*/
function _rmdirpSync(directory) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if (isDirectorySync(directory)) {

		readdirSync(directory).forEach(function (_file) {

			var file = join(directory, _file);

			if (isDirectorySync(file)) {
				_rmdirpSync(file);
			} else {
				unlinkSync(file);
			}
		});

		rmdirSync(directory);
	}
}

// module

module.exports = {

	// async version

	"rmdirp": _rmdirp,

	// promise version

	"rmdirpProm": function rmdirpProm(directory) {

		return new Promise(function (resolve, reject) {

			_rmdirp(directory, function (err) {

				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	// sync version

	"rmdirpSync": _rmdirpSync

};