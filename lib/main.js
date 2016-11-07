
"use strict";

// deps

	const fs = require(require("path").join(__dirname, "extends.js"));

// promises

	// write

		fs.mkdirProm = (dir) => {

			return new Promise((resolve, reject) => {

				fs.isDirectoryProm(dir).then((exists) => {
					resolve(exists);
				}).catch((err) => {
					reject(err);
				});

			}).then((exists) => {

				if (exists) {
					return Promise.resolve();
				}
				else {

					return new Promise((resolve, reject) => {

						fs.mkdir(dir, (err) => {

							if (err) {
								reject(err);
							}
							else {
								resolve();
							}

						});

					});

				}

			});

		};

		fs.rmdirProm = (dir) => {

			return new Promise((resolve, reject) => {

				fs.isDirectoryProm(dir).then((exists) => {
					resolve(exists);
				}).catch((err) => {
					reject(err);
				});

			}).then((exists) => {

				if (!exists) {
					return Promise.resolve();
				}
				else {

					return new Promise((resolve, reject) => {

						fs.rmdir(dir, (err) => {

							if (err) {
								reject(err);
							}
							else {
								resolve();
							}

						});

					});

				}

			});

		};

		fs.unlinkProm = (file) => {

			return new Promise((resolve, reject) => {

				fs.isFileProm(file).then((exists) => {
					resolve(exists);
				}).catch((err) => {
					reject(err);
				});

			}).then((exists) => {

				if (!exists) {
					return Promise.resolve();
				}
				else {

					return new Promise((resolve, reject) => {

						fs.unlink(file, (err) => {

							if (err) {
								reject(err);
							}
							else {
								resolve();
							}

						});
						
					});

				}

			});

		};

	// others

		fs.chmodProm = (path, mode) => {

			return new Promise((resolve, reject) => {

				if ("undefined" === typeof path) {
					reject(new ReferenceError("missing 'path' argument"));
				}
					else if ("string" !== typeof path) {
						reject(new TypeError("'path' argument is not a string"));
					}
				else if ("undefined" === typeof mode) {
					reject(new ReferenceError("missing 'mode' argument"));
				}
					else if ("number" !== typeof mode) {
						reject(new TypeError("'mode' argument is not a number"));
					}
				else {

					path = path.trim();

					if ("" === path) {
						reject(new Error("'path' argument is empty"));
					}
					else {

						new Promise((_resolve, _reject) => {

							fs.chmod(path, mode, (err) => {

								if (err) {
									_reject(err);
								}
								else {
									_resolve();
								}

							});
							
						}).then(resolve).catch(reject);
						
					}

				}

			});

		};

		fs.chownProm = (path, uid, gid) => {

			return new Promise((resolve, reject) => {

				if ("undefined" === typeof path) {
					reject(new ReferenceError("missing 'path' argument"));
				}
					else if ("string" !== typeof path) {
						reject(new TypeError("'path' argument is not a string"));
					}
				else if ("undefined" === typeof uid) {
					reject(new ReferenceError("missing 'uid' argument"));
				}
					else if ("number" !== typeof uid) {
						reject(new TypeError("'uid' argument is not a number"));
					}
				else if ("undefined" === typeof gid) {
					reject(new ReferenceError("missing 'gid' argument"));
				}
					else if ("number" !== typeof gid) {
						reject(new TypeError("'gid' argument is not a number"));
					}
				else {

					path = path.trim();

					if ("" === path) {
						reject(new Error("'path' argument is empty"));
					}
					else {

						new Promise((_resolve, _reject) => {

							fs.chown(path, uid, gid, (err) => {

								if (err) {
									_reject(err);
								}
								else {
									_resolve();
								}

							});
							
						}).then(resolve).catch(reject);
						
					}

				}

			});

		};

		fs.realpathProm = (path, options) => {

			return new Promise((resolve, reject) => {

				if ("undefined" === typeof path) {
					reject(new ReferenceError("missing 'path' argument"));
				}
					else if ("string" !== typeof path) {
						reject(new TypeError("'path' argument is not a string"));
					}
				else {

					path = path.trim();

					if ("" === path) {
						reject(new Error("'path' argument is empty"));
					}
					else {

						fs.realpath(path, (options) ? options : null, (err, result) => {

							if (err) {
								reject(err);
							}
							else {
								resolve(result);
							}

						});

					}

				}

			});

		};

		[

			// extend
			"directoryToString", "directoryToFile",
			"extractFiles",
			"filesToString", "filesToFile",
			"mkdirp", "rmdirp",

			// classical
			"access", "appendFile", "close",
			"fchmod", "fchown", "fdatasync", "fstat", "fsync", "ftruncate", "futimes",
			"link", "lstat", "mkdtemp", "open",
			"readdir", "readFile",
			"rename", "stat", "truncate", "utimes",
			"write", "writeFile"

		].forEach(name => {

			fs[name + "Prom"] = (...args) => {

				return new Promise((resolve, reject) => {

					fs[name](...args, (...subargs) => {

						let err = subargs.shift();

						if (err) {
							reject(err);
						}
						else {
							resolve(...subargs);
						}

					});

				});

			};

		});

// module

module.exports = fs;
