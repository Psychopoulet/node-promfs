/*
	eslint no-sync: 0
*/

"use strict";

// deps

	// natives
	const assert = require("assert");

	// locals
	const fs = require(require("path").join(__dirname, "..", "lib", "main.js"));

// tests

describe("readJSONFile", () => {

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.readJSONFileSync();
			}, ReferenceError, "check missing \"file\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.readJSONFileSync(false);
			}, TypeError, "check invalid \"file\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.readJSONFileSync("");
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check inexistant file", () => {

			assert.throws(() => {
				fs.readJSONFileSync("rgvservseqrvserv");
			}, "file cannot be tested");

		});

		it("should check not JSON file", () => {

			assert.throws(() => {
				fs.readJSONFileSync(__filename);
			}, "not JSON file cannot be tested");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.readJSONFile();
			}, ReferenceError, "check missing \"file\" value does not throw an error");

			assert.throws(() => {
				fs.readJSONFile(__filename);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.readJSONFile(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"file\" value does not throw an error");

			assert.throws(() => {
				fs.readJSONFile(__filename, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.readJSONFile("", __filename, () => {
					// nothing to do here
				});
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check inexistant file", (done) => {

			fs.readJSONFile("rgvservseqrvserv", (err) => {

				assert.strictEqual(true, err instanceof Error, "check inexistant \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check inexistant \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should test not JSON file", (done) => {

			fs.readJSONFile(__filename, (err) => {

				assert.strictEqual(true, err instanceof Error, "check not JSON \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check not JSON \"file\" value does not generate a valid error");

				done();

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.readJSONFileProm().then(() => {
				done("check missing \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.readJSONFileProm(false, __filename).then(() => {
				done("check invalid \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.readJSONFileProm("", __filename).then(() => {
				done("check empty \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check inexistant file", (done) => {

			fs.readJSONFileProm("rgvservseqrvserv").then(() => {
				done("check inexistant \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check inexistant \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check inexistant \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should test not JSON file", (done) => {

			fs.readJSONFileProm(__filename).then(() => {
				done("check not JSON \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check not JSON \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check not JSON \"file\" value does not generate a valid error");

				done();

			});

		});

	});

});
