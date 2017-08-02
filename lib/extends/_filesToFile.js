
"use strict";

// deps

	const fs = require("fs");
	const { basename, join } = require("path");

	const { isFile, isFileSync } = require(join(__dirname, "_isFile.js"));

// private

	// methods

		/**
		* Specific to "filesToFile" method, concat results of reading streams
		* @param {stream.Writable} writeStream : targeted file's stream for content
		* @param {Array} files : files to read
		* @param {string} separator : used to separate content (can be "")
		* @returns {Promise} Operation's result
		*/
		function _concatContentStreamProm (writeStream, files, separator) {

			if (0 >= files.length) {
				return Promise.resolve();
			}
			else {

				const file = files.shift().trim();

				return new Promise((resolve, reject) => {

					isFile(file, (err, exists) => {

						if (err) {
							reject(err);
						}
						else if (!exists) {
							reject(new Error("\"" + file + "\" is not a valid file"));
						}
						else {

							writeStream.write(
								-1 < separator.indexOf("{{filename}}") ? separator.replace("{{filename}}", basename(file)) : "",
							"utf8", (_err) => {

								if (_err) {
									reject(_err);
								}
								else {

									const readStream = fs.createReadStream(file);
									let error = false;

									readStream.once("error", (__err) => {

										error = true;
										readStream.close();
										reject(__err);

									}).once("open", () => {
										readStream.pipe(writeStream, { "end": false });
									}).once("close", () => {

										if (!error) {

											if (0 >= files.length) {
												resolve();
											}
											else if (-1 < separator.indexOf("{{filename}}")) {

												_concatContentStreamProm(writeStream, files, separator)
													.then(resolve)
													.catch(reject);

											}
											else {

												writeStream.write(separator, (___err) => {

													if (___err) {
														reject(___err);
													}
													else {

														_concatContentStreamProm(writeStream, files, separator)
															.then(resolve)
															.catch(reject);

													}

												});

											}

										}

									}).once("end", () => {
										readStream.close();
									});

								}

							});

						}

					});

				});

			}

		}

		/**
		* Async filesToFile
		* @param {Array} files : files to read
		* @param {string} target : file to write in
		* @param {string} separator : files separator
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _filesToFile (files, target, separator, callback) {

			if ("undefined" === typeof files) {
				throw new ReferenceError("missing \"files\" argument");
			}
				else if ("object" !== typeof files || !(files instanceof Array)) {
					throw new TypeError("\"files\" argument is not an Array");
				}
			else if ("undefined" === typeof target) {
				throw new ReferenceError("missing \"target\" argument");
			}
				else if ("string" !== typeof target) {
					throw new TypeError("\"target\" argument is not a string");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				let _callback = callback;

				if ("undefined" === typeof _callback) {
					_callback = separator;
				}

				const _target = target.trim();

				if ("" === _target) {
					throw new Error("\"target\" argument is empty");
				}
				else {

					new Promise((resolve, reject) => {

						isFile(_target, (err, exists) => {

							if (err) {
								reject(err);
							}
							else if (!exists) {
								resolve();
							}
							else {

								fs.unlink(_target, (_err) => {

									if (err) {
										reject(_err);
									}
									else {
										resolve();
									}

								});

							}

						});

					}).then(() => {

						return new Promise((resolve, reject) => {

							fs.writeFile(_target, "", (err) => {

								if (err) {
									reject(err);
								}
								else {
									resolve();
								}

							});

						});

					}).then(() => {

						const writeStream = fs.createWriteStream(_target, { "flags": "a" });
						let error = false;

						return new Promise((resolve, reject) => {

							writeStream.once("error", (err) => {

								error = true;
								writeStream.close();
								reject(err);

							}).once("close", () => {

								if (!error) {
									resolve();
								}

							});

							_concatContentStreamProm(
								writeStream, files, _target,
								"string" === typeof separator ? separator : " "
							).catch((err) => {

								if (err) {
									error = true;
									reject(err);
								}

								writeStream.close();

							});

						});

					}).catch(_callback);

				}

			}

		}

// module

module.exports = {

	// async version

	"filesToFile": _filesToFile,

	// promise version

	"filesToFileProm": (files, target, separator) => {

		return new Promise((resolve, reject) => {

			_filesToFile(files, target, separator, (err) => {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	},

	// sync version

	"filesToFileSync": (files, target, separator) => {

		if ("undefined" === typeof files) {
			throw new ReferenceError("missing \"files\" argument");
		}
			else if ("object" !== typeof files || !(files instanceof Array)) {
				throw new TypeError("\"files\" argument is not an Array");
			}
		else if ("undefined" === typeof target) {
			throw new ReferenceError("missing \"target\" argument");
		}
			else if ("string" !== typeof target) {
				throw new TypeError("\"target\" argument is not a string");
			}
		else {

			const _target = target.trim();

			if ("" === _target) {
				throw new Error("\"target\" argument is empty");
			}
			else {

				const _separator = "string" === typeof separator ? separator : " ";

				if (isFileSync(_target)) {
					fs.unlinkSync(_target);
				}

				fs.writeFileSync(_target, "");

				files.forEach((file, key) => {

					const _file = file.trim();

					if (!isFileSync(_file)) {
						throw new Error("\"" + _file + "\" does not exist");
					}
					else if (-1 < _separator.indexOf("{{filename}}")) {
						fs.appendFileSync(_target, _separator.replace("{{filename}}", basename(_file)) + fs.readFileSync(_file));
					}
					else {
						fs.appendFileSync(_target, 0 < key ? _separator + fs.readFileSync(_file) : fs.readFileSync(_file));
					}

				});

			}

		}

	}

};
