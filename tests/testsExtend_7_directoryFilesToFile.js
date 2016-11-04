"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _dirtest2 = path.join(__dirname, "testlvl2"),
		_filetest = path.join(_dirtest, "test.txt"), _filetest2 = path.join(_dirtest, "test2.txt");

// tests

describe("directoryFilesToFile", () => {

	before(() => {

		if (!fs.isDirectorySync(_dirtest)) {
			fs.mkdirSync(_dirtest);
		}

		if (!fs.isFileSync(_filetest)) {
			fs.writeFileSync(_filetest, "test", "utf8");
		}

		if (!fs.isDirectorySync(_dirtest2)) {
			fs.mkdirSync(_dirtest2);
		}

	});

	after(() => {

		if (fs.isDirectorySync(_dirtest2)) {
			fs.rmdirSync(_dirtest2);
		}

		if (fs.isDirectorySync(_dirtest)) {

			if (fs.isFileSync(_filetest)) {
				fs.unlinkSync(_filetest);
			}

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

			fs.rmdirSync(_dirtest);

		}

	});

	describe("sync", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryFilesToFileSync(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFileSync("test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToFileSync(false, "test"); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFileSync("test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryFilesToFileSync("", "test"); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFileSync("test", ""); }, Error, "check empty content value does not throw an error");
		});

		it("should concat nothing", () => {
			assert.doesNotThrow(() => { fs.directoryFilesToFileSync(_dirtest2, _filetest2); }, Error, "test files cannot be concatened");
			assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");
		});

		it("should concat test files into a file", () => {
			assert.doesNotThrow(() => { fs.directoryFilesToFileSync(_dirtest, _filetest2); }, Error, "test files cannot be concatened");
			assert.strictEqual("test", fs.readFileSync(_filetest2, "utf8"), "test files cannot be concatened");
		});

		it("should concat test files with pattern into a file", () => {
			assert.doesNotThrow(() => { fs.directoryFilesToFileSync(_dirtest, _filetest2, " -- [{{filename}}] -- "); }, Error, "test files cannot be concatened");
			assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");
		});

	});

	describe("async", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryFilesToFile(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFile("test"); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFile("test", "test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToFile(false, "test", () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFile("test", false, () => {}); }, TypeError, "check invalid value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFile("test", "test", false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryFilesToFile("", "test", () => {}); }, Error, "check empty content value does not throw an error");
			assert.throws(() => { fs.directoryFilesToFile(__dirname, "", () => {}); }, Error, "check empty content value does not throw an error");
		});

		it("should concat nothing", (done) => {
			
			fs.directoryFilesToFile(_dirtest2, _filetest2, (err) => {

				assert.strictEqual(null, err, "empty directory cannot be concatened");
				assert.strictEqual("", fs.readFileSync(_filetest2, "utf8"), "empty directory cannot be concatened");

				done();
				
			});

		});

		it("should concat test files into a file", (done) => {

			fs.directoryFilesToFile(_dirtest, _filetest2, (err) => {

				assert.strictEqual(null, err, "concat test files generate an error");
				assert.strictEqual("string", typeof fs.readFileSync(_filetest, "utf8"), "test files cannot be concatened");
				
				done();
				
			});

		});

		it("should concat test files with pattern into a file", (done) => {

			fs.directoryFilesToFile(_dirtest, _filetest2, " -- [{{filename}}] -- ", (err) => {

				assert.strictEqual(null, err, "test files with pattern cannot be concatened");
				assert.strictEqual(" -- [test.txt] -- test", fs.readFileSync(_filetest2, "utf8"), "test files with pattern cannot be concatened");

				done();

			});

		});

	});

	/*describe("promise", () => {

		afterEach(() => {

			if (fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

		});

		it("should check invalid value", (done) => {

			fs.directoryFilesToFileProm(false, false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");

				fs.directoryFilesToFileProm(directoryTests, false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

		});

		it("should concat nothing", (done) => {

			fs.directoryFilesToFileProm(directoryTests, test1).then(() => {
				done("should concat nothing does not generate an error");
			}).catch((err) => {
				assert.strictEqual("string", typeof err, "should concat nothing does not generate a valid error");
				done();
			});

		});

		it("should concat test one file", () => {

			return fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFileProm(test1, "test");
			}).then(() => {
				return fs.directoryFilesToFileProm(directoryTests, _filetest, "<>");
			}).then(() => {
				return fs.readFileProm(_filetest, "utf8");
			}).then((data) => {
				assert.strictEqual("test", data, "test files cannot be concatened");
			});

		});

		it("should concat test all files", () => {

			fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFileProm(test2, "test");
			}).then(() => {
				return fs.directoryFilesToFileProm(directoryTests, _filetest, "utf8", "<>");
			}).then((data) => {

				assert.strictEqual("string", typeof data, "test files cannot be concatened");
				assert.strictEqual("test<>test", data, "test files cannot be concatened");

			});

		});

	});*/

});
