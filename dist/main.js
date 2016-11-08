
"use strict";

// deps

const fs = require(require("path").join(__dirname, "extends.js"));

// promises

// write

fs.mkdirProm = dir => {

	return new Promise((resolve, reject) => {

		fs.isDirectoryProm(dir).then(exists => {
			resolve(exists);
		}).catch(err => {
			reject(err);
		});
	}).then(exists => {

		if (exists) {
			return Promise.resolve();
		} else {

			return new Promise((resolve, reject) => {

				fs.mkdir(dir, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	});
};

fs.rmdirProm = dir => {

	return new Promise((resolve, reject) => {

		fs.isDirectoryProm(dir).then(exists => {
			resolve(exists);
		}).catch(err => {
			reject(err);
		});
	}).then(exists => {

		if (!exists) {
			return Promise.resolve();
		} else {

			return new Promise((resolve, reject) => {

				fs.rmdir(dir, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	});
};

fs.unlinkProm = file => {

	return new Promise((resolve, reject) => {

		fs.isFileProm(file).then(exists => {
			resolve(exists);
		}).catch(err => {
			reject(err);
		});
	}).then(exists => {

		if (!exists) {
			return Promise.resolve();
		} else {

			return new Promise((resolve, reject) => {

				fs.unlink(file, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	});
};

// stream

fs.openProm = (path, flags, mode) => {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing 'path' argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("'path' argument is not a string"));
	} else if ("undefined" === typeof flags) {
		return Promise.reject(new ReferenceError("missing 'flags' argument"));
	} else {

		path = path.trim();

		if ("" === path) {
			return Promise.reject(new Error("'path' argument is empty"));
		} else {

			return new Promise((resolve, reject) => {

				fs.open(path, flags, mode ? mode : null, (err, fd) => {

					if (err) {
						reject(err);
					} else {
						resolve(fd);
					}
				});
			});
		}
	}
};

fs.closeProm = fd => {

	if ("undefined" === typeof fd) {
		return Promise.reject(new ReferenceError("missing 'fd' argument"));
	} else if ("number" !== typeof fd) {
		return Promise.reject(new TypeError("'fd' argument is not a number"));
	} else {

		return new Promise((resolve, reject) => {

			fs.close(fd, err => {

				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
};

// others

fs.accessProm = (path, mode) => {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing 'path' argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("'path' argument is not a string"));
	} else {

		path = path.trim();

		if ("" === path) {
			return Promise.reject(new Error("'path' argument is empty"));
		} else {

			return new Promise((resolve, reject) => {

				fs.access(path, mode ? mode : null, (err, result) => {

					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	}
};

fs.appendFileProm = (file, data, options) => {

	if ("undefined" === typeof file) {
		return Promise.reject(new ReferenceError("missing 'file' argument"));
	} else if ("string" !== typeof file) {
		return Promise.reject(new TypeError("'file' argument is not a string"));
	} else if ("undefined" === typeof data) {
		return Promise.reject(new ReferenceError("missing 'data' argument"));
	} else if ("string" !== typeof data && ("object" !== typeof data || !(data instanceof Buffer))) {
		return Promise.reject(new TypeError("'data' argument is not a string or a Buffer"));
	} else {

		file = file.trim();

		if ("" === file) {
			return Promise.reject(new Error("'file' argument is empty"));
		} else {

			return new Promise((resolve, reject) => {

				fs.appendFile(file, data, options ? options : null, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	}
};

fs.chmodProm = (path, mode) => {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing 'path' argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("'path' argument is not a string"));
	} else if ("undefined" === typeof mode) {
		return Promise.reject(new ReferenceError("missing 'mode' argument"));
	} else if ("number" !== typeof mode) {
		return Promise.reject(new TypeError("'mode' argument is not a number"));
	} else {

		path = path.trim();

		if ("" === path) {
			return Promise.reject(new Error("'path' argument is empty"));
		} else {

			new Promise((resolve, reject) => {

				fs.chmod(path, mode, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	}
};

fs.chownProm = (path, uid, gid) => {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing 'path' argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("'path' argument is not a string"));
	} else if ("undefined" === typeof uid) {
		return Promise.reject(new ReferenceError("missing 'uid' argument"));
	} else if ("number" !== typeof uid) {
		return Promise.reject(new TypeError("'uid' argument is not a number"));
	} else if ("undefined" === typeof gid) {
		return Promise.reject(new ReferenceError("missing 'gid' argument"));
	} else if ("number" !== typeof gid) {
		return Promise.reject(new TypeError("'gid' argument is not a number"));
	} else {

		path = path.trim();

		if ("" === path) {
			return Promise.reject(new Error("'path' argument is empty"));
		} else {

			return new Promise((resolve, reject) => {

				fs.chown(path, uid, gid, err => {

					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
		}
	}
};

fs.readdirProm = (path, options) => {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing 'path' argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("'path' argument is not a string"));
	} else {

		path = path.trim();

		if ("" === path) {
			return Promise.reject(new Error("'path' argument is empty"));
		} else {

			return new Promise((resolve, reject) => {

				fs.readdir(path, options ? options : null, (err, result) => {

					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	}
};

fs.realpathProm = (path, options) => {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing 'path' argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("'path' argument is not a string"));
	} else {

		path = path.trim();

		if ("" === path) {
			return Promise.reject(new Error("'path' argument is empty"));
		} else {

			return new Promise((resolve, reject) => {

				fs.realpath(path, options ? options : null, (err, result) => {

					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	}
};

[

// extend
"directoryToString", "directoryToFile", "extractFiles", "filesToString", "filesToFile", "mkdirp", "rmdirp",

// classical
"fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes", "link", "lstat", "mkdtemp", "readFile", "rename", "stat", "truncate", "utimes", "write", "writeFile"].forEach(name => {

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
					reject(err);
				} else {
					resolve.apply(undefined, subargs);
				}
			}]));
		});
	};
});

// module

module.exports = fs;