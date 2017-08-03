"use strict";

// deps

	const { join } = require("path");
	const assert = require("assert");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(__dirname, "testlvl1");
		const FILE_TEST = join(DIR_TESTBASE, "test.txt");
		const FILE_TEST2 = join(DIR_TESTBASE, "test2.txt");
		const FILE_TEST3 = join(DIR_TESTBASE, "test3.txt");

// tests

describe("filesToFile", () => {

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

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

			if (fs.isFileSync(FILE_TEST3)) {
				fs.unlinkSync(FILE_TEST3);
			}

			fs.rmdirSync(DIR_TESTBASE);

		}

	});

	describe("sync", () => {

		afterEach(() => {

			if (fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

			if (fs.isFileSync(FILE_TEST3)) {
				fs.unlinkSync(FILE_TEST3);
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.filesToFileSync();
			}, ReferenceError, "check missing \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToFileSync([]);
			}, ReferenceError, "check missing \"target\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.filesToFileSync(false, __filename);
			}, TypeError, "check invalid \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToFileSync([], false);
			}, TypeError, "check invalid \"target\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.filesToFileSync([], "");
			}, Error, "check empty \"files\" value does not throw an error");

		});

		it("should concat nothing", () => {

			assert.doesNotThrow(() => {
				fs.filesToFileSync([], FILE_TEST2);
			}, "empty array cannot be concatened");

			assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty array cannot be concatened");

		});

		it("should concat test files into a file", () => {

			assert.doesNotThrow(() => {
				fs.filesToFileSync([ FILE_TEST, FILE_TEST, FILE_TEST ], FILE_TEST2);
			}, Error, "test files cannot be concatened");

			assert.strictEqual("test test test", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");

		});

		it("should concat test files with pattern into a file", () => {

			assert.doesNotThrow(() => {
				fs.writeFileSync(FILE_TEST3, "test3", "utf8");
			}, Error, "test files with pattern cannot be concatened");

			assert.doesNotThrow(() => {
				fs.filesToFileSync([ FILE_TEST, FILE_TEST, FILE_TEST3 ], FILE_TEST2, " -- [{{filename}}] -- ");
			}, Error, "test files with pattern cannot be concatened");

			assert.strictEqual(
				" -- [test.txt] -- test -- [test.txt] -- test -- [test3.txt] -- test3",
				fs.readFileSync(FILE_TEST2, "utf8"),
				"test files with pattern cannot be concatened"
			);

		});

	});

	describe("async", () => {

		after(() => {

			if (!fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

			if (fs.isFileSync(FILE_TEST3)) {
				fs.unlinkSync(FILE_TEST3);
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.filesToFile();
			}, ReferenceError, "check missing \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToFile([]);
			}, ReferenceError, "check missing \"target\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.filesToFile(false, __filename);
			}, TypeError, "check invalid \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToFile([], false);
			}, TypeError, "check invalid \"target\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.filesToFile([], "");
			}, Error, "check empty \"files\" value does not throw an error");

		});

		it("should concat nothing", (done) => {

			fs.filesToFile([], FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "empty array cannot be concatened");
				assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty array cannot be concatened");

				done();

			});

		});

		it("should concat wrong file", (done) => {
			fs.filesToFile([ FILE_TEST + "t" ], FILE_TEST2, done);
		});

		it("should concat test files into a file", (done) => {

			fs.filesToFile([ FILE_TEST, FILE_TEST, FILE_TEST ], FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "test files cannot be concatened");
				assert.strictEqual("test test test", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");

				done();

			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.writeFile(FILE_TEST3, "test3", "utf8", (err) => {

				assert.strictEqual(null, err, "test files with pattern cannot be concatened");

				fs.filesToFile([ FILE_TEST, FILE_TEST, FILE_TEST3 ], FILE_TEST2, " -- [{{filename}}] -- ", (_err) => {

					assert.strictEqual(null, _err, "test files with pattern cannot be concatened");

					assert.strictEqual(
						" -- [test.txt] -- test -- [test.txt] -- test -- [test3.txt] -- test3",
						fs.readFileSync(FILE_TEST2, "utf8"),
						"test files with pattern cannot be concatened"
					);

					done();

				});

			});

		});

	});

	describe("promise", () => {

		after(() => {

			if (!fs.isFileSync(FILE_TEST2)) {
				fs.unlinkSync(FILE_TEST2);
			}

			if (fs.isFileSync(FILE_TEST3)) {
				fs.unlinkSync(FILE_TEST3);
			}

		});

		it("should check missing \"files\" value", (done) => {

			fs.filesToFileProm().then(() => {
				done("check missing \"files\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"files\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"files\" value does not generate a valid error");

				fs.filesToFileProm([]).then(() => {
					done("check missing value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof ReferenceError, "check missing \"target\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check missing \"target\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.filesToFileProm(false, false).then(() => {
				done("check invalid \"files\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"files\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"files\" value does not generate a valid error");

				fs.filesToFileProm([], false).then(() => {
					done("check invalid \"target\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof TypeError, "check invalid \"target\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check invalid \"target\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should concat nothing", () => {

			return fs.filesToFileProm([], FILE_TEST2).then(() => {
				assert.strictEqual("", fs.readFileSync(FILE_TEST2, "utf8"), "empty array cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test files into a file", () => {

			return fs.filesToFileProm([ FILE_TEST, FILE_TEST, FILE_TEST ], FILE_TEST2).then(() => {
				assert.strictEqual("test test test", fs.readFileSync(FILE_TEST2, "utf8"), "test files cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.writeFile(FILE_TEST3, "test3", "utf8", (err) => {

				assert.strictEqual(null, err, "concat test files with pattern into a file throws an error");

				fs.filesToFileProm([ FILE_TEST, FILE_TEST, FILE_TEST3 ], FILE_TEST2, " -- [{{filename}}] -- ").then(() => {

					assert.strictEqual(
						" -- [test.txt] -- test -- [test.txt] -- test -- [test3.txt] -- test3",
						fs.readFileSync(FILE_TEST2, "utf8"),
						"test files with pattern cannot be concatened"
					);

					done();

				}).catch(done);

			});

		});

	});

});
