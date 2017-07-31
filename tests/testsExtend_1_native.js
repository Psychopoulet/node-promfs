"use strict";

// deps

	const path = require("path");
	const assert = require("assert");

	const fs = require(path.join(__dirname, "..", "dist", "main.js"));

// tests

describe("native", () => {

	describe("isDirectory", () => {

		describe("sync", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isDirectorySync(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isDirectorySync(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isDirectorySync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should check false directory existance", () => {
				assert.doesNotThrow(() => { fs.isDirectorySync("test"); }, Error, "check false directory existance value throw an error");
			});

			it("should check file existance", () => {
				assert.strictEqual(false, fs.isDirectorySync(__filename), "\"" + __filename + "\" is an existing directory");
			});

			it("should check real directory existance", () => {
				assert.strictEqual(true, fs.isDirectorySync(__dirname), "\"" + __dirname + "\" is not an existing directory");
			});

		});

		describe("async", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isDirectory(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isDirectory(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check missing callback", () => {
				assert.throws(() => { fs.isDirectory(__dirname); }, ReferenceError, "check missing callback does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isDirectory("", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should check false directory existance", (done) => {
				
				fs.isDirectory("test", (err) => {
					assert.strictEqual(null, err, "check false directory existance generate an error");
					done();
				});

			});

			it("should check file existance", (done) => {

				fs.isDirectory(__filename, (err, exists) => {

					assert.strictEqual(null, err, "check file existance generate an error");
					assert.strictEqual(false, exists, "\"" + __filename + "\" is an existing directory");

					done();

				});

			});

			it("should check real directory existance", (done) => {

				fs.isDirectory(__dirname, (err, exists) => {

					assert.strictEqual(null, err, "check real directory existance generate an error");
					assert.strictEqual(true, exists, "\"" + __dirname + "\" is not an existing directory");

					done();

				});

			});

		});

		describe("promise", () =>{

			it("should check missing value", (done) => {

				fs.isDirectoryProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check invalid value", (done) => {

				fs.isDirectoryProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {
				
				fs.isDirectoryProm("").then(() => {
					done("check empty content value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check false directory existance", () => {

				return fs.isDirectoryProm("test").then((exists) => {
					assert.strictEqual(false, exists, "\"test\" is an existing directory");
				});

			});

			it("should check file existance", () => {

				return fs.isDirectoryProm(__filename).then((exists) => {
					assert.strictEqual(false, exists, "\"" + __filename + "\" is an existing directory");
				});

			});

			it("should check real directory existance", () => {

				return fs.isDirectoryProm(__dirname).then((exists) => {
					assert.strictEqual(true, exists, "\"" + __dirname + "\" is not an existing directory");
				});

			});

		});

	});

	describe("isFile", () => {

		describe("sync", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isFileSync(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isFileSync(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isFileSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should check false file existance", () => {
				assert.doesNotThrow(() => { fs.isFileSync("test"); }, Error, "check false file existance throw an error");
			});

			it("should check directory existance", () => {
				assert.strictEqual(false, fs.isFileSync(__dirname), "\"" + __dirname + "\" is an existing file");
			});

			it("should check real file existance", () => {
				assert.strictEqual(true, fs.isFileSync(__filename), "\"" + __filename + "\" is not an existing file");
			});

		});

		describe("async", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isFile(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isFile(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check missing callback", () => {
				assert.throws(() => { fs.isFile(__filename); }, ReferenceError, "check missing callback does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isFile("", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should check false file existance", (done) => {
				
				fs.isFile("test", (err) => {
					assert.strictEqual(null, err, "check false file existance generate an error");
					done();
				});

			});

			it("should check directory existance", (done) => {

				fs.isFile(__dirname, (err, exists) => {

					assert.strictEqual(null, err, "check directory existance generate an error");
					assert.strictEqual(false, exists, "\"" + __dirname + "\" is an existing file");

					done();

				});

			});

			it("should check real file existance", (done) => {

				fs.isFile(__filename, (err, exists) => {

					assert.strictEqual(null, err, "check real file existance generate an error");
					assert.strictEqual(true, exists, "\"" + __filename + "\" is not an existing file");

					done();

				});

			});

		});

		describe("promise", () =>{

			it("should check missing value", (done) => {

				fs.isFileProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check invalid value", (done) => {

				fs.isFileProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {
				
				fs.isFileProm("").then(() => {
					done("check empty content value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check false directory existance", () => {

				return fs.isFileProm("test").then((exists) => {
					assert.strictEqual(false, exists, "\"test\" is an existing file");
				}).catch((err) => {
					return Promise.reject(err);
				});

			});

			it("should check directory existance", () => {

				return fs.isFileProm(__dirname).then((exists) => {
					assert.strictEqual(false, exists, "\"" + __filename + "\" is an existing file");
				});

			});

			it("should check real file existance", () => {

				return fs.isFileProm(__filename).then((exists) => {
					assert.strictEqual(true, exists, "\"" + __filename + "\" is not an existing file");
				});

			});

		});

	});

	describe("mkdirp", () => {

		let _dirtestBase = path.join(__dirname, "testlvl1"),
			_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
			_dirtestwithOptions = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4withOptions");

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
				assert.throws(() => { fs.mkdirpSync(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.mkdirpSync(false); }, Error, "check invalid value does not throw an error");
				assert.throws(() => { fs.mkdirpSync(__dirname, false); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.mkdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should create real existing directory", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(__dirname); }, "\"" + __dirname + "\" cannot be created");
				assert.doesNotThrow(() => { fs.mkdirpSync(__dirname, 0x755); }, "\"" + __dirname + "\" cannot be created");
			});

			it("should create real new directory", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

			it("should create real new directory with option", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtestwithOptions, 0x755); }, "\"" + _dirtestwithOptions + "\" cannot be created");
				assert.strictEqual(true, fs.isDirectorySync(_dirtestwithOptions), "\"" + _dirtestwithOptions + "\" was not created");
			});

		});

		describe("async", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.mkdirp(); }, ReferenceError, "check missing value does not throw an error");
				assert.throws(() => { fs.mkdirp(__dirname); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.mkdirp(false, () => {}); }, Error, "check invalid value does not throw an error");
				assert.throws(() => { fs.mkdirp(__dirname, false); }, Error, "check invalid value does not throw an error");
				assert.throws(() => { fs.mkdirp(__dirname, false, () => {}); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.mkdirp("", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should create real existing directory", (done) => {

				fs.mkdirp(__dirname, (err) => {

					assert.strictEqual(null, err, "\"" + __dirname + "\" cannot be created");

					fs.mkdirp(__dirname, 0x755, (err) => {
						assert.strictEqual(null, err, "\"" + __dirname + "\" cannot be created");
						done();
					});

				});

			});

			it("should create real new directory", (done) => {
				
				fs.mkdirp(_dirtest, (err) => {

					assert.strictEqual(null, err, "\"" + _dirtest + "\" cannot be created");

					fs.isDirectory(_dirtest, (err, exists) => {

						if (err) {
							done(err);
						}
						else {
							assert.strictEqual(true, exists, "\"" + _dirtest + "\" was not created");
							done();
						}

					});

					
				});

			});

			it("should create real new directory with option", (done) => {

				fs.mkdirp(_dirtestwithOptions, 0x755, (err) => {

					assert.strictEqual(null, err, "\"" + _dirtestwithOptions + "\" cannot be created");

					fs.isDirectory(_dirtestwithOptions, (err, exists) => {

						if (err) {
							done(err);
						}
						else {
							assert.strictEqual(true, exists, "\"" + _dirtestwithOptions + "\" was not created");
							done();
						}

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
					}).catch((err) => {

						assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

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

		let _dirtestBase = path.join(__dirname, "testlvl1"), _dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
			_filetest = path.join(_dirtest, "test.txt");

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
				assert.throws(() => { fs.rmdirpSync(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.rmdirpSync(false); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.rmdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should delete real new directory", () => {

				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
				assert.doesNotThrow(() => { fs.writeFileSync(_filetest, "test"); }, "\"" + _filetest + "\" cannot be created");

				assert.doesNotThrow(() => { fs.rmdirpSync(_dirtestBase); }, "\"" + _dirtestBase + "\" cannot be deleted");
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");

			});

		});

		describe("async", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.rmdirp(); }, ReferenceError, "check missing value does not throw an error");
				assert.throws(() => { fs.rmdirp(__dirname); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.rmdirp(false, () => {}); }, Error, "check invalid value does not throw an error");
				assert.throws(() => { fs.rmdirp(__dirname, false); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.rmdirp("", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should delete real new directory", (done) => {

				fs.mkdirp(_dirtest, (err) => {

					assert.strictEqual(null, err, "\"" + _dirtestBase + "\" cannot be created");

					fs.rmdirp(_dirtestBase, (err) => {

						assert.strictEqual(null, err, "\"" + _dirtestBase + "\" cannot be deleted");

						fs.isDirectory(_dirtestBase, (err) => {

							assert.strictEqual(null, err, "\"" + _dirtestBase + "\" was not deleted");

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
					});

				});

			});

		});

	});


});
