"use strict";

// deps

	/*const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"),
			_dirtest = path.join(_dirtestBase, "testlvl2", "testlvl3", "testlvl4"),
		_filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");*/

// tests

describe("extend", () => {

	/*
	
	describe("mkdirp", () => {

		describe("sync", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

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
			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

		describe("async", () => {

			before(() => { return fs.rmdirpSync(_dirtestBase); });
			after(() => { return fs.rmdirpSync(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.mkdirp(false, (err) => {
					assert.notStrictEqual(null, err, "check invalid value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.mkdirp("", (err) => {
					assert.notStrictEqual(null, err, "check empty content value does not generate an error");
					done();
				});

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
					done();
				});

			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

		describe("promise", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check invalid value", (done) => {

				fs.mkdirpProm(false).then(() => {
					assert(false, "check invalid value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check invalid value does not generate a valid error");
					done();
				});

			});

			it("should check empty content value", (done) => {
				
				fs.mkdirpProm("").then(() => {
					assert(false, "check empty content value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check empty content value does not generate a valid error");
					done();
				});

			});

			it("should create real existing directory", () => {
				return fs.mkdirpProm(__dirname);
			});

			it("should create real new directory", () => {
				return fs.mkdirpProm(_dirtest);
			});

			it("should detect created directory", () => {
				assert.strictEqual(true, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not created");
			});

		});

	});

	describe("rmdirp", () => {

		describe("sync", () => {

			it("should check invalid value", () => {
				assert.throws(() => { fs.rmdirpSync(false); }, Error, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.rmdirpSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should delete real new directory", () => {
				assert.doesNotThrow(() => { fs.mkdirpSync(_dirtest); }, "\"" + _dirtest + "\" cannot be created");
				assert.doesNotThrow(() => { fs.rmdirpSync(_dirtestBase); }, "\"" + _dirtestBase + "\" cannot be deleted");
			});

			it("should not detect deleted directory", () => {
				assert.strictEqual(false, fs.isDirectorySync(_dirtest), "\"" + _dirtest + "\" was not deleted");
			});

		});

		describe("async", () => {

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

		});

	});*/

});
