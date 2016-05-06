"use strict";

// deps

	const 	fs = require('../main.js'),
			path = require('path'),
			assert = require('assert');

// private

	var _dirtestBase = path.join(__dirname, 'testlvl1'),
			_dirtest = path.join(_dirtestBase, 'testlvl2', 'testlvl3', 'testlvl4'),
		_filetest = path.join(__dirname, 'test.txt'),
		_filetest2 = path.join(__dirname, 'test2.txt');

// tests

describe('rewrited', function() {

	describe('mkdirProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.rmdirSync(_dirtestBase); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.mkdirProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.mkdirProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.mkdirProm(_dirtestBase).then(function() {
				assert.strictEqual(true, fs.isDirectorySync(_dirtestBase), "test directory cannot be created");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

	describe('rmdirProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.mkdirSync(_dirtestBase); }, Error, "'before' function throw an error");
		});

		it('should check type value', function(done) {

			fs.rmdirProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.rmdirProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.rmdirProm(_dirtestBase).then(function() {
				assert.strictEqual(false, fs.isDirectorySync(_dirtestBase), "test directory cannot be deleted");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

	describe('unlinkProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.appendFileSync(_filetest); }, Error, "'before' function throw an error");
		});

		it('should check type value', function(done) {

			fs.unlinkProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.unlinkProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.unlinkProm(_filetest).then(function() {
				assert.strictEqual(false, fs.isFileSync(_filetest), "test file cannot be deleted");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

});

describe('stream', function() {

	describe('openProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.openProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.openProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.openProm(_filetest, 'a', 755).then(function(fd) {
				assert.doesNotThrow(function() { fs.closeSync(fd); }, "test file cannot be closed");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

	describe('closeProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.closeProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.closeProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			let fd;

			assert.doesNotThrow(function() { fd = fs.openSync(_filetest, 'a', 755); }, Error, "'after' function throw an error");

			fs.closeProm(fd).then(done).catch(function(err) {
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

describe('others', function() {

	describe('accessProm', function() {

		it('should check type value', function(done) {

			fs.accessProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {
			fs.accessProm(__filename, fs.F_OK).then(done).catch(done);
		});

	});

	describe('appendFileProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.appendFileProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.appendFileProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.appendFileProm(_filetest, 'test', 'utf8').then(function() {
				assert.strictEqual('test', fs.readFileSync(_filetest, 'utf8'), "test file content cannot be appended");
				done();
			}).catch(done);

		});

	});

	describe('chmodProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.writeFileSync(_filetest, 'test', 'utf8'); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.chmodProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.chmodProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {
			fs.chmodProm(_filetest, 755).then(done).catch(done);
		});

	});

	describe('chownProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.writeFileSync(_filetest, 'test', 'utf8'); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.chownProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.chownProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {
			fs.chownProm(_filetest, 0, 0).then(done).catch(done);
		});

	});

	describe('readdirProm', function() {

		it('should check type value', function(done) {

			fs.readdirProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.readdirProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.readdirProm(__dirname).then(function(content) {
				assert.strictEqual('object', typeof content, "check normal running does not generate array");
				done();
			}).catch(done);

		});

	});

	describe('readFileProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.writeFileSync(_filetest, 'test', 'utf8'); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.readFileProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.readFileProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.readFileProm(_filetest, 'utf8').then(function(content) {
				assert.strictEqual('test', content, "check normal running does not generate content");
				done();
			}).catch(done);

		});

	});

	describe('realpathProm', function() {

		it('should check type value', function(done) {

			fs.realpathProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.realpathProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.realpathProm(__filename).then(function(content) {
				assert.strictEqual(__filename, content, "check normal running does not generate real path");
				done();
			}).catch(done);

		});

	});

	describe('renameProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.writeFileSync(_filetest, 'test', 'utf8'); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest2); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.renameProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {

				assert.strictEqual('string', typeof err, "check type value does not generate an error");

				fs.renameProm(_filetest, false).then(function() {
					assert(false, "check type value does not generate an error");
					done();
				}).catch(function(err) {
					assert.strictEqual('string', typeof err, "check type value does not generate an error");
					done();
				});

			});

		});

		it('should check empty content value', function(done) {

			fs.renameProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {

				assert.strictEqual('string', typeof err, "check type value does not generate an error");

				fs.renameProm(_filetest, '').then(function() {
					assert(false, "check empty content does not generate an error");
					done();
				}).catch(function(err) {
					assert.strictEqual('string', typeof err, "check type value does not generate an error");
					done();
				});

			});

		});

		it('should check normal running', function(done) {
			fs.renameProm(_filetest, _filetest2).then(done).catch(done);
		});

	});

	describe('statProm', function() {

		it('should check type value', function(done) {

			fs.statProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.statProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.statProm(__filename).then(function(data) {
				assert.strictEqual('object', typeof data, "check normal running does not generate object");
				done();
			}).catch(done);

		});

	});

	describe('truncateProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.writeFileSync(_filetest, 'test', 'utf8'); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.truncateProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.truncateProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.truncateProm(_filetest, 2).then(function() {
				assert.strictEqual('te', fs.readFileSync(_filetest, 'utf8'), "check type value does not generate an error");
				done();
			}).catch(done);

		});

	});

	describe('writeFileProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.writeFileProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.writeFileProm('').then(function() {
				assert(false, "check empty content does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.writeFileProm(_filetest, 'test', 'utf8').then(function() {
				assert.strictEqual('test', fs.readFileSync(_filetest, 'utf8'), "normal running does not write in file");
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
