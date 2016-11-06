"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _dirtest2 = path.join(__dirname, "testlvl2"),
		_filetest = path.join(_dirtest, "test.txt"), _filetest2 = path.join(_dirtest, "test2.txt");

// tests

describe("directoryToFile", () => {

	before(() => {

		if (!fs.isDirectorySync(_dirtest)) {
			fs.mkdirSync(_dirtest);
		}

		if (!fs.isFileSync(_filetest)) {
			fs.writeFileSync(_filetest, "test", "utf8");
		}

		if (!fs.isDirectorySync(_dirtest2)) {
			fs.mkdirSync(_dirtest2);
		}

	});

	after(() => {

		if (fs.isDirectorySync(_dirtest2)) {
			fs.rmdirSync(_dirtest2);
		}

		if (fs.isDirectorySync(_dirtest)) {

			if (fs.isFileSync(_filetest)) {
				fs.unlinkSync(_filetest);
			}

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

			fs.rmdirSync(_dirtest);

		}

	});

	describe("sync", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryToFileSync(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.directoryToFileSync("test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryToFileSync(false, "test"); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryToFileSync("test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryToFileSync("", "test"); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.directoryToFileSync("test", ""); }, Error, "check empty content value does not throw an error");
		});

		it("should concat nothing", () => {
			assert.doesNotThrow(() => { fs.directoryToFileSync(_dirtest2, _filetest2); }, Error, "test files cannot be concatened");
			assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");
		});

		it("should concat test files into a file", () => {
			assert.doesNotThrow(() => { fs.directoryToFileSync(_dirtest, _filetest2); }, Error, "test files cannot be concatened");
			assert.strictEqual("test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");
		});

		it("should concat test files with pattern into a file", () => {
			assert.doesNotThrow(() => { fs.directoryToFileSync(_dirtest, _filetest2, " -- [{{filename}}] -- "); }, Error, "test files cannot be concatened");
			assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");
		});

	});

	describe("async", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryToFile(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.directoryToFile("test"); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.directoryToFile("test", "test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryToFile(false, "test", () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryToFile("test", false, () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryToFile("test", "test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryToFile("", "test", () => {}); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.directoryToFile(__dirname, "", () => {}); }, Error, "check empty content value does not throw an error");
		});

		it("should concat nothing", (done) => {
			
			fs.directoryToFile(_dirtest2, _filetest2, (err) => {

				assert.strictEqual(null, err, "empty directory cannot be concatened");
				assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "empty directory cannot be concatened");

				done();
				
			});

		});

		it("should concat test files into a file", (done) => {

			fs.directoryToFile(_dirtest, _filetest2, (err) => {

				assert.strictEqual(null, err, "concat test files generate an error");
				assert.strictEqual("string", typeof fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");
				
				done();
				
			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.directoryToFile(_dirtest, _filetest2, " -- [{{filename}}] -- ", (err) => {

				assert.strictEqual(null, err, "test files with pattern cannot be concatened");
				assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");

				done();

			});

		});

	});

	describe("promise", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", (done) => {

			fs.directoryToFileProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				fs.directoryToFileProm("test").then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryToFileProm(false, "test").then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				fs.directoryToFileProm(__dirname, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

		});

		it("should concat nothing", () => {

			return fs.directoryToFileProm(_dirtest2, _filetest2).then(() => {
				assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "empty directory cannot be concatened");
			});

		});

		it("should concat test files directory into a file", () => {

			return fs.directoryToFileProm(_dirtest, _filetest2).then(() => {
				assert.strictEqual("test", fs.readFileSync(_filetest2, "utf8"), "test files directory cannot be concatened");
			});

		});

		it("should concat test files with pattern into a file", () => {

			return fs.directoryToFileProm(_dirtest, _filetest2, " -- [{{filename}}] -- ").then(() => {

				assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");

			});
			
		});

	});

});
