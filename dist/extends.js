
"use strict";

// deps

const path = require("path"),
		fs = require(path.join(__dirname, "extends_native.js"));

// module

// copy

// sync version

fs.copySync = (origin, target) => {

	if ("undefined" === typeof origin) {
		throw new ReferenceError("missing 'origin' argument");
	} else if ("string" !== typeof origin) {
		throw new TypeError("'origin' argument is not a string");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing 'target' argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("'target' argument is not a string");
	} else {

		origin = origin.trim();
		target = target.trim();

		if ("" === origin) {
			throw new Error("'origin' argument is empty");
		} else if ("" === target) {
			throw new Error("'target' argument is empty");
		} else {

			if (!fs.isFileSync(origin)) {
				throw new Error("\"" + origin + "\" is not a valid file");
			} else {

				if (fs.isFileSync(target)) {
					fs.unlinkSync(target);
				}

				fs.writeFileSync(target, fs.readFileSync(origin));
			}
		}
	}
};

// async version

fs.copy = (origin, target, callback) => {

	if ("undefined" === typeof origin) {
		throw new ReferenceError("missing 'origin' argument");
	} else if ("string" !== typeof origin) {
		throw new TypeError("'origin' argument is not a string");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing 'target' argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("'target' argument is not a string");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("'callback' argument is not a function");
	} else {

		origin = origin.trim();
		target = target.trim();

		if ("" === origin) {
			throw new Error("'origin' argument is empty");
		} else if ("" === target) {
			throw new Error("'target' argument is empty");
		} else {

			fs.isFile(origin, (err, exists) => {

				if (err) {
					callback(err);
				} else if (!exists) {
					callback(new Error("\"" + origin + "\" is not a valid file"));
				} else {

					fs.isFile(target, (err, exists) => {

						if (err) {
							callback(err);
						} else if (!exists) {
							_copyStream(origin, target, callback);
						} else {

							fs.unlink(target, err => {

								if (err) {
									callback(err);
								} else {
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

// specific to "copy" method

function _copyStream(origin, target, callback) {

	let readStream = fs.createReadStream(origin),
		writeStream = fs.createWriteStream(target),
		error = false;

	writeStream.once("error", err => {

		error = true;

		readStream.close();
		writeStream.close();

		callback(err);
	}).once("close", () => {

		if (!error) {
			callback(null);
		}
	});

	readStream.once("error", err => {

		error = true;

		readStream.close();
		writeStream.close();

		callback(err);
	}).once("open", () => {
		readStream.pipe(writeStream);
	}).once("close", () => {
		writeStream.close();
	}).once("end", () => {
		readStream.close();
	});
}

// extractDirectoryRealFiles

// sync version

fs.extractDirectoryRealFilesSync = dir => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else {

		dir = dir.trim();

		if (!fs.isDirectorySync(dir)) {
			throw new Error("'" + dir + "' is not a valid directory");
		} else {

			let result = [];

			fs.readdirSync(dir).forEach(file => {

				file = path.join(dir, file);

				if (fs.isFileSync(file)) {
					result.push(file);
				}
			});

			return result;
		}
	}
};

// async version

fs.extractDirectoryRealFiles = (dir, callback) => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("'callback' argument is not a function");
	} else {

		dir = dir.trim();

		fs.isDirectory(dir, (err, exists) => {

			if (err) {
				callback(err);
			} else if (!exists) {
				callback(new Error("'" + dir + "' is not a valid directory"));
			} else {

				fs.readdir(dir, (err, files) => {

					if (err) {
						callback(err);
					} else {

						_extractRealFiles(dir, files, [], (err, data) => {

							if (err) {
								callback(err);
							} else {
								callback(null, data);
							}
						});
					}
				});
			}
		});
	}
};

// specific to "extractDirectoryRealFiles" method

function _extractRealFiles(dir, givenFiles, realFiles, callback) {

	if (0 >= givenFiles.length) {
		callback(null, realFiles);
	} else {

		let file = path.join(dir, givenFiles.shift()).trim();

		fs.isFile(file, (err, exists) => {

			if (err) {
				callback(err);
			} else {

				if (exists) {
					realFiles.push(file);
				}

				_extractRealFiles(dir, givenFiles, realFiles, callback);
			}
		});
	}
}

// filesToString

// sync version

fs.filesToStringSync = (files, encoding, separator) => {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing 'files' argument");
	} else if ("object" !== typeof files || !(files instanceof Array)) {
		throw new TypeError("'files' argument is not an Array");
	} else {

		encoding = "string" === typeof encoding ? encoding.trim() : null;
		separator = "string" === typeof separator ? separator : " ";

		let content = "";

		files.forEach(file => {

			file = file.trim();

			if (!fs.isFileSync(file)) {
				throw new Error("\"" + file + "\" does not exist");
			} else if (-1 < separator.indexOf("{{filename}}")) {
				content = content + separator.replace("{{filename}}", path.basename(file)) + fs.readFileSync(file, encoding);
			} else {
				content = "" === content ? fs.readFileSync(file, encoding) : content + separator + fs.readFileSync(file, encoding);
			}
		});

		return content;
	}
};

// async version

fs.filesToString = (files, encoding, separator, callback) => {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing 'files' argument");
	} else if ("object" !== typeof files || !(files instanceof Array)) {
		throw new TypeError("'files' argument is not an Array");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
		throw new TypeError("'callback' argument is not a function");
	} else {

		if ("undefined" === typeof callback) {

			if ("undefined" === typeof separator) {
				callback = encoding;
			} else {
				callback = separator;
			}
		}

		encoding = "string" === typeof encoding ? encoding.trim() : "utf8";
		separator = "string" === typeof separator ? separator : " ";

		_readContent(files, encoding, separator, "", (err, content) => {

			if (err) {
				callback(err);
			} else {
				callback(null, content);
			}
		});
	}
};

// specific to "filesToString" method

function _readContent(files, encoding, separator, content, callback) {

	if (0 >= files.length) {
		callback(null, content);
	} else {

		let file = files.shift().trim();

		fs.isFile(file, (err, exists) => {

			if (err) {
				callback(err);
			} else if (!exists) {
				callback(new Error("\"" + file + "\" does not exist"));
			} else {

				fs.readFile(file, encoding, (err, filecontent) => {

					if (err) {
						callback(err);
					} else {

						if (-1 < separator.indexOf("{{filename}}")) {

							_readContent(files, encoding, separator, content + separator.replace("{{filename}}", path.basename(file)) + filecontent, callback);
						} else {

							_readContent(files, encoding, separator, "" === content ? filecontent : content + separator + filecontent, callback);
						}
					}
				});
			}
		});
	}
}

// filesToFile

// sync version

fs.filesToFileSync = (files, target, separator) => {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing 'files' argument");
	} else if ("object" !== typeof files || !(files instanceof Array)) {
		throw new TypeError("'files' argument is not an Array");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing 'target' argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("'target' argument is not a string");
	} else {

		target = target.trim();

		if ("" === target) {
			throw new Error("'target' argument is empty");
		} else {

			separator = "string" === typeof separator ? separator : " ";

			if (fs.isFileSync(target)) {
				fs.unlinkSync(target);
			}

			fs.writeFileSync(target, "");

			files.forEach((file, key) => {

				file = file.trim();

				if (!fs.isFileSync(file)) {
					throw new Error("\"" + file + "\" does not exist");
				} else if (-1 < separator.indexOf("{{filename}}")) {
					fs.appendFileSync(target, separator.replace("{{filename}}", path.basename(file)) + fs.readFileSync(file));
				} else {
					fs.appendFileSync(target, 0 < key ? separator + fs.readFileSync(file) : fs.readFileSync(file));
				}
			});
		}
	}
};

// async version

fs.filesToFile = (files, target, separator, callback) => {

	if ("undefined" === typeof files) {
		throw new ReferenceError("missing 'files' argument");
	} else if ("object" !== typeof files || !(files instanceof Array)) {
		throw new TypeError("'files' argument is not an Array");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing 'target' argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("'target' argument is not a string");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("'callback' argument is not a function");
	} else {

		if ("undefined" === typeof callback) {
			callback = separator;
		}

		target = target.trim();

		if ("" === target) {
			throw new Error("'target' argument is empty");
		} else {

			separator = "string" === typeof separator ? separator : " ";

			new Promise((resolve, reject) => {

				fs.isFile(target, (err, exists) => {

					if (err) {
						reject(err);
					} else if (!exists) {
						resolve();
					} else {

						fs.unlink(target, err => {

							if (err) {
								reject(err);
							} else {
								resolve();
							}
						});
					}
				});
			}).then(() => {

				return new Promise((resolve, reject) => {

					fs.writeFile(target, "", err => {

						if (err) {
							reject(err);
						} else {
							resolve();
						}
					});
				});
			}).then(() => {

				_concatContentStream(files, target, separator, callback);
			}).catch(callback);
		}
	}
};

// specific to "filesToFile" method

function _concatContentStream(files, target, separator, callback) {

	if (0 >= files.length) {
		callback(null);
	} else {

		let file = files.shift().trim();

		fs.isFile(file, (err, exists) => {

			if (err) {
				callback(err);
			} else if (!exists) {
				callback(new Error("\"" + file + "\" is not a valid file"));
			} else {

				let readStream = fs.createReadStream(file),
					writeStream = fs.createWriteStream(target, { flags: "a" }),
					error = false;

				writeStream.once("error", err => {

					error = true;

					readStream.close();
					writeStream.close();

					callback(err);
				}).once("close", () => {

					if (!error) {

						if (0 >= files.length) {
							callback(null);
						} else {

							if (-1 < separator.indexOf("{{filename}}")) {
								_concatContentStream(files, target, separator, callback);
							} else {

								fs.appendFile(target, separator, err => {

									if (err) {
										callback(err);
									} else {
										_concatContentStream(files, target, separator, callback);
									}
								});
							}
						}
					}
				});

				readStream.once("error", err => {

					error = true;

					readStream.close();
					writeStream.close();

					callback(err);
				}).once("open", () => {

					if (-1 >= separator.indexOf("{{filename}}")) {
						readStream.pipe(writeStream);
					} else {

						fs.appendFile(target, separator.replace("{{filename}}", path.basename(file)), err => {

							if (err) {
								callback(err);
							} else {
								readStream.pipe(writeStream);
							}
						});
					}
				}).once("close", () => {
					writeStream.close();
				}).once("end", () => {
					readStream.close();
				});
			}
		});
	}
}

// directoryFilesToString

// sync version

fs.directoryFilesToStringSync = (dir, encoding, separator) => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else {
		return fs.filesToStringSync(fs.extractDirectoryRealFilesSync(dir), encoding, separator);
	}
};

// async version

fs.directoryFilesToString = (dir, encoding, separator, callback) => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator && "undefined" === typeof encoding) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator && "function" !== typeof encoding) {
		throw new TypeError("'callback' argument is not a function");
	} else {

		if ("undefined" === typeof callback) {

			if ("undefined" === typeof separator) {
				callback = encoding;
			} else {
				callback = separator;
			}
		}

		fs.extractDirectoryRealFiles(dir, (err, files) => {

			if (err) {
				callback(err);
			} else {

				fs.filesToString(files, encoding, separator, (err, content) => {

					if (err) {
						callback(err);
					} else {
						callback(null, content);
					}
				});
			}
		});
	}
};

// directoryFilesToFile

// sync version

fs.directoryFilesToFileSync = (dir, target, separator) => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing 'target' argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("'target' argument is not a string");
	} else {

		target = target.trim();

		if ("" === target) {
			throw new Error("'target' argument is empty");
		} else {

			return fs.filesToFileSync(fs.extractDirectoryRealFilesSync(dir), target, separator);
		}
	}
};

// async version

fs.directoryFilesToFile = (dir, target, separator, callback) => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else if ("undefined" === typeof target) {
		throw new ReferenceError("missing 'target' argument");
	} else if ("string" !== typeof target) {
		throw new TypeError("'target' argument is not a string");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("'callback' argument is not a function");
	} else {

		target = target.trim();

		if ("" === target) {
			throw new Error("'target' argument is empty");
		} else {

			if ("undefined" === typeof callback) {
				callback = separator;
			}

			fs.extractDirectoryRealFiles(dir, (err, files) => {

				if (err) {
					callback(err);
				} else {

					fs.filesToFile(files, target, separator, err => {

						if (err) {
							callback(err);
						} else {
							callback(null);
						}
					});
				}
			});
		}
	}
};

// mkdirp

// sync version

fs.mkdirpSync = dir => {

	if (!fs.isDirectorySync(dir)) {

		if (!fs.isDirectorySync(path.dirname(dir))) {
			fs.mkdirpSync(path.dirname(dir));
		}

		fs.mkdirSync(dir, parseInt("0777", 8));
	}
};

// async version

fs.mkdirp = (dir, callback) => {

	if ("undefined" === typeof dir) {
		throw new ReferenceError("missing 'directory' argument");
	} else if ("string" !== typeof dir) {
		throw new TypeError("'directory' argument is not a string");
	} else if ("undefined" === typeof callback) {
		throw new ReferenceError("missing 'callback' argument");
	} else if ("function" !== typeof callback) {
		throw new TypeError("'callback' argument is not a function");
	} else {

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
								callback(err);
							} else {
								callback(null);
							}
						});
					}
				});
			}
		});
	}
};

// have to improve tests


// rmdirp

// sync version

fs.rmdirpSync = dir => {

	if (fs.isDirectorySync(dir)) {

		fs.readdirSync(dir).forEach(file => {

			let curPath = path.join(dir, file);

			if (fs.isDirectorySync(curPath)) {
				fs.rmdirpSync(curPath);
			} else if (fs.isFileSync(curPath)) {
				fs.unlinkSync(curPath);
			}
		});

		fs.rmdirSync(dir);
	}
};

/*

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
							callback(err);
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
*/

module.exports = fs;