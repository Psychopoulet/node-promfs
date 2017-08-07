"use strict";

// deps

	const { basename, join } = require("path");
	const assert = require("assert");

	const fs = require(join(__dirname, "..", "dist", "main.js"));

// consts

	const DIR_TESTBASE = join(__dirname, "testlvl1");
		const DIR_TESTBASE2 = join(DIR_TESTBASE, "testlvl2");
		const FILE_TEST = join(DIR_TESTBASE, "test.txt");

// tests

describe("extractFile", () => {

	before(() => {

		if (!fs.isDirectorySync(DIR_TESTBASE)) {
			fs.mkdirSync(DIR_TESTBASE);
		}

			if (!fs.isDirectorySync(DIR_TESTBASE2)) {
				fs.mkdirSync(DIR_TESTBASE2);
			}

			if (!fs.isFileSync(FILE_TEST)) {
				fs.writeFileSync(FILE_TEST, "test", "utf8");
			}

	});

	after(() => {

		if (fs.isDirectorySync(DIR_TESTBASE)) {

			if (fs.isDirectorySync(DIR_TESTBASE2)) {
				fs.rmdirSync(DIR_TESTBASE2);
			}

			if (fs.isFileSync(FILE_TEST)) {
				fs.unlinkSync(FILE_TEST);
			}

			fs.rmdirSync(DIR_TESTBASE);

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.extractFilesSync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.extractFilesSync(false);
			}, TypeError, "check invalid \"directory\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.extractFilesSync("");
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should check inexistant directory", () => {

			assert.throws(() => {
				fs.extractFilesSync("rgvservseqrvserv");
			}, "wrong \"directory\" value does not throw an error");

		});

		it("should extract nothing", () => {

			assert.deepStrictEqual([], fs.extractFilesSync(DIR_TESTBASE2), "empty directory cannot be read");

		});

		it("should extract files", () => {

			const data = fs.extractFilesSync(DIR_TESTBASE);

			assert.strictEqual(1, data.length, "test files cannot be extracted");
			assert.strictEqual("test.txt", basename(data[0]), "test files cannot be extracted");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.extractFiles();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.extractFiles(__dirname);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.extractFiles(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.extractFiles(__dirname, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.extractFiles("", () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should check inexistant directory", (done) => {

			fs.extractFiles("rgvservseqrvserv", (err) => {

				assert.strictEqual(true, err instanceof Error, "check inexistant directory does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check inexistant directory does not generate a valid error");

				done();

			});

		});

		it("should extract nothing", (done) => {

			fs.extractFiles(DIR_TESTBASE2, (_err, data) => {

				assert.strictEqual(null, _err, "empty directory cannot be read");
				assert.deepStrictEqual([], data, "empty directory cannot be read");

				done();

			});

		});

		it("should extract files", (done) => {

			fs.extractFiles(DIR_TESTBASE, (_err, data) => {

				assert.strictEqual(null, _err, "extract files generate an error");
				assert.strictEqual(1, data.length, "test files cannot be extracted");
				assert.strictEqual("test.txt", basename(data[0]), "test files cannot be extracted");

				done();

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.extractFilesProm().then(() => {
				done("check missing \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.extractFilesProm(false).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.copyFileProm("").then(() => {
				done("check empty \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				done();

			});

		});

		it("should check inexistant directory", (done) => {

			fs.extractFilesProm("rgvservseqrvserv").then(() => {
				done("wrong \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check inexistant directory does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check inexistant directory does not generate a valid error");

				done();

			});

		});

		it("should extract nothing", () => {

			return fs.extractFilesProm(DIR_TESTBASE2).then((data) => {

				assert.deepStrictEqual([], data, "empty directory cannot be extracted");

				return Promise.resolve();

			});

		});

		it("should extract test files", () => {

			return fs.extractFilesProm(DIR_TESTBASE).then((data) => {

				assert.strictEqual(1, data.length, "test files cannot be extracted");
				assert.strictEqual("test.txt", basename(data[0]), "test files cannot be extracted");

				return Promise.resolve();

			});

		});

	});

});
