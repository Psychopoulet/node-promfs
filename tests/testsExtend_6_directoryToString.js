"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _dirtest2 = path.join(__dirname, "testlvl2"),
		_filetest = path.join(_dirtest, "test.txt");

// tests

describe("directoryToString", () => {

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

			fs.rmdirSync(_dirtest);

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryToStringSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryToStringSync(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryToStringSync(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.directoryToStringSync("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should concat nothing", () => {
			assert.strictEqual("", fs.directoryToStringSync(_dirtest2), "empty directory cannot be concatened");
		});

		it("should concat test directory files", () => {
			assert.strictEqual("string", typeof fs.directoryToStringSync(_dirtest, "utf8"), "test directory files cannot be concatened");
		});

		it("should concat test directory files with pattern", () => {
			assert.strictEqual(" -- [test.txt] -- test", fs.directoryToStringSync(_dirtest, "utf8", " -- [{{filename}}] -- "), "test directory files with pattern cannot be concatened");
		});

	});

	describe("async", () => {

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryToString(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryToString(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryToString(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.directoryToString("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should concat nothing", (done) => {

			fs.directoryToString(_dirtest2, (err, content) => {

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

			fs.directoryToString(_dirtest, (err, content) => {

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

			fs.directoryToString(_dirtest, "utf8", " -- [{{filename}}] -- ", (err, content) => {

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

		it("should check missing value", (done) => {

			fs.directoryToStringProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryToStringProm(false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", () => {

			return fs.directoryToStringProm(_dirtest2).then((data) => {
				assert.strictEqual("", data, "empty array cannot be concatened");
			});

		});

		it("should concat test directory files", () => {

			return fs.directoryToStringProm(_dirtest).then((data) => {
				assert.strictEqual("test", data, "test directory files cannot be concatened");
			});

		});

		it("should concat test directory files with pattern", () => {

			return fs.directoryToStringProm(_dirtest, "utf8", " -- [{{filename}}] -- ").then((data) => {
				assert.strictEqual(" -- [test.txt] -- test", data, "test directory files with pattern cannot be concatened");
			});

		});

	});

});
