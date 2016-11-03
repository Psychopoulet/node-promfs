"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"),
		_filetest = path.join(_dirtest, "test.txt"), _filetest2 = path.join(__dirname, "test2.txt"), _filetest3 = path.join(__dirname, "test3.txt");

// tests

describe("filesToFile", () => {

	before((done) => { fs.mkdir(_dirtest, done); });
	after((done) => { fs.rmdir(_dirtest, done); });

	describe("sync", () => {

		before((done) => {
			fs.writeFile(_filetest, "test", "utf8", done);
		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.unlink(_filetest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.filesToFileSync(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.filesToFileSync([]); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.filesToFileSync(false, []); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.filesToFileSync([], false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should concat nothing", () => {
			assert.doesNotThrow(() => { fs.filesToFileSync([], _filetest2); }, "empty array cannot be concatened");
		});

		it("should concat test files into a file", () => {

			fs.filesToFileSync([_filetest, _filetest, _filetest], _filetest2);
			assert.strictEqual("test test test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");

		});

		it("should concat test files with pattern into a file", () => {

			fs.filesToFileSync([_filetest, _filetest, _filetest], _filetest2, " -- [{{filename}}] -- ");
			assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");
			
		});

	});

	describe("async", () => {

		before((done) => {
			fs.writeFile(_filetest, "test", "utf8", done);
		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.unlink(_filetest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.filesToFile(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.filesToFile([]); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.filesToFile(false, []); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.filesToFile([], false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should concat nothing", (done) => {
			
			fs.filesToFile([], _filetest2, (err) => {

				assert.strictEqual(null, err, "empty array cannot be concatened");
				assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "empty array cannot be concatened");

				done();
				
			});

		});

		it("should concat wrong file", (done) => {

			fs.filesToFile([_filetest + "t"], _filetest2, (err) => {

				assert.strictEqual(true, err instanceof Error, "concat wrong file does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "concat wrong file does not generate a valid error");

				done();

			});

		});

		it("should concat test files into a file", (done) => {

			fs.filesToFile([_filetest, _filetest, _filetest], _filetest2, (err) => {

				assert.strictEqual(null, err, "test files cannot be concatened");
				assert.strictEqual("test test test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");

				done();

			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.writeFile(_filetest3, "test3", "utf8", (err) => {

				assert.strictEqual(null, err, "test files with pattern cannot be concatened");

				fs.filesToFile([_filetest, _filetest, _filetest3], _filetest2, " -- [{{filename}}] -- ", (err) => {

					fs.unlink(_filetest3, (_err) => {

						assert.strictEqual(null, _err, "test files with pattern cannot be concatened");

						assert.strictEqual(null, err, "test files with pattern cannot be concatened");
						assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test3.txt] -- test3", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");

						done();

					});

				});

			});

		});

	});

	describe("promise", () => {

		before((done) => {
			fs.writeFile(_filetest, "test", "utf8", done);
		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.unlink(_filetest2, done);
				}

			});

		});

		it("should check missing value", (done) => {

			fs.filesToFileProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.filesToFileProm(false, false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

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

		it("should concat test files with pattern into a file", (done) => {

			fs.writeFile(_filetest3, "test3", "utf8", (err) => {

				assert.strictEqual(null, err, "concat test files with pattern into a file throws an error");

				fs.filesToFileProm([_filetest, _filetest, _filetest3], _filetest2, " -- [{{filename}}] -- ").then(() => {

					fs.unlink(_filetest3, (_err) => {

						assert.strictEqual(null, _err, "test files with pattern cannot be concatened");

						assert.strictEqual(null, err, "test files with pattern cannot be concatened");
						assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test3.txt] -- test3", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");

						done();

					});

				}).catch(done);

			});


		});

	});

});
