"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _filetest = path.join(_dirtest, "test.txt");

// tests

describe("filesToString", () => {

	before((done) => { fs.mkdir(_dirtest, done); });
	after((done) => { fs.rmdir(_dirtest, done); });

	describe("sync", () => {

		before((done) => { fs.writeFile(_filetest, "test", "utf8", done); });
		after((done) => { fs.unlink(_filetest, done); });

		it("should check missing value", () => {
			assert.throws(() => { fs.filesToStringSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.filesToStringSync(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should concat nothing", () => {
			assert.strictEqual("", fs.filesToStringSync([]), "empty array cannot be concatened");
		});

		it("should concat wrong file", () => {
			assert.throws(() => { fs.filesToStringSync([_filetest + "t"]); }, Error, "concat wrong file does not throw an error");
		});

		it("should concat test files", () => {
			assert.strictEqual("test test test", fs.filesToStringSync([_filetest, _filetest, _filetest], "utf8"), "test files cannot be concatened");
		});

		it("should concat test files with pattern", () => {
			assert.strictEqual(" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test", fs.filesToStringSync([_filetest, _filetest, _filetest], "utf8", " -- [{{filename}}] -- "), "test files with pattern cannot be concatened");
		});

	});

	describe("async", () => {

		before((done) => { fs.writeFile(_filetest, "test", "utf8", done); });
		after((done) => { fs.unlink(_filetest, done); });

		it("should check missing value", () => {
			assert.throws(() => { fs.filesToString(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.filesToString([]); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.filesToString(false, () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.filesToString([], false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should concat nothing", (done) => {

			fs.filesToString([], (err, data) => {
				assert.strictEqual(null, err, "concat nothing generate an error");
				assert.strictEqual("", data, "empty array cannot be concatened");
				done();
			});

		});

		it("should concat wrong file", (done) => {

			fs.filesToString([_filetest + "t"], (err) => {

				assert.strictEqual(true, err instanceof Error, "concat wrong file does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "concat wrong file does not generate a valid error");

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

		before((done) => { fs.writeFile(_filetest, "test", "utf8", done); });
		after((done) => { fs.unlink(_filetest, done); });

		it("should check missing value", (done) => {

			fs.filesToStringProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.filesToStringProm(false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", () => {

			return fs.filesToStringProm([]).then((data) => {
				assert.strictEqual("", data, "empty array cannot be concatened");
			});

		});

		it("should concat wrong file", (done) => {

			fs.filesToStringProm([_filetest + "t"]).then(() => {
				done("concat wrong file does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "concat wrong file does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "concat wrong file value does not generate a valid error");

				done();

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
