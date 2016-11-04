"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtest = path.join(__dirname, "testlvl1"), _dirtest2 = path.join(__dirname, "testlvl2"),
		_filetest = path.join(_dirtest, "test.txt");

// tests

describe("directoryFilesToString", () => {

	before((done) => { fs.mkdir(_dirtest, done); });
	after((done) => { fs.rmdir(_dirtest, done); });

	describe("sync", () => {

		before((done) => {

			fs.writeFile(_filetest, "test", "utf8", (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.mkdir(_dirtest2, done);
				}

			});

		});

		after((done) => {

			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.rmdir(_dirtest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryFilesToStringSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToStringSync(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryFilesToStringSync(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.directoryFilesToStringSync("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should concat nothing", () => {
			assert.strictEqual("", fs.directoryFilesToStringSync(_dirtest2), "empty directory cannot be concatened");
		});

		it("should concat test files", () => {
			assert.strictEqual("string", typeof fs.directoryFilesToStringSync(_dirtest, "utf8"), "test files cannot be concatened");
		});

		it("should concat test files with pattern", () => {
			assert.strictEqual(" -- [test.txt] -- test", fs.directoryFilesToStringSync(_dirtest, "utf8", " -- [{{filename}}] -- "), "test files with pattern cannot be concatened");
		});

	});

	describe("async", () => {

		before((done) => {

			fs.writeFile(_filetest, "test", "utf8", (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.mkdir(_dirtest2, done);
				}

			});

		});

		after((done) => {
			
			fs.unlink(_filetest, (err) => {

				if (err) {
					done(err);
				}
				else {
					fs.rmdir(_dirtest2, done);
				}

			});

		});

		it("should check missing value", () => {
			assert.throws(() => { fs.directoryFilesToString(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.directoryFilesToString(false); }, TypeError, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.directoryFilesToString(""); }, Error, "check empty content value does not throw an error");
		});

		it("should check inexistant directory", () => {
			assert.throws(() => { fs.directoryFilesToString("rgvservseqrvserv"); }, "wrong \"directory\" does not throw an error");
		});

		it("should concat nothing", (done) => {

			fs.directoryFilesToString(_dirtest2, (err, content) => {

				if (err) {
					done(err);
				}
				else {

					assert.strictEqual("string", typeof content, "empty directory cannot be concatened");
					assert.strictEqual("", content, "empty directory cannot be concatened");

					done();

				}

			});

		});

		it("should concat test files", (done) => {

			fs.directoryFilesToString(_dirtest, (err, content) => {

				if (err) {
					done(err);
				}
				else {
					
					assert.strictEqual("string", typeof content, "test files cannot be concatened");
					assert.strictEqual("test", content, "test files cannot be concatened");

					done();

				}

			});

		});

		it("should concat test files with pattern", (done) => {

			fs.directoryFilesToString(_dirtest, "utf8", " -- [{{filename}}] -- ", (err, content) => {

				if (err) {
					done(err);
				}
				else {
					
					assert.strictEqual("string", typeof content, "test files with pattern cannot be concatened");
					assert.strictEqual(" -- [test.txt] -- test", content, "test files with pattern cannot be concatened");

					done();

				}

			});

		});

	});

	/*describe("promise", () => {

		before((done) => { fs.writeFile(_filetest, done); });
		after((done) => { fs.unlink(_filetest, done); });

		/*let directoryTests = path.join(__dirname, "test"),
			test1 = path.join(directoryTests, "test1.txt"), test2 = path.join(directoryTests, "test2.txt");

		before(() => { return fs.rmdirpProm(directoryTests); });
		after(() => { return fs.rmdirpProm(directoryTests); });

		it("should check invalid value", (done) => {

			fs.directoryFilesToStringProm(false).then(() => {
				assert(false, "check invalid value does not generate an error");
				done();
			}).catch((err) => {
				assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
				done();
			});

		});

		it("should concat nothing", (done) => {

			fs.directoryFilesToStringProm(directoryTests).then((data) => {
				assert.strictEqual("", data, "should concat nothing does not generate an error");
				done();
			}).catch((err) => {
				assert.strictEqual("string", typeof err, "should concat nothing does not generate a valid error");
				done();
			});

		});

		it("should concat test one file", () => {

			return fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFileProm(test1, "test");
			}).then(() => {
				return fs.directoryFilesToStringProm(directoryTests, "utf8", "<>");
			}).then((data) => {

				assert.strictEqual("string", typeof data, "test files cannot be concatened");
				assert.strictEqual("test", data, "test files cannot be concatened");

			});

		});

		it("should concat test all files", () => {

			return fs.mkdirpProm(directoryTests).then(() => {
				return fs.writeFileProm(test2, "test");
			}).then(() => {
				return fs.directoryFilesToStringProm(directoryTests, "utf8", "<>");
			}).then((data) => {

				assert.strictEqual("string", typeof data, "test files cannot be concatened");
				assert.strictEqual("test<>test", data, "test files cannot be concatened");

			});

		});

	});*/

});
