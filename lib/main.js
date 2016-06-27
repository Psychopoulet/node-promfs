
"use strict";

// deps

	const fs = require(require("path").join(__dirname, "extends.js"));

// promises

	[

		// node-promfs
		"concatFiles", "copy", "isDirectory", "isFile", "mkdirp", "rmdirp",

		// classical
		"access", "appendFile", "chmod", "chown", "close",
		"fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes",
		"link", "lstat", "mkdtemp", "open",
		"readdir", "readFile",
		"rename", "stat", "truncate", "utimes",
		"write", "writeFile"

	].forEach(name => {

		fs[name + "Prom"] = function() {

			let args = Array.prototype.slice.call(arguments, 0);

			return new Promise(function(resolve, reject) {

				try {

					fs[name](...args, function(err) {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {

							let args = Array.prototype.slice.call(arguments, 0);
							args.shift();

							resolve(...args);
						}

					});

				}
				catch(e) {
					reject(((e.message) ? e.message : e));
				}

			});

		};

	});

	fs.mkdirProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isDirectory(dir, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (exists) {
						resolve();
					}
					else {

						fs.mkdir(dir, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.rmdirProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isDirectory(dir, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (!exists) {
						resolve();
					}
					else {

						fs.rmdir(dir, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.unlinkProm = function(file) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isFile(file, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (!exists) {
						resolve();
					}
					else {

						fs.unlink(file, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.realpathProm = function(path, options) {

		if ("string" !== typeof path) {
			return Promise.reject("This is not a string");
		}
		else {

			path = path.trim();

			if ("" == path) {
				return Promise.reject("\"path\" is empty");
			}
			else {

				return new Promise(function(resolve, reject) {

					fs.realpath(path, (options) ? options : null, function(err, result) {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {
							resolve(result);
						}

					});

				});

			}

		}

	};

// module

module.exports = fs;
