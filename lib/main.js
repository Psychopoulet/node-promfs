"use strict";

// deps

	// natives
	const fs = require(require("path").join(__dirname, "extends", "extends.js"));

// promises

	// write

		fs.mkdirProm = (dir) => {

			return Promise.resolve().then(() => {
				return fs.isDirectoryProm(dir);
			}).then((exists) => {

				return exists ? Promise.resolve() : new Promise((resolve, reject) => {

					fs.mkdir(dir, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			});

		};

		fs.rmdirProm = (dir) => {

			return Promise.resolve().then(() => {
				return fs.isDirectoryProm(dir);
			}).then((exists) => {

				return !exists ? Promise.resolve() : new Promise((resolve, reject) => {

					fs.rmdir(dir, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			});

		};

		fs.unlinkProm = (file) => {

			return Promise.resolve().then(() => {
				return fs.isFileProm(file);
			}).then((exists) => {

				return !exists ? Promise.resolve() : new Promise((resolve, reject) => {

					fs.unlink(file, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			});

		};

	// stream

		fs.openProm = (path, flags, mode) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else if ("undefined" === typeof flags) {
				return Promise.reject(new ReferenceError("missing \"flags\" argument"));
			}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.open(_path, flags, "undefined" !== typeof mode ? mode : null, (err, fd) => {
						return err ? reject(err) : resolve(fd);
					});

				});

			}

		};

		fs.closeProm = (fd) => {

			if ("undefined" === typeof fd) {
				return Promise.reject(new ReferenceError("missing \"fd\" argument"));
			}
				else if ("number" !== typeof fd) {
					return Promise.reject(new TypeError("\"fd\" argument is not a number"));
				}
			else {

				return new Promise((resolve, reject) => {

					fs.close(fd, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			}

		};

	// others

		fs.accessProm = (path, mode) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}

			else if ("undefined" !== typeof mode && "number" !== typeof mode) {
				return Promise.reject(new TypeError("\"mode\" argument is not a number"));
			}

			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.access(_path, "undefined" !== typeof mode ? mode : null, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		fs.appendFileProm = (file, data, options) => {

			if ("undefined" === typeof file) {
				return Promise.reject(new ReferenceError("missing \"file\" argument"));
			}
				else if ("string" !== typeof file) {
					return Promise.reject(new TypeError("\"file\" argument is not a string"));
				}
			else if ("undefined" === typeof data) {
				return Promise.reject(new ReferenceError("missing \"data\" argument"));
			}
				else if ("string" !== typeof data && ("object" !== typeof data || !(data instanceof Buffer))) {
					return Promise.reject(new TypeError("\"data\" argument is not a string or a Buffer"));
				}
			else {

				const _file = file.trim();

				return "" === _file ? Promise.reject(new Error("\"file\" argument is empty")) : new Promise((resolve, reject) => {

					fs.appendFile(_file, data, options ? options : null, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			}

		};

		fs.chmodProm = (path, mode) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else if ("undefined" === typeof mode) {
				return Promise.reject(new ReferenceError("missing \"mode\" argument"));
			}
				else if ("number" !== typeof mode) {
					return Promise.reject(new TypeError("\"mode\" argument is not a number"));
				}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.chmod(_path, mode, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			}

		};

		fs.chownProm = (path, uid, gid) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else if ("undefined" === typeof uid) {
				return Promise.reject(new ReferenceError("missing \"uid\" argument"));
			}
				else if ("number" !== typeof uid) {
					return Promise.reject(new TypeError("\"uid\" argument is not a number"));
				}
			else if ("undefined" === typeof gid) {
				return Promise.reject(new ReferenceError("missing \"gid\" argument"));
			}
				else if ("number" !== typeof gid) {
					return Promise.reject(new TypeError("\"gid\" argument is not a number"));
				}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.chown(_path, uid, gid, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			}

		};

		fs.readdirProm = (path) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.readdir(_path, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		fs.readFileProm = (file, options) => {

			if ("undefined" === typeof file) {
				return Promise.reject(new ReferenceError("missing \"file\" argument"));
			}
				else if ("string" !== typeof file && "number" !== typeof file && ("object" !== typeof file || !(file instanceof Buffer))) {
					return Promise.reject(new TypeError("\"file\" argument is not a string, a number or a Buffer"));
				}
			else {

				return new Promise((resolve, reject) => {

					fs.readFile(file, options ? options : null, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		fs.realpathProm = (path, options) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.realpath(_path, "undefined" !== typeof options ? options : null, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		fs.renameProm = (oldPath, newPath) => {

			if ("undefined" === typeof oldPath) {
				return Promise.reject(new ReferenceError("missing \"oldPath\" argument"));
			}
				else if ("string" !== typeof oldPath) {
					return Promise.reject(new TypeError("\"oldPath\" argument is not a string"));
				}
			else if ("undefined" === typeof newPath) {
				return Promise.reject(new ReferenceError("missing \"newPath\" argument"));
			}
				else if ("string" !== typeof newPath) {
					return Promise.reject(new TypeError("\"newPath\" argument is not a string"));
				}
			else {

				const _oldPath = oldPath.trim();
				const _newPath = newPath.trim();

				if ("" === _oldPath) {
					return Promise.reject(new Error("\"oldPath\" argument is empty"));
				}
				else if ("" === _newPath) {
					return Promise.reject(new Error("\"newPath\" argument is empty"));
				}
				else {

					return new Promise((resolve, reject) => {

						fs.rename(_oldPath, _newPath, (err, result) => {
							return err ? reject(err) : resolve(result);
						});

					});

				}

			}

		};

		fs.statProm = (path) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.stat(_path, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		fs.truncateProm = (path, len) => {

			if ("undefined" === typeof path) {
				return Promise.reject(new ReferenceError("missing \"path\" argument"));
			}
				else if ("string" !== typeof path) {
					return Promise.reject(new TypeError("\"path\" argument is not a string"));
				}
			else if ("undefined" === typeof len) {
				return Promise.reject(new ReferenceError("missing \"len\" argument"));
			}
				else if ("number" !== typeof len) {
					return Promise.reject(new TypeError("\"len\" argument is not a number"));
				}
			else {

				const _path = path.trim();

				return "" === _path ? Promise.reject(new Error("\"path\" argument is empty")) : new Promise((resolve, reject) => {

					fs.truncate(_path, len, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		fs.writeFileProm = (file, data, options) => {

			if ("undefined" === typeof file) {
				return Promise.reject(new ReferenceError("missing \"file\" argument"));
			}
				else if ("string" !== typeof file && "number" !== typeof file && ("object" !== typeof file || !(file instanceof Buffer))) {
					return Promise.reject(new TypeError("\"file\" argument is not a string, a number or a Buffer"));
				}
			else if ("undefined" === typeof data) {
				return Promise.reject(new ReferenceError("missing \"data\" argument"));
			}
				else if ("string" !== typeof data && ("object" !== typeof data || !(data instanceof Buffer))) {
					return Promise.reject(new TypeError("\"data\" argument is not a string or a Buffer"));
				}
			else {

				return new Promise((resolve, reject) => {

					fs.writeFile(file, data, options ? options : null, (err, result) => {
						return err ? reject(err) : resolve(result);
					});

				});

			}

		};

		// write
		[ "fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes" ]
		// others
		.concat([ "link", "lstat", "mkdtemp", "utimes", "write" ]).forEach((name) => {

			fs[name + "Prom"] = (...args) => {

				return new Promise((resolve, reject) => {

					fs[name](...args, (...subargs) => {

						const err = subargs.shift();

						return err ? reject(err) : resolve(...subargs);

					});

				});

			};

		});

// module

module.exports = fs;
