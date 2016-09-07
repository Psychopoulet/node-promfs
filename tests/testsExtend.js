"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"),
			_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
		_filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");

// tests

describe("extend", () => {

	describe("concatFiles", () => {

		describe("sync", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", () => {
				assert.throws(() => { fs.concatFilesSync(false); }, Error, "check type value does not throw an error");
			});

			it("should concat nothing", () => {
				assert.strictEqual("", fs.concatFilesSync([]), "empty array cannot be concatened");
			});

			it("should concat test files", () => {
				assert.strictEqual("test test test", fs.concatFilesSync([_filetest, _filetest, _filetest], "utf8", " "), "test files cannot be concatened");
			});

		});

		describe("async", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.concatFiles(false, (err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.concatFiles([], (err, data) => {
					assert.strictEqual("", data, "empty array cannot be concatened");
					done();
				});

			});

			it("should concat test files", (done) => {

				fs.concatFiles([_filetest, _filetest, _filetest], "utf8", " ", (err, data) => {
					assert.strictEqual("test test test", data, "test files cannot be concatened");
					done();
				});

			});

		});

		describe("promise", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.concatFilesProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate a valid error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.concatFilesProm([]).then((data) => {
					assert.strictEqual("", data, "empty array cannot be concatened");
					done();
				}).catch(done);

			});

			it("should concat test files", (done) => {

				fs.concatFilesProm([_filetest, _filetest, _filetest], "utf8", " ").then((data) => {
					assert.strictEqual("test test test", data, "test files cannot be concatened");
					done();
				}).catch(done);

			});

		});

	});

	describe("concatDirectoryFiles", () => {

		describe("sync", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", () => {
				assert.throws(() => { fs.concatDirectoryFilesSync(false); }, Error, "check type value does not throw an error");
			});

			it("should concat nothing", () => {
				assert.throws(() => { fs.concatDirectoryFilesSync(path.join(__dirname, "zgzfeze")); }, Error, "not existing directory cannot be concatened");
			});

			it("should concat test files", () => {
				assert.strictEqual("string", typeof fs.concatDirectoryFilesSync(__dirname, "utf8"), "test files cannot be concatened");
			});

		});

		describe("async", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.concatDirectoryFiles(false, (err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.concatDirectoryFiles(path.join(__dirname, "zgzfeze"), (err) => {
					assert.strictEqual("This directory does not exist", err, "not existing directory cannot be concatened");
					done();
				});

			});

			it("should concat test files", (done) => {

				fs.concatDirectoryFiles(__dirname, "utf8", " ", (err, data) => {
					assert.strictEqual("string", typeof data, "test files cannot be concatened");
					done();
				});

			});

		});

		describe("promise", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.concatDirectoryFilesProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate a valid error");
					done();
				});

			});

			it("should concat nothing", (done) => {

				fs.concatDirectoryFilesProm(path.join(__dirname, "zgzfeze")).then((data) => {
					assert.strictEqual("", data, "should concat nothing does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "should concat nothing does not generate a valid error");
					done();
				});

			});

			it("should concat test files", (done) => {

				fs.concatDirectoryFilesProm(__dirname, "utf8", " ").then((data) => {
					assert.strictEqual("string", typeof data, "test files cannot be concatened");
					done();
				}).catch(done);

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

			it("should check types values", () => {
				assert.throws(() => { fs.copySync(false); }, Error, "check \"origin\" type value does not throw an error");
				assert.throws(() => { fs.copySync("test", false); }, Error, "check \"target\" type value does not throw an error");
			});

			it("should check inexistant origin", () => {
				assert.throws(() => { fs.copySync("rgvservseqrvserv", _filetest); }, "wrong \"origin\" file does not throw an error");
			});

			it("should copy test files", () => {
				assert.strictEqual(true, fs.copySync(_filetest, _filetest2), "test file cannot be copied");
			});

		});

		describe("async", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });

			after(() => {

				return fs.unlinkProm(_filetest).then(() => {
					return fs.unlinkProm(_filetest2);
				});

			});

			it("should check types values", (done) => {

				fs.copy(false, false, (err) => {

					assert.notStrictEqual(null, err, "check type value does not generate an error");
					
					fs.copy("test", false, (err) => {
						assert.notStrictEqual(null, err, "check type value does not generate an error");
						done();
					});

				});

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
					assert.strictEqual("test", fs.readFileSync(_filetest2, "utf8"), "test file content cannot be copied");
					done();
				});

			});

		});

		describe("promise", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });

			after(() => {

				return fs.unlinkProm(_filetest).then(() => {
					return fs.unlinkProm(_filetest2);
				});

			});

			it("should check types values", (done) => {

				fs.copyProm(false, false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {

					assert.strictEqual("string", typeof err, "check type value does not generate a valid error");

					fs.copyProm("test", false).then(() => {
						assert(false, "check type value does not generate an error");
						done();
					}).catch((err) => {
						assert.strictEqual("string", typeof err, "check type value does not generate a valid error");
						done();
					});

				});

			});

			it("should check inexistant origin", (done) => {

				fs.copyProm("rgvservseqrvserv", _filetest).then(() => {
					assert(false, "wrong \"origin\" file does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "wrong \"origin\" file does not generate a valid error");
					done();
				});

			});

			it("should copy test files", (done) => {

				fs.copyProm(_filetest, _filetest2).then(() => {

					assert.strictEqual("test", fs.readFileSync(_filetest2, "utf8"), "test file content cannot be copied");
					done();

				}).catch(done);

			});

		});

	});

	describe("isFile", () => {

		describe("sync", () => {

			it("should check type value", () => {
				assert.throws(() => { fs.isFileSync(false); }, Error, "check type value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isFileSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should check real content value", () => {
				assert.doesNotThrow(() => { fs.isFileSync("test"); }, Error, "check real content value throw an error");
			});

			it("should check false file existance", () => {
				assert.strictEqual(false, fs.isFileSync(path.join(__dirname, "eivrjeoirvneornv")), "\"" + path.join(__dirname, "eivrjeoirvneornv") + "\" is an existing file");
			});

			it("should check real file existance", () => {
				assert.strictEqual(true, fs.isFileSync(__filename), "\"" + __filename + "\" is not an existing file");
			});

		});

		describe("async", () => {

			it("should check type value", (done) => {

				fs.isFile(false, (err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.isFile("", (err) => {
					assert.notStrictEqual(null, err, "check empty content value does not generate an error");
					done();
				});

			});

			it("should check real content value", (done) => {
				
				fs.isFile("test", (err) => {
					assert.strictEqual(null, err, "check real content value generate an error");
					done();
				});

			});

			it("should check false file existance", (done) => {

				fs.isFile(path.join(__dirname, "eivrjeoirvneornv"), (err, exists) => {
					assert.strictEqual(false, exists, "\"" + path.join(__dirname, "eivrjeoirvneornv") + "\" is an existing file");
					done();
				});

			});

			it("should check real file existance", (done) => {

				fs.isFile(__filename, (err, exists) => {
					assert.strictEqual(true, exists, "\"" + __filename + "\" is not an existing file");
					done();
				});

			});

		});

		describe("promise", () =>{

			it("should check type value", (done) => {

				fs.isFileProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate a valid error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.isFileProm("").then(() => {
					assert(false, "check empty content value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check empty content value does not generate a valid error");
					done();
				});

			});

			it("should check real content value", (done) => {
				
				fs.isFileProm("test").then(() => {
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check real content value does not generate a valid error");
					done();
				});

			});

			it("should check false file existance", (done) => {

				fs.isFileProm(path.join(__dirname, "eivrjeoirvneornv")).then((exists) => {
					assert.strictEqual(false, exists, "\"" + path.join(__dirname, "eivrjeoirvneornv") + "\" is an existing file");
					done();
				}).catch(done);

			});

			it("should check real file existance", (done) => {

				fs.isFileProm(__filename).then((exists) => {
					assert.strictEqual(true, exists, "\"" + __filename + "\" is not an existing file");
					done();
				}).catch(done);

			});

		});

	});

	describe("isDirectory", () => {

		describe("sync", () => {

			it("should check type value", () => {
				assert.throws(() => { fs.isDirectorySync(false); }, Error, "check type value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isDirectorySync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should check real content value", () => {
				assert.doesNotThrow(() => { fs.isDirectorySync("test"); }, Error, "check real content value throw an error");
			});

			it("should check false directory existance", () => {
				assert.strictEqual(false, fs.isDirectorySync(path.join(__dirname, "eivrjeoirvneornv")), "\"" + path.join(__dirname, "eivrjeoirvneornv") + "\" is an existing directory");
			});

			it("should check real directory existance", () => {
				assert.strictEqual(true, fs.isDirectorySync(__dirname), "\"" + __dirname + "\" is not an existing directory");
			});

		});

		describe("async", () => {

			it("should check type value", (done) => {

				fs.isDirectory(false, (err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.isDirectory("", (err) => {
					assert.notStrictEqual(null, err, "check empty content value does not generate an error");
					done();
				});

			});

			it("should check real content value", (done) => {
				
				fs.isDirectory("test", (err) => {
					assert.strictEqual(null, err, "check real content value generate an error");
					done();
				});

			});

			it("should check false directory existance", (done) => {

				fs.isDirectory(path.join(__dirname, "eivrjeoirvneornv"), (err, exists) => {
					assert.strictEqual(false, exists, "\"" + path.join(__dirname, "eivrjeoirvneornv") + "\" is an existing directory");
					done();
				});

			});

			it("should check real directory existance", (done) => {

				fs.isDirectory(__dirname, (err, exists) => {
					assert.strictEqual(true, exists, "\"" + __dirname + "\" is not an existing directory");
					done();
				});

			});

		});

		describe("promise", () =>{

			it("should check type value", (done) => {

				fs.isDirectoryProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate a valid error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.isDirectoryProm("").then(() => {
					assert(false, "check empty content value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check empty content value does not generate a valid error");
					done();
				});

			});

			it("should check real content value", (done) => {
				
				fs.isDirectoryProm("test").then(done).catch((err) => {
					assert.strictEqual("string", typeof err, "check real content value does not generate a valid error");
					done();
				});

			});

			it("should check false directory existance", (done) => {

				fs.isDirectoryProm(path.join(__dirname, "eivrjeoirvneornv")).then((exists) => {
					assert.strictEqual(false, exists, "\"" + path.join(__dirname, "eivrjeoirvneornv") + "\" is an existing directory");
					done();
				}).catch(done);

			});

			it("should check real directory existance", (done) => {

				fs.isDirectoryProm(__dirname).then((exists) => {
					assert.strictEqual(true, exists, "\"" + __dirname + "\" is not an existing directory");
					done();
				}).catch(done);

			});

		});

	});

	describe("mkdirp", () => {

		describe("sync", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check type value", () => {
				assert.throws(() => { fs.mkdirpSync(false); }, Error, "check type value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.mkdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should create real existing directory", () => {
				assert.strictEqual(true, fs.mkdirpSync(__dirname), "\"" + __dirname + "\" cannot be created");
			});

			it("should create real new directory", () => {
				assert.strictEqual(true, fs.mkdirpSync(_dirtest), "\"" + _dirtest + "\" cannot be created");
			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

		describe("async", () => {

			before(() => { return fs.rmdirpSync(_dirtestBase); });
			after(() => { return fs.rmdirpSync(_dirtestBase); });

			it("should check type value", (done) => {

				fs.mkdirp(false, (err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
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

			it("should check type value", (done) => {

				fs.mkdirpProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate a valid error");
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

			it("should check type value", () => {
				assert.throws(() => { fs.rmdirpSync(false); }, Error, "check type value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.rmdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should delete real new directory", () => {
				assert.strictEqual(true, fs.mkdirpSync(_dirtest), "\"" + _dirtest + "\" cannot be created");
				assert.strictEqual(true, fs.rmdirpSync(_dirtestBase), "\"" + _dirtestBase + "\" cannot be deleted");
			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

		describe("async", () => {

			it("should check type value", (done) => {

				fs.rmdirp(false, (err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
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

				assert.strictEqual(true, fs.mkdirpSync(_dirtest), "\"" + _dirtest + "\" cannot be created");

				fs.rmdirp(fs.rmdirpSync(_dirtestBase), (err) => {
					assert.notStrictEqual(null, err, "\"" + _dirtestBase + "\" cannot be deleted");
					done();
				});

			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

		describe("promise", () => {

			it("should check type value", (done) => {

				fs.rmdirpProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.notStrictEqual(null, err, "check type value does not generate an error");
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
				assert.strictEqual(true, fs.mkdirpSync(_dirtest), "\"" + _dirtest + "\" cannot be created");
				return fs.rmdirpProm(_dirtestBase);
			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

	});

});
