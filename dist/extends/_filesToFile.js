
"use strict";

// deps

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require("fs");

var _require = require("path"),
    basename = _require.basename,
    join = _require.join;

var _require2 = require(join(__dirname, "_isFile.js")),
    isFile = _require2.isFile,
    isFileSync = _require2.isFileSync;

// private

// methods

/**
* Specific to "filesToFile" method, concat results of reading streams
* @param {stream.Writable} writeStream : targeted file's stream for content
* @param {Array} files : files to read
* @param {string} separator : used to separate content (can be "")
* @param {callback} callback : operation's result
* @returns {void} Operation's result
*/


function _concatContentStream(writeStream, files, separator, callback) {

	process.nextTick(function () {

		if (0 >= files.length) {
			callback(null);
		} else {

			var file = files.shift().trim();

			isFile(file, function (err, exists) {

				if (err) {
					callback(err);
				} else if (!exists) {
					callback(null);
				} else {

					new Promise(function (resolve, reject) {

						if (-1 >= separator.indexOf("{{filename}}")) {
							resolve();
						} else {

							writeStream.write(separator.replace("{{filename}}", basename(file)), "utf8", function (_err) {

								if (_err) {
									reject(_err);
								} else {
									resolve();
								}
							});

							resolve();
						}
					}).then(function () {

						return new Promise(function (resolve, reject) {

							var readStream = fs.createReadStream(file);
							var error = false;

							readStream.once("error", function (__err) {

								error = true;
								readStream.close();
								reject(__err);
							}).once("open", function () {
								readStream.pipe(writeStream, { "end": false });
							}).once("close", function () {

								if (!error) {

									if (0 >= files.length) {
										resolve();
									} else if (-1 < separator.indexOf("{{filename}}")) {
										_concatContentStream(writeStream, files, separator, callback);
									} else {

										writeStream.write(separator, "utf8", function (___err) {

											if (___err) {
												reject(___err);
											} else {
												_concatContentStream(writeStream, files, separator, callback);
											}
										});
									}
								}
							});
						});
					}).then(function () {
						callback(null);
					}).catch(callback);
				}
			});
		}
	});
}

/**
* Async filesToFile
* @param {Array} files : files to read
* @param {string} target : file to write in
* @param {string} separator : files separator
* @param {function|null} callback : operation's result
* @returns {void}
*/
function _filesToFile(files, target, separator, callback) {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing \"files\" argument");
	} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
		throw new TypeError("\"files\" argument is not an Array");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing \"target\" argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("\"target\" argument is not a string");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		var _target = target.trim();

		if ("" === _target) {
			throw new Error("\"target\" argument is empty");
		} else {

			var _callback = callback;
			var _separator = separator;

			if ("undefined" === typeof _callback) {
				_callback = separator;
				_separator = " ";
			}

			process.nextTick(function () {

				new Promise(function (resolve, reject) {

					isFile(_target, function (err, exists) {

						if (err) {
							reject(err);
						} else if (!exists) {
							resolve();
						} else {

							fs.unlink(_target, function (_err) {

								if (err) {
									reject(_err);
								} else {
									resolve();
								}
							});
						}
					});
				}).then(function () {

					return new Promise(function (resolve, reject) {

						fs.writeFile(_target, "", function (err) {

							if (err) {
								reject(err);
							} else {
								resolve();
							}
						});
					});
				}).then(function () {

					if (!files.length) {
						return Promise.resolve();
					} else {

						var writeStream = fs.createWriteStream(_target, { "flags": "a" });
						var ended = false;

						return new Promise(function (resolve, reject) {

							writeStream.once("error", function (err) {

								if (!ended) {

									ended = true;
									writeStream.close();
									reject(err);
								}
							});

							_concatContentStream(writeStream, files, "string" === typeof _separator ? _separator : " ", function (err) {

								if (!ended) {

									if (err) {
										reject(err);
									} else {
										resolve();
									}
								}
							});
						}).then(function () {
							writeStream.end();
							return Promise.resolve();
						}).catch(function (err) {
							writeStream.end();
							return Promise.reject(err);
						});
					}
				}).then(function () {
					_callback(null);
				}).catch(function (err) {
					return Promise.reject(err);
				});
			});
		}
	}
}

// module

module.exports = {

	// async version

	"filesToFile": _filesToFile,

	// promise version

	"filesToFileProm": function filesToFileProm(files, target, separator) {

		return new Promise(function (resolve, reject) {

			_filesToFile(files, target, separator, function (err) {
				return err ? reject(err) : resolve();
			});
		});
	},

	// sync version

	"filesToFileSync": function filesToFileSync(files, target, separator) {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
			throw new TypeError("\"files\" argument is not an Array");
		} else if ("undefined" === typeof target) {
			throw new ReferenceError("missing \"target\" argument");
		} else if ("string" !== typeof target) {
			throw new TypeError("\"target\" argument is not a string");
		} else {

			var _target = target.trim();

			if ("" === _target) {
				throw new Error("\"target\" argument is empty");
			} else {

				var _separator = "string" === typeof separator ? separator : " ";

				if (isFileSync(_target)) {
					fs.unlinkSync(_target);
				}

				fs.writeFileSync(_target, "");

				files.forEach(function (file, key) {

					var _file = file.trim();

					if (!isFileSync(_file)) {
						throw new Error("\"" + _file + "\" does not exist");
					} else if (-1 < _separator.indexOf("{{filename}}")) {
						fs.appendFileSync(_target, _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file));
					} else {
						fs.appendFileSync(_target, 0 < key ? _separator + fs.readFileSync(_file) : fs.readFileSync(_file));
					}
				});
			}
		}
	}

};