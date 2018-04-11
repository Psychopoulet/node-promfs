/*
	eslint no-sync: 0
*/

"use strict";

// deps

	const { join } = require("path");
	const assert = require("assert");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(__dirname, "testlvl1");
	const FILE_TEST = join(__dirname, "test.txt");
	const FILE_TEST2 = join(__dirname, "test2.txt");

// tests

describe("promisification", () => {

	describe("write", () => {

		describe("mkdirProm", () => {

			before(() => {
				return fs.rmdirpProm(DIR_TESTBASE);
			});

			after(() => {
				return fs.rmdirpProm(DIR_TESTBASE);
			});

			it("should check missing value", (done) => {

				fs.mkdirProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.mkdirProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.mkdirProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running with existing directory", () => {
				return fs.mkdirProm(__dirname);
			});

			it("should check normal running", () => {

				return fs.mkdirProm(DIR_TESTBASE).then(() => {
					assert.strictEqual(true, fs.isDirectorySync(DIR_TESTBASE), "test directory cannot be created");
					return Promise.resolve();
				});

			});

		});

		describe("rmdirProm", () => {

			before(() => {
				return fs.mkdirpProm(DIR_TESTBASE);
			});

			after(() => {
				return fs.rmdirpProm(DIR_TESTBASE);
			});

			it("should check missing value", (done) => {

				fs.rmdirProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.rmdirProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.rmdirProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running with non-existing directory", () => {
				return fs.rmdirProm(join(__dirname, "tzgfzefvze"));
			});

			it("should check normal running", () => {

				return fs.rmdirProm(DIR_TESTBASE).then(() => {
					assert.strictEqual(false, fs.isDirectorySync(DIR_TESTBASE), "test directory cannot be deleted");
					return Promise.resolve();
				});

			});

		});

		describe("unlinkProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.unlinkProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.unlinkProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.unlinkProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running with non-existing file", () => {
				return fs.unlinkProm(join(__dirname, "tzgfzefvze.js"));
			});

			it("should check normal running", () => {

				return fs.unlinkProm(FILE_TEST).then(() => {
					assert.strictEqual(false, fs.isFileSync(FILE_TEST), "test file cannot be deleted");
					return Promise.resolve();
				});

			});

		});

	});

	describe("stream", () => {

		describe("closeProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.closeProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.closeProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.closeProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				let fd = null;

				assert.doesNotThrow(() => {
					fd = fs.openSync(FILE_TEST, "a", 755);
				}, Error, "\"after\" function throw an error");

				return fs.closeProm(fd);

			});

		});

		describe("openProm", () => {

			before(() => {
				return fs.unlinkProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.openProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.openProm(FILE_TEST);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.openProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.openProm("", "a").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.openProm(FILE_TEST, "a").then((fd) => {
					fs.closeSync(fd); return Promise.resolve();
				});

			});

			it("should check normal running with mode", () => {

				return fs.openProm(FILE_TEST, "a", 755).then((fd) => {
					fs.closeSync(fd); return Promise.resolve();
				});

			});

		});

		// missing :
		// fchmodProm
		// fchownProm
		// fdatasyncProm
		// fstatProm
		// fsyncProm
		// ftruncateProm
		// futimesProm

	});

	describe("others", () => {

		describe("accessProm", () => {

			it("should check missing value", (done) => {

				fs.accessProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.accessProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.accessProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {
				return fs.accessProm(__filename);
			});

			it("should check normal running with mode", () => {
				return fs.accessProm(__filename, fs.F_OK);
			});

		});

		describe("appendFileProm", () => {

			beforeEach(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			afterEach(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.appendFileProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.appendFileProm(FILE_TEST);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.appendFileProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.appendFileProm(FILE_TEST, {});
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.appendFileProm("", "test").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.appendFileProm(FILE_TEST, "test").then(() => {
					assert.strictEqual("test", fs.readFileSync(FILE_TEST, "utf8"), "test file content cannot be appended");
					return Promise.resolve();
				});

			});

			it("should check normal running with Buffer", () => {

				return fs.appendFileProm(FILE_TEST, Buffer.from("test", "utf8")).then(() => {
					assert.strictEqual("test", fs.readFileSync(FILE_TEST, "utf8"), "test file content cannot be appended");
					return Promise.resolve();
				});

			});

			it("should check normal running with options", () => {

				return fs.appendFileProm(FILE_TEST, "test", "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(FILE_TEST, "utf8"), "test file content cannot be appended");
					return Promise.resolve();
				});

			});

		});

		describe("chmodProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.chmodProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.chmodProm(__filename);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.chmodProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.chmodProm(__filename, false);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.chmodProm("", 1, 1).then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {
				return fs.chmodProm(FILE_TEST, 755);
			});

		});

		describe("chownProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.chownProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.chownProm(__filename);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.chownProm(__filename, 1);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.chownProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.chownProm(__filename, false);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.chownProm(__filename, 1, false);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.chownProm("", 1, 1).then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.lstatProm(FILE_TEST).then((stat) => {
					return fs.chownProm(FILE_TEST, stat.uid, stat.gid);
				});

			});

		});

		describe("readdirProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.readdirProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.readdirProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.readdirProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.readdirProm(__dirname).then((content) => {
					assert.strictEqual("object", typeof content, "check normal running does not generate array");
					return Promise.resolve();
				});

			});

		});

		describe("readFileProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "test");
			});
			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.readFileProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.readFileProm([]).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.readFileProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.readFileProm(FILE_TEST, "utf8").then((content) => {
					assert.strictEqual("test", content, "check normal running does not generate content");
					return Promise.resolve();
				});

			});

		});

		describe("realpathProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.realpathProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.realpathProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.realpathProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.realpathProm(__filename).then((content) => {
					assert.strictEqual(__filename, content, "check normal running does not generate real path");
					return Promise.resolve();
				});

			});

			it("should check normal running with options", () => {

				return fs.realpathProm(__filename, "utf8").then((content) => {
					assert.strictEqual(__filename, content, "check normal running does not generate real path");
					return Promise.resolve();
				});

			});

		});

		describe("renameProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {

				return fs.unlinkProm(FILE_TEST).then(() => {
					return fs.unlinkProm(FILE_TEST2);
				});

			});

			it("should check missing value", (done) => {

				fs.renameProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.renameProm(FILE_TEST);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.renameProm(false, FILE_TEST).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.renameProm(FILE_TEST, false);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.renameProm("", FILE_TEST).then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.renameProm(FILE_TEST, "");
				}).then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {
				return fs.renameProm(FILE_TEST, FILE_TEST2);
			});

		});

		describe("statProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.statProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.statProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.statProm("").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.statProm(__filename).then((data) => {
					assert.strictEqual("object", typeof data, "check normal running does not generate object");
					return Promise.resolve();
				});

			});

		});

		describe("truncateProm", () => {

			before(() => {
				return fs.writeFileProm(FILE_TEST, "test");
			});

			after(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.truncateProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.truncateProm(FILE_TEST);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.truncateProm(false, 5).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.truncateProm(FILE_TEST, false);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.truncateProm("", 5).then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.truncateProm(FILE_TEST, 2).then(() => {
					assert.strictEqual("te", fs.readFileSync(FILE_TEST, "utf8"), "check type value does not generate an error");
					return Promise.resolve();
				});

			});

		});

		describe("writeFileProm", () => {

			beforeEach(() => {
				return fs.unlinkProm(FILE_TEST, "");
			});

			afterEach(() => {
				return fs.unlinkProm(FILE_TEST);
			});

			it("should check missing value", (done) => {

				fs.writeFileProm().then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.writeFileProm(FILE_TEST);
				}).then(() => {
					done(new Error("check missing value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.writeFileProm(false).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.writeFileProm({});
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					return Promise.resolve();

				}).then(() => {
					return fs.writeFileProm(FILE_TEST, false);
				}).then(() => {
					done(new Error("check type value does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.writeFileProm("", "test").then(() => {
					done(new Error("check empty content does not generate an error"));
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.writeFileProm(FILE_TEST, "test", "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(FILE_TEST, "utf8"), "normal running does not write in file");
					return Promise.resolve();
				});

			});

			it("should check normal running with Buffer", () => {

				return fs.writeFileProm(FILE_TEST, Buffer.from("test", "utf8"), "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(FILE_TEST, "utf8"), "normal running does not write in file");
					return Promise.resolve();
				});

			});

		});

		// missing :
		// linkProm
		// lstatProm
		// mkdtempProm
		// utimesProm

	});

});
