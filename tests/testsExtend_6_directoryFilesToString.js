"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _dirtest2 = path.join(__dirname, "testlvl2"),
		_filetest = path.join(_dirtest, "test.txt");

// tests

describe("directoryFilesToString", () => {

	before((done) => { fs.mkdir(_dirtest, done); });
	after((done) => { fs.rmdir(_dirtest, done); });

	describe("sync", () => {

		before((done) => {

			fs.writeFile(_filetest, "test", "utf8", (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.mkdir(_dirtest2, done);
				}

			});

		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.rmdir(_dirtest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryFilesToStringSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToStringSync(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryFilesToStringSync(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.directoryFilesToStringSync("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should concat nothing", () => {
			assert.strictEqual("", fs.directoryFilesToStringSync(_dirtest2), "empty directory cannot be concatened");
		});

		it("should concat test directory files", () => {
			assert.strictEqual("string", typeof fs.directoryFilesToStringSync(_dirtest, "utf8"), "test directory files cannot be concatened");
		});

		it("should concat test directory files with pattern", () => {
			assert.strictEqual(" -- [test.txt] -- test", fs.directoryFilesToStringSync(_dirtest, "utf8", " -- [{{filename}}] -- "), "test directory files with pattern cannot be concatened");
		});

	});

	describe("async", () => {

		before((done) => {

			fs.writeFile(_filetest, "test", "utf8", (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.mkdir(_dirtest2, done);
				}

			});

		});

		after((done) => {
			
			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.rmdir(_dirtest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryFilesToString(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToString(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryFilesToString(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.directoryFilesToString("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should concat nothing", (done) => {

			fs.directoryFilesToString(_dirtest2, (err, content) => {

				if (err) {
					done(err);
				}
				else {

					assert.strictEqual("string", typeof content, "empty directory cannot be concatened");
					assert.strictEqual("", content, "empty directory cannot be concatened");

					done();

				}

			});

		});

		it("should concat test directory files", (done) => {

			fs.directoryFilesToString(_dirtest, (err, content) => {

				if (err) {
					done(err);
				}
				else {
					
					assert.strictEqual("string", typeof content, "test directory files cannot be concatened");
					assert.strictEqual("test", content, "test directory files cannot be concatened");

					done();

				}

			});

		});

		it("should concat test directory files with pattern", (done) => {

			fs.directoryFilesToString(_dirtest, "utf8", " -- [{{filename}}] -- ", (err, content) => {

				if (err) {
					done(err);
				}
				else {
					
					assert.strictEqual("string", typeof content, "test directory files with pattern cannot be concatened");
					assert.strictEqual(" -- [test.txt] -- test", content, "test directory files with pattern cannot be concatened");

					done();

				}

			});

		});

	});

	describe("promise", () => {

		before((done) => {

			fs.writeFile(_filetest, "test", "utf8", (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.mkdir(_dirtest2, done);
				}

			});

		});

		after((done) => {
			
			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.rmdir(_dirtest2, done);
				}

			});

		});

		it("should check missing value", (done) => {

			fs.directoryFilesToStringProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryFilesToStringProm(false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", () => {

			return fs.directoryFilesToStringProm(_dirtest2).then((data) => {
				assert.strictEqual("", data, "empty array cannot be concatened");
			});

		});

		it("should concat test directory files", () => {

			return fs.directoryFilesToStringProm(_dirtest).then((data) => {
				assert.strictEqual("test", data, "test directory files cannot be concatened");
			});

		});

		it("should concat test directory files with pattern", () => {

			return fs.directoryFilesToStringProm(_dirtest, "utf8", " -- [{{filename}}] -- ").then((data) => {
				assert.strictEqual(" -- [test.txt] -- test", data, "test directory files with pattern cannot be concatened");
			});

		});

	});

});
