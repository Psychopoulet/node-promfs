"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"), _dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
		_filetest = path.join(__dirname, "test.txt"), _filetest2 = path.join(__dirname, "test2.txt");

// tests

describe("rmdirp", () => {

	before(() => {

		if (!fs.isDirectorySync(_dirtestBase)) {
			fs.mkdirSync(_dirtestBase);
		}

	});

	after(() => {

		if (fs.isDirectorySync(_dirtestBase)) {

			if (!fs.isFileSync(_filetest)) {
				fs.unlinkSync(_filetest);
			}

			if (!fs.isFileSync(_filetest2)) {
				fs.unlinkSync(_filetest2);
			}

			fs.rmdirSync(_dirtestBase);

		}

	});

	afterEach(() => {

		if (fs.isDirectorySync(path.join(_dirtestBase, "testlvl2"))) {

			if (fs.isDirectorySync(path.join(_dirtestBase, "testlvl2", "testlvl3"))) {
				
				if (fs.isDirectorySync(_dirtest)) {
					fs.rmdirSync(_dirtest);
				}

				fs.rmdirSync(path.join(_dirtestBase, "testlvl2", "testlvl3"));

			}

			fs.rmdirSync(path.join(_dirtestBase, "testlvl2"));

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {
			assert.throws(() => { fs.rmdirpSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.rmdirpSync(false); }, Error, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.rmdirpSync(""); }, Error, "check empty content value does not throw an error");
		});

		it("should delete real new directory", () => {
			assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
			assert.doesNotThrow(() => { fs.rmdirpSync(_dirtestBase); }, "\"" + _dirtestBase + "\" cannot be deleted");
			assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
		});

	});

	/*describe("async", () => {

		it("should check invalid value", (done) => {

			fs.rmdirp(false, (err) => {
				assert.notStrictEqual(null, err, "check invalid value does not generate an error");
				done();
			});

		});

		it("should check empty content value", (done) => {

			fs.rmdirp("", (err) => {
				assert.notStrictEqual(null, err, "check empty content value does not generate an error");
				done();
			});

		});

		it("should delete real new directory", (done) => {

			assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");

			fs.rmdirp(_dirtestBase, (err) => {
				assert.notStrictEqual(null, err, "\"" + _dirtestBase + "\" cannot be deleted");
				done();
			});

		});

		it("should not detect deleted directory", () => {
			assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
		});

	});

	describe("promise", () => {

		it("should check invalid value", (done) => {

			fs.rmdirpProm(false).then(() => {
				assert(false, "check invalid value does not generate an error");
				done();
			}).catch((err) => {
				assert.notStrictEqual(null, err, "check invalid value does not generate an error");
				done();
			});

		});

		it("should check empty content value", (done) => {

			fs.rmdirpProm(false).then(() => {
				assert(false, "check empty content value does not generate an error");
				done();
			}).catch((err) => {
				assert.notStrictEqual(null, err, "check empty content value does not generate an error");
				done();
			});

		});

		it("should delete real new directory", () => {

			return fs.mkdirpProm(_dirtest).then(() => {
				return fs.rmdirpProm(_dirtestBase);
			});

		});

		it("should not detect deleted directory", () => {
			assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
		});

	});*/

});
