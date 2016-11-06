"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");

// tests

describe("copy", () => {

	before(() => {
		
		if (!fs.isFileSync(_filetest)) {
			fs.writeFileSync(_filetest, "test", "utf8");
		}

	});

	after(() => {

		if (fs.isFileSync(_filetest)) {
			fs.unlinkSync(_filetest);
		}

		if (fs.isFileSync(_filetest2)) {
			fs.unlinkSync(_filetest2);
		}

	});

	describe("sync", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.copyFileSync(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.copyFileSync("test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.copyFileSync(false, "test"); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.copyFileSync("test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.copyFileSync("", "test"); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.copyFileSync("test", ""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant origin", () => {
			assert.throws(() => { fs.copyFileSync("rgvservseqrvserv", _filetest); }, "wrong \"origin\" file does not throw an error");
		});

		it("should copy test files", () => {
			assert.doesNotThrow(() => { fs.copyFileSync(_filetest, _filetest2); }, "test file cannot be copied");
		});

	});

	describe("async", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.copyFile(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.copyFile("test"); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.copyFile("test", "test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.copyFile(false, "test", () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.copyFile("test", false, () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.copyFile("test", "test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.copyFile("", "test", () => {}); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.copyFile("test", "", () => {}); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant origin", (done) => {

			fs.copyFile("rgvservseqrvserv", _filetest, (err) => {
				assert.notStrictEqual(null, err, "wrong \"origin\" file does not generate an error");
				done();
			});

		});

		it("should copy test files", (done) => {

			fs.copyFile(_filetest, _filetest2, (err) => {

				assert.strictEqual(null, err, "test file cannot be copied");

				fs.readFile(_filetest2, "utf8", (err, content) => {

					assert.strictEqual(null, err, "test file cannot be copied");
					assert.strictEqual("test", content, "test file content cannot be copied");
					done();

				});

			});

		});

	});

	describe("promise", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", (done) => {

			fs.copyFileProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				return fs.copyFileProm("test").then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.copyFileProm(false, "test").then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				return fs.copyFileProm("test", false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

		});

		it("should check empty value", (done) => {

			fs.copyFileProm("", "test").then(() => {
				done("check empty value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				return fs.copyFileProm("test", "").then(() => {
					done("check empty value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

					done();

				});

			});

		});

		it("should check inexistant origin", (done) => {

			fs.copyFileProm("rgvservseqrvserv", _filetest).then(() => {
				done("wrong \"origin\" file does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				done();

			});

		});

		it("should copy test files", () => {

			return fs.copyFileProm(_filetest, _filetest2).then(() => {

				return new Promise((resolve, reject) => {

					fs.readFile(_filetest2, "utf8", (err, content) => {

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
			});

		});

	});

});
