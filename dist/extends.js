
"use strict";

// deps

const path = require("path"),
      fs = require("fs");

// private

// methods

function _rmdirp(dir, files, i) {

	return new Promise(function (resolve, reject) {

		if (i >= files.length) {

			// no content anymore
			fs.rmdir(dir, function (err) {

				if (err) {
					reject(err.message ? err.message : err);
				} else {
					resolve();
				}
			});
		} else {

			let curPath = path.join(dir, files[i]);

			fs.isDirectory(curPath, function (err, exists) {

				if (err) {
					reject(err);
				} else if (exists) {

					fs.rmdirp(curPath, function (err) {

						if (err) {
							reject(err);
						} else {
							_rmdirp(dir, files, i + 1).then(resolve).catch(reject);
						}
					});
				} else {

					fs.unlink(curPath, function (err) {

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

function _readContent(encoding, separator, files, i, content) {

	return new Promise(function (resolve, reject) {

		if (i >= files.length) {
			resolve(content);
		} else {

			fs.isFile(files[i], function (err, exists) {

				if (err) {
					reject(err);
				} else if (exists) {

					fs.readFile(files[i], encoding, function (err, filecontent) {

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

// isFile

// sync version

fs.isFileSync = function (file) {

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

// async version

fs.isFile = function (file, callback) {

	callback = "function" === typeof callback ? callback : function () {};

	try {

		if ("string" !== typeof file) {
			callback("This is not a string");
		} else {

			file = file.trim();

			if ("" == file) {
				callback("\"file\" is empty");
			} else {

				fs.stat(file, function (err, stats) {
					callback(null, !err && stats && stats.isFile());
				});
			}
		}
	} catch (e) {
		callback(e.message ? e.message : e);
	}
};

// isDirectory

// sync version

fs.isDirectorySync = function (dir) {

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

// async version

fs.isDirectory = function (dir, callback) {

	callback = "function" === typeof callback ? callback : function () {};

	try {

		if ("string" !== typeof dir) {
			callback("This is not a string");
		} else {

			dir = dir.trim();

			if ("" == dir) {
				callback("\"dir\" is empty");
			} else {

				fs.stat(dir, function (err, stats) {
					callback(null, !err && stats && stats.isDirectory());
				});
			}
		}
	} catch (e) {
		callback(e.message ? e.message : e);
	}
};

// mkdirp

// sync version

fs.mkdirpSync = function (dir) {

	if (fs.isDirectorySync(dir)) {
		return true;
	} else if (fs.isDirectorySync(path.dirname(dir)) || fs.mkdirpSync(path.dirname(dir))) {
		fs.mkdirSync(dir, parseInt("0777", 8));
		return true;
	}
};

// async version

fs.mkdirp = function (dir, callback) {

	callback = "function" === typeof callback ? callback : function () {};

	try {

		fs.isDirectory(dir, function (err, exists) {

			if (err) {
				callback(err);
			} else if (exists) {
				callback(null);
			} else {

				fs.mkdirp(path.dirname(dir), function (err) {

					if (err) {
						callback(err);
					} else {

						fs.mkdir(dir, parseInt("0777", 8), function (err) {

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
	} catch (e) {
		callback(e.message ? e.message : e);
	}
};

// rmdirp

// sync version

fs.rmdirpSync = function (dir) {

	if (!fs.isDirectorySync(dir)) {
		return true;
	} else {

		fs.readdirSync(dir).forEach(function (file) {

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

// async version

fs.rmdirp = function (dir, callback) {

	callback = "function" === typeof callback ? callback : function () {};

	try {

		fs.isDirectory(dir, function (err, exists) {

			if (err) {
				callback(err);
			} else if (!exists) {
				callback(null);
			} else {

				fs.readdir(dir, function (err, files) {

					if (err) {
						callback(err.message ? err.message : err);
					} else {

						_rmdirp(dir, files, 0).then(function () {
							callback();
						}).catch(callback);
					}
				});
			}
		});
	} catch (e) {
		callback(e.message ? e.message : e);
	}
};

// concatFiles

// sync version

fs.concatFilesSync = function (files, encoding, separator) {

	if ("object" !== typeof files || !(files instanceof Array)) {
		throw new Error("This is not an array");
	}

	encoding = "string" === typeof encoding ? encoding : null;
	separator = "string" === typeof separator ? separator : "";

	let content = "";

	files.forEach(function (file, key) {

		if (fs.isFileSync(file)) {
			content += 0 < key ? separator + fs.readFileSync(file, encoding) : fs.readFileSync(file, encoding);
		}
	});

	return content;
};

// async version

fs.concatFiles = function (files, encoding, separator, callback) {

	if (!callback) {

		if (!separator) {
			callback = "function" === typeof encoding ? encoding : function () {};
		} else {
			callback = "function" === typeof separator ? separator : function () {};
		}
	}

	callback = "function" === typeof callback ? callback : function () {};
	encoding = "string" === typeof encoding ? encoding : "utf8";
	separator = "string" === typeof separator ? separator : "";

	try {

		if ("object" !== typeof files || !(files instanceof Array)) {
			callback("This is not an array");
		} else {

			_readContent(encoding, separator, files, 0, "").then(function (content) {
				callback(null, content);
			}).catch(callback);
		}
	} catch (e) {
		callback(e.message ? e.message : e);
	}
};

// copy

// sync version

fs.copySync = function (origin, target) {

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

// async version

function _copy(origin, target, callback) {

	fs.readFile(origin, function (err, content) {

		if (err) {
			callback(err.message ? err.message : err);
		} else {

			fs.writeFile(target, content, function (err) {

				if (err) {
					callback(err.message ? err.message : err);
				} else {
					callback(null);
				}
			});
		}
	});
}

fs.copy = function (origin, target, callback) {

	callback = "function" === typeof callback ? callback : function () {};

	try {

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

				fs.isFile(origin, function (err, exists) {

					if (err) {
						callback(err);
					} else if (!exists) {
						callback("\"origin\" is not a file");
					} else {

						fs.isFile(target, function (err, exists) {

							if (err) {
								callback(err);
							} else if (!exists) {
								_copy(origin, target, callback);
							} else {

								fs.unlink(target, function (err) {

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
	} catch (e) {
		callback(e.message ? e.message : e);
	}
};

module.exports = fs;