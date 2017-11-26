"use strict";

// deps

	const assert = require("assert");
	const { join } = require("path");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const TEST_FILE = join(__dirname, "test.json");

// tests

describe("writeJSONFile", () => {

	afterEach(() => {
		return fs.unlinkProm(TEST_FILE);
	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.writeJSONFileSync();
			}, ReferenceError, "check missing \"file\" value does not throw an error");

			assert.throws(() => {
				fs.writeJSONFileSync("test");
			}, ReferenceError, "check missing \"data\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.writeJSONFileSync(false);
			}, TypeError, "check invalid \"file\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.writeJSONFileSync("");
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check normal running", () => {

			assert.doesNotThrow(() => {

				fs.writeJSONFileSync(TEST_FILE, { "test": "" });

				assert.deepStrictEqual({ "test": "" }, fs.readJSONFileSync(TEST_FILE), "normal running does not return valid data");

				// for code coverage
				fs.writeJSONFileSync(TEST_FILE, { "test": "" });

			}, Error, "check normal running throws an error");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.writeJSONFile();
			}, ReferenceError, "check missing \"file\" value does not throw an error");

			assert.throws(() => {
				fs.writeJSONFile(__filename);
			}, ReferenceError, "check missing \"data\" value does not throw an error");

			assert.throws(() => {
				fs.writeJSONFile(__filename, null);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.writeJSONFile(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"file\" value does not throw an error");

			assert.throws(() => {
				fs.writeJSONFile(__filename, null, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.writeJSONFile("", null, () => {
					// nothing to do here
				});
			}, Error, "check empty \"file\" value does not throw an error");

		});

		it("should check normal running", (done) => {

			fs.writeJSONFile(TEST_FILE, { "test": "" }, (err) => {

				assert.strictEqual(null, err, "check normal running generate an error");

				fs.readJSONFile(TEST_FILE, (_err, data) => {

					assert.strictEqual(null, _err, "check normal running generate an error");
					assert.deepStrictEqual({ "test": "" }, data, "normal running does not return valid data");

					// for code coverage
					fs.writeJSONFile(TEST_FILE, { "test": "" }, done);

				});

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.writeJSONFileProm().then(() => {
				done("check missing \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.writeJSONFileProm(false, null).then(() => {
				done("check invalid \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.writeJSONFileProm("", null).then(() => {
				done("check empty \"file\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"file\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"file\" value does not generate a valid error");

				done();

			});

		});

		it("should check normal running", () => {

			return fs.writeJSONFileProm(TEST_FILE, { "test": "" }).then(() => {

				return fs.readJSONFileProm(TEST_FILE).then((data) => {

					assert.deepStrictEqual({ "test": "" }, data, "normal running does not return valid data");

					return Promise.resolve();

				});

			});

		});

	});

});
