"use strict";

// deps

	const 	path = require("path"),
			assert = require("assert"),
			
			fs = require(path.join(__dirname, "..", "dist", "main.js"));

// private

	var _dirtestBase = path.join(__dirname, "testlvl1"),
		_filetest = path.join(__dirname, "test.txt"),
		_filetest2 = path.join(__dirname, "test2.txt");

// tests

describe("promisification", () => {

	describe("write", () => {

		describe("mkdirProm", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check missing value", (done) => {

				fs.mkdirProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.mkdirProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.mkdirProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", (done) => {

				fs.mkdirProm(_dirtestBase).then(() => {
					assert.strictEqual(true, fs.isDirectorySync(_dirtestBase), "test directory cannot be created");
					done();
				}).catch(() => {
					done("check normal running generate an error");
				});

			});

		});

		describe("rmdirProm", () => {

			before(() => { return fs.mkdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check missing value", (done) => {

				fs.rmdirProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.rmdirProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.rmdirProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", (done) => {

				fs.rmdirProm(_dirtestBase).then(() => {
					assert.strictEqual(false, fs.isDirectorySync(_dirtestBase), "test directory cannot be deleted");
					done();
				}).catch(() => {
					done("check normal running generate an error");
				});

			});

		});

		describe("unlinkProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.unlinkProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.unlinkProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.unlinkProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", (done) => {

				fs.unlinkProm(_filetest).then(() => {
					assert.strictEqual(false, fs.isFileSync(_filetest), "test file cannot be deleted");
					done();
				}).catch(() => {
					done("check normal running generate an error");
				});

			});

		});

	});

	describe("stream", () => {

		describe("closeProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.closeProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.closeProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.closeProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				let fd;

				assert.doesNotThrow(() => { fd = fs.openSync(_filetest, "a", 755); }, Error, "\"after\" function throw an error");

				return fs.closeProm(fd);

			});

		});

		describe("openProm", () => {

			before(() => { return fs.unlinkProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.openProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.openProm(_filetest).then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check type value", (done) => {

				fs.openProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.openProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.openProm(_filetest, "a", 755).then((fd) => {
					assert.doesNotThrow(() => { fs.closeSync(fd); }, "test file cannot be closed");
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
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.accessProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.accessProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {
				return fs.accessProm(__filename, fs.F_OK);
			});

		});

		describe("appendFileProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.appendFileProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.appendFileProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.appendFileProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.appendFileProm(_filetest, "test", "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(_filetest, "utf8"), "test file content cannot be appended");
				});

			});

		});

		describe("chmodProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.chmodProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.chmodProm(__filename).then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check type value", (done) => {

				fs.chmodProm(false, 1).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					fs.chmodProm(__filename, false).then(() => {
						done("check type value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

						done();

					});

				});

			});

			it("should check empty content value", (done) => {

				fs.chmodProm("", 1).then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {
				return fs.chmodProm(_filetest, 755);
			});

		});

		describe("chownProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.chownProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.chownProm(__filename).then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						fs.chownProm(__filename, 1).then(() => {
							done("check missing value does not generate an error");
						}).catch((err) => {

							assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
							assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

							done();

						});

					});

				});

			});

			it("should check type value", (done) => {

				fs.chownProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					fs.chownProm(__filename, false).then(() => {
						done("check type value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

						fs.chownProm(__filename, 1, false).then(() => {
							done("check type value does not generate an error");
						}).catch((err) => {

							assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
							assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

							done();

						});

					});

				});

			});

			it("should check empty content value", (done) => {

				fs.chownProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {
				return fs.chownProm(_filetest, 0, 0);
			});

		});

		describe("readdirProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.readdirProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.readdirProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.readdirProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.readdirProm(__dirname).then((content) => {
					assert.strictEqual("object", typeof content, "check normal running does not generate array");
				});

			});

		});

		describe("readFileProm", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.readFileProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.readFileProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.readFileProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.readFileProm(_filetest, "utf8").then((content) => {
					assert.strictEqual("test", content, "check normal running does not generate content");
				});

			});

		});

		describe("realpathProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.realpathProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.realpathProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.realpathProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", (done) => {

				fs.realpathProm(__filename).then((content) => {
					assert.strictEqual(__filename, content, "check normal running does not generate real path");
					done();
				}).catch(done);

			});

		});

		describe("renameProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });

			after(() => {

				return fs.unlinkProm(_filetest).then(() => {
					return fs.unlinkProm(_filetest2);
				});

			});

			it("should check missing value", (done) => {

				fs.renameProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.renameProm(_filetest).then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check type value", (done) => {

				fs.renameProm(false, _filetest).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					fs.renameProm(_filetest, false).then(() => {
						done("check type value does not generate an error");
					}).catch((err) => {
						
						assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

						done();

					});

				});

			});

			it("should check empty content value", (done) => {

				fs.renameProm("", _filetest).then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof Error, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.renameProm(_filetest, "").then(() => {
						done("check empty content does not generate an error");
					}).catch((err) => {
						
						assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

						done();

					});

				});

			});

			it("should check normal running", () => {
				return fs.renameProm(_filetest, _filetest2);
			});

		});

		describe("statProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.statProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					done();

				});

			});

			it("should check type value", (done) => {

				fs.statProm(false).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					done();

				});

			});

			it("should check empty content value", (done) => {

				fs.statProm("").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {
					
					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.statProm(__filename).then((data) => {
					assert.strictEqual("object", typeof data, "check normal running does not generate object");
				});

			});

		});

		describe("truncateProm", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.truncateProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.truncateProm(_filetest).then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check type value", (done) => {

				fs.truncateProm(false, 5).then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					fs.truncateProm(_filetest, false).then(() => {
						done("check type value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

						done();

					});

				});

			});

			it("should check empty content value", (done) => {

				fs.truncateProm("", 5).then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {
					
					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.truncateProm(_filetest, 2).then(() => {
					assert.strictEqual("te", fs.readFileSync(_filetest, "utf8"), "check type value does not generate an error");
				});

			});

		});

		describe("writeFileProm", () => {

			before(() => { return fs.unlinkProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check missing value", (done) => {

				fs.writeFileProm().then(() => {
					done("check missing value does not generate an error");
				}).catch((err) => {

					assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

					fs.writeFileProm(_filetest).then(() => {
						done("check missing value does not generate an error");
					}).catch((err) => {

						assert.strictEqual(true, err instanceof ReferenceError, "check missing value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check missing value does not generate a valid error");

						done();

					});

				});

			});

			it("should check type value", (done) => {

				fs.writeFileProm(false, "test").then(() => {
					done("check type value does not generate an error");
				}).catch((err) => {
					
					assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

					fs.writeFileProm(_filetest, false).then(() => {
						done("check type value does not generate an error");
					}).catch((err) => {
						
						assert.strictEqual(true, err instanceof TypeError, "check type value does not generate a valid error");
						assert.strictEqual("string", typeof err.message, "check type value does not generate a valid error");

						done();
						
					});

				});

			});

			it("should check empty content value", (done) => {

				fs.writeFileProm("", "test").then(() => {
					done("check empty content does not generate an error");
				}).catch((err) => {
					
					assert.strictEqual(true, err instanceof Error, "check empty content value does not generate a valid error");
					assert.strictEqual("string", typeof err.message, "check empty content value does not generate a valid error");

					done();

				});

			});

			it("should check normal running", () => {

				return fs.writeFileProm(_filetest, "test", "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(_filetest, "utf8"), "normal running does not write in file");
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
