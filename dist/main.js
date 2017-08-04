
"use strict";

// deps

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require(require("path").join(__dirname, "extends", "extends.js"));

// promises

// write

fs.mkdirProm = function (dir) {

	return new Promise(function (resolve, reject) {

		fs.isDirectoryProm(dir).then(function (exists) {
			resolve(exists);
		}).catch(function (err) {
			reject(err);
		});
	}).then(function (exists) {

		if (exists) {
			return Promise.resolve();
		} else {

			return new Promise(function (resolve, reject) {

				fs.mkdir(dir, function (err) {

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

fs.rmdirProm = function (dir) {

	return new Promise(function (resolve, reject) {

		fs.isDirectoryProm(dir).then(function (exists) {
			resolve(exists);
		}).catch(function (err) {
			reject(err);
		});
	}).then(function (exists) {

		if (!exists) {
			return Promise.resolve();
		} else {

			return new Promise(function (resolve, reject) {

				fs.rmdir(dir, function (err) {

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

fs.unlinkProm = function (file) {

	return new Promise(function (resolve, reject) {

		fs.isFileProm(file).then(function (exists) {
			resolve(exists);
		}).catch(function (err) {
			reject(err);
		});
	}).then(function (exists) {

		if (!exists) {
			return Promise.resolve();
		} else {

			return new Promise(function (resolve, reject) {

				fs.unlink(file, function (err) {

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

fs.openProm = function (path, flags, mode) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else if ("undefined" === typeof flags) {
		return Promise.reject(new ReferenceError("missing \"flags\" argument"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.open(_path, flags, mode ? mode : null, function (err, fd) {

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

fs.closeProm = function (fd) {

	if ("undefined" === typeof fd) {
		return Promise.reject(new ReferenceError("missing \"fd\" argument"));
	} else if ("number" !== typeof fd) {
		return Promise.reject(new TypeError("\"fd\" argument is not a number"));
	} else {

		return new Promise(function (resolve, reject) {

			fs.close(fd, function (err) {

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

fs.accessProm = function (path, mode) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.access(_path, mode ? mode : null, function (err, result) {

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

fs.appendFileProm = function (file, data, options) {

	if ("undefined" === typeof file) {
		return Promise.reject(new ReferenceError("missing \"file\" argument"));
	} else if ("string" !== typeof file) {
		return Promise.reject(new TypeError("\"file\" argument is not a string"));
	} else if ("undefined" === typeof data) {
		return Promise.reject(new ReferenceError("missing \"data\" argument"));
	} else if ("string" !== typeof data && ("object" !== (typeof data === "undefined" ? "undefined" : _typeof(data)) || !(data instanceof Buffer))) {
		return Promise.reject(new TypeError("\"data\" argument is not a string or a Buffer"));
	} else {

		var _file = file.trim();

		if ("" === _file) {
			return Promise.reject(new Error("\"file\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.appendFile(_file, data, options ? options : null, function (err) {

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

fs.chmodProm = function (path, mode) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else if ("undefined" === typeof mode) {
		return Promise.reject(new ReferenceError("missing \"mode\" argument"));
	} else if ("number" !== typeof mode) {
		return Promise.reject(new TypeError("\"mode\" argument is not a number"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.chmod(_path, mode, function (err) {

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

fs.chownProm = function (path, uid, gid) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else if ("undefined" === typeof uid) {
		return Promise.reject(new ReferenceError("missing \"uid\" argument"));
	} else if ("number" !== typeof uid) {
		return Promise.reject(new TypeError("\"uid\" argument is not a number"));
	} else if ("undefined" === typeof gid) {
		return Promise.reject(new ReferenceError("missing \"gid\" argument"));
	} else if ("number" !== typeof gid) {
		return Promise.reject(new TypeError("\"gid\" argument is not a number"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.chown(_path, uid, gid, function (err) {

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

fs.readdirProm = function (path) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.readdir(_path, function (err, result) {

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

fs.readFileProm = function (file, options) {

	if ("undefined" === typeof file) {
		return Promise.reject(new ReferenceError("missing \"file\" argument"));
	} else if ("string" !== typeof file && "number" !== typeof file && ("object" !== (typeof file === "undefined" ? "undefined" : _typeof(file)) || !(file instanceof Buffer))) {
		return Promise.reject(new TypeError("\"file\" argument is not a string, a number or a Buffer"));
	} else {

		return new Promise(function (resolve, reject) {

			fs.readFile(file, options ? options : null, function (err, result) {

				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
};

fs.realpathProm = function (path, options) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.realpath(_path, options ? options : null, function (err, result) {

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

fs.renameProm = function (oldPath, newPath) {

	if ("undefined" === typeof oldPath) {
		return Promise.reject(new ReferenceError("missing \"oldPath\" argument"));
	} else if ("string" !== typeof oldPath) {
		return Promise.reject(new TypeError("\"oldPath\" argument is not a string"));
	} else if ("undefined" === typeof newPath) {
		return Promise.reject(new ReferenceError("missing \"newPath\" argument"));
	} else if ("string" !== typeof newPath) {
		return Promise.reject(new TypeError("\"newPath\" argument is not a string"));
	} else {

		var _oldPath = oldPath.trim();
		var _newPath = newPath.trim();

		if ("" === _oldPath) {
			return Promise.reject(new Error("\"oldPath\" argument is empty"));
		} else if ("" === _newPath) {
			return Promise.reject(new Error("\"newPath\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.rename(_oldPath, _newPath, function (err, result) {

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

fs.statProm = function (path) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.stat(_path, function (err, result) {

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

fs.truncateProm = function (path, len) {

	if ("undefined" === typeof path) {
		return Promise.reject(new ReferenceError("missing \"path\" argument"));
	} else if ("string" !== typeof path) {
		return Promise.reject(new TypeError("\"path\" argument is not a string"));
	} else if ("undefined" === typeof len) {
		return Promise.reject(new ReferenceError("missing \"len\" argument"));
	} else if ("number" !== typeof len) {
		return Promise.reject(new TypeError("\"len\" argument is not a number"));
	} else {

		var _path = path.trim();

		if ("" === _path) {
			return Promise.reject(new Error("\"path\" argument is empty"));
		} else {

			return new Promise(function (resolve, reject) {

				fs.truncate(_path, len, function (err, result) {

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

fs.writeFileProm = function (file, data, options) {

	if ("undefined" === typeof file) {
		return Promise.reject(new ReferenceError("missing \"file\" argument"));
	} else if ("string" !== typeof file && "number" !== typeof file && ("object" !== (typeof file === "undefined" ? "undefined" : _typeof(file)) || !(file instanceof Buffer))) {
		return Promise.reject(new TypeError("\"file\" argument is not a string, a number or a Buffer"));
	} else if ("undefined" === typeof data) {
		return Promise.reject(new ReferenceError("missing \"data\" argument"));
	} else if ("string" !== typeof data && ("object" !== (typeof data === "undefined" ? "undefined" : _typeof(data)) || !(data instanceof Buffer))) {
		return Promise.reject(new TypeError("\"data\" argument is not a string or a Buffer"));
	} else {

		return new Promise(function (resolve, reject) {

			fs.writeFile(file, data, options ? options : null, function (err, result) {

				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
};

[

// write
"fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes",
// others
"link", "lstat", "mkdtemp", "utimes", "write"].forEach(function (name) {

	fs[name + "Prom"] = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return new Promise(function (resolve, reject) {

			fs[name].apply(fs, args.concat([function () {
				for (var _len2 = arguments.length, subargs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					subargs[_key2] = arguments[_key2];
				}

				var err = subargs.shift();

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