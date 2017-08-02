"use strict";

// deps

	const path = require("path");
	const assert = require("assert");

	const fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	const DIR_TESTBASE = path.join(__dirname, "test.txt");
	const FILE_TEST2 = path.join(__dirname, "test2.txt");

// tests

describe("copy", () => {

	before(() => {

		if (!fs.isFileSync(DIR_TESTBASE)) {
			fs.writeFileSync(DIR_TESTBASE, "test", "utf8");
		}

	});

	after(() => {

		if (fs.isFileSync(DIR_TESTBASE)) {
			fs.unlinkSync(DIR_TESTBASE);
		}

		if (fs.isFileSync(FILE_TEST2)) {
			fs.unlinkSync(FILE_TEST2);
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
				fs.copyFileSync();
			}, ReferenceError, "check missing value does not throw an error");

			assert.throws(() => {
				fs.copyFileSync(__filename);
			}, ReferenceError, "check missing value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.copyFileSync(false, __filename);
			}, TypeError, "check invalid value does not throw an error");

			assert.throws(() => {
				fs.copyFileSync(__filename, false);
			}, TypeError, "check invalid value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.copyFileSync("", __filename);
			}, Error, "check empty content value does not throw an error");

			assert.throws(() => {
				fs.copyFileSync(__filename, "");
			}, Error, "check empty content value does not throw an error");

		});

		it("should check inexistant origin", () => {

			assert.throws(() => {
				fs.copyFileSync("rgvservseqrvserv", DIR_TESTBASE);
			}, "wrong \"origin\" file does not throw an error");

		});

		it("should copy test files", () => {

			assert.doesNotThrow(() => {
				fs.copyFileSync(DIR_TESTBASE, FILE_TEST2);
			}, "test file cannot be copied");

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
				fs.copyFile();
			}, ReferenceError, "check missing value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename);
			}, ReferenceError, "check missing value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, __filename);
			}, ReferenceError, "check missing value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.copyFile(false, __filename, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, __filename, false);
			}, TypeError, "check invalid value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				fs.copyFile("", __filename, () => {
					// nothing to do here
				});
			}, Error, "check empty content value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, "", () => {
					// nothing to do here
				});
			}, Error, "check empty content value does not throw an error");

		});

		it("should check inexistant origin", () => {

			assert.throws(() => {
				fs.copyFile("rgvservseqrvserv", DIR_TESTBASE);
			}, "wrong \"origin\" file does not throw an error");

		});

		it("should copy test files", (done) => {

			fs.copyFile(DIR_TESTBASE, FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "test file cannot be copied");

				fs.readFile(FILE_TEST2, "utf8", (_err, content) => {

					assert.strictEqual(null, _err, "test file cannot be copied");
					assert.strictEqual("test", content, "test file content cannot be copied");
					done();

				});

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

			fs.copyFileProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				fs.copyFileProm(__filename).then(() => {
					done("check missing value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check missing value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.copyFileProm(false, __filename).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				fs.copyFileProm(__filename, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

		});

		it("should check empty value", (done) => {

			fs.copyFileProm("", __filename).then(() => {
				done("check empty value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				fs.copyFileProm(__filename, "").then(() => {
					done("check empty value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof Error, "check empty value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check empty value does not generate a valid error");

					done();

				});

			});

		});

		it("should check inexistant origin", (done) => {

			fs.copyFileProm("rgvservseqrvserv", DIR_TESTBASE).then(() => {
				done("wrong \"origin\" file does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				done();

			});

		});

		it("should copy test files", () => {

			return fs.copyFileProm(DIR_TESTBASE, FILE_TEST2).then(() => {

				return new Promise((resolve, reject) => {

					fs.readFile(FILE_TEST2, "utf8", (err, content) => {

						if (err) {
							reject(err);
						}
						else {
							resolve(content);
						}

					});

				});

			}).then((content) => {
				assert.strictEqual("test", content, "test file content cannot be copied");
				return Promise.resolve();
			});

		});

	});

});
