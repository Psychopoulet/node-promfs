"use strict";

// deps

	const { join } = require("path");
	const assert = require("assert");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(__dirname, "testlvl1");
		const DIR_TESTLVL2 = join(DIR_TESTBASE, "testlvl2");
			const DIR_TESTLVL3 = join(DIR_TESTLVL2, "testlvl3");
				const DIR_TESTLVL4 = join(DIR_TESTLVL3, "testlvl4");

					const FILE_TESTLVL4 = join(DIR_TESTLVL4, "test.txt");

// tests

describe("rmdirp", () => {

	beforeEach(() => {

		return fs.mkdirpProm(DIR_TESTLVL4).then(() => {
			return fs.writeFileProm(FILE_TESTLVL4, "utf8", "");
		});

	});

	afterEach(() => {

		return fs.unlinkProm(FILE_TESTLVL4).then(() => {
			return fs.rmdirProm(DIR_TESTLVL4);
		}).then(() => {
			return fs.rmdirProm(DIR_TESTLVL3);
		}).then(() => {
			return fs.rmdirProm(DIR_TESTLVL2);
		}).then(() => {
			return fs.rmdirProm(DIR_TESTBASE);
		});

	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.rmdirpSync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.rmdirpSync(false);
			}, Error, "check invalid \"directory\" value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.rmdirpSync("");
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should remove real new directory", () => {

			assert.doesNotThrow(() => {
				fs.rmdirpSync(DIR_TESTBASE);
			}, "\"" + DIR_TESTBASE + "\" cannot be removed");

			assert.strictEqual(false, fs.isDirectorySync(DIR_TESTBASE), "\"" + DIR_TESTBASE + "\" was not removed");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.rmdirp();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.rmdirp(__dirname);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.rmdirp(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.rmdirp(DIR_TESTBASE, false);
			}, TypeError, "check invalid \"directory\" value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.rmdirp("", () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" content value does not throw an error");

		});

		it("should remove real new directory", (done) => {

			fs.rmdirp(DIR_TESTBASE, (err) => {

				assert.strictEqual(null, err, "\"" + DIR_TESTBASE + "\" cannot be removed");

				fs.isDirectory(DIR_TESTBASE, (_err, exists) => {

					assert.strictEqual(null, _err, "\"" + DIR_TESTBASE + "\" cannot be removed");
					assert.strictEqual(false, exists, "\"" + DIR_TESTBASE + "\" was not removed");

					done();

				});

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.rmdirpProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value \"directory\" does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.rmdirpProm(false).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check empty content value", (done) => {

			fs.rmdirpProm("").then(() => {
				done("check empty content value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should remove real new directory", () => {

			return fs.rmdirpProm(DIR_TESTLVL4).then(() => {
				return fs.isDirectoryProm(DIR_TESTLVL4);
			}).then((exists) => {
				return !exists ? Promise.resolve() : Promise.reject(new Error("real new directory is not removed"));
			});

		});

	});

});
