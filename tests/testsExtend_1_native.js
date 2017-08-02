"use strict";

// deps

	const path = require("path");
	const assert = require("assert");

	const fs = require(path.join(__dirname, "..", "lib", "main.js"));

// tests

describe("native", () => {

	describe("mkdirp", () => {

		const _dirtestBase = path.join(__dirname, "testlvl1");
		const _dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4");
		const _dirtestwithOptions = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4withOptions");

		before(() => {

			if (!fs.isDirectorySync(_dirtestBase)) {
				fs.mkdirSync(_dirtestBase);
			}

		});

		afterEach(() => {

			if (fs.isDirectorySync(_dirtestBase)) {

				if (fs.isDirectorySync(path.join(_dirtestBase, "testlvl2"))) {

					if (fs.isDirectorySync(path.join(_dirtestBase, "testlvl2", "testlvl3"))) {

						if (fs.isDirectorySync(_dirtest)) {
							fs.rmdirSync(_dirtest);
						}

						if (fs.isDirectorySync(_dirtestwithOptions)) {
							fs.rmdirSync(_dirtestwithOptions);
						}

						fs.rmdirSync(path.join(_dirtestBase, "testlvl2", "testlvl3"));

					}

					fs.rmdirSync(path.join(_dirtestBase, "testlvl2"));

				}

				fs.rmdirSync(_dirtestBase);

			}

		});

		describe("sync", () => {

			it("should check missing value", () => {

				assert.throws(() => {
					fs.mkdirpSync();
				}, ReferenceError, "check missing value does not throw an error");

			});

			it("should check invalid value", () => {

				assert.throws(() => {
					fs.mkdirpSync(false);
				}, Error, "check invalid value does not throw an error");

				assert.throws(() => {
					fs.mkdirpSync(__dirname, false);
				}, Error, "check invalid value does not throw an error");

			});

			it("should check empty content value", () => {

				assert.throws(() => {
					fs.mkdirpSync("");
				}, Error, "check empty content value does not throw an error");

			});

			it("should create real existing directory", () => {

				assert.doesNotThrow(() => {
					fs.mkdirpSync(__dirname);
				}, "\"" + path.resolve(__dirname) + "\" cannot be created");

				assert.doesNotThrow(() => {
					fs.mkdirpSync(__dirname, 0x755);
				}, "\"" + path.resolve(__dirname) + "\" cannot be created");

			});

			it("should create real new directory", () => {

				assert.doesNotThrow(() => {
					fs.mkdirpSync(_dirtest);
				}, "\"" + _dirtest + "\" cannot be created");

				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");

			});

			it("should create real new directory with option", () => {

				assert.doesNotThrow(() => {
					fs.mkdirpSync(_dirtestwithOptions, 0x755);
				}, "\"" + _dirtestwithOptions + "\" cannot be created");

				assert.strictEqual(true, fs.isDirectorySync(_dirtestwithOptions), "\"" + _dirtestwithOptions + "\" was not created");

			});

		});

		describe("async", () => {

			it("should check missing value", () => {

				assert.throws(() => {
					fs.mkdirp();
				}, ReferenceError, "check missing value does not throw an error");

				assert.throws(() => {
					fs.mkdirp(__dirname);
				}, ReferenceError, "check missing value does not throw an error");

			});

			it("should check invalid value", () => {

				assert.throws(() => {
					fs.mkdirp(false, () => {
						// nothing to do here
					});
				}, Error, "check invalid value does not throw an error");

				assert.throws(() => {
					fs.mkdirp(__dirname, false);
				}, Error, "check invalid value does not throw an error");

				assert.throws(() => {
					fs.mkdirp(__dirname, false, () => {
						// nothing to do here
					});
				}, Error, "check invalid value does not throw an error");

			});

			it("should check empty content value", () => {

				assert.throws(() => {
					fs.mkdirp("", () => {
						// nothing to do here
					});
				}, Error, "check empty content value does not throw an error");

			});

			it("should create real existing directory", (done) => {

				fs.mkdirp(__dirname, (err) => {

					assert.strictEqual(null, err, "\"" + path.resolve(__dirname) + "\" cannot be created");

					fs.mkdirp(__dirname, 0x755, (_err) => {
						assert.strictEqual(null, _err, "\"" + path.resolve(__dirname) + "\" cannot be created");
						done();
					});

				});

			});

			it("should create real new directory", (done) => {

				fs.mkdirp(_dirtest, (err) => {

					assert.strictEqual(null, err, "\"" + _dirtest + "\" cannot be created");

					fs.isDirectory(_dirtest, (_err, exists) => {

						assert.strictEqual(null, _err, "\"" + _dirtest + "\" cannot be created");
						assert.strictEqual(true, exists, "\"" + _dirtest + "\" was not created");

						done();

					});

				});

			});

			it("should create real new directory with option", (done) => {

				fs.mkdirp(_dirtestwithOptions, 0x755, (err) => {

					assert.strictEqual(null, err, "\"" + _dirtestwithOptions + "\" cannot be created");

					fs.isDirectory(_dirtestwithOptions, (_err, exists) => {

						assert.strictEqual(null, _err, "\"" + _dirtestwithOptions + "\" cannot be created");
						assert.strictEqual(true, exists, "\"" + _dirtestwithOptions + "\" was not created");

						done();

					});

				});

			});

		});

		describe("promise", () => {

			it("should check missing value", (done) => {

				fs.mkdirpProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check invalid value", (done) => {

				fs.mkdirpProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.mkdirpProm(__dirname, false).then(() => {
						done("check invalid value does not generate an error");
					}).catch((_err) => {

						assert.strictEqual(true, _err instanceof TypeError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof _err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check empty content value", (done) => {

				fs.mkdirpProm("").then(() => {
					done("check empty content value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should create real existing directory", () => {
				return fs.mkdirpProm(__dirname);
			});

			it("should create real new directory with option", () => {
				return fs.mkdirpProm(__dirname, 0x755);
			});

			it("should create real new directory", () => {

				return fs.mkdirpProm(_dirtest).then(() => {

					return new Promise((resolve, reject) => {

						fs.isDirectory(_dirtest, (err) => {

							if (err) {
								reject(err);
							}
							else {
								resolve();
							}

						});

					});

				});

			});

			it("should create real new directory with option", () => {

				return fs.mkdirpProm(_dirtestwithOptions, 0x755).then(() => {

					return new Promise((resolve, reject) => {

						fs.isDirectory(_dirtestwithOptions, (err) => {

							if (err) {
								reject(err);
							}
							else {
								resolve();
							}

						});

					});

				});

			});

		});

	});

	describe("rmdirp", () => {

		const _dirtestBase = path.join(__dirname, "testlvl1");
		const _dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4");
		const _filetest = path.join(_dirtest, "test.txt");

		before(() => {

			if (!fs.isDirectorySync(_dirtestBase)) {
				fs.mkdirSync(_dirtestBase);
			}

		});

		afterEach(() => {

			if (fs.isDirectorySync(_dirtest)) {

				if (fs.isFileSync(_filetest)) {
					fs.unlinkSync(_filetest);
				}

				if (fs.isDirectorySync(path.join(__dirname, "testlvl2", "testlvl3"))) {

					fs.rmdirSync(path.join(__dirname, "testlvl2", "testlvl3"));

					if (fs.isDirectorySync(path.join(__dirname, "testlvl2"))) {

						fs.rmdirSync(path.join(__dirname, "testlvl2"));

						if (fs.isDirectorySync(_dirtestBase)) {
							fs.rmdirSync(_dirtestBase);
						}

					}

				}

				fs.rmdirSync(_dirtest);

			}

		});

		describe("sync", () => {

			it("should check missing value", () => {

				assert.throws(() => {
					fs.rmdirpSync();
				}, ReferenceError, "check missing value does not throw an error");

			});

			it("should check invalid value", () => {

				assert.throws(() => {
					fs.rmdirpSync(false);
				}, Error, "check invalid value does not throw an error");

			});

			it("should check empty content value", () => {

				assert.throws(() => {
					fs.rmdirpSync("");
				}, Error, "check empty content value does not throw an error");

			});

			it("should delete real new directory", () => {

				assert.doesNotThrow(() => {
					fs.mkdirpSync(_dirtest);
				}, "\"" + _dirtest + "\" cannot be created");

				assert.doesNotThrow(() => {
					fs.writeFileSync(_filetest, "test");
				}, "\"" + _filetest + "\" cannot be created");

				assert.doesNotThrow(() => {
					fs.rmdirpSync(_dirtestBase);
				}, "\"" + _dirtestBase + "\" cannot be deleted");

				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");

			});

		});

		describe("async", () => {

			it("should check missing value", () => {

				assert.throws(() => {
					fs.rmdirp();
				}, ReferenceError, "check missing value does not throw an error");

				assert.throws(() => {
					fs.rmdirp(__dirname);
				}, ReferenceError, "check missing value does not throw an error");

			});

			it("should check invalid value", () => {

				assert.throws(() => {
					fs.rmdirp(false, () => {
						// nothing to do here
					});
				}, Error, "check invalid value does not throw an error");

				assert.throws(() => {
					fs.rmdirp(__dirname, false);
				}, Error, "check invalid value does not throw an error");

			});

			it("should check empty content value", () => {

				assert.throws(() => {
					fs.rmdirp("", () => {
						// nothing to do here
					});
				}, Error, "check empty content value does not throw an error");

			});

			it("should delete real new directory", (done) => {

				fs.mkdirp(_dirtest, (err) => {

					assert.strictEqual(null, err, "\"" + _dirtestBase + "\" cannot be created");

					fs.rmdirp(_dirtestBase, (_err) => {

						assert.strictEqual(null, _err, "\"" + _dirtestBase + "\" cannot be deleted");

						fs.isDirectory(_dirtestBase, (__err) => {

							assert.strictEqual(null, __err, "\"" + _dirtestBase + "\" was not deleted");

							done();

						});

					});

				});

			});

		});

		describe("promise", () => {

			it("should check missing value", (done) => {

				fs.rmdirpProm().then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check invalid value", (done) => {

				fs.rmdirpProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.rmdirpProm("").then(() => {
					assert(false, "check empty content value does not generate an error");
					done();
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should delete real new directory", () => {

				return fs.mkdirpProm(_dirtest).then(() => {
					return fs.rmdirpProm(_dirtestBase);
				}).then(() => {

					return fs.isDirectoryProm(_dirtestBase).then((exists) => {
						assert.strictEqual(false, exists, "\"" + _dirtest + "\" was not deleted");
						return Promise.resolve();
					});

				});

			});

		});

	});


});
