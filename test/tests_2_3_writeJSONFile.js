/*
	eslint no-sync: 0
*/

"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");
	const { homedir } = require("os");

	// locals
	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const TEST_FILE = join(homedir(), "test.json");

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

				const result = fs.readFileSync(TEST_FILE, "utf8");

				assert.deepStrictEqual("{\"test\":\"\"}", result, "normal running does not return valid data");
				assert.deepStrictEqual({ "test": "" }, JSON.parse(result), "normal running does not return valid data");

				// for code coverage isFileSync / unlinkSync
				fs.writeJSONFileSync(TEST_FILE, { "test": "" });

			}, Error, "check normal running throws an error");

		});

		it("should check normal running with space option", () => {

			assert.doesNotThrow(() => {

				fs.writeJSONFileSync(TEST_FILE, { "test": "" }, null, 2);

				const result = fs.readFileSync(TEST_FILE, "utf8");

				assert.deepStrictEqual("{\n  \"test\": \"\"\n}", result.replace(/\r/g, ""), "normal running does not return valid data");
				assert.deepStrictEqual({ "test": "" }, JSON.parse(result), "normal running does not return valid data");

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

				fs.readFile(TEST_FILE, "utf8", (_err, result) => {

					assert.deepStrictEqual("{\"test\":\"\"}", result, "normal running does not return valid data");
					assert.deepStrictEqual({ "test": "" }, JSON.parse(result), "normal running does not return valid data");

					// for code coverage isFile / unlink
					fs.writeJSONFile(TEST_FILE, { "test": "" }, done);

				});

			});

		});

		it("should check normal running with space option", (done) => {

			fs.writeJSONFile(TEST_FILE, { "test": "" }, (err) => {

				assert.strictEqual(null, err, "check normal running generate an error");

				fs.readFile(TEST_FILE, "utf8", (_err, result) => {

					assert.deepStrictEqual("{\n  \"test\": \"\"\n}", result.replace(/\r/g, ""), "normal running does not return valid data");
					assert.deepStrictEqual({ "test": "" }, JSON.parse(result), "normal running does not return valid data");

					done();

				});

			}, null, 2);

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

				return fs.readFileProm(TEST_FILE, "utf8").then((result) => {

					assert.deepStrictEqual("{\"test\":\"\"}", result, "normal running does not return valid data");
					assert.deepStrictEqual({ "test": "" }, JSON.parse(result), "normal running does not return valid data");

					return Promise.resolve();

				});

			});

		});

		it("should check normal running", () => {

			return fs.writeJSONFileProm(TEST_FILE, { "test": "" }, null, 2).then(() => {

				return fs.readFileProm(TEST_FILE, "utf8").then((result) => {

					assert.deepStrictEqual("{\n  \"test\": \"\"\n}", result.replace(/\r/g, ""), "normal running does not return valid data");
					assert.deepStrictEqual({ "test": "" }, JSON.parse(result), "normal running does not return valid data");

					return Promise.resolve();

				});

			});

		});

	});

});
