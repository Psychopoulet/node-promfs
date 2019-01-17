"use strict";

// deps

	// natives
	const { Transform } = require("stream");
	const { basename, join } = require("path");
	const { createReadStream } = require("fs");

	// locals
	const { isFileProm } = require(join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Specific to "filesToString" method, read all files content
		* @param {Array} files : files to read
		* @param {stream.Transform} writeStream : stream to send data
		* @param {string} separator : used to separate content (can be "")
		* @returns {Promise} Operation's result
		*/
		function _readContent (files, writeStream, separator) {

			return 0 >= files.length ? Promise.resolve() : Promise.resolve().then(() => {

				const file = files.shift().trim();

				return isFileProm(file).then((exists) => {

					const isPattern = -1 < separator.indexOf("{{filename}}");

					return !exists ? _readContent(files, writeStream, separator) : Promise.resolve().then(() => {

						return !isPattern ? Promise.resolve() : new Promise((resolve, reject) => {

							writeStream.write(separator.replace("{{filename}}", basename(file)), (err) => {
								return err ? reject(err) : resolve();
							});

						});

					}).then(() => {

						return new Promise((resolve, reject) => {

							const readStream = createReadStream(file);
							let error = false;

							readStream.once("error", (err) => {

								error = true;

								readStream.close();
								reject(err);

							}).once("open", () => {
								readStream.pipe(writeStream, { "end": false });
							}).once("close", () => {

								if (!error) {
									resolve();
								}

							});

						});

					}).then(() => {

						return 0 >= files.length ? Promise.resolve() : Promise.resolve().then(() => {

							return isPattern ? Promise.resolve() : new Promise((resolve, reject) => {

								writeStream.write(separator, (err) => {
									return err ? reject(err) : resolve();
								});

							});

						}).then(() => {
							return _readContent(files, writeStream, separator);
						});

					});

				});

			});

		}

		/**
		* Async filesToStream
		* @param {Array} files : files to read
		* @param {string} separator : files separator
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _filesToStream (files, separator, callback) {

			if ("undefined" === typeof files) {
				throw new ReferenceError("missing \"files\" argument");
			}
				else if ("object" !== typeof files || !(files instanceof Array)) {
					throw new TypeError("\"files\" argument is not an Array");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				const writeStream = new Transform();

				writeStream._transform = (chunk, enc, cb) => {
					writeStream.push(chunk);
					cb();
				};

				writeStream.once("error", () => {
					writeStream.end();
				});

				const _callback = "undefined" === typeof callback ? separator : callback;
				_callback(null, writeStream);

				_readContent(files, writeStream, "string" === typeof separator ? separator : " ").then(() => {
					writeStream.end();
					writeStream.emit("close");
				}).catch((err) => {
					writeStream.emit("error", err);
				});

			}

		}

// module

module.exports = {

	// async version

	"filesToStream": _filesToStream,

	// promise version

	"filesToStreamProm": (files, separator) => {

		return new Promise((resolve, reject) => {

			_filesToStream(files, separator, (err, stream) => {
				return err ? reject(err) : resolve(stream);
			});

		});

	},

	// sync version

	"filesToStreamSync": (files, separator) => {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		}
			else if ("object" !== typeof files || !(files instanceof Array)) {
				throw new TypeError("\"files\" argument is not an Array");
			}

		else {

			const writeStream = new Transform();

				writeStream._transform = (chunk, enc, cb) => {
					writeStream.push(chunk);
					cb();
				};

				writeStream.once("error", () => {
					writeStream.end();
				});

				_readContent(files, writeStream, "string" === typeof separator ? separator : " ").then(() => {
					writeStream.end();
					writeStream.emit("close");
				}).catch((err) => {
					writeStream.emit("error", err);
				});

			return writeStream;

		}

	}

};
