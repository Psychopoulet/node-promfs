"use strict";

// deps

	const assert = require("assert");

	const fs = require(require("path").join(__dirname, "..", "dist", "main.js"));

// tests

describe("isFile", () => {

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.isFileSync();
			}, ReferenceError, "check missing \"file\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.isFileSync(false);
			}, TypeError, "check invalid \"file\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.isFileSync("");
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check inexistant file", () => {

			assert.doesNotThrow(() => {
				fs.isFileSync("rgvservseqrvserv");
			}, "file cannot be tested");

			assert.strictEqual(false, fs.isFileSync("rgvservseqrvserv"), "wrong file test has not the right value");

		});

		it("should check real file existance", () => {

			assert.doesNotThrow(() => {
				fs.isFileSync(__filename);
			}, "file cannot be tested");

			assert.strictEqual(true, fs.isFileSync(__filename), "right file test has not the right value");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.isFile();
			}, ReferenceError, "check missing \"file\" value does not throw an error");

			assert.throws(() => {
				fs.isFile(__filename);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.isFile(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"file\" value does not throw an error");

			assert.throws(() => {
				fs.isFile(__filename, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.isFile("", __filename, () => {
					// nothing to do here
				});
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check inexistant file", (done) => {

			fs.isFile("rgvservseqrvserv", (err, exists) => {

				assert.strictEqual(null, err, "file cannot be tested");
				assert.strictEqual(false, exists, "wrong file test has not the right value");

				done();

			});

		});

		it("should copy test files", (done) => {

			fs.isFile(__filename, (err, exists) => {

				assert.strictEqual(null, err, "file cannot be tested");
				assert.strictEqual(true, exists, "right file test has not the right value");

				done();

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.isFileProm().then(() => {
				done("check missing \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.isFileProm(false, __filename).then(() => {
				done("check invalid \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.isFileProm("", __filename).then(() => {
				done("check empty \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check inexistant file", () => {

			return fs.isFileProm("rgvservseqrvserv").then((exists) => {
				assert.strictEqual(false, exists, "wrong file test has not the right value");
				return Promise.resolve();
			});

		});

		it("should copy test files", () => {

			return fs.isFileProm(__filename).then((exists) => {
				assert.strictEqual(true, exists, "right file test has not the right value");
				return Promise.resolve();
			});

		});

	});

});
