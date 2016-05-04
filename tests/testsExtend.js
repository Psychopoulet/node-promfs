"use strict";

// deps

	const 	fs = require('../main.js'),
			path = require('path'),
			assert = require('assert');

// private

	var _dirtest = path.join(__dirname, 'testlvl1', 'testlvl2', 'testlvl3', 'testlvl4'),
		_filetest = path.join(__dirname, 'test.txt'),
		_filetest2 = path.join(__dirname, 'test2.txt');

// tests

describe('isFile', function() {

	describe('sync', function() {

		it('should check type value', function() {
			assert.throws(function() { fs.isFileSync(false); }, Error, "check type value does not throw an error");
		});

		it('should check empty content value', function() {
			assert.throws(function() { fs.isFileSync(''); }, Error, "check empty content value does not throw an error");
		});

		it('should check real content value', function() {
			assert.doesNotThrow(function() { fs.isFileSync('test'); }, Error, "check real content value throw an error");
		});

		it('should check false file existance', function() {
			assert.strictEqual(false, fs.isFileSync(path.join(__dirname, 'eivrjeoirvneornv')), "'" + path.join(__dirname, 'eivrjeoirvneornv') + "' is an existing file");
		});

		it('should check real file existance', function() {
			assert.strictEqual(true, fs.isFileSync(__filename), "'" + __filename + "' is not an existing file");
		});

	});

	describe('async', function() {

		it('should check type value', function(done) {

			fs.isFile(false, function(err) {
				assert.notStrictEqual(null, err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {
			
			fs.isFile('', function(err) {
				assert.notStrictEqual(null, err, "check empty content value does not generate an error");
				done();
			});

		});

		it('should check real content value', function(done) {
			
			fs.isFile('test', function(err) {
				assert.strictEqual(null, err, "check real content value generate an error");
				done();
			});

		});

		it('should check false file existance', function(done) {

			fs.isFile(path.join(__dirname, 'eivrjeoirvneornv'), function(err, exists) {
				assert.strictEqual(false, exists, "'" + path.join(__dirname, 'eivrjeoirvneornv') + "' is an existing file");
				done();
			});

		});

		it('should check real file existance', function(done) {

			fs.isFile(__filename, function(err, exists) {
				assert.strictEqual(true, exists, "'" + __filename + "' is not an existing file");
				done();
			});

		});

	});

	describe('promise', function(){

		it('should check type value', function(done) {

			fs.isFileProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {
			
			fs.isFileProm('').then(function() {
				assert(false, "check empty content value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check empty content value does not generate an error");
				done();
			});

		});

		it('should check real content value', function(done) {
			
			fs.isFileProm('test').then(done).catch(function(err) {
				assert.strictEqual('string', typeof err, "check real content value does not generate an error");
				done();
			});

		});

		it('should check false file existance', function(done) {

			fs.isFileProm(path.join(__dirname, 'eivrjeoirvneornv')).then(function(exists) {
				assert.strictEqual(false, exists, "'" + path.join(__dirname, 'eivrjeoirvneornv') + "' is an existing file");
				done();
			}).catch(done);

		});

		it('should check real file existance', function(done) {

			fs.isFileProm(__filename).then(function(exists) {
				assert.strictEqual(true, exists, "'" + __filename + "' is not an existing file");
				done();
			}).catch(done);

		});

	});

});

describe('isDirectory', function() {

	describe('sync', function() {

		it('should check type value', function() {
			assert.throws(function() { fs.isDirectorySync(false); }, Error, "check type value does not throw an error");
		});

		it('should check empty content value', function() {
			assert.throws(function() { fs.isDirectorySync(''); }, Error, "check empty content value does not throw an error");
		});

		it('should check real content value', function() {
			assert.doesNotThrow(function() { fs.isDirectorySync('test'); }, Error, "check real content value throw an error");
		});

		it('should check false directory existance', function() {
			assert.strictEqual(false, fs.isDirectorySync(path.join(__dirname, 'eivrjeoirvneornv')), "'" + path.join(__dirname, 'eivrjeoirvneornv') + "' is an existing directory");
		});

		it('should check real directory existance', function() {
			assert.strictEqual(true, fs.isDirectorySync(__dirname), "'" + __dirname + "' is not an existing directory");
		});

	});

	describe('async', function() {

		it('should check type value', function(done) {

			fs.isDirectory(false, function(err) {
				assert.notStrictEqual(null, err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {
			
			fs.isDirectory('', function(err) {
				assert.notStrictEqual(null, err, "check empty content value does not generate an error");
				done();
			});

		});

		it('should check real content value', function(done) {
			
			fs.isDirectory('test', function(err) {
				assert.strictEqual(null, err, "check real content value generate an error");
				done();
			});

		});

		it('should check false directory existance', function(done) {

			fs.isDirectory(path.join(__dirname, 'eivrjeoirvneornv'), function(err, exists) {
				assert.strictEqual(false, exists, "'" + path.join(__dirname, 'eivrjeoirvneornv') + "' is an existing directory");
				done();
			});

		});

		it('should check real directory existance', function(done) {

			fs.isDirectory(__dirname, function(err, exists) {
				assert.strictEqual(true, exists, "'" + __dirname + "' is not an existing directory");
				done();
			});

		});

	});

	describe('promise', function(){

		it('should check type value', function(done) {

			fs.isDirectoryProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {
			
			fs.isDirectoryProm('').then(function() {
				assert(false, "check empty content value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check empty content value does not generate an error");
				done();
			});

		});

		it('should check real content value', function(done) {
			
			fs.isDirectoryProm('test').then(done).catch(function(err) {
				assert.strictEqual('string', typeof err, "check real content value does not generate an error");
				done();
			});

		});

		it('should check false directory existance', function(done) {

			fs.isDirectoryProm(path.join(__dirname, 'eivrjeoirvneornv')).then(function(exists) {
				assert.strictEqual(false, exists, "'" + path.join(__dirname, 'eivrjeoirvneornv') + "' is an existing directory");
				done();
			}).catch(done);

		});

		it('should check real directory existance', function(done) {

			fs.isDirectoryProm(__dirname).then(function(exists) {
				assert.strictEqual(true, exists, "'" + __dirname + "' is not an existing directory");
				done();
			}).catch(done);

		});

	});

});

describe('mkdirp', function() {

	describe('sync', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.rmdirpSync(path.join(__dirname, 'testlvl1')); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.rmdirpSync(path.join(__dirname, 'testlvl1')); }, Error, "'after' function throw an error");
		});

		it('should check type value', function() {
			assert.throws(function() { fs.mkdirpSync(false); }, Error, "check type value does not throw an error");
		});

		it('should check empty content value', function() {
			assert.throws(function() { fs.mkdirpSync(''); }, Error, "check empty content value does not throw an error");
		});

		it('should create real existing directory', function() {
			assert.strictEqual(true, fs.mkdirpSync(__dirname), "'" + __dirname + "' cannot be created");
		});

		it('should create real new directory', function() {
			assert.strictEqual(true, fs.mkdirpSync(_dirtest), "'" + _dirtest + "' cannot be created");
		});

		it('should detect created directory', function() {
			assert.strictEqual(true, fs.isDirectorySync(_dirtest), "'" + _dirtest + "' was not created");
		});

	});

	describe('async', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.rmdirpSync(path.join(__dirname, 'testlvl1')); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.rmdirpSync(path.join(__dirname, 'testlvl1')); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.mkdirp(false, function(err) {
				assert.notStrictEqual(null, err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {
			
			fs.mkdirp('', function(err) {
				assert.notStrictEqual(null, err, "check empty content value does not generate an error");
				done();
			});

		});

		it('should create real existing directory', function(done) {

			fs.mkdirp(__dirname, function(err) {
				assert.strictEqual(null, err, "'" + __dirname + "' cannot be created");
				done();
			});

		});

		it('should create real new directory', function(done) {
			
			fs.mkdirp(_dirtest, function(err) {
				assert.strictEqual(null, err, "'" + _dirtest + "' cannot be created");
				done();
			});

		});

		it('should detect created directory', function() {
			assert.strictEqual(true, fs.isDirectorySync(_dirtest), "'" + _dirtest + "' was not created");
		});

	});

	describe('promise', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.rmdirpSync(path.join(__dirname, 'testlvl1')); }, Error, "'before' function throw an error");
		});

		after(function() {
			assert.doesNotThrow(function() { fs.rmdirpSync(path.join(__dirname, 'testlvl1')); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.mkdirpProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {
			
			fs.mkdirpProm('').then(function() {
				assert(false, "check empty content value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check empty content value does not generate an error");
				done();
			});

		});

		it('should create real existing directory', function(done) {

			fs.mkdirpProm(__dirname).then(done).catch(function() {
				assert(false, "'" + __dirname + "' cannot be created");
				done();
			}).catch(done);

		});

		it('should create real new directory', function(done) {
			
			fs.mkdirpProm(_dirtest).then(done).catch(function() {
				assert(false, "'" + _dirtest + "' cannot be created");
				done();
			}).catch(done);

		});

		it('should detect created directory', function() {
			assert.strictEqual(true, fs.isDirectorySync(_dirtest), "'" + _dirtest + "' was not created");
		});

	});

});

describe('rmdirp', function() {

	describe('sync', function() {

	});

	describe('async', function() {

	});

	describe('promise', function() {

	});

});

describe('concatFiles', function() {

	describe('sync', function() {

	});

	describe('async', function() {

	});

	describe('promise', function() {

	});

});

describe('copy', function() {

	describe('sync', function() {

	});

	describe('async', function() {

	});

	describe('promise', function() {

	});

});

/*

	function testFileWritePromise() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test file write promise");
				console.log("----------------");
				console.log("");

				console.log("writeFileProm");

				fs.writeFileProm(_filetest, '', 'utf8').then(function() {

					console.log("must be == true :", fs.isFileSync(_filetest));

					console.log("");
					console.log("appendFileProm");

					return fs.appendFileProm(_filetest, 'test', 'utf8');

				}).then(function() {

					console.log("must be == true :", true);

					console.log("");
					console.log("readFileProm");

					return fs.readFileProm(_filetest, 'utf8');

				}).then(function(content) {

					console.log("must be == 'test' :", content);

					console.log("");
					console.log("unlinkProm");

					return fs.unlinkProm(_filetest);

				}).then(function() {

					console.log("must be == false :", fs.isFileSync(_filetest));

					console.log("");
					console.log("----------------");
					console.log("");

					resolve();

				}).catch(reject);

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	function testFileConcat() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test file concat");
				console.log("----------------");
				console.log("");

				console.log("writeFileProm");

				fs.writeFileProm(_filetest, 'test', 'utf8').then(function() {

					console.log("must be == true :", fs.isFileSync(_filetest));

					console.log("");
					console.log("concatFilesSync");
					console.log("must be == 'test test test' :", fs.concatFilesSync([ _filetest, _filetest, _filetest ], 'utf8', ' '));

					console.log("");
					console.log("concatFiles");

					fs.concatFiles([ _filetest, _filetest, _filetest ], 'utf8', ' ', function(err, content) {

						if (err) {
							reject(err);
						}
						else {

							console.log("must be == 'test test test' :", content);

							console.log("");
							console.log("concatFilesProm");

							fs.concatFilesProm([ _filetest, _filetest, _filetest ], 'utf8', ' ').then(function(content) {

								console.log("must be == 'test test test' :", content);

								fs.unlinkProm(_filetest).then(function() {

									console.log("");
									console.log("----------------");
									console.log("");

									resolve();

								}).catch(reject);

							}).catch(reject);

						}

					});

				}).catch(reject);

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	function testFileCopy() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test file copy");
				console.log("----------------");
				console.log("");

				console.log("writeFileProm");

				fs.writeFileProm(_filetest, 'test', 'utf8').then(function() {

					console.log("must be == true :", fs.isFileSync(_filetest));

					console.log("");
					console.log("copySync");

					fs.copySync(_filetest, _filetest2);

					console.log("must be == true :", fs.isFileSync(_filetest2));
					console.log("must be == 'test' :", fs.readFileSync(_filetest2, 'utf8'));

					fs.unlinkSync(_filetest2);

					console.log("");
					console.log("copy");

					fs.copy(_filetest, _filetest2, function(err) {

						if (err) {
							reject(err);
						}
						else {

							console.log("must be == true :", fs.isFileSync(_filetest2));
							console.log("must be == 'test' :", fs.readFileSync(_filetest2, 'utf8'));

							console.log("");
							console.log("copyProm");

							fs.copyProm(_filetest, _filetest2).then(function() {

								console.log("must be == true :", fs.isFileSync(_filetest2));
								console.log("must be == 'test' :", fs.readFileSync(_filetest2, 'utf8'));

								return fs.unlinkProm(_filetest);

							}).then(function() {
								return fs.unlinkProm(_filetest2);
							}).then(function() {

								console.log("");
								console.log("----------------");
								console.log("");

								resolve();
								
							}).catch(reject);

						}

					});

				}).catch(reject);

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

// run

	testFileWritePromise().then(function() {
		return testFileConcat();
	}).then(function() {
		return testFileCopy();
	})

	// clean
	.then(function() {
		return fs.unlinkProm(_filetest);
	}).then(function() {
		return fs.unlinkProm(_filetest2);
	}).then(function() {
		return fs.rmdirpProm(_dirtest);
	})

	.catch(function(err) {
		console.log('tests interruption', err);
	});
	
*/