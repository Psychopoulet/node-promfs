"use strict";

// deps

	const path = require("path");
	const assert = require("assert");

	const fs = require(path.join(__dirname, "..", "dist", "main.js"));

// consts

	const DIR_TESTBASE = path.join(__dirname, "testlvl1");
	const DIR_TESTBASE2 = path.join(__dirname, "testlvl2");
	const FILE_TEST = path.join(DIR_TESTBASE, "test.txt");
	const FILE_TEST2 = path.join(DIR_TESTBASE, "test2.txt");

// tests

describe("directoryToFile", () => {

	before(() => {

		if (!fs.isDirectorySync(DIR_TESTBASE)) {
			fs.mkdirSync(DIR_TESTBASE);
		}

		if (!fs.isFileSync(FILE_TEST)) {
			fs.writeFileSync(FILE_TEST, "test", "utf8");
		}

		if (!fs.isDirectorySync(DIR_TESTBASE2)) {
			fs.mkdirSync(DIR_TESTBASE2);
		}

	});

	after(() => {

		if (fs.isDirectorySync(DIR_TESTBASE2)) {
			fs.rmdirSync(DIR_TESTBASE2);
		}

		if (fs.isDirectorySync(DIR_TESTBASE)) {

			if (fs.isFileSync(FILE_TEST)) {
				fs.unlinkSync(FILE_TEST);
			}

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

			fs.rmdirSync(DIR_TESTBASE);

		}

	});

	describe("sync", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToFileSync();
			}, ReferenceError, "check missing value does not throw an error");

			assert.throws(() => {
				fs.directoryToFileSync(__dirname);
			}, ReferenceError, "check missing value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToFileSync(false, __filename);
			}, TypeError, "check invalid value does not throw an error");

			assert.throws(() => {
				fs.directoryToFileSync(__dirname, false);
			}, TypeError, "check invalid value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.directoryToFileSync("", __filename);
			}, Error, "check empty content value does not throw an error");

			assert.throws(() => {
				fs.directoryToFileSync(__dirname, "");
			}, Error, "check empty content value does not throw an error");

		});

		it("should concat nothing", () => {

			assert.doesNotThrow(() => {
				fs.directoryToFileSync(DIR_TESTBASE2, FILE_TEST2);
			}, Error, "test files cannot be concatened");

			assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");

		});

		it("should concat test files into a file", () => {

			assert.doesNotThrow(() => {
				fs.directoryToFileSync(DIR_TESTBASE, FILE_TEST2);
			}, Error, "test files cannot be concatened");

			assert.strictEqual("test", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");

		});

		it("should concat test files with pattern into a file", () => {

			assert.doesNotThrow(() => {
				fs.directoryToFileSync(DIR_TESTBASE, FILE_TEST2, " -- [{{filename}}] -- ");
			}, Error, "test files cannot be concatened");

			assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(FILE_TEST2, "utf8"), "test files with pattern cannot be concatened");

		});

	});

	describe("async", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToFile();
			}, ReferenceError, "check missing value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname);
			}, ReferenceError, "check missing value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, __filename);
			}, ReferenceError, "check missing value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToFile(false, __filename, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, __filename, false);
			}, TypeError, "check invalid value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.directoryToFile("", __filename, () => {
					// nothing to do here
				});
			}, Error, "check empty content value does not throw an error");

			assert.throws(() => {
				fs.directoryToFile(__dirname, "", () => {
					// nothing to do here
				});
			}, Error, "check empty content value does not throw an error");

		});

		it("should concat nothing", (done) => {

			fs.directoryToFile(DIR_TESTBASE2, FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "empty directory cannot be concatened");
				assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty directory cannot be concatened");

				done();

			});

		});

		it("should concat test files into a file", (done) => {

			fs.directoryToFile(DIR_TESTBASE, FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "concat test files generate an error");
				assert.strictEqual("string", typeof fs.readFileSync(FILE_TEST, "utf8"), "test files cannot be concatened");

				done();

			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.directoryToFile(DIR_TESTBASE, FILE_TEST2, " -- [{{filename}}] -- ", (err) => {

				assert.strictEqual(null, err, "test files with pattern cannot be concatened");
				assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(FILE_TEST2, "utf8"), "test files with pattern cannot be concatened");

				done();

			});

		});

	});

	describe("promise", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

		});

		it("should check missing value", (done) => {

			fs.directoryToFileProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				fs.directoryToFileProm(__dirname).then(() => {
					done("check missing value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check missing value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryToFileProm(false, __filename).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				fs.directoryToFileProm(__dirname, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

		});

		it("should concat nothing", () => {

			return fs.directoryToFileProm(DIR_TESTBASE2, FILE_TEST2).then(() => {
				assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty directory cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test files directory into a file", () => {

			return fs.directoryToFileProm(DIR_TESTBASE, FILE_TEST2).then(() => {
				assert.strictEqual("test", fs.readFileSync(FILE_TEST2, "utf8"), "test files directory cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test files with pattern into a file", () => {

			return fs.directoryToFileProm(DIR_TESTBASE, FILE_TEST2, " -- [{{filename}}] -- ").then(() => {
				assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(FILE_TEST2, "utf8"), "test files with pattern cannot be concatened");
				return Promise.resolve();
			});

		});

	});

});
