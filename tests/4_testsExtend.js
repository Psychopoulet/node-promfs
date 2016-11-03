"use strict";

// deps

	/*const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"),
			_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
		_filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");*/

// tests

describe("extend", () => {

	/*

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
