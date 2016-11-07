"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _filetest = path.join(_dirtest, "test.txt");

// tests

describe("extractFiles", () => {

	before(() => {

		if (!fs.isDirectorySync(_dirtest)) {
			fs.mkdirSync(_dirtest);
		}

		if (!fs.isFileSync(_filetest)) {
			fs.writeFileSync(_filetest, "test", "utf8");
		}

	});

	after(() => {

		if (fs.isDirectorySync(_dirtest)) {

			if (fs.isFileSync(_filetest)) {
				fs.unlinkSync(_filetest);
			}

			fs.rmdirSync(_dirtest);

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {
			assert.throws(() => { fs.extractFilesSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.extractFilesSync(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.extractFilesSync(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.extractFilesSync("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should extract nothing", () => {

			let lvl2 = path.join(_dirtest, "testlvl2");

			fs.mkdirSync(lvl2);

				assert.deepStrictEqual([], fs.extractFilesSync(lvl2), "empty directory cannot be extract");

			fs.rmdirSync(lvl2);

		});

		it("should extract files", () => {
			assert.strictEqual(1, fs.extractFilesSync(_dirtest).length, "test files cannot be extracted");
		});

	});

	describe("async", () => {

		it("should check missing value", () => {
			assert.throws(() => { fs.extractFiles(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.extractFiles(__dirname); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.extractFiles(false, () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.extractFiles(__dirname, false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.extractFiles("", () => {}); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", (done) => {

			fs.extractFiles("rgvservseqrvserv", (err) => {

				assert.strictEqual(true, err instanceof Error, "check inexistant directory does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check inexistant directory does not generate a valid error");

				done();

			});

		});

		it("should extract nothing", (done) => {

			let lvl2 = path.join(_dirtest, "testlvl2");

			fs.mkdir(lvl2, (err) => {

				assert.strictEqual(null, err, "extract nothing generate an error");

				fs.extractFiles(lvl2, (err, data) => {

					assert.strictEqual(null, err, "extract nothing generate an error");
					assert.deepStrictEqual([], data, "empty directory cannot be extracted");

					fs.rmdir(lvl2, (err) => {

						assert.strictEqual(null, err, "extract nothing generate an error");
						done();

					});

				});

			});

		});

		it("should extract files", (done) => {

			fs.writeFile(path.join(_dirtest, "test.txt"), "", (err) => {

				assert.strictEqual(null, err, "extract files generate an error");

				fs.extractFiles(_dirtest, (err, data) => {

					assert.strictEqual(null, err, "extract files generate an error");
					assert.strictEqual(1, data.length, "test files cannot be extracted");
					assert.strictEqual("test.txt", path.basename(data[0]), "test files cannot be extracted");

					done();

				});

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.extractFilesProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.extractFilesProm(false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.copyFileProm("").then(() => {
				done("check empty value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty value does not generate a valid error");

				done();

			});

		});

		it("should check inexistant directory", (done) => {

			fs.extractFilesProm("rgvservseqrvserv").then(() => {
				done("wrong \"directory\" does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check inexistant directory does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check inexistant directory does not generate a valid error");

				done();

			});

		});

		it("should extract nothing", () => {

			let lvl2 = path.join(_dirtest, "testlvl2");

			return new Promise((resolve, reject) => {

				fs.mkdir(lvl2, (err) => {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});

			}).then(() => {

				return fs.extractFilesProm(lvl2);

			}).then((data) => {

				assert.deepStrictEqual([], data, "empty directory cannot be extracted");

				return new Promise((resolve, reject) => {

					fs.rmdir(lvl2, (err) => {

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

		it("should extract test files", () => {

			return fs.writeFileProm(path.join(_dirtest, "test.txt"), "").then(() => {
				return fs.extractFilesProm(_dirtest);
			}).then((data) => {
				assert.strictEqual(1, data.length, "test files cannot be extracted");
			});

		});

	});

});
