"use strict";

// deps

	const path = require("path");
	const assert = require("assert");

	const fs = require(path.join(__dirname, "..", "lib", "main.js"));

// private

	const FILE_TEST = path.join(__dirname, "test.txt");
	const FILE_TEST2 = path.join(__dirname, "test2.txt");

// tests

describe("copy", () => {

	before(() => {
		fs.writeFileSync(FILE_TEST, "test", "utf8");
	});

	after(() => {

		try {
			fs.unlinkSync(FILE_TEST);
		}
		catch (e) {
			// nothing to do here
		}

	});

	describe("sync", () => {

		after(() => {

			try {
				fs.unlinkSync(FILE_TEST2);
			}
			catch (e) {
				// nothing to do here
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.copyFileSync();
			}, ReferenceError, "check missing \"origin\" value does not throw an error");

			assert.throws(() => {
				fs.copyFileSync(__filename);
			}, ReferenceError, "check missing \"target\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.copyFileSync(false, __filename);
			}, TypeError, "check invalid \"origin\" value does not throw an error");

			assert.throws(() => {
				fs.copyFileSync(__filename, false);
			}, TypeError, "check invalid \"target\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.copyFileSync("", __filename);
			}, Error, "check empty \"origin\" value does not throw an error");

			assert.throws(() => {
				fs.copyFileSync(__filename, "");
			}, Error, "check empty \"target\" value does not throw an error");

		});

		it("should check inexistant origin", () => {

			assert.throws(() => {
				fs.copyFileSync("rgvservseqrvserv", FILE_TEST);
			}, "wrong \"origin\" file does not throw an error");

		});

		it("should copy test files", () => {

			assert.doesNotThrow(() => {
				fs.copyFileSync(FILE_TEST, FILE_TEST2);
			}, "test file cannot be copied");

			assert.strictEqual("test", fs.readFileSync(FILE_TEST2, "utf8"), "copied file has not the right value");

		});

	});

	describe("async", () => {

		after(() => {

			try {
				fs.unlinkSync(FILE_TEST2);
			}
			catch (e) {
				// nothing to do here
			}

		});

		it("should check missing value", () => {

			assert.throws(() => {
				fs.copyFile();
			}, ReferenceError, "check missing \"origin\" value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename);
			}, ReferenceError, "check missing \"target\" value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, __filename);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.copyFile(false, __filename, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"origin\" value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"target\" value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, __filename, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.copyFile("", __filename, () => {
					// nothing to do here
				});
			}, Error, "check empty \"origin\" value does not throw an error");

			assert.throws(() => {
				fs.copyFile(__filename, "", () => {
					// nothing to do here
				});
			}, Error, "check empty \"target\" value does not throw an error");

		});

		it("should check inexistant origin", () => {

			assert.throws(() => {
				fs.copyFile("rgvservseqrvserv", FILE_TEST);
			}, "wrong \"origin\" file does not throw an error");

		});

		it("should copy test files", (done) => {

			fs.copyFile(FILE_TEST, FILE_TEST2, (err) => {

				assert.strictEqual(null, err, "test file cannot be copied");

				fs.readFile(FILE_TEST2, "utf8", (_err, content) => {

					assert.strictEqual(null, _err, "copied file cannot be read");
					assert.strictEqual("test", content, "copied file has not the right value");

					done();

				});

			});

		});

	});

	describe("promise", () => {

		after(() => {

			try {
				fs.unlinkSync(FILE_TEST2);
			}
			catch (e) {
				// nothing to do here
			}

		});

		it("should check missing value", (done) => {

			fs.copyFileProm().then(() => {
				done("check missing \"origin\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"origin\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"origin\" value does not generate a valid error");

				fs.copyFileProm(__filename).then(() => {
					done("check missing \"target\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof ReferenceError, "check missing \"target\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check missing \"target\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.copyFileProm(false, __filename).then(() => {
				done("check invalid \"origin\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"origin\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"origin\" value does not generate a valid error");

				fs.copyFileProm(__filename, false).then(() => {
					done("check invalid \"target\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof TypeError, "check invalid \"target\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check invalid \"target\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should check empty value", (done) => {

			fs.copyFileProm("", __filename).then(() => {
				done("check empty \"origin\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"origin\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"origin\" value does not generate a valid error");

				fs.copyFileProm(__filename, "").then(() => {
					done("check empty \"target\" value does not generate an error");
				}).catch((_err) => {

					assert.strictEqual(true, _err instanceof Error, "check empty \"target\" value does not generate a valid error");
					assert.strictEqual("string", typeof _err.message, "check empty \"target\" value does not generate a valid error");

					done();

				});

			});

		});

		it("should check inexistant origin", (done) => {

			fs.copyFileProm("rgvservseqrvserv", FILE_TEST).then(() => {
				done("wrong \"origin\" file does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "wrong \"origin\" file does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "wrong \"origin\" file does not generate a valid error");

				done();

			});

		});

		it("should copy test files", () => {

			return fs.copyFileProm(FILE_TEST, FILE_TEST2).then(() => {

				return new Promise((resolve) => {

					fs.readFile(FILE_TEST2, "utf8", (err, content) => {

						assert.strictEqual(null, err, "copied file cannot be read");
						assert.strictEqual("test", content, "copied file has not the right value");

						resolve();

					});

				});

			});

		});

	});

});
