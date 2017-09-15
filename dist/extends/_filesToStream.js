
"use strict";

// deps

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require("stream"),
    Transform = _require.Transform;

var _require2 = require("path"),
    basename = _require2.basename,
    join = _require2.join;

var _require3 = require("fs"),
    createReadStream = _require3.createReadStream;

var _require4 = require(join(__dirname, "_isFile.js")),
    isFile = _require4.isFile;

// private

// methods

/**
* Specific to "filesToString" method, read all files content
* @param {Array} files : files to read
* @param {stream.Transform} writeStream : stream to send data
* @param {string} separator : used to separate content (can be "")
* @returns {Promise} Operation's result
*/


function _readContent(files, writeStream, separator) {

	process.nextTick(function () {

		if (0 >= files.length) {
			writeStream.end();
			writeStream.emit("close");
		} else {

			var file = files.shift().trim();

			isFile(file, function (err, exists) {

				if (err) {
					writeStream.emit("error", err);
				} else if (!exists) {
					_readContent(files, writeStream, separator);
				} else {

					var isPattern = -1 < separator.indexOf("{{filename}}");

					Promise.resolve().then(function () {

						return !isPattern ? Promise.resolve() : new Promise(function (resolve, reject) {

							writeStream.write(separator.replace("{{filename}}", basename(file)), function (_err) {
								return _err ? reject(_err) : resolve();
							});
						});
					}).then(function () {

						return new Promise(function (resolve, reject) {

							var readStream = createReadStream(file);
							var error = false;

							readStream.once("error", function (_err) {

								error = true;

								readStream.close();
								reject(_err);
							}).once("open", function () {
								readStream.pipe(writeStream, { "end": false });
							}).once("close", function () {

								if (!error) {
									resolve();
								}
							});
						});
					}).then(function () {

						if (0 >= files.length) {
							writeStream.end();
							writeStream.emit("close");
						} else {

							Promise.resolve().then(function () {

								return isPattern ? Promise.resolve() : new Promise(function (resolve, reject) {

									writeStream.write(separator, function (_err) {
										return _err ? reject(_err) : resolve();
									});
								});
							}).then(function () {
								_readContent(files, writeStream, separator);
							});
						}
					}).catch(function (_err) {
						writeStream.emit("error", _err);
					});
				}
			});
		}
	});
}

/**
* Async filesToStream
* @param {Array} files : files to read
* @param {string} separator : files separator
* @param {function|null} callback : operation's result
* @returns {void}
*/
function _filesToStream(files, separator, callback) {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing \"files\" argument");
	} else if ("object" !== (typeof files === "undefined" ? "undefined" : _typeof(files)) || !(files instanceof Array)) {
		throw new TypeError("\"files\" argument is not an Array");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		process.nextTick(function () {

			var writeStream = new Transform();

			writeStream._transform = function (chunk, enc, cb) {
				writeStream.push(chunk);
				cb();
			};

			writeStream.once("error", function () {
				writeStream.end();
			});

			var _callback = "undefined" === typeof callback ? separator : callback;
			_callback(null, writeStream);

			_readContent(files, writeStream, "string" === typeof separator ? separator : " ");
		});
	}
}

// module

module.exports = {

	// async version

	"filesToStream": _filesToStream,

	// promise version

	"filesToStreamProm": function filesToStreamProm(files, separator) {

		return new Promise(function (resolve, reject) {

			_filesToStream(files, separator, function (err, stream) {
				return err ? reject(err) : resolve(stream);
			});
		});
	}

};