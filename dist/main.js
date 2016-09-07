
"use strict";

// deps

const fs = require(require("path").join(__dirname, "extends.js"));

// promises

[

// extend
"concatFiles", "concatDirectoryFiles", "copy", "isDirectory", "isFile", "mkdirp", "rmdirp",

// classical
"access", "appendFile", "chmod", "chown", "close", "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "link", "lstat", "mkdtemp", "open", "readdir", "readFile", "rename", "stat", "truncate", "utimes", "write", "writeFile"].forEach(name => {

	fs[name + "Prom"] = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new Promise((resolve, reject) => {

			fs[name].apply(fs, args.concat([function () {
				for (var _len2 = arguments.length, subargs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					subargs[_key2] = arguments[_key2];
				}

				let err = subargs.shift();

				if (err) {
					reject(err.message ? err.message : err);
				} else {
					resolve.apply(undefined, subargs);
				}
			}]));
		});
	};
});

fs.mkdirProm = dir => {

	return new Promise((resolve, reject) => {

		fs.isDirectory(dir, (err, exists) => {

			if (err) {
				reject(err);
			} else if (exists) {
				resolve();
			} else {

				fs.mkdir(dir, err => {

					if (err) {
						reject(err.message ? err.message : err);
					} else {
						resolve();
					}
				});
			}
		});
	});
};

fs.rmdirProm = dir => {

	return new Promise((resolve, reject) => {

		fs.isDirectory(dir, (err, exists) => {

			if (err) {
				reject(err);
			} else if (!exists) {
				resolve();
			} else {

				fs.rmdir(dir, err => {

					if (err) {
						reject(err.message ? err.message : err);
					} else {
						resolve();
					}
				});
			}
		});
	});
};

fs.unlinkProm = file => {

	return new Promise((resolve, reject) => {

		fs.isFile(file, (err, exists) => {

			if (err) {
				reject(err);
			} else if (!exists) {
				resolve();
			} else {

				fs.unlink(file, err => {

					if (err) {
						reject(err.message ? err.message : err);
					} else {
						resolve();
					}
				});
			}
		});
	});
};

fs.realpathProm = (path, options) => {

	if ("string" !== typeof path) {
		return Promise.reject("This is not a string");
	} else {

		path = path.trim();

		if ("" == path) {
			return Promise.reject("\"path\" is empty");
		} else {

			return new Promise((resolve, reject) => {

				fs.realpath(path, options ? options : null, (err, result) => {

					if (err) {
						reject(err.message ? err.message : err);
					} else {
						resolve(result);
					}
				});
			});
		}
	}
};

// module

module.exports = fs;