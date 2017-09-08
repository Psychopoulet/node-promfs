"use strict";

// deps

	const { join } = require("path");
	const assert = require("assert");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(__dirname, "testlvl1");
		const FILE_TEST = join(DIR_TESTBASE, "test.txt");

// tests

describe("filesToString", () => {

	before(() => {

		if (!fs.isDirectorySync(DIR_TESTBASE)) {
			fs.mkdirSync(DIR_TESTBASE);
		}

			if (!fs.isFileSync(FILE_TEST)) {
				fs.writeFileSync(FILE_TEST, "test", "utf8");
			}

	});

	after(() => {

		if (fs.isDirectorySync(DIR_TESTBASE)) {

			if (fs.isFileSync(FILE_TEST)) {
				fs.unlinkSync(FILE_TEST);
			}

			fs.rmdirSync(DIR_TESTBASE);

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.filesToStringSync();
			}, ReferenceError, "check missing \"files\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.filesToStringSync(false);
			}, TypeError, "check invalid \"files\" value does not throw an error");

		});

		it("should concat nothing", () => {
			assert.strictEqual("", fs.filesToStringSync([]), "empty array cannot be concatened");
		});

		it("should concat wrong file", () => {
			assert.strictEqual("", fs.filesToStringSync([ FILE_TEST + "t" ]), "concat wrong file does not throw an error");
		});

		it("should concat test files", () => {

			assert.strictEqual(
				"test test test",
				fs.filesToStringSync([ FILE_TEST, FILE_TEST, FILE_TEST ], "utf8"),
				"test files cannot be concatened"
			);

		});

		it("should concat test files with pattern", () => {

			assert.strictEqual(
				" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test",
				fs.filesToStringSync([ FILE_TEST, FILE_TEST, FILE_TEST ], "utf8", " -- [{{filename}}] -- "),
				"test files with pattern cannot be concatened"
			);

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.filesToString();
			}, ReferenceError, "check missing \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToString([]);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.filesToString(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToString([], false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

			assert.throws(() => {
				fs.filesToString([], "utf8", false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should concat nothing", (done) => {

			fs.filesToString([], (err, data) => {

				assert.strictEqual(null, err, "concat nothing generate an error");
				assert.strictEqual("", data, "empty array cannot be concatened");

				done();

			});

		});

		it("should concat wrong file", (done) => {

			fs.filesToString([ FILE_TEST + "t" ], (err) => {

				assert.strictEqual(true, err instanceof Error, "concat wrong file does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "concat wrong file does not generate a valid error");

				done();

			});

		});

		it("should concat test files", (done) => {

			fs.filesToString([ FILE_TEST, FILE_TEST, FILE_TEST ], (err, data) => {

				assert.strictEqual(null, err, "concat test files generate an error");
				assert.strictEqual("test test test", data, "test files cannot be concatened");

				done();

			});

		});

		it("should concat test files with encoding", (done) => {

			fs.filesToString([ FILE_TEST, FILE_TEST, FILE_TEST ], "utf8", (err, data) => {

				assert.strictEqual(null, err, "concat test files generate an error");
				assert.strictEqual("test test test", data, "test files cannot be concatened");

				done();

			});

		});

		it("should concat test files with pattern", (done) => {

			fs.filesToString([ FILE_TEST, FILE_TEST, FILE_TEST ], "utf8", " -- [{{filename}}] -- ", (err, data) => {

				assert.strictEqual(null, err, "concat test files with pattern generate an error");

				assert.strictEqual(
					" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test",
					data,
					"test files with pattern cannot be concatened"
				);

				done();

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.filesToStringProm().then(() => {
				done("check missing \"files\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.filesToStringProm(false).then(() => {
				done("check invalid \"files\" value does not generate an error");
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

			fs.filesToStringProm([ FILE_TEST + "t" ]).then(() => {
				done("concat wrong file does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "concat wrong file does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "concat wrong file value does not generate a valid error");

				done();

			});

		});

		it("should concat test files", () => {

			return fs.filesToStringProm([ FILE_TEST, FILE_TEST, FILE_TEST ]).then((data) => {
				assert.strictEqual("test test test", data, "test files cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test files with pattern", () => {

			return fs.filesToStringProm([ FILE_TEST, FILE_TEST, FILE_TEST ], "utf8", " -- [{{filename}}] -- ").then((data) => {

				assert.strictEqual(
					" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test",
					data,
					"test files with pattern cannot be concatened"
				);

				return Promise.resolve();

			});

		});

	});

});
