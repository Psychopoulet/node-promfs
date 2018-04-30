/*
	eslint no-sync: 0
*/

"use strict";

// deps

	const { join } = require("path");
	const assert = require("assert");
	const { Transform } = require("stream");

	const fs = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const DIR_TESTBASE = join(__dirname, "testlvl1");
		const FILE_TEST = join(DIR_TESTBASE, "test.txt");
		const FILE_TEST2 = join(DIR_TESTBASE, "test2.txt");

// tests

describe("directoryToStream", () => {

	before(() => {

		return fs.mkdirProm(DIR_TESTBASE).then(() => {
			return fs.writeFileProm(FILE_TEST, "test", "utf8");
		}).then(() => {
			return fs.writeFileProm(FILE_TEST2, "test2", "utf8");
		});

	});

	after(() => {
		return fs.rmdirpProm(DIR_TESTBASE);
	});

	describe("sync", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToStreamSync();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToStreamSync(false);
			}, TypeError, "check invalid \"directory\" value does not throw an error");

		});

		it("should concat empty directory", () => {

			assert.throws(() => {
				fs.directoryToStreamSync("");
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should concat wrong directory", () => {

			assert.throws(() => {
				fs.directoryToStreamSync(DIR_TESTBASE + "t");
			}, Error, "check invalid \"files\" value does not throw an error");

		});

		it("should concat directory", (done) => {

			const r = fs.directoryToStreamSync(DIR_TESTBASE);

			assert.strictEqual(typeof r, "object", "directory cannot be concatened");
			assert.strictEqual(r instanceof Transform, true, "directory cannot be concatened");

			r.on("close", () => {
				done();
			});

		});

		it("should concat directory with pattern", (done) => {

			const r = fs.directoryToStreamSync(DIR_TESTBASE, " -- [{{filename}}] -- ");

			assert.strictEqual(typeof r, "object", "directory cannot be concatened");
			assert.strictEqual(r instanceof Transform, true, "directory cannot be concatened");

			r.on("close", () => {
				done();
			});

		});

	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.directoryToStream();
			}, ReferenceError, "check missing \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToStream(DIR_TESTBASE);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.directoryToStream(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"directory\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToStream(DIR_TESTBASE, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

			assert.throws(() => {
				fs.directoryToStream(DIR_TESTBASE, false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should concat empty directory", () => {

			assert.throws(() => {
				fs.directoryToStream("", () => {
					// nothing to do here
				});
			}, Error, "check empty \"directory\" value does not throw an error");

		});

		it("should concat wrong directory", (done) => {

			fs.directoryToStream(DIR_TESTBASE + "t", (err) => {

				assert.strictEqual(true, err instanceof Error, "concat wrong directory does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "concat wrong directory does not generate a valid error");

				done();

			});

		});

		it("should concat test directory", (done) => {

			fs.directoryToStream(DIR_TESTBASE, (err, stream) => {

				assert.strictEqual(null, err, "concat test directory generate an error");

				assert.strictEqual("object", typeof stream, "test directory cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "test directory cannot be concatened");

				let data = "";
				stream.once("error", (_err) => {
					done(_err);
				}).on("data", (chunk) => {
					data += chunk.toString("utf8");
				}).once("close", () => {

					assert.strictEqual("test test2", data, "test directory give wrong value");
					done();

				});

			});

		});

		it("should concat test directory with pattern", (done) => {

			fs.directoryToStream(DIR_TESTBASE, " -- [{{filename}}] -- ", (err, stream) => {

				assert.strictEqual(null, err, "concat test directory with pattern generate an error");

				assert.strictEqual("object", typeof stream, "test directory with pattern cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "test directory with pattern cannot be concatened");

				let data = "";
				stream.once("error", (_err) => {
					done(_err);
				}).on("data", (chunk) => {
					data += chunk.toString("utf8");
				}).once("close", () => {

					assert.strictEqual(
						" -- [test.txt] -- test -- [test2.txt] -- test2",
						data,
						"test directory with pattern give wrong value"
					);

					done();

				});

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.directoryToStreamProm().then(() => {
				done("check missing \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.directoryToStreamProm(false).then(() => {
				done("check invalid \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should concat wrong directory", (done) => {

			fs.directoryToStreamProm(DIR_TESTBASE + "t").then(() => {
				done("check wrong \"directory\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof Error, "check wrong directory does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check wrong directory does not generate a valid error");

				done();

			});

		});

		it("should concat test directory", () => {

			return fs.directoryToStreamProm(DIR_TESTBASE).then((stream) => {

				assert.strictEqual("object", typeof stream, "wrong directory cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong directory cannot be concatened");

				return new Promise((resolve, reject) => {

					let data = "";
					stream.once("error", reject).on("data", (chunk) => {
						data += chunk.toString("utf8");
					}).once("close", () => {

						assert.strictEqual(
							"test test2",
							data,
							"test directory cannot be concatened"
						);

						resolve();

					});

				});

			});

		});

		it("should concat test directory with pattern", () => {

			return fs.directoryToStreamProm(DIR_TESTBASE, " -- [{{filename}}] -- ").then((stream) => {

				assert.strictEqual("object", typeof stream, "wrong directory cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong directory cannot be concatened");

				return new Promise((resolve, reject) => {

					let data = "";
					stream.once("error", reject).on("data", (chunk) => {
						data += chunk.toString("utf8");
					}).once("close", () => {

						assert.strictEqual(
							" -- [test.txt] -- test -- [test2.txt] -- test2",
							data,
							"test directory with pattern cannot be concatened"
						);

						resolve();

					});

				});

			});

		});

	});

});
