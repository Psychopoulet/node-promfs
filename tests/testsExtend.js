"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var //_dirtestBase = path.join(__dirname, "testlvl1"),
			//_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
		_filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");

// tests

describe("extend", () => {

	describe("base", () => {

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
					assert.throws(() => { fs.isDirectory("test"); }, ReferenceError, "check missing callback does not throw an error");
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
					assert.throws(() => { fs.isFile("test"); }, ReferenceError, "check missing callback does not throw an error");
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

	});

	describe("copy", () => {

		describe("sync", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });

			after(() => {

				return fs.unlinkProm(_filetest).then(() => {
					return fs.unlinkProm(_filetest2);
				});

			});

			it("should check missing value", () => {
				assert.throws(() => { fs.copySync(); }, ReferenceError, "check missing value does not throw an error");
				assert.throws(() => { fs.copySync("test"); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.copySync(false, "test"); }, TypeError, "check invalid value does not throw an error");
				assert.throws(() => { fs.copySync("test", false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.copySync("", "test"); }, Error, "check empty content value does not throw an error");
				assert.throws(() => { fs.copySync("test", ""); }, Error, "check empty content value does not throw an error");
			});

			it("should check inexistant origin", () => {
				assert.throws(() => { fs.copySync("rgvservseqrvserv", _filetest); }, "wrong \"origin\" file does not throw an error");
			});

			it("should copy test files", () => {
				assert.doesNotThrow(() => { fs.copySync(_filetest, _filetest2); }, "test file cannot be copied");
			});

		});

		describe("async", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });

			after(() => {

				return fs.unlinkProm(_filetest).then(() => {
					return fs.unlinkProm(_filetest2);
				});

			});

			it("should check missing value", () => {
				assert.throws(() => { fs.copy(); }, ReferenceError, "check missing value does not throw an error");
				assert.throws(() => { fs.copy("test"); }, ReferenceError, "check missing value does not throw an error");
				assert.throws(() => { fs.copy("test", "test"); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.copy(false, "test", () => {}); }, TypeError, "check invalid value does not throw an error");
				assert.throws(() => { fs.copy("test", false, () => {}); }, TypeError, "check invalid value does not throw an error");
				assert.throws(() => { fs.copy("test", "test", false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.copy("", "test", () => {}); }, Error, "check empty content value does not throw an error");
				assert.throws(() => { fs.copy("test", "", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should check inexistant origin", (done) => {

				fs.copy("rgvservseqrvserv", _filetest, (err) => {
					assert.notStrictEqual(null, err, "wrong \"origin\" file does not generate an error");
					done();
				});

			});

			it("should copy test files", (done) => {

				fs.copy(_filetest, _filetest2, (err) => {

					assert.strictEqual(null, err, "test file cannot be copied");

					fs.readFile(_filetest2, "utf8", (err, content) => {

						assert.strictEqual(null, err, "test file cannot be copied");
						assert.strictEqual("test", content, "test file content cannot be copied");
						done();

					});

				});

			});

		});



		// have to improve tests



		describe("promise", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });

			after(() => {

				return fs.unlinkProm(_filetest).then(() => {
					return fs.unlinkProm(_filetest2);
				});

			});

			it("should check missing value", (done) => {

				fs.copyProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return fs.copyProm("test").then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check invalid value", (done) => {

				fs.copyProm(false, "test").then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					return fs.copyProm("test", false).then(() => {
						done("check invalid value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

						done();

					});

				});

			});

			it("should check empty value", (done) => {

				fs.copyProm("", "test").then(() => {
					done("check empty value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

					return fs.copyProm("test", "").then(() => {
						done("check empty value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

						done();

					});

				});

			});

			it("should check inexistant origin", (done) => {

				fs.copyProm("rgvservseqrvserv", _filetest).then(() => {
					done("wrong \"origin\" file does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

					done();

				});

			});

			it("should copy test files", () => {

				return fs.copyProm(_filetest, _filetest2).then(() => {
					return fs.readFileProm(_filetest2, "utf8");
				}).then((content) => {
					assert.strictEqual("test", content, "test file content cannot be copied");
				});

			});

		});

	});



	/*// have to improve tests



	describe("directoryFilesToString", () => {

		describe("sync", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", () => {
				assert.throws(() => { fs.directoryFilesToStringSync(false); }, Error, "check invalid value does not throw an error");
			});

			it("should concat nothing", () => {
				assert.throws(() => { fs.directoryFilesToStringSync(_dirtestBase); }, Error, "not existing directory cannot be concatened");
			});

			it("should concat test files", () => {
				fs.mkdirpSync(_dirtestBase);
				assert.strictEqual("string", typeof fs.directoryFilesToStringSync(_dirtestBase, "utf8"), "test files cannot be concatened");
			});

		});

		describe("async", () => {

			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.directoryFilesToString(false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.directoryFilesToString(_dirtestBase, (err) => {
					assert.strictEqual("This directory does not exist", err, "not existing directory cannot be concatened");
					done();
				});

			});

			it("should concat test files", (done) => {

				fs.directoryFilesToString(__dirname, (err, data) => {

					assert.strictEqual(null, err, "concat test files generate an error");
					assert.strictEqual("string", typeof data, "test files cannot be concatened");
					done();

				});

			});

		});

		describe("promise", () => {

			let directoryTests = path.join(__dirname, "test"),
				test1 = path.join(directoryTests, "test1.txt"), test2 = path.join(directoryTests, "test2.txt");

			before(() => { return fs.rmdirpProm(directoryTests); });
			after(() => { return fs.rmdirpProm(directoryTests); });

			it("should check invalid value", (done) => {

				fs.directoryFilesToStringProm(false).then(() => {
					assert(false, "check invalid value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.directoryFilesToStringProm(directoryTests).then((data) => {
					assert.strictEqual("", data, "should concat nothing does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "should concat nothing does not generate a valid error");
					done();
				});

			});

			it("should concat test one file", () => {

				return fs.mkdirpProm(directoryTests).then(() => {
					return fs.writeFileProm(test1, "test");
				}).then(() => {
					return fs.directoryFilesToStringProm(directoryTests, "utf8", "<>");
				}).then((data) => {

					assert.strictEqual("string", typeof data, "test files cannot be concatened");
					assert.strictEqual("test", data, "test files cannot be concatened");

				});

			});

			it("should concat test all files", () => {

				return fs.mkdirpProm(directoryTests).then(() => {
					return fs.writeFileProm(test2, "test");
				}).then(() => {
					return fs.directoryFilesToStringProm(directoryTests, "utf8", "<>");
				}).then((data) => {

					assert.strictEqual("string", typeof data, "test files cannot be concatened");
					assert.strictEqual("test<>test", data, "test files cannot be concatened");

				});

			});

		});

	});

	describe("directoryFilesToFile", () => {

		let directoryTests = path.join(__dirname, "test"),
			test1 = path.join(directoryTests, "test1.txt"), test2 = path.join(directoryTests, "test2.txt");

		describe("sync", () => {

			before(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });
			after(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });

			it("should check invalid value", () => {
				assert.throws(() => { fs.directoryFilesToFileSync(false, false); }, Error, "check invalid value does not throw an error");
				assert.throws(() => { fs.directoryFilesToFileSync(directoryTests, false); }, Error, "not existing directory cannot be concatened");
			});

			it("should concat nothing", () => {
				assert.throws(() => { fs.directoryFilesToFileSync(directoryTests, _filetest); }, Error, "not existing directory cannot be concatened");
			});

			it("should concat test files", () => {

				fs.mkdirpSync(directoryTests);
				fs.directoryFilesToFileSync(directoryTests, _filetest);

				assert.strictEqual("string", typeof fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");
				assert.strictEqual("", fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");

			});

		});

		describe("async", () => {

			before(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });
			after(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });

			it("should check invalid value", (done) => {

				fs.directoryFilesToFile(false, false, (err) => {

					assert.notStrictEqual(null, err, "check invalid value does not generate an error");

					fs.directoryFilesToFile(directoryTests, false, (err) => {
						assert.notStrictEqual(null, err, "check invalid value does not generate an error");
						done();
					});

				});

			});

			it("should concat nothing", (done) => {

				fs.directoryFilesToFile(directoryTests, _filetest, (err) => {

					assert.strictEqual("This directory does not exist", err, "not existing directory cannot be concatened");
					done();

				});

			});

			it("should concat test files", (done) => {

				fs.mkdirpProm(directoryTests).then(() => {
					return fs.writeFile(test1, "");
				}).then(() => {

					fs.directoryFilesToFile(directoryTests, _filetest, (err) => {

						assert.strictEqual(null, err, "concat test files generate an error");
						assert.strictEqual("string", typeof fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");
						done();

					});

				}).catch(done);

			});

		});

		describe("promise", () => {

			before(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });
			after(() => { return fs.rmdirpProm(directoryTests).then(() => { return fs.unlinkProm(_filetest); }); });

			it("should check invalid value", (done) => {

				fs.directoryFilesToFileProm(false, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");

					fs.directoryFilesToFileProm(directoryTests, false).then(() => {
						done("check invalid value does not generate an error");
					}).catch((err) => {
						assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
						done();
					});

				});

			});

			it("should concat nothing", (done) => {

				fs.directoryFilesToFileProm(directoryTests, test1).then(() => {
					done("should concat nothing does not generate an error");
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "should concat nothing does not generate a valid error");
					done();
				});

			});

			it("should concat test one file", () => {

				return fs.mkdirpProm(directoryTests).then(() => {
					return fs.writeFileProm(test1, "test");
				}).then(() => {
					return fs.directoryFilesToFileProm(directoryTests, _filetest, "<>");
				}).then(() => {
					return fs.readFileProm(_filetest, "utf8");
				}).then((data) => {
					assert.strictEqual("test", data, "test files cannot be concatened");
				});

			});

			it("should concat test all files", () => {

				fs.mkdirpProm(directoryTests).then(() => {
					return fs.writeFileProm(test2, "test");
				}).then(() => {
					return fs.directoryFilesToFileProm(directoryTests, _filetest, "utf8", "<>");
				}).then((data) => {

					assert.strictEqual("string", typeof data, "test files cannot be concatened");
					assert.strictEqual("test<>test", data, "test files cannot be concatened");

				});

			});

		});

	});

	describe("extractDirectoryRealFiles", () => {

		describe("sync", () => {

			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check type value", () => {
				assert.throws(() => { fs.extractDirectoryRealFilesSync(); }, TypeError, "check missing value does not throw an error");
				assert.throws(() => { fs.extractDirectoryRealFilesSync(false); }, TypeError, "check invalid value does not throw an error");
				assert.throws(() => { fs.extractDirectoryRealFilesSync(_dirtestBase); }, Error, "check type value does not throw an error");
			});
 
			it("should extract nothing", () => {
				fs.mkdirpSync(_dirtestBase);
				assert.deepStrictEqual([], fs.extractDirectoryRealFilesSync(_dirtestBase), "empty directory cannot be extract");
			});

			it("should extract files", () => {
				fs.writeFileSync(path.join(_dirtestBase, "test.txt"), "");
				assert.strictEqual(1, fs.extractDirectoryRealFilesSync(_dirtestBase).length, "test files cannot be extracted");
			});

		});

		describe("async", () => {

			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.extractDirectoryRealFiles(false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should extract nothing", (done) => {

				fs.mkdirp(_dirtestBase, (err) => {

					assert.strictEqual(null, err, "extract nothing generate an error");

					fs.extractDirectoryRealFiles(_dirtestBase, (err, data) => {

						assert.strictEqual(null, err, "extract nothing generate an error");
						assert.deepStrictEqual([], data, "empty directory cannot be extracted");

						done();

					});

				});

			});

			it("should extract files", (done) => {

				fs.writeFile(path.join(_dirtestBase, "test.txt"), "", (err) => {

					assert.strictEqual(null, err, "extract files generate an error");

					fs.extractDirectoryRealFiles(_dirtestBase, (err, data) => {

						assert.strictEqual(null, err, "extract files generate an error");
						assert.strictEqual(1, data.length, "test files cannot be extracted");

						done();

					});

				});

			});

		});

		describe("promise", () => {

			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.extractDirectoryRealFilesProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

			it("should extract nothing", () => {

				return fs.mkdirpProm(_dirtestBase).then(() => {
					return fs.extractDirectoryRealFilesProm(_dirtestBase);
				}).then((data) => {
					assert.deepStrictEqual([], data, "empty directory cannot be extracted");
				});

			});

			it("should extract test files", () => {

				return fs.writeFileProm(path.join(_dirtestBase, "test.txt"), "").then(() => {
					return fs.extractDirectoryRealFilesProm(_dirtestBase);
				}).then((data) => {
					assert.strictEqual(1, data.length, "test files cannot be extracted");
				});

			});

		});

	});

	describe("filesToString", () => {

		describe("sync", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check invalid value", () => {
				assert.throws(() => { fs.filesToStringSync(false); }, Error, "check invalid value does not throw an error");
			});

			it("should concat nothing", () => {
				assert.strictEqual("", fs.filesToStringSync([]), "empty array cannot be concatened");
			});

			it("should concat test files", () => {
				assert.strictEqual("test test test", fs.filesToStringSync([_filetest, _filetest, _filetest], "utf8"), "test files cannot be concatened");
			});

			it("should concat test files with pattern", () => {
				assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", fs.filesToStringSync([_filetest, _filetest, _filetest], "utf8", " -- [{{filename}}] -- "), "test files with pattern cannot be concatened");
			});

		});

		describe("async", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check invalid value", (done) => {

				fs.filesToString(false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.filesToString([], (err, data) => {
					assert.strictEqual(null, err, "concat nothing generate an error");
					assert.strictEqual("", data, "empty array cannot be concatened");
					done();
				});

			});

			it("should concat test files", (done) => {

				fs.filesToString([_filetest, _filetest, _filetest], (err, data) => {
					assert.strictEqual(null, err, "concat test files generate an error");
					assert.strictEqual("test test test", data, "test files cannot be concatened");
					done();
				});

			});

			it("should concat test files with pattern", (done) => {

				fs.filesToString([_filetest, _filetest, _filetest], "utf8", " -- [{{filename}}] -- ", (err, data) => {
					assert.strictEqual(null, err, "concat test files with pattern generate an error");
					assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", data, "test files with pattern cannot be concatened");
					done();
				});

			});

		});

		describe("promise", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check invalid value", (done) => {

				fs.filesToStringProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

			it("should concat nothing", () => {

				return fs.filesToStringProm([]).then((data) => {
					assert.strictEqual("", data, "empty array cannot be concatened");
				});

			});

			it("should concat test files", () => {

				return fs.filesToStringProm([_filetest, _filetest, _filetest]).then((data) => {
					assert.strictEqual("test test test", data, "test files cannot be concatened");
				});

			});

			it("should concat test files with pattern", () => {

				return fs.filesToStringProm([_filetest, _filetest, _filetest], "utf8", " -- [{{filename}}] -- ").then((data) => {
					assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", data, "test files with pattern cannot be concatened");
				});

			});

		});

	});

	describe("filesToFile", () => {

		describe("sync", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest).then(() => { return fs.unlinkProm(_filetest2); }); });

			it("should check invalid value", () => {
				assert.throws(() => { fs.filesToFileSync(false); }, Error, "check type \"files\" value does not throw an error");
				assert.throws(() => { fs.filesToFileSync([], false); }, Error, "check type \"targetPath\" value does not throw an error");
			});

			it("should concat nothing", () => {
				assert.doesNotThrow(() => { fs.filesToFileSync([], _filetest2); }, "empty array cannot be concatened");
			});

			it("should concat test files into a file", () => {

				fs.filesToFileSync([_filetest, _filetest, _filetest], _filetest2);
				assert.strictEqual("test test test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");

			});

			it("should concat test files with pattern into a file", () => {

				fs.unlinkSync(_filetest2);
				fs.filesToFileSync([_filetest, _filetest, _filetest], _filetest2, " -- [{{filename}}] -- ");

				assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");
				
			});

		});

		describe("async", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest).then(() => { return fs.unlinkProm(_filetest2); }); });

			it("should check invalid value", (done) => {

				fs.filesToFile(false, false, (err) => {

					assert.notStrictEqual(null, err, "check type \"files\" value does not throw an error");
					
					fs.filesToFile([], false, (err) => {
						assert.notStrictEqual(null, err, "check type \"targetPath\" value does not throw an error");
						done();
					});

				});

			});

			it("should concat nothing", (done) => {

				fs.filesToFile([], _filetest2, (err) => {

					assert.strictEqual(null, err, "empty array cannot be concatened");
					assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "empty array cannot be concatened");

					done();

				});

			});

			it("should concat test files into a file", (done) => {

				fs.filesToFile([_filetest, _filetest, _filetest], _filetest2, (err) => {

					assert.strictEqual(null, err, "test files cannot be concatened");
					assert.strictEqual("test test test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");

					done();

				});

			}).timeout(2000);

			it("should concat test files with pattern into a file", (done) => {

				fs.filesToFile([_filetest, _filetest, _filetest], _filetest2, " -- [{{filename}}] -- ", (err) => {

					assert.strictEqual(null, err, "test files with pattern cannot be concatened");
					assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");

					done();

				});

			}).timeout(2000);

		});

		describe("promise", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest).then(() => { return fs.unlinkProm(_filetest2); }); });

			it("should check invalid value", (done) => {

				fs.filesToFileProm(false, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual("string", typeof err, "check type \"files\" value does not throw an error");

					fs.filesToFileProm([], false).then(() => {
						done("check invalid value does not generate an error");
					}).catch((err) => {
						assert.notStrictEqual(null, err, "check type \"targetPath\" value does not throw an error");
						done();
					});

				});

			});

			it("should concat nothing", () => {

				return fs.filesToFileProm([], _filetest2).then(() => {
					assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "empty array cannot be concatened");
				});

			});

			it("should concat test files into a file", () => {

				return fs.filesToFileProm([_filetest, _filetest, _filetest], _filetest2).then(() => {
					assert.strictEqual("test test test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");
				});

			});

			it("should concat test files with pattern into a file", () => {

				return fs.filesToFileProm([_filetest, _filetest, _filetest], _filetest2, " -- [{{filename}}] -- ").then(() => {
					assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");
				});

			}).timeout(2000);

		});

	});

	describe("mkdirp", () => {

		describe("sync", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", () => {
				assert.throws(() => { fs.mkdirpSync(false); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.mkdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should create real existing directory", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(__dirname); }, "\"" + __dirname + "\" cannot be created");
			});

			it("should create real new directory", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

		describe("async", () => {

			before(() => { return fs.rmdirpSync(_dirtestBase); });
			after(() => { return fs.rmdirpSync(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.mkdirp(false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.mkdirp("", (err) => {
					assert.notStrictEqual(null, err, "check empty content value does not generate an error");
					done();
				});

			});

			it("should create real existing directory", (done) => {

				fs.mkdirp(__dirname, (err) => {
					assert.strictEqual(null, err, "\"" + __dirname + "\" cannot be created");
					done();
				});

			});

			it("should create real new directory", (done) => {
				
				fs.mkdirp(_dirtest, (err) => {
					assert.strictEqual(null, err, "\"" + _dirtest + "\" cannot be created");
					done();
				});

			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

		describe("promise", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.mkdirpProm(false).then(() => {
					assert(false, "check invalid value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.mkdirpProm("").then(() => {
					assert(false, "check empty content value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check empty content value does not generate a valid error");
					done();
				});

			});

			it("should create real existing directory", () => {
				return fs.mkdirpProm(__dirname);
			});

			it("should create real new directory", () => {
				return fs.mkdirpProm(_dirtest);
			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

	});

	describe("rmdirp", () => {

		describe("sync", () => {

			it("should check invalid value", () => {
				assert.throws(() => { fs.rmdirpSync(false); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.rmdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should delete real new directory", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
				assert.doesNotThrow(() => { fs.rmdirpSync(_dirtestBase); }, "\"" + _dirtestBase + "\" cannot be deleted");
			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

		describe("async", () => {

			it("should check invalid value", (done) => {

				fs.rmdirp(false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.rmdirp("", (err) => {
					assert.notStrictEqual(null, err, "check empty content value does not generate an error");
					done();
				});

			});

			it("should delete real new directory", (done) => {

				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");

				fs.rmdirp(_dirtestBase, (err) => {
					assert.notStrictEqual(null, err, "\"" + _dirtestBase + "\" cannot be deleted");
					done();
				});

			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

		describe("promise", () => {

			it("should check invalid value", (done) => {

				fs.rmdirpProm(false).then(() => {
					assert(false, "check invalid value does not generate an error");
					done();
				}).catch((err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.rmdirpProm(false).then(() => {
					assert(false, "check empty content value does not generate an error");
					done();
				}).catch((err) => {
					assert.notStrictEqual(null, err, "check empty content value does not generate an error");
					done();
				});

			});

			it("should delete real new directory", () => {

				return fs.mkdirpProm(_dirtest).then(() => {
					return fs.rmdirpProm(_dirtestBase);
				});

			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

	});*/

});
