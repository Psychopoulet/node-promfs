
"use strict";

// deps

	const path = require("path"), fs = require("fs");

	var _extends;

	try {
		_extends = require("../build/Release/_extends.node");
	} catch (e) {
		_extends = require("../build/Debug/_extends.node");
	}

// private

	// methods

		function _extractRealFilesProm(dir, givenFiles, realFiles) {

			realFiles = ("object" === typeof realFiles && realFiles instanceof Array) ? realFiles : [];

			return new Promise((resolve, reject) => {

				if (0 >= givenFiles.length) {
					resolve(realFiles);
				}
				else {

					let file = path.join(dir, givenFiles.shift());

					fs.isFileProm(file).then((exists) => {

						if (exists) {
							realFiles.push(file);
						}

						return _extractRealFilesProm(dir, givenFiles, realFiles);

					}).then(resolve).catch(reject);

				}

			});

		}

		function _readContentProm(files, encoding, separator, content) {

			content = (content) ? content : "";

			return new Promise((resolve, reject) => {

				if (0 >= files.length) {
					resolve(content);
				}
				else {

					let file = files.shift();

					fs.isFileProm(file).then((exists) => {

						if (!exists) {
							return Promise.reject("\"" + file + "\" does not exist");
						}
						else {
							return fs.readFileProm(file, encoding);
						}

					}).then((filecontent) => {

						if (-1 < separator.indexOf("{{filename}}")) {

							return _readContentProm(
								files, encoding, separator,
								content + separator.replace("{{filename}}", path.basename(file)) + filecontent
							);

						}
						else {

							return _readContentProm(
								files, encoding, separator,
								("" === content) ? filecontent : content + separator + filecontent
							);

						}

					}).then(resolve).catch(reject);

				}

			});

		}

		// with streams

			function _copyStream(origin, target, callback) {

				let readStream = fs.createReadStream(origin), writeStream = fs.createWriteStream(target);

				readStream.on("open", () => {
					readStream.pipe(writeStream);
				}).on("end", () => {
					callback(null);
				}).on("error", (err) => {
					callback((err.message) ? err.message : err);
				});

			}

			function _concatContentStreamProm(files, targetPath, separator) {

				return new Promise((resolve, reject) => {

					if (0 >= files.length) {
						resolve();
					}
					else {

						let file = files.shift();

						return fs.isFileProm(file).then((exists) => {

							if (!exists) {
								return Promise.reject("\"" + file + "\" does not exist");
							}
							else {

								return new Promise((resolve, reject) => {

									let readStream = fs.createReadStream(file), writeStream = fs.createWriteStream(targetPath, { flags: "a" });

									readStream.on("open", () => {

										if (-1 >= separator.indexOf("{{filename}}")) {
											readStream.pipe(writeStream);
										}
										else {

											return fs.appendFileProm(targetPath, separator.replace("{{filename}}", path.basename(file))).then(() => {
												readStream.pipe(writeStream);
											});
											
										}

									}).on("end", () => {

										return new Promise((resolve, reject) => {

											if (0 >= files.length) {
												resolve();
											}
											else if (-1 >= separator.indexOf("{{filename}}")) {
												fs.appendFileProm(targetPath, separator).then(resolve).catch(reject);
											}
											else {
												resolve();
											}

										}).then(() => {
											return _concatContentStreamProm(files, targetPath, separator);
										}).then(resolve).catch(reject);

									}).on("error", (err) => {
										reject((err.message) ? err.message : err);
									});

								});

							}

						}).then(resolve).catch(reject);

					}

				});

			}

// module

	// extractDirectoryRealFiles

		// async version

		fs.extractDirectoryRealFiles = (dir, callback) => {

			callback = ("function" === typeof callback) ? callback : () => {};

			fs.isDirectory(dir, (err, exists) => {

				if (err) {
					callback(err);
				}
				else if (!exists) {
					callback("This directory does not exist");
				}
				else {

					fs.readdir(dir, (err, files) => {

						if (err) {
							callback((err.message) ? err.message : err);
						}
						else {

							_extractRealFilesProm(dir, files).then((data) => {
								callback(null, data);
							}).catch(callback);

						}

					});

				}

			});

		};

		// sync version

		fs.extractDirectoryRealFilesSync = (dir) => {

			if (!fs.isDirectorySync(dir)) {
				throw new Error("'" + dir + "' is not a valid directory");
			}
			else {

				let result = [];

					fs.readdirSync(dir).forEach((file) => {

						file = path.join(dir, file);

						if (fs.isFileSync(file)) {
							result.push(file);
						}

					});

				return result;

			}

		};

	// filesToString

		// async version

		fs.filesToString = (files, encoding, separator, callback) => {

			if (!callback) {

				if (!separator) {
					callback = ("function" === typeof encoding) ? encoding : () => {};
				}
				else {
					callback = ("function" === typeof separator) ? separator : () => {};
				}
				
			}

			callback = ("function" === typeof callback) ? callback : () => {};
			encoding = ("string" === typeof encoding) ? encoding : "utf8";
			separator = ("string" === typeof separator) ? separator : " ";

			if ("object" !== typeof files || !(files instanceof Array)) {
				callback("This is not an array");
			}
			else {

				_readContentProm(files, encoding, separator).then((content) => {
					callback(null, content);
				}).catch(callback);

			}

		};

		// sync version

		fs.filesToStringSync = (files, encoding, separator) => {

			if ("object" !== typeof files || !(files instanceof Array)) {
				throw new Error("This is not an array");
			}
			else {

				encoding = ("string" === typeof encoding) ? encoding : null;
				separator = ("string" === typeof separator) ? separator : " ";

				let content = "";

					files.forEach((file) => {

						if (!fs.isFileSync(file)) {
							throw new Error("\"" + file + "\" does not exist");
						}
						else if (-1 < separator.indexOf("{{filename}}")) {
							content = content + separator.replace("{{filename}}", path.basename(file)) + fs.readFileSync(file, encoding);
						}
						else {
							content = ("" === content) ? fs.readFileSync(file, encoding) : content + separator + fs.readFileSync(file, encoding);
						}

					});

				return content;

			}

		};

	// filesToFile

		// async version

		fs.filesToFile = (files, targetPath, separator, callback) => {

			if (!callback) {
				callback = ("function" === typeof separator) ? separator : () => {};
			}

			callback = ("function" === typeof callback) ? callback : () => {};
			separator = ("string" === typeof separator) ? separator : " ";

			if ("object" !== typeof files || !(files instanceof Array)) {
				callback("\"files\" is not an array");
			}
			else if ("string" !== typeof targetPath) {
				callback("\"targetPath\" is not a string");
			}
			else {

				fs.isFile(targetPath, (err, exists) => {

					if (err) {
						callback((err.message) ? err.message : err);
					}
					else if (exists) {

						fs.unlink(targetPath, (err) => {

							if (err) {
								callback((err.message) ? err.message : err);
							}
							else {

								fs.writeFile(targetPath, "", (err) => {

									if (err) {
										callback((err.message) ? err.message : err);
									}
									else {

										_concatContentStreamProm(files, targetPath, separator).then(() => {
											callback(null);
										}).catch(callback);

									}
								
								});

							}

						});

					}
					else {

						fs.writeFile(targetPath, "", (err) => {

							if (err) {
								callback((err.message) ? err.message : err);
							}
							else {

								_concatContentStreamProm(files, targetPath, separator).then(() => {
									callback(null);
								}).catch(callback);

							}
						
						});

					}

				});

			}

		};

		// sync version

		fs.filesToFileSync = (files, targetPath, separator) => {

			if ("object" !== typeof files || !(files instanceof Array)) {
				throw new Error("\"files\" is not an array");
			}
			else if ("string" !== typeof targetPath) {
				throw new Error("\"targetPath\" is not a string");
			}
			else {

				separator = ("string" === typeof separator) ? separator : " ";

				if (fs.isFileSync(targetPath)) {
					fs.unlinkSync(targetPath);
				}

				fs.writeFileSync(targetPath, "");

				files.forEach((file, key) => {

					if (!fs.isFileSync(file)) {
						throw new Error("\"" + file + "\" does not exist");
					}
					else if (-1 < separator.indexOf("{{filename}}")) {
						fs.appendFileSync(targetPath, separator.replace("{{filename}}", path.basename(file)) + fs.readFileSync(file));
					}
					else {
						fs.appendFileSync(targetPath, (0 < key) ? separator + fs.readFileSync(file) : fs.readFileSync(file));
					}

				});
				
			}

		};

	// directoryFilesToString

		// async version

		fs.directoryFilesToString = (dir, encoding, separator, callback) => {

			if (!callback) {

				if (!separator) {
					callback = ("function" === typeof encoding) ? encoding : () => {};
				}
				else {
					callback = ("function" === typeof separator) ? separator : () => {};
				}
				
			}

			callback = ("function" === typeof callback) ? callback : () => {};
			encoding = ("string" === typeof encoding) ? encoding : "utf8";
			separator = ("string" === typeof separator) ? separator : "";

			if ("string" !== typeof dir) {
				callback("This is not a string");
			}
			else {

				fs.extractDirectoryRealFilesProm(dir).then((files) => {
					return fs.filesToStringProm(files, encoding, separator);
				}).then((content) => {
					callback(null, content);
				}).catch(callback);

			}

		};

		// sync version

		fs.directoryFilesToStringSync = (dir, encoding, separator) => {

			if ("string" !== typeof dir) {
				throw new Error("This is not an array");
			}
			else {

				encoding = ("string" === typeof encoding) ? encoding : null;
				separator = ("string" === typeof separator) ? separator : "";

				return fs.filesToStringSync(fs.extractDirectoryRealFilesSync(dir), encoding, separator);

			}

		};

	// directoryFilesToFile

		// async version

		fs.directoryFilesToFile = (dir, targetPath, separator, callback) => {

			if (!callback) {
				callback = ("function" === typeof separator) ? separator : () => {};
			}

			callback = ("function" === typeof callback) ? callback : () => {};
			separator = ("string" === typeof separator) ? separator : " ";

			if ("string" !== typeof dir) {
				callback("\"files\" is not an array");
			}
			else if ("string" !== typeof targetPath) {
				callback("\"targetPath\" is not a string");
			}
			else {

				fs.extractDirectoryRealFilesProm(dir).then((files) => {
					fs.filesToFile(files, targetPath, separator, callback);
				}).catch(callback);

			}

		};

		// sync version

		fs.directoryFilesToFileSync = (dir, targetPath, encoding, separator) => {

			if ("string" !== typeof dir) {
				throw new Error("This is not an array");
			}
			else {

				encoding = ("string" === typeof encoding) ? encoding : null;
				separator = ("string" === typeof separator) ? separator : "";

				let files = fs.readdirSync(dir);

				if (0 >= files.length) {
					return fs.filesToFileSync([], targetPath, encoding, separator);
				}
				else {

					let result = [];

						files.forEach((file) => {

							file = path.join(dir, file);

							if (!fs.isFileSync(file)) {
								throw new Error("\"" + file + "\" does not exist");
							}
							else {
								result.push(file);
							}

						});

					return fs.filesToFileSync(result, targetPath, encoding, separator);

				}

			}

		};

	// copy

		// async version

		fs.copy = (origin, target, callback) => {

			callback = ("function" === typeof callback) ? callback : () => {};

			if ("string" !== typeof origin) {
				callback("This is not a string");
			}
			else if ("string" !== typeof target) {
				callback("This is not a string");
			}
			else {

				origin = origin.trim();
				target = target.trim();

				if ("" === origin) {
					callback("\"origin\" is empty");
				}
				else if ("" === target) {
					callback("\"target\" is empty");
				}
				else {

					fs.isFile(origin, (err, exists) => {

						if (err) {
							callback(err);
						}
						else if (!exists) {
							callback("\"origin\" is not a file");
						}
						else {

							fs.isFile(target, (err, exists) => {

								if (err) {
									callback(err);
								}
								else if (!exists) {
									_copyStream(origin, target, callback);
								}
								else {

									fs.unlink(target, (err) => {

										if (err) {
											callback((err.message) ? err.message : err);
										}
										else {
											_copyStream(origin, target, callback);
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
			}
			else if ("string" !== typeof target) {
				throw new Error("\"target\" is not a string");
			}
			else {

				origin = origin.trim();
				target = target.trim();

				if ("" === origin) {
					throw new Error("\"origin\" is empty");
				}
					else if (!fs.isFileSync(origin)) {
						throw new Error("\"origin\" is not a file");
					}
				else if ("" === target) {
					throw new Error("\"target\" is empty");
				}
				else {

					if (fs.isFileSync(target)) {
						fs.unlinkSync(target);
					}

					fs.writeFileSync(target, fs.readFileSync(origin));

				}

			}

		};

	// isDirectory
		
		// async version

		fs.isDirectory = _extends.isDirectory;

		// promise version

		fs.isDirectoryProm = _extends.isDirectoryProm;

		// sync version

		fs.isDirectorySync = _extends.isDirectorySync;

	// isFile
		
		// async version

		fs.isFile = _extends.isFile;

		// promise version

		fs.isFileProm = _extends.isFileProm;

		// sync version

		fs.isFileSync = _extends.isFileSync;

	// mkdirp
		
		// async version

		fs.mkdirp = (dir, callback) => {

			callback = ("function" === typeof callback) ? callback : () => {};

			fs.isDirectory(dir, (err, exists) => {

				if (err) {
					callback(err);
				}
				else if (exists) {
					callback(null);
				}
				else {

					fs.mkdirp(path.dirname(dir), (err) => {

						if (err) {
							callback(err);
						}
						else {

							fs.mkdir(dir, parseInt("0777", 8), (err) => {

								if (err) {
									callback((err.message) ? err.message : err);
								}
								else {
									callback(null);
								}
								
							});

						}
						
					});

				}

			});

		};

		// sync version

		fs.mkdirpSync = (dir) => {

			if (!fs.isDirectorySync(dir)) {

				if (!fs.isDirectorySync(path.dirname(dir))) {
					fs.mkdirpSync(path.dirname(dir));
				}

				fs.mkdirSync(dir, parseInt("0777", 8));

			}

		};

	// rmdirp

		// async version

		fs.rmdirp = (dir, callback) => {

			callback = ("function" === typeof callback) ? callback : () => {};

			fs.isDirectory(dir, (err, exists) => {

				if (err) {
					callback(err);
				}
				else if (!exists) {
					callback(null);
				}
				else {

					fs.readdir(dir, (err, files) => {

						if (err) {
							callback((err.message) ? err.message : err);
						}
						else if (0 === files.length) {

							fs.rmdir(dir, (err) => {

								if (err) {
									callback(err);
								}
								else {
									callback();
								}

							});

						}
						else {

							let deletedFiles = 0;
							for (let i = 0; i < files.length; ++i) {

								let content = path.join(dir, files[i]);

								fs.isDirectory(content, (err, isdirectory) => {

									if (err) {
										callback(err);
									}
									else if (isdirectory) {

										fs.rmdirp(content, (err) => {

											if (err) {
												callback(err);
											}
											else {

												++deletedFiles;

												if (deletedFiles >= files.length) {
													
													fs.rmdir(dir, (err) => {

														if (err) {
															callback(err);
														}
														else {
															callback();
														}

													});

												}

											}

										});

									}
									else {

										fs.unlink(content, (err) => {

											if (err) {
												callback(err);
											}
											else {

												++deletedFiles;

												if (deletedFiles >= files.length) {
													
													fs.rmdir(dir, (err) => {

														if (err) {
															callback(err);
														}
														else {
															callback();
														}

													});

												}

											}

										});

									}

								});

							}

						}

					});

				}

			});

		};

		// sync version

		fs.rmdirpSync = (dir) => {

			if(fs.isDirectorySync(dir)) {
				
				fs.readdirSync(dir).forEach((file) => {

					let curPath = path.join(dir, file);

					if(fs.isDirectorySync(curPath)) {
						fs.rmdirpSync(curPath);
					}
					else if (fs.isFileSync(curPath)) {
						fs.unlinkSync(curPath);
					}

				});

				fs.rmdirSync(dir);

			}

		};

module.exports = fs;
