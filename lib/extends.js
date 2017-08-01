
"use strict";

// deps

	const path = require("path");
	const fs = require(path.join(__dirname, "extends_native.js"));

// private

	// methods

		/**
		* Specific to "filesToFile" method, concat results of reading streams
		* @param {stream.Writable} writeStream : targeted file's stream for content
		* @param {Array} files : files to read
		* @param {string} separator : used to separate content (can be "")
		* @param {function} callback : callback
		* @returns {void}
		*/
		function _concatContentStream (writeStream, files, separator, callback) {

			if (0 >= files.length) {
				callback(null);
			}
			else {

				const file = files.shift().trim();

				fs.isFile(file, (err, exists) => {

					if (err) {
						callback(err);
					}
					else if (!exists) {
						callback(new Error("\"" + file + "\" is not a valid file"));
					}
					else {

						writeStream.write(
							-1 < separator.indexOf("{{filename}}") ? separator.replace("{{filename}}", path.basename(file)) : "",
						"utf8", (_err) => {

							if (_err) {
								callback(_err);
							}
							else {

								const readStream = fs.createReadStream(file);
								let error = false;

								readStream.once("error", (__err) => {

									error = true;
									readStream.close();
									callback(__err);

								}).once("open", () => {
									readStream.pipe(writeStream, { "end": false });
								}).once("close", () => {

									if (!error) {

										if (0 >= files.length) {
											callback(null);
										}
										else if (-1 < separator.indexOf("{{filename}}")) {
											_concatContentStream(writeStream, files, separator, callback);
										}
										else {

											writeStream.write(separator, (___err) => {

												if (___err) {
													callback(___err);
												}
												else {
													_concatContentStream(writeStream, files, separator, callback);
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

			}

		}

		/**
		* Specific to "extractFiles" method, return only the existing files
		* @param {string} dir : directory to work with
		* @param {Array} givenFiles : files detected in the directory
		* @param {Array} realFiles : files detected as real files
		* @param {function} callback : callback
		* @returns {void}
		*/
		function _extractRealFiles (dir, givenFiles, realFiles, callback) {

			if (0 >= givenFiles.length) {
				callback(null, realFiles);
			}
			else {

				const file = path.join(dir, givenFiles.shift()).trim();

				fs.isFile(file, (err, exists) => {

					if (err) {
						callback(err);
					}
					else {

						if (exists) {
							realFiles.push(file);
						}

						_extractRealFiles(dir, givenFiles, realFiles, callback);

					}

				});

			}

		}

		/**
		* Specific to "filesToString" method, read all files content
		* @param {Array} files : files to read
		* @param {string} encoding : encoding to use
		* @param {string} separator : used to separate content (can be "")
		* @param {string} content : content read
		* @param {function} callback : callback
		* @returns {void}
		*/
		function _readContent (files, encoding, separator, content, callback) {

			if (0 >= files.length) {
				callback(null, content);
			}
			else {

				const file = files.shift().trim();

				fs.isFile(file, (err, exists) => {

					if (err) {
						callback(err);
					}
					else if (!exists) {
						callback(new Error("\"" + file + "\" does not exist"));
					}
					else {

						fs.readFile(file, encoding, (_err, filecontent) => {

							if (_err) {
								callback(_err);
							}
							else if (-1 < separator.indexOf("{{filename}}")) {

								_readContent(
									files, encoding, separator,
									content + separator.replace("{{filename}}", path.basename(file)) + filecontent,
									callback
								);

							}
							else {

								_readContent(
									files, encoding, separator,
									"" === content ? filecontent : content + separator + filecontent,
									callback
								);

							}

						});

					}

				});

			}

		}

// module

	// extractFiles

		// sync version

		fs.extractFilesSync = (dir) => {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else {

				const _dir = dir.trim();

				if (!fs.isDirectorySync(_dir)) {
					throw new Error("\"" + _dir + "\" is not a valid directory");
				}
				else {

					const result = [];

						fs.readdirSync(_dir).forEach((file) => {

							const _file = path.join(_dir, file);

							if (fs.isFileSync(_file)) {
								result.push(_file);
							}

						});

					return result;

				}

			}

		};

		// async version

		fs.extractFiles = (dir, callback) => {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				const _dir = dir.trim();

				fs.isDirectory(_dir, (err, exists) => {

					if (err) {
						callback(err);
					}
					else if (!exists) {
						callback(new Error("\"" + _dir + "\" is not a valid directory"));
					}
					else {

						fs.readdir(_dir, (_err, files) => {

							if (_err) {
								callback(_err);
							}
							else {

								_extractRealFiles(_dir, files, [], (__err, data) => {

									if (__err) {
										callback(__err);
									}
									else {
										callback(null, data);
									}

								});

							}

						});

					}

				});

			}

		};

	// filesToString

		// sync version

		fs.filesToStringSync = (files, encoding, separator) => {

			if ("undefined" === typeof files) {
				throw new ReferenceError("missing \"files\" argument");
			}
				else if ("object" !== typeof files || !(files instanceof Array)) {
					throw new TypeError("\"files\" argument is not an Array");
				}
			else {

				const _encoding = "string" === typeof encoding ? encoding.trim() : null;
				const _separator = "string" === typeof separator ? separator.trim() : null;

				let content = "";

					files.forEach((file) => {

						const _file = file.trim();

						if (!fs.isFileSync(_file)) {
							throw new Error("\"" + _file + "\" does not exist");
						}
						else if (-1 < _separator.indexOf("{{filename}}")) {
							content = content + _separator.replace("{{filename}}", path.basename(_file)) + fs.readFileSync(_file, _encoding);
						}
						else {
							content = "" === content ? fs.readFileSync(_file, _encoding) : content + _separator + fs.readFileSync(_file, _encoding);
						}

					});

				return content;

			}

		};

		// async version

		fs.filesToString = (files, encoding, separator, callback) => {

			if ("undefined" === typeof files) {
				throw new ReferenceError("missing \"files\" argument");
			}
				else if ("object" !== typeof files || !(files instanceof Array)) {
					throw new TypeError("\"files\" argument is not an Array");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				let _callback = callback;

				if ("undefined" === typeof callback) {

					if ("undefined" === typeof separator) {
						_callback = encoding;
					}
					else {
						_callback = separator;
					}

				}

				_readContent(
					files,
					"string" === typeof encoding ? encoding.trim() : "utf8",
					"string" === typeof separator ? separator : " ",
					"", (err, content) => {

					if (err) {
						_callback(err);
					}
					else {
						_callback(null, content);
					}

				});

			}

		};

	// filesToFile

		// sync version

		fs.filesToFileSync = (files, target, separator) => {

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

					if (fs.isFileSync(_target)) {
						fs.unlinkSync(_target);
					}

					fs.writeFileSync(_target, "");

					files.forEach((file, key) => {

						file = file.trim();

						if (!fs.isFileSync(file)) {
							throw new Error("\"" + file + "\" does not exist");
						}
						else if (-1 < _separator.indexOf("{{filename}}")) {
							fs.appendFileSync(_target, _separator.replace("{{filename}}", path.basename(file)) + fs.readFileSync(file));
						}
						else {
							fs.appendFileSync(_target, 0 < key ? _separator + fs.readFileSync(file) : fs.readFileSync(file));
						}

					});

				}

			}

		};

		// async version

		fs.filesToFile = (files, target, separator, callback) => {

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

				if ("undefined" === typeof callback) {
					callback = separator;
				}

				target = target.trim();

				if ("" === target) {
					throw new Error("\"target\" argument is empty");
				}
				else {

					separator = "string" === typeof separator ? separator : " ";

					new Promise((resolve, reject) => {

						fs.isFile(target, (err, exists) => {

							if (err) {
								reject(err);
							}
							else if (!exists) {
								resolve();
							}
							else {

								fs.unlink(target, (_err) => {

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

							fs.writeFile(target, "", (err) => {

								if (err) {
									reject(err);
								}
								else {
									resolve();
								}

							});

						});

					}).then(() => {

						const writeStream = fs.createWriteStream(target, { "flags": "a" });
						let error = false;

						writeStream.once("error", (err) => {

							error = true;
							writeStream.close();
							callback(err);

						}).once("close", () => {

							if (!error) {
								callback(null);
							}

						});

						_concatContentStream(writeStream, files, target, separator, (err) => {

							if (err) {
								error = true;
								callback(err);
							}

							writeStream.close();

						});

					}).catch(callback);

				}

			}

		};

	// directoryToString

		// sync version

		fs.directoryToStringSync = (dir, encoding, separator) => {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else {
				return fs.filesToStringSync(fs.extractFilesSync(dir), encoding, separator);
			}

		};

		// async version

		fs.directoryToString = (dir, encoding, separator, callback) => {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				if ("undefined" === typeof callback) {

					if ("undefined" === typeof separator) {
						callback = encoding;
					}
					else {
						callback = separator;
					}

				}

				fs.extractFiles(dir, (err, files) => {

					if (err) {
						callback(err);
					}
					else {

						fs.filesToString(files, encoding, separator, (_err, content) => {

							if (_err) {
								callback(_err);
							}
							else {
								callback(null, content);
							}

						});

					}

				});

			}

		};

	// directoryToFile

		// sync version

		fs.directoryToFileSync = (dir, target, separator) => {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
				}
			else if ("undefined" === typeof target) {
				throw new ReferenceError("missing \"target\" argument");
			}
				else if ("string" !== typeof target) {
					throw new TypeError("\"target\" argument is not a string");
				}
			else {

				target = target.trim();

				if ("" === target) {
					throw new Error("\"target\" argument is empty");
				}
				else {

					return fs.filesToFileSync(fs.extractFilesSync(dir), target, separator);

				}

			}

		};

		// async version

		fs.directoryToFile = (dir, target, separator, callback) => {

			if ("undefined" === typeof dir) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof dir) {
					throw new TypeError("\"directory\" argument is not a string");
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

				target = target.trim();

				if ("" === target) {
					throw new Error("\"target\" argument is empty");
				}
				else {

					if ("undefined" === typeof callback) {
						callback = separator;
					}

					fs.extractFiles(dir, (err, files) => {

						if (err) {
							callback(err);
						}
						else {

							fs.filesToFile(files, target, separator, (_err) => {

								if (_err) {
									callback(_err);
								}
								else {
									callback(null);
								}

							});

						}

					});

				}

			}

		};

module.exports = fs;
