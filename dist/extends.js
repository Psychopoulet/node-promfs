
"use strict";

// deps

const path = require("path"),
		fs = require("fs");

// private

// methods

function _copy(origin, target, callback) {

	fs.readFile(origin, (err, content) => {

		if (err) {
			callback(err.message ? err.message : err);
		} else {

			fs.writeFile(target, content, err => {

				if (err) {
					callback(err.message ? err.message : err);
				} else {
					callback(null);
				}
			});
		}
	});
}

function _readContent(encoding, separator, files, i, content) {

	return new Promise((resolve, reject) => {

		if (i >= files.length) {
			resolve(content);
		} else {

			fs.isFile(files[i], (err, exists) => {

				if (err) {
					reject(err);
				} else if (exists) {

					fs.readFile(files[i], encoding, (err, filecontent) => {

						if (err) {
							reject(err.message ? err.message : err);
						} else {
							_readContent(encoding, separator, files, i + 1, 0 < i ? content + separator + filecontent : content + filecontent).then(resolve).catch(reject);
						}
					});
				}
			});
		}
	});
}

function _rmdirp(dir, files, i) {

	return new Promise((resolve, reject) => {

		if (i >= files.length) {

			// no content anymore
			fs.rmdir(dir, err => {

				if (err) {
					reject(err.message ? err.message : err);
				} else {
					resolve();
				}
			});
		} else {

			let curPath = path.join(dir, files[i]);

			fs.isDirectory(curPath, (err, exists) => {

				if (err) {
					reject(err);
				} else if (exists) {

					fs.rmdirp(curPath, err => {

						if (err) {
							reject(err);
						} else {
							_rmdirp(dir, files, i + 1).then(resolve).catch(reject);
						}
					});
				} else {

					fs.unlink(curPath, err => {

						if (err) {
							reject(err.message ? err.message : err);
						} else {
							_rmdirp(dir, files, i + 1).then(resolve).catch(reject);
						}
					});
				}
			});
		}
	});
}

// module

// concatFiles

// async version

fs.concatFiles = (files, encoding, separator, callback) => {

	if (!callback) {

		if (!separator) {
			callback = "function" === typeof encoding ? encoding : () => {};
		} else {
			callback = "function" === typeof separator ? separator : () => {};
		}
	}

	callback = "function" === typeof callback ? callback : () => {};
	encoding = "string" === typeof encoding ? encoding : "utf8";
	separator = "string" === typeof separator ? separator : "";

	if ("object" !== typeof files || !(files instanceof Array)) {
		callback("This is not an array");
	} else {

		_readContent(encoding, separator, files, 0, "").then(content => {
			callback(null, content);
		}).catch(callback);
	}
};

// sync version

fs.concatFilesSync = (files, encoding, separator) => {

	if ("object" !== typeof files || !(files instanceof Array)) {
		throw new Error("This is not an array");
	}

	encoding = "string" === typeof encoding ? encoding : null;
	separator = "string" === typeof separator ? separator : "";

	let content = "";

	files.forEach((file, key) => {

		if (fs.isFileSync(file)) {
			content += 0 < key ? separator + fs.readFileSync(file, encoding) : fs.readFileSync(file, encoding);
		}
	});

	return content;
};

// concatDirectoryFiles

// async version

fs.concatDirectoryFiles = (dir, encoding, separator, callback) => {

	if (!callback) {

		if (!separator) {
			callback = "function" === typeof encoding ? encoding : () => {};
		} else {
			callback = "function" === typeof separator ? separator : () => {};
		}
	}

	callback = "function" === typeof callback ? callback : () => {};
	encoding = "string" === typeof encoding ? encoding : "utf8";
	separator = "string" === typeof separator ? separator : "";

	if ("string" !== typeof dir) {
		callback("This is not a string");
	} else {

		fs.isDirectory(dir, (err, exists) => {

			if (err) {
				callback(err);
			} else if (!exists) {
				callback("This directory does not exist");
			} else {

				fs.readdir(dir, (err, files) => {

					if (err) {
						callback(err);
					} else {

						let err = null,
							i = 0,
							result = [];

						files.forEach(file => {

							file = path.join(dir, file);

							fs.isFile(file, (_err, exists) => {

								++i;

								if (_err) {
									err = _err;
								} else if (exists) {
									result.push(file);
								}

								if (i >= files.length) {

									if (err) {
										callback(err);
									} else {
										fs.concatFiles(result, encoding, separator, callback);
									}
								}
							});
						});
					}
				});
			}
		});
	}
};

// sync version

fs.concatDirectoryFilesSync = (dir, encoding, separator) => {

	if ("string" !== typeof dir) {
		throw new Error("This is not an array");
	}

	encoding = "string" === typeof encoding ? encoding : null;
	separator = "string" === typeof separator ? separator : "";

	let result = [],
		files = fs.readdirSync(dir);

	files.forEach(file => {

		file = path.join(dir, file);

		if (fs.isFileSync(file)) {
			result.push(file);
		}
	});

	return fs.concatFilesSync(result, encoding, separator);
};

// copy

// async version

fs.copy = (origin, target, callback) => {

	callback = "function" === typeof callback ? callback : () => {};

	if ("string" !== typeof origin) {
		callback("This is not a string");
	} else if ("string" !== typeof target) {
		callback("This is not a string");
	} else {

		origin = origin.trim();
		target = target.trim();

		if ("" === origin) {
			callback("\"origin\" is empty");
		} else if ("" === target) {
			callback("\"target\" is empty");
		} else {

			fs.isFile(origin, (err, exists) => {

				if (err) {
					callback(err);
				} else if (!exists) {
					callback("\"origin\" is not a file");
				} else {

					fs.isFile(target, (err, exists) => {

						if (err) {
							callback(err);
						} else if (!exists) {
							_copy(origin, target, callback);
						} else {

							fs.unlink(target, err => {

								if (err) {
									callback(err.message ? err.message : err);
								} else {
									_copy(origin, target, callback);
								}
							});
						}
					});
				}
			});
		}
	}
};

// sync version

fs.copySync = (origin, target) => {

	if ("string" !== typeof origin) {
		throw new Error("\"origin\" is not a string");
	} else if ("string" !== typeof target) {
		throw new Error("\"target\" is not a string");
	} else {

		origin = origin.trim();
		target = target.trim();

		if ("" === origin) {
			throw new Error("\"origin\" is empty");
		} else if (!fs.isFileSync(origin)) {
			throw new Error("\"origin\" is not a file");
		} else if ("" === target) {
			throw new Error("\"target\" is empty");
		} else {

			if (fs.isFileSync(target)) {
				fs.unlinkSync(target);
			}

			fs.writeFileSync(target, fs.readFileSync(origin));

			return true;
		}
	}
};

// isDirectory

// async version

fs.isDirectory = (dir, callback) => {

	callback = "function" === typeof callback ? callback : () => {};

	if ("string" !== typeof dir) {
		callback("This is not a string");
	} else {

		dir = dir.trim();

		if ("" == dir) {
			callback("\"dir\" is empty");
		} else {

			fs.stat(dir, (err, stats) => {
				callback(null, !err && stats && stats.isDirectory());
			});
		}
	}
};

// sync version

fs.isDirectorySync = dir => {

	if ("string" !== typeof dir) {
		throw new Error("This is not a string");
	} else {

		dir = dir.trim();

		if ("" == dir) {
			throw new Error("\"dir\" is empty");
		} else {

			try {
				return fs.lstatSync(dir).isDirectory();
			} catch (e) {
				return false;
			}
		}
	}
};

// isFile

// async version

fs.isFile = (file, callback) => {

	callback = "function" === typeof callback ? callback : () => {};

	if ("string" !== typeof file) {
		callback("This is not a string");
	} else {

		file = file.trim();

		if ("" == file) {
			callback("\"file\" is empty");
		} else {

			fs.stat(file, (err, stats) => {
				callback(null, !err && stats && stats.isFile());
			});
		}
	}
};

// sync version

fs.isFileSync = file => {

	if ("string" !== typeof file) {
		throw new Error("This is not a string");
	} else {

		file = file.trim();

		if ("" == file) {
			throw new Error("\"file\" is empty");
		} else {

			try {
				return fs.lstatSync(file).isFile();
			} catch (e) {
				return false;
			}
		}
	}
};

// mkdirp

// async version

fs.mkdirp = (dir, callback) => {

	callback = "function" === typeof callback ? callback : () => {};

	fs.isDirectory(dir, (err, exists) => {

		if (err) {
			callback(err);
		} else if (exists) {
			callback(null);
		} else {

			fs.mkdirp(path.dirname(dir), err => {

				if (err) {
					callback(err);
				} else {

					fs.mkdir(dir, parseInt("0777", 8), err => {

						if (err) {
							callback(err.message ? err.message : err);
						} else {
							callback(null);
						}
					});
				}
			});
		}
	});
};

// sync version

fs.mkdirpSync = dir => {

	if (fs.isDirectorySync(dir)) {
		return true;
	} else if (fs.isDirectorySync(path.dirname(dir)) || fs.mkdirpSync(path.dirname(dir))) {
		fs.mkdirSync(dir, parseInt("0777", 8));
		return true;
	}
};

// rmdirp

// async version

fs.rmdirp = (dir, callback) => {

	callback = "function" === typeof callback ? callback : () => {};

	fs.isDirectory(dir, (err, exists) => {

		if (err) {
			callback(err);
		} else if (!exists) {
			callback(null);
		} else {

			fs.readdir(dir, (err, files) => {

				if (err) {
					callback(err.message ? err.message : err);
				} else {

					_rmdirp(dir, files, 0).then(() => {
						callback();
					}).catch(callback);
				}
			});
		}
	});
};

// sync version

fs.rmdirpSync = dir => {

	if (!fs.isDirectorySync(dir)) {
		return true;
	} else {

		fs.readdirSync(dir).forEach(file => {

			let curPath = path.join(dir, file);

			if (fs.isDirectorySync(curPath)) {
				fs.rmdirpSync(curPath);
			} else if (fs.isFileSync(curPath)) {
				fs.unlinkSync(curPath);
			}
		});

		fs.rmdirSync(dir);

		return true;
	}
};

module.exports = fs;