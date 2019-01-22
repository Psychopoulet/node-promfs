/*
	eslint no-sync: 0
*/

"use strict";

// deps

	// natives
	const assert = require("assert");
	const { spawn } = require("child_process");
	const { homedir } = require("os");
	const { join } = require("path");

	// locals
	const {
		isDirectorySync, isDirectory, isDirectoryProm,
		mkdirProm,
		rmdirpSync, rmdirp, rmdirpProm
	} = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const MAX_TIMEOUT = 30 * 1000;

	const DIR_TESTBASE = join(homedir(), "node-promfs");

// private

	// methods

		/**
		* Init recursive directory
		* @returns {void}
		*/
		function _initRepo () {

			return mkdirProm(DIR_TESTBASE).then(() => {

				return new Promise((resolve, reject) => {

					let result = "";
					spawn("git", [
						"-c",
						"core.quotepath=false",
						"clone",
						"--recursive",
						"--depth",
						"1",
						"git://github.com/Psychopoulet/node-containerpattern.git",
						DIR_TESTBASE
					]).on("error", (err) => {
						result += err.toString("utf8");
					}).on("close", (code) => {
						return code ? reject(new Error(result)) : resolve();
					});

				});

			});

		}

// tests

describe("rmdirp", () => {

	describe("sync", () => {

		it("should init the repo", () => {
			return _initRepo();
		}).timeout(MAX_TIMEOUT);

		it("should check missing value", () => {

			assert.throws(() => {
				rmdirpSync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				rmdirpSync(false);
			}, Error, "check invalid \"directory\" value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				rmdirpSync("");
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should remove real new directory", () => {

			assert.doesNotThrow(() => {
				rmdirpSync(DIR_TESTBASE);
			}, "\"" + DIR_TESTBASE + "\" cannot be removed");

			assert.strictEqual(false, isDirectorySync(DIR_TESTBASE), "\"" + DIR_TESTBASE + "\" was not removed");

		});

	});

	describe("async", () => {

		it("should init the repo", () => {
			return _initRepo();
		}).timeout(MAX_TIMEOUT);

		it("should check missing value", () => {

			assert.throws(() => {
				rmdirp();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				rmdirp(__dirname);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				rmdirp(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				rmdirp(DIR_TESTBASE, false);
			}, TypeError, "check invalid \"directory\" value does not throw an error");

		});

		it("should check empty content value", () => {

			assert.throws(() => {
				rmdirp("", () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" content value does not throw an error");

		});

		it("should remove real new directory", (done) => {

			rmdirp(DIR_TESTBASE, (err) => {

				assert.strictEqual(null, err, "\"" + DIR_TESTBASE + "\" cannot be removed");

				isDirectory(DIR_TESTBASE, (_err, exists) => {

					assert.strictEqual(null, _err, "\"" + DIR_TESTBASE + "\" cannot be removed");
					assert.strictEqual(false, exists, "\"" + DIR_TESTBASE + "\" was not removed");

					done();

				});

			});

		});

	});

	describe("promise", () => {

		it("should init the repo", () => {
			return _initRepo();
		}).timeout(MAX_TIMEOUT);

		it("should check missing value", (done) => {

			rmdirpProm().then(() => {
				done("check missing value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value \"directory\" does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			rmdirpProm(false).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid \"directory\" value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check empty content value", (done) => {

			rmdirpProm("").then(() => {
				done("check empty content value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should remove real new directory", () => {

			return rmdirpProm(DIR_TESTBASE).then(() => {
				return isDirectoryProm(DIR_TESTBASE);
			}).then((exists) => {
				return !exists ? Promise.resolve() : Promise.reject(new Error("real new directory is not removed"));
			});

		});

	});

});
