
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
    isDirectoryProm = _require3.isDirectoryProm,
    isDirectorySync = _require3.isDirectorySync;

// private

// methods

/**
* Async empty directory
* @param {string} directory : directory path
* @returns {void}
*/


function _emptyDirectoryProm(directory) {

	return new Promise(function (resolve, reject) {

		readdir(directory, function (err, files) {
			return err ? reject(err) : resolve(files);
		});
	}).then(function (files) {

		return !files.length ? Promise.resolve() : new Promise(function (resolve, reject) {

			var countFilesDeleted = 0;

			var _loop = function _loop(i) {

				var file = join(directory, files[i]);

				isDirectoryProm(file).then(function (exists) {

					return exists ? new Promise(function (resolveRemove, rejectRemove) {

						_rmdirp(file, function (err) {
							return err ? rejectRemove(err) : resolveRemove();
						});
					}) : new Promise(function (resolveRemove, rejectRemove) {

						unlink(file, function (err) {
							return err ? rejectRemove(err) : resolveRemove();
						});
					});
				}).then(function () {

					++countFilesDeleted;

					if (countFilesDeleted >= files.length) {
						resolve();
					}
				}).catch(function (err) {
					countFilesDeleted = files.length;
					reject(err);
				});
			};

			for (var i = 0; i < files.length && countFilesDeleted < files.length; ++i) {
				_loop(i);
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

		isDirectoryProm(directory).then(function (exists) {

			return !exists ? Promise.resolve() : _emptyDirectoryProm(directory).then(function () {

				return new Promise(function (resolve, reject) {

					rmdir(directory, function (err) {
						return err ? reject(err) : resolve();
					});
				});
			});
		}).then(function () {
			callback(null);
		}).catch(callback);
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
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"rmdirpSync": _rmdirpSync

};