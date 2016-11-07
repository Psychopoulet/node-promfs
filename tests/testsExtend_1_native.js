"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// tests

describe("native", () => {

	describe("isDirectory", () => {

		describe("sync", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isDirectorySync(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isDirectorySync(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isDirectorySync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should check false directory existance", () => {
				assert.doesNotThrow(() => { fs.isDirectorySync("test"); }, Error, "check false directory existance value throw an error");
			});

			it("should check file existance", () => {
				assert.strictEqual(false, fs.isDirectorySync(__filename), "\"" + __filename + "\" is an existing directory");
			});

			it("should check real directory existance", () => {
				assert.strictEqual(true, fs.isDirectorySync(__dirname), "\"" + __dirname + "\" is not an existing directory");
			});

		});

		describe("async", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isDirectory(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isDirectory(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check missing callback", () => {
				assert.throws(() => { fs.isDirectory(__dirname); }, ReferenceError, "check missing callback does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isDirectory("", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should check false directory existance", (done) => {
				
				fs.isDirectory("test", (err) => {
					assert.strictEqual(null, err, "check false directory existance generate an error");
					done();
				});

			});

			it("should check file existance", (done) => {

				fs.isDirectory(__filename, (err, exists) => {

					assert.strictEqual(null, err, "check file existance generate an error");
					assert.strictEqual(false, exists, "\"" + __filename + "\" is an existing directory");

					done();

				});

			});

			it("should check real directory existance", (done) => {

				fs.isDirectory(__dirname, (err, exists) => {

					assert.strictEqual(null, err, "check real directory existance generate an error");
					assert.strictEqual(true, exists, "\"" + __dirname + "\" is not an existing directory");

					done();

				});

			});

		});

		describe("promise", () =>{

			it("should check missing value", (done) => {

				fs.isDirectoryProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check invalid value", (done) => {

				fs.isDirectoryProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {
				
				fs.isDirectoryProm("").then(() => {
					done("check empty content value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check false directory existance", () => {

				return fs.isDirectoryProm("test").then((exists) => {
					assert.strictEqual(false, exists, "\"test\" is an existing directory");
				});

			});

			it("should check file existance", () => {

				return fs.isDirectoryProm(__filename).then((exists) => {
					assert.strictEqual(false, exists, "\"" + __filename + "\" is an existing directory");
				});

			});

			it("should check real directory existance", () => {

				return fs.isDirectoryProm(__dirname).then((exists) => {
					assert.strictEqual(true, exists, "\"" + __dirname + "\" is not an existing directory");
				});

			});

		});

	});

	describe("isFile", () => {

		describe("sync", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isFileSync(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isFileSync(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isFileSync(""); }, Error, "check empty content value does not throw an error");
			});

			it("should check false file existance", () => {
				assert.doesNotThrow(() => { fs.isFileSync("test"); }, Error, "check false file existance throw an error");
			});

			it("should check directory existance", () => {
				assert.strictEqual(false, fs.isFileSync(__dirname), "\"" + __dirname + "\" is an existing file");
			});

			it("should check real file existance", () => {
				assert.strictEqual(true, fs.isFileSync(__filename), "\"" + __filename + "\" is not an existing file");
			});

		});

		describe("async", () => {

			it("should check missing value", () => {
				assert.throws(() => { fs.isFile(); }, ReferenceError, "check missing value does not throw an error");
			});

			it("should check invalid value", () => {
				assert.throws(() => { fs.isFile(false); }, TypeError, "check invalid value does not throw an error");
			});

			it("should check missing callback", () => {
				assert.throws(() => { fs.isFile(__filename); }, ReferenceError, "check missing callback does not throw an error");
			});

			it("should check empty content value", () => {
				assert.throws(() => { fs.isFile("", () => {}); }, Error, "check empty content value does not throw an error");
			});

			it("should check false file existance", (done) => {
				
				fs.isFile("test", (err) => {
					assert.strictEqual(null, err, "check false file existance generate an error");
					done();
				});

			});

			it("should check directory existance", (done) => {

				fs.isFile(__dirname, (err, exists) => {

					assert.strictEqual(null, err, "check directory existance generate an error");
					assert.strictEqual(false, exists, "\"" + __dirname + "\" is an existing file");

					done();

				});

			});

			it("should check real file existance", (done) => {

				fs.isFile(__filename, (err, exists) => {

					assert.strictEqual(null, err, "check real file existance generate an error");
					assert.strictEqual(true, exists, "\"" + __filename + "\" is not an existing file");

					done();

				});

			});

		});

		describe("promise", () =>{

			it("should check missing value", (done) => {

				fs.isFileProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check invalid value", (done) => {

				fs.isFileProm(false).then(() => {
					done("check invalid value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {
				
				fs.isFileProm("").then(() => {
					done("check empty content value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check false directory existance", () => {

				return fs.isFileProm("test").then((exists) => {
					assert.strictEqual(false, exists, "\"test\" is an existing file");
				}).catch((err) => {
					return Promise.reject(err);
				});

			});

			it("should check directory existance", () => {

				return fs.isFileProm(__dirname).then((exists) => {
					assert.strictEqual(false, exists, "\"" + __filename + "\" is an existing file");
				});

			});

			it("should check real file existance", () => {

				return fs.isFileProm(__filename).then((exists) => {
					assert.strictEqual(true, exists, "\"" + __filename + "\" is not an existing file");
				});

			});

		});

	});

});
