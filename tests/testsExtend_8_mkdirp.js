"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"),
		_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4");

// tests

describe("mkdirp", () => {

	before(() => {

		if (!fs.isDirectorySync(_dirtestBase)) {
			fs.mkdirSync(_dirtestBase);
		}

	});

	after(() => {

		if (fs.isDirectorySync(_dirtestBase)) {
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
			assert.throws(() => { fs.mkdirpSync(); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.mkdirpSync(false); }, Error, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.mkdirpSync(""); }, Error, "check empty content value does not throw an error");
		});

		it("should create real existing directory", () => {
			assert.doesNotThrow(() => { fs.mkdirpSync(__dirname); }, "\"" + __dirname + "\" cannot be created");
		});

		it("should create real new directory", () => {
			assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
			assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
		});

	});

	describe("async", () => {

		it("should check missing value", () => {
			assert.throws(() => { fs.mkdirp(); }, ReferenceError, "check missing value does not throw an error");
			assert.throws(() => { fs.mkdirp("test"); }, ReferenceError, "check missing value does not throw an error");
		});

		it("should check invalid value", () => {
			assert.throws(() => { fs.mkdirp(false, () => {}); }, Error, "check invalid value does not throw an error");
			assert.throws(() => { fs.mkdirp("test", false); }, Error, "check invalid value does not throw an error");
		});

		it("should check empty content value", () => {
			assert.throws(() => { fs.mkdirp("", () => {}); }, Error, "check empty content value does not throw an error");
		});

		it("should create real existing directory", (done) => {

			fs.mkdirp(__dirname, (err) => {
				assert.strictEqual(null, err, "\"" + __dirname + "\" cannot be created");
				done();
			});

		});

		it("should create real new directory", (done) => {
			
			fs.mkdirp(_dirtest, (err) => {

				assert.strictEqual(null, err, "\"" + _dirtest + "\" cannot be created");

				fs.isDirectory(_dirtest, (err, exists) => {

					if (err) {
						done(err);
					}
					else {
						assert.strictEqual(true, exists, "\"" + _dirtest + "\" was not created");
						done();
					}

				});

				
			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.mkdirpProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.mkdirpProm(false).then(() => {
				done("check invalid value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check empty content value", (done) => {
			
			fs.mkdirpProm("").then(() => {
				done("check empty content value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should create real existing directory", () => {
			return fs.mkdirpProm(__dirname);
		});

		it("should create real new directory", () => {

			return fs.mkdirpProm(_dirtest).then(() => {

				return new Promise((resolve, reject) => {

					fs.isDirectory(_dirtest, (err) => {

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

	});

});
