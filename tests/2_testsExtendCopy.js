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

	describe("sync", () => {

		before((done) => {
			fs.writeFile(_filetest, "test", done);
		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.unlink(_filetest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.copySync(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.copySync("test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.copySync(false, "test"); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.copySync("test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.copySync("", "test"); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.copySync("test", ""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant origin", () => {
			assert.throws(() => { fs.copySync("rgvservseqrvserv", _filetest); }, "wrong \"origin\" file does not throw an error");
		});

		it("should copy test files", () => {
			assert.doesNotThrow(() => { fs.copySync(_filetest, _filetest2); }, "test file cannot be copied");
		});

	});

	describe("async", () => {

		before((done) => {
			fs.writeFile(_filetest, "test", done);
		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.unlink(_filetest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.copy(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.copy("test"); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.copy("test", "test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.copy(false, "test", () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.copy("test", false, () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.copy("test", "test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.copy("", "test", () => {}); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.copy("test", "", () => {}); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant origin", (done) => {

			fs.copy("rgvservseqrvserv", _filetest, (err) => {
				assert.notStrictEqual(null, err, "wrong \"origin\" file does not generate an error");
				done();
			});

		});

		it("should copy test files", (done) => {

			fs.copy(_filetest, _filetest2, (err) => {

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

		before((done) => {
			fs.writeFile(_filetest, "test", done);
		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.unlink(_filetest2, done);
				}

			});

		});

		it("should check missing value", (done) => {

			fs.copyProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				return fs.copyProm("test").then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

		});

		it("should check invalid value", (done) => {

			fs.copyProm(false, "test").then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				return fs.copyProm("test", false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

		});

		it("should check empty value", (done) => {

			fs.copyProm("", "test").then(() => {
				done("check empty value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				return fs.copyProm("test", "").then(() => {
					done("check empty value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

					done();

				});

			});

		});

		it("should check inexistant origin", (done) => {

			fs.copyProm("rgvservseqrvserv", _filetest).then(() => {
				done("wrong \"origin\" file does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				done();

			});

		});

		it("should copy test files", () => {

			return fs.copyProm(_filetest, _filetest2).then(() => {
				return fs.readFileProm(_filetest2, "utf8");
			}).then((content) => {
				assert.strictEqual("test", content, "test file content cannot be copied");
			});

		});

	});

});
