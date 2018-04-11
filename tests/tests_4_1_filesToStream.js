/*
	eslint max-nested-callbacks: 0
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

// tests

describe("filesToStream", () => {

	before(() => {

		return fs.mkdirProm(DIR_TESTBASE).then(() => {
			return fs.writeFileProm(FILE_TEST, "test", "utf8");
		});

	});

	after(() => {
		return fs.rmdirpProm(DIR_TESTBASE);
	});

	describe("async", () => {

		it("should check missing value", () => {

			assert.throws(() => {
				fs.filesToStream();
			}, ReferenceError, "check missing \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToStream([]);
			}, ReferenceError, "check missing \"callback\" value does not throw an error");

		});

		it("should check invalid value", () => {

			assert.throws(() => {
				fs.filesToStream(false, () => {
					// nothing to do here
				});
			}, TypeError, "check invalid \"files\" value does not throw an error");

			assert.throws(() => {
				fs.filesToStream([], false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

			assert.throws(() => {
				fs.filesToStream([], false);
			}, TypeError, "check invalid \"callback\" value does not throw an error");

		});

		it("should concat nothing", (done) => {

			assert.doesNotThrow(() => {

				fs.filesToStream([], (err, stream) => {

					assert.strictEqual(null, err, "empty array generate an error");

					assert.strictEqual("object", typeof stream, "empty array cannot be concatened");
					assert.strictEqual(true, stream instanceof Transform, "empty array cannot be concatened");

					stream.once("error", done).once("close", () => {
						done();
					});

				});

			}, TypeError, "empty array cannot be concatened");

		});

		it("should concat wrong file", (done) => {

			fs.filesToStream([ FILE_TEST + "t" ], (err, stream) => {

				assert.strictEqual(null, err, "concat wrong file generate an error");

				assert.strictEqual("object", typeof stream, "wrong file cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong file cannot be concatened");

				let data = "";
				stream.once("error", done).on("data", (chunk) => {
					data += chunk.toString("utf8");
				}).once("close", () => {

					assert.strictEqual("", data, "wrong file give wrong value");
					done();

				});

			});

		});

		it("should concat test files", (done) => {

			fs.filesToStream([ FILE_TEST, FILE_TEST, FILE_TEST ], (err, stream) => {

				assert.strictEqual(null, err, "concat test files generate an error");

				assert.strictEqual("object", typeof stream, "test files cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "test files cannot be concatened");

				let data = "";
				stream.once("error", (_err) => {
					done(_err);
				}).on("data", (chunk) => {
					data += chunk.toString("utf8");
				}).once("close", () => {

					assert.strictEqual("test test test", data, "test files give wrong value");
					done();

				});

			});

		});

		it("should concat test files with pattern", (done) => {

			fs.filesToStream([ FILE_TEST, FILE_TEST, FILE_TEST ], " -- [{{filename}}] -- ", (err, stream) => {

				assert.strictEqual(null, err, "concat test files with pattern generate an error");

				assert.strictEqual("object", typeof stream, "test files with pattern cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "test files with pattern cannot be concatened");

				let data = "";
				stream.once("error", (_err) => {
					done(_err);
				}).on("data", (chunk) => {
					data += chunk.toString("utf8");
				}).once("close", () => {

					assert.strictEqual(
						" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test",
						data,
						"test files with pattern give wrong value"
					);

					done();

				});

			});

		});

	});

	describe("promise", () => {

		it("should check missing value", (done) => {

			fs.filesToStreamProm().then(() => {
				done("check missing \"files\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

				done();

			});

		});

		it("should check invalid value", (done) => {

			fs.filesToStreamProm(false).then(() => {
				done("check invalid \"files\" value does not generate an error");
			}).catch((err) => {

				assert.strictEqual(true, err instanceof TypeError, "check invalid value does not generate a valid error");
				assert.strictEqual("string", typeof err.message, "check invalid value does not generate a valid error");

				done();

			});

		});

		it("should concat nothing", () => {

			return fs.filesToStreamProm([]).then((stream) => {

				assert.strictEqual("object", typeof stream, "wrong file cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong file cannot be concatened");

			});

		});

		it("should concat wrong file", () => {

			return fs.filesToStreamProm([ FILE_TEST + "t" ]).then((stream) => {

				assert.strictEqual("object", typeof stream, "wrong file cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong file cannot be concatened");

				return new Promise((resolve, reject) => {

					let data = "";
					stream.once("error", reject).on("data", (chunk) => {
						data += chunk.toString("utf8");
					}).once("close", () => {

						assert.strictEqual("", data, "wrong file give wrong value");
						resolve();

					});

				});

			});

		});

		it("should concat test files", () => {

			return fs.filesToStreamProm([ FILE_TEST, FILE_TEST, FILE_TEST ]).then((stream) => {

				assert.strictEqual("object", typeof stream, "wrong file cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong file cannot be concatened");

				return new Promise((resolve, reject) => {

					let data = "";
					stream.once("error", reject).on("data", (chunk) => {
						data += chunk.toString("utf8");
					}).once("close", () => {

						assert.strictEqual(
							"test test test",
							data,
							"test files cannot be concatened"
						);

						resolve();

					});

				});

			});

		});

		it("should concat test files with pattern", () => {

			return fs.filesToStreamProm([ FILE_TEST, FILE_TEST, FILE_TEST ], " -- [{{filename}}] -- ").then((stream) => {

				assert.strictEqual("object", typeof stream, "wrong file cannot be concatened");
				assert.strictEqual(true, stream instanceof Transform, "wrong file cannot be concatened");

				return new Promise((resolve, reject) => {

					let data = "";
					stream.once("error", reject).on("data", (chunk) => {
						data += chunk.toString("utf8");
					}).once("close", () => {

						assert.strictEqual(
							" -- [test.txt] -- test -- [test.txt] -- test -- [test.txt] -- test",
							data,
							"test files with pattern cannot be concatened"
						);

						resolve();

					});

				});

			});

		});

	});

});
