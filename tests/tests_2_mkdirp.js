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
				const DIR_TESTLVL4_WITHOPTIONS = join(DIR_TESTLVL3, "testlvl4withOptions");

// tests

describe("mkdirp", () => {

	before(() => {

		if (!fs.isDirectorySync(DIR_TESTBASE)) {
			fs.mkdirSync(DIR_TESTBASE);
		}

	});

	afterEach(() => {

		if (fs.isDirectorySync(DIR_TESTBASE)) {

			if (fs.isDirectorySync(DIR_TESTLVL2)) {

				if (fs.isDirectorySync(DIR_TESTLVL3)) {

					if (fs.isDirectorySync(DIR_TESTLVL4)) {
						fs.rmdirSync(DIR_TESTLVL4);
					}

					if (fs.isDirectorySync(DIR_TESTLVL4_WITHOPTIONS)) {
						fs.rmdirSync(DIR_TESTLVL4_WITHOPTIONS);
					}

					fs.rmdirSync(DIR_TESTLVL3);

				}

				fs.rmdirSync(DIR_TESTLVL2);

			}

			fs.rmdirSync(DIR_TESTBASE);

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.mkdirpSync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.mkdirpSync(false);
			}, Error, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.mkdirpSync(__dirname, false);
			}, Error, "check invalid \"mode\" value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.mkdirpSync("");
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should create real existing directory", () => {

			const CURRENT_DIRECTORY = __dirname;

			assert.doesNotThrow(() => {
				fs.mkdirpSync(CURRENT_DIRECTORY);
			}, "\"" + CURRENT_DIRECTORY + "\" cannot be created");

			assert.doesNotThrow(() => {
				fs.mkdirpSync(CURRENT_DIRECTORY, 0x755);
			}, "\"" + CURRENT_DIRECTORY + "\" cannot be created");

		});

		it("should create real new directory", () => {

			assert.doesNotThrow(() => {
				fs.mkdirpSync(DIR_TESTLVL4);
			}, "\"" + DIR_TESTLVL4 + "\" cannot be created");

			assert.strictEqual(true, fs.isDirectorySync(DIR_TESTLVL4), "\"" + DIR_TESTLVL4 + "\" was not created");

		});

		it("should create real new directory with option", () => {

			assert.doesNotThrow(() => {
				fs.mkdirpSync(DIR_TESTLVL4_WITHOPTIONS, 0x755);
			}, "\"" + DIR_TESTLVL4_WITHOPTIONS + "\" cannot be created");

			assert.strictEqual(true, fs.isDirectorySync(DIR_TESTLVL4_WITHOPTIONS), "\"" + DIR_TESTLVL4_WITHOPTIONS + "\" was not created");

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.mkdirp();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.mkdirp(__dirname);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.mkdirp(false, () => {
					// nothing to do here
				});
			}, Error, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.mkdirp(__dirname, false);
			}, Error, "check invalid \"callback\" value does not throw an error");

			assert.throws(() => {
				fs.mkdirp(__dirname, false, () => {
					// nothing to do here
				});
			}, Error, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.mkdirp("", () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" content value does not throw an error");

		});

		it("should create real existing directory", (done) => {

			const CURRENT_DIRECTORY = __dirname;

			fs.mkdirp(CURRENT_DIRECTORY, (err) => {

				assert.strictEqual(null, err, "\"" + CURRENT_DIRECTORY + "\" cannot be created");

				fs.mkdirp(__dirname, 0x755, (_err) => {
					assert.strictEqual(null, _err, "\"" + CURRENT_DIRECTORY + "\" cannot be created");
					done();
				});

			});

		});

		it("should create real new directory", (done) => {

			fs.mkdirp(DIR_TESTLVL4, (err) => {

				assert.strictEqual(null, err, "\"" + DIR_TESTLVL4 + "\" cannot be created");

				fs.isDirectory(DIR_TESTLVL4, (_err, exists) => {

					assert.strictEqual(null, _err, "\"" + DIR_TESTLVL4 + "\" cannot be created");
					assert.strictEqual(true, exists, "\"" + DIR_TESTLVL4 + "\" was not created");

					done();

				});

			});

		});

		it("should create real new directory with option", (done) => {

			fs.mkdirp(DIR_TESTLVL4_WITHOPTIONS, 0x755, (err) => {

				assert.strictEqual(null, err, "\"" + DIR_TESTLVL4_WITHOPTIONS + "\" cannot be created");

				fs.isDirectory(DIR_TESTLVL4_WITHOPTIONS, (_err, exists) => {

					assert.strictEqual(null, _err, "\"" + DIR_TESTLVL4_WITHOPTIONS + "\" cannot be created");
					assert.strictEqual(true, exists, "\"" + DIR_TESTLVL4_WITHOPTIONS + "\" was not created");

					done();

				});

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.mkdirpProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value \"directory\" does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.mkdirpProm(false).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check empty content value", (done) => {

			fs.mkdirpProm("").then(() => {
				done("check empty content value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should create real existing directory", () => {
			return fs.mkdirpProm(__dirname);
		});

		it("should create real new directory with option", () => {
			return fs.mkdirpProm(__dirname, 0x755);
		});

		it("should create real new directory", () => {

			return fs.mkdirpProm(DIR_TESTLVL4).then(() => {

				return new Promise((resolve, reject) => {

					fs.isDirectory(DIR_TESTLVL4, (err) => {

						if (err) {
							reject(err);
						}
						else {
							resolve();
						}

					});

				});

			});

		});

		it("should create real new directory with option", () => {

			return fs.mkdirpProm(DIR_TESTLVL4_WITHOPTIONS, 0x755).then(() => {

				return new Promise((resolve, reject) => {

					fs.isDirectory(DIR_TESTLVL4_WITHOPTIONS, (err) => {

						if (err) {
							reject(err);
						}
						else {
							resolve();
						}

					});

				});

			});

		});

	});

});
