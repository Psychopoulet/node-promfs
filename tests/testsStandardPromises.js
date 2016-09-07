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

	describe("rewrited", () => {

		describe("mkdirProm", () => {

			before(() => { return fs.rmdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check type value", (done) => {

				fs.mkdirProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.mkdirProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.mkdirProm(_dirtestBase).then(() => {
					assert.strictEqual(true, fs.isDirectorySync(_dirtestBase), "test directory cannot be created");
					done();
				}).catch(() => {
					assert(false, "check normal running generate an error");
					done();
				});

			});

		});

		describe("rmdirProm", () => {

			before(() => { return fs.mkdirpProm(_dirtestBase); });
			after(() => { return fs.rmdirpProm(_dirtestBase); });

			it("should check type value", (done) => {

				fs.rmdirProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.rmdirProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.rmdirProm(_dirtestBase).then(() => {
					assert.strictEqual(false, fs.isDirectorySync(_dirtestBase), "test directory cannot be deleted");
					done();
				}).catch(() => {
					assert(false, "check normal running generate an error");
					done();
				});

			});

		});

		describe("unlinkProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.unlinkProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.unlinkProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.unlinkProm(_filetest).then(() => {
					assert.strictEqual(false, fs.isFileSync(_filetest), "test file cannot be deleted");
					done();
				}).catch(() => {
					assert(false, "check normal running generate an error");
					done();
				});

			});

		});

	});

	describe("stream", () => {

		describe("openProm", () => {

			before(() => { return fs.unlinkProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.openProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.openProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.openProm(_filetest, "a", 755).then(function(fd) {
					assert.doesNotThrow(() => { fs.closeSync(fd); }, "test file cannot be closed");
					done();
				}).catch(() => {
					assert(false, "check normal running generate an error");
					done();
				});

			});

		});

		describe("closeProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.closeProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.closeProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				let fd;

				assert.doesNotThrow(() => { fd = fs.openSync(_filetest, "a", 755); }, Error, "\"after\" function throw an error");

				fs.closeProm(fd).then(done).catch(() => {
					assert(false, "check normal running generate an error");
					done();
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

			it("should check type value", (done) => {

				fs.accessProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
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

			it("should check type value", (done) => {

				fs.appendFileProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.appendFileProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.appendFileProm(_filetest, "test", "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(_filetest, "utf8"), "test file content cannot be appended");
					done();
				}).catch(done);

			});

		});

		describe("chmodProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.chmodProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.chmodProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
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

			it("should check type value", (done) => {

				fs.chownProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.chownProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
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

			it("should check type value", (done) => {

				fs.readdirProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.readdirProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.readdirProm(__dirname).then((content) => {
					assert.strictEqual("object", typeof content, "check normal running does not generate array");
					done();
				}).catch(done);

			});

		});

		describe("readFileProm", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.readFileProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.readFileProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.readFileProm(_filetest, "utf8").then((content) => {
					assert.strictEqual("test", content, "check normal running does not generate content");
					done();
				}).catch(done);

			});

		});

		describe("realpathProm", () => {

			before(() => { return fs.writeFileProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.realpathProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.realpathProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
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

			it("should check type value", (done) => {

				fs.renameProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {

					assert.strictEqual("string", typeof err, "check type value does not generate an error");

					fs.renameProm(_filetest, false).then(() => {
						assert(false, "check type value does not generate an error");
						done();
					}).catch((err) => {
						assert.strictEqual("string", typeof err, "check type value does not generate an error");
						done();
					});

				});

			});

			it("should check empty content value", (done) => {

				fs.renameProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {

					assert.strictEqual("string", typeof err, "check type value does not generate an error");

					fs.renameProm(_filetest, "").then(() => {
						assert(false, "check empty content does not generate an error");
						done();
					}).catch((err) => {
						assert.strictEqual("string", typeof err, "check type value does not generate an error");
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

			it("should check type value", (done) => {

				fs.statProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.statProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.statProm(__filename).then(function(data) {
					assert.strictEqual("object", typeof data, "check normal running does not generate object");
					done();
				}).catch(done);

			});

		});

		describe("truncateProm", () => {

			before(() => { return fs.writeFileProm(_filetest, "test"); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.truncateProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.truncateProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.truncateProm(_filetest, 2).then(() => {
					assert.strictEqual("te", fs.readFileSync(_filetest, "utf8"), "check type value does not generate an error");
					done();
				}).catch(done);

			});

		});

		describe("writeFileProm", () => {

			before(() => { return fs.unlinkProm(_filetest, ""); });
			after(() => { return fs.unlinkProm(_filetest); });

			it("should check type value", (done) => {

				fs.writeFileProm(false).then(() => {
					assert(false, "check type value does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check empty content value", (done) => {

				fs.writeFileProm("").then(() => {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch((err) => {
					assert.strictEqual("string", typeof err, "check type value does not generate an error");
					done();
				});

			});

			it("should check normal running", (done) => {

				fs.writeFileProm(_filetest, "test", "utf8").then(() => {
					assert.strictEqual("test", fs.readFileSync(_filetest, "utf8"), "normal running does not write in file");
					done();
				}).catch(done);

			});

		});

		// missing :
		// linkProm
		// lstatProm
		// mkdtempProm
		// utimesProm

	});

});
