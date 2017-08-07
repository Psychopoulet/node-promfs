"use strict";

// deps

	const assert = require("assert");

	const fs = require(require("path").join(__dirname, "..", "dist", "main.js"));

// tests

describe("isDirectory", () => {

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.isDirectorySync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.isDirectorySync(false);
			}, TypeError, "check invalid \"directory\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.isDirectorySync("");
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should check inexistant directory", () => {

			assert.doesNotThrow(() => {
				fs.isDirectorySync("rgvservseqrvserv");
			}, "directory cannot be tested");

			assert.strictEqual(false, fs.isDirectorySync("rgvservseqrvserv"), "wrong directory test has not the right value");

		});

		it("should check real directory existance", () => {

			assert.doesNotThrow(() => {
				fs.isDirectorySync(__dirname);
			}, "directory cannot be tested");

			assert.strictEqual(true, fs.isDirectorySync(__dirname), "right directory test has not the right value");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.isDirectory();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.isDirectory(__dirname);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.isDirectory(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.isDirectory(__dirname, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.isDirectory("", __dirname, () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should check inexistant directory", (done) => {

			fs.isDirectory("rgvservseqrvserv", (err, exists) => {

				assert.strictEqual(null, err, "directory cannot be tested");
				assert.strictEqual(false, exists, "wrong directory test has not the right value");

				done();

			});

		});

		it("should copy test directorys", (done) => {

			fs.isDirectory(__dirname, (err, exists) => {

				assert.strictEqual(null, err, "directory cannot be tested");
				assert.strictEqual(true, exists, "right directory test has not the right value");

				done();

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.isDirectoryProm().then(() => {
				done("check missing \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"directory\" value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.isDirectoryProm(false, __dirname).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"directory\" value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.isDirectoryProm("", __dirname).then(() => {
				done("check empty \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"directory\" value does not generate a valid error");

				done();

			});

		});

		it("should check inexistant directory", () => {

			return fs.isDirectoryProm("rgvservseqrvserv").then((exists) => {
				assert.strictEqual(false, exists, "wrong directory test has not the right value");
				return Promise.resolve();
			});

		});

		it("should copy test directorys", () => {

			return fs.isDirectoryProm(__dirname).then((exists) => {
				assert.strictEqual(true, exists, "right directory test has not the right value");
				return Promise.resolve();
			});

		});

	});

});
