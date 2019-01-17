/*
	eslint no-sync: 0
*/

"use strict";

// deps

	const { join } = require("path");
	const assert = require("assert");
	const { homedir } = require("os");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(homedir(), "testlvl1");
		const FILE_TEST = join(DIR_TESTBASE, "test.txt");
	const DIR_TESTBASE2 = join(homedir(), "testlvl2");

// tests

describe("directoryToString", () => {

	before(() => {

		if (!fs.isDirectorySync(DIR_TESTBASE)) {
			fs.mkdirSync(DIR_TESTBASE);
		}

		if (!fs.isFileSync(FILE_TEST)) {
			fs.writeFileSync(FILE_TEST, "test", "utf8");
		}

		if (!fs.isDirectorySync(DIR_TESTBASE2)) {
			fs.mkdirSync(DIR_TESTBASE2);
		}

	});

	after(() => {

		if (fs.isDirectorySync(DIR_TESTBASE2)) {
			fs.rmdirSync(DIR_TESTBASE2);
		}

		if (fs.isDirectorySync(DIR_TESTBASE)) {

			if (fs.isFileSync(FILE_TEST)) {
				fs.unlinkSync(FILE_TEST);
			}

			fs.rmdirSync(DIR_TESTBASE);

		}

	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToStringSync();
			}, ReferenceError, "check missing \"path\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToStringSync(false);
			}, TypeError, "check invalid \"path\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.directoryToStringSync("");
			}, Error, "check empty \"path\" value does not throw an error");

		});

		it("should check inexistant directory", () => {

			assert.throws(() => {
				fs.directoryToStringSync(join(__dirname, "rgvservseqrvserv"));
			}, "wrong \"directory\" does not throw an error");

		});

		it("should concat nothing", () => {
			assert.strictEqual("", fs.directoryToStringSync(DIR_TESTBASE2), "empty directory cannot be concatened");
		});

		it("should concat test directory files", () => {
			assert.strictEqual("string", typeof fs.directoryToStringSync(DIR_TESTBASE, "utf8"), "test directory files cannot be concatened");
		});

		it("should concat test directory files with pattern", () => {

			assert.strictEqual(
				" -- [test.txt] -- test",
				fs.directoryToStringSync(DIR_TESTBASE, "utf8", " -- [{{filename}}] -- "),
				"test directory files with pattern cannot be concatened"
			);

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToString();
			}, ReferenceError, "check missing \"path\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToString("rgvservseqrvserv");
			}, ReferenceError, "check missing \"path\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToString(false);
			}, TypeError, "check invalid \"path\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToString("rgvservseqrvserv", false);
			}, TypeError, "check missing \"path\" value does not throw an error");

		});

		it("should check empty value", () => {

			assert.throws(() => {
				fs.directoryToString("");
			}, Error, "check empty \"path\" value does not throw an error");

		});

		it("should check inexistant directory", () => {

			assert.throws(() => {
				fs.directoryToString(join(__dirname, "rgvservseqrvserv"));
			}, "wrong \"directory\" does not throw an error");

		});

		it("should concat nothing", (done) => {

			fs.directoryToString(DIR_TESTBASE2, (err, content) => {

				assert.strictEqual(null, err, "empty directory cannot be concatened");
				assert.strictEqual("string", typeof content, "empty directory cannot be concatened");
				assert.strictEqual("", content, "empty directory cannot be concatened");

				done();

			});

		});

		it("should concat test directory files", (done) => {

			fs.directoryToString(DIR_TESTBASE, (err, content) => {

				assert.strictEqual(null, err, "test directory files cannot be concatened");
				assert.strictEqual("string", typeof content, "test directory files cannot be concatened");
				assert.strictEqual("test", content, "test directory files cannot be concatened");

				done();

			});

		});

		it("should concat test directory files with encoding", (done) => {

			fs.directoryToString(DIR_TESTBASE, "utf8", (err, content) => {

				assert.strictEqual(null, err, "test directory files cannot be concatened");
				assert.strictEqual("string", typeof content, "test directory files cannot be concatened");
				assert.strictEqual("test", content, "test directory files cannot be concatened");

				done();

			});

		});

		it("should concat test directory files with pattern", (done) => {

			fs.directoryToString(DIR_TESTBASE, "utf8", " -- [{{filename}}] -- ", (err, content) => {

				assert.strictEqual(null, err, "test directory files with pattern cannot be concatened");
				assert.strictEqual("string", typeof content, "test directory files with pattern cannot be concatened");
				assert.strictEqual(" -- [test.txt] -- test", content, "test directory files with pattern cannot be concatened");

				done();

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.directoryToStringProm().then(() => {
				done("check missing \"path\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"path\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing \"path\" value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryToStringProm(false).then(() => {
				done("check invalid \"path\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"path\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid \"path\" value does not generate a valid error");

				done();

			});

		});

		it("should check empty value", (done) => {

			fs.directoryToStringProm("").then(() => {
				done("check empty \"path\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check empty \"path\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check empty \"path\" value does not generate a valid error");

				done();

			});

		});

		it("should check inexistant directory", (done) => {

			fs.directoryToStringProm(join(__dirname, "rgvservseqrvserv")).then(() => {
				done("wrong \"directory\" does not throw an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "\"wrong \"directory\" does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "\"wrong \"directory\" does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", () => {

			return fs.directoryToStringProm(DIR_TESTBASE2).then((data) => {
				assert.strictEqual("", data, "empty array cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test directory files", () => {

			return fs.directoryToStringProm(DIR_TESTBASE).then((data) => {
				assert.strictEqual("test", data, "test directory files cannot be concatened");
				return Promise.resolve();
			});

		});

		it("should concat test directory files with pattern", () => {

			return fs.directoryToStringProm(DIR_TESTBASE, "utf8", " -- [{{filename}}] -- ").then((data) => {
				assert.strictEqual(" -- [test.txt] -- test", data, "test directory files with pattern cannot be concatened");
				return Promise.resolve();
			});

		});

	});

});
