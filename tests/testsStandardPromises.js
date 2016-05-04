"use strict";

return;

// deps

	const 	fs = require('../main.js'),
			path = require('path');

// private

	var _dirtest = path.join(__dirname, 'testlvl1', 'testlvl2', 'testlvl3', 'testlvl4'),
		_filetest = path.join(__dirname, 'test.txt'),
		_filetest2 = path.join(__dirname, 'test2.txt');

// tests

	function testFileExists() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("tests file exists");
				console.log("----------------");
				console.log("");

				console.log("isFileSync");
				console.log("must be == false :", fs.isFileSync('eivrjeoirvneornv'));
				console.log("must be == true :", fs.isFileSync(__filename));

				console.log("must be == 'This is not a string' :");
				try {
					fs.isFileSync(false);
				}
				catch(e) {
					console.log((e.message) ? e.message : e);
				}

				console.log("");
				console.log("isFile");

				fs.isFile(__filename, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {

						console.log("must be == true :", exists);

						console.log("");
						console.log("isFileProm");

						fs.isFileProm(__filename).then(function(exists) {

							console.log("must be == true :", exists);

							console.log("");
							console.log("----------------");
							console.log("");

							resolve();

						}).catch(reject);

					}

				});

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	function testDirExists() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("tests dir exists");
				console.log("----------------");
				console.log("");

				console.log("isDirectorySync");
				console.log("must be == false :", fs.isDirectorySync('eivrjeoirvneornv'));
				console.log("must be == true :", fs.isDirectorySync(__dirname));
				console.log("must be == false :", fs.isDirectorySync(_dirtest));

				console.log("must be == 'This is not a string' :");
				try {
					fs.isDirectorySync(false);
				}
				catch(e) {
					console.log((e.message) ? e.message : e);
				}

				console.log("");
				console.log("isDirectory");

				fs.isDirectory(__dirname, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {

						console.log("must be == true :", exists);

						console.log("");
						console.log("isDirectoryProm");

						fs.isDirectoryProm(__dirname).then(function(exists) {

							console.log("must be == true :", exists);

							console.log("");
							console.log("----------------");
							console.log("");

							resolve();

						}).catch(reject);

					}

				});

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	function testDirWriteSync() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test dir write sync");
				console.log("----------------");
				console.log("");

				console.log("mkdirpSync");
				console.log("must be == true :", fs.mkdirpSync(_dirtest));
				console.log("must be == true :", fs.isDirectorySync(_dirtest));

				console.log("");
				console.log("rmdirpSync");
				console.log("must be == true :", fs.rmdirpSync(path.join(__dirname, 'testlvl1')));
				console.log("must be == false :", fs.isDirectorySync(_dirtest));

				console.log("");
				console.log("----------------");
				console.log("");

				resolve();

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	function testDirWriteASync() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test dir write async");
				console.log("----------------");
				console.log("");

				console.log("mkdirp");

				fs.mkdirp(_dirtest, function(err) {

					if (err) {
						reject(err);
					}
					else {

						console.log("must be == true :", fs.isDirectorySync(_dirtest));

						console.log("");
						console.log("rmdirp");

						fs.rmdirp(path.join(__dirname, 'testlvl1'), function(err) {

							if (err) {
								reject(err);
							}
							else {

								console.log("must be == false :", fs.isDirectorySync(_dirtest));

								console.log("");
								console.log("----------------");
								console.log("");

								resolve();

							}

						});

					}

				});

			}
			catch(e) {
				reject((e.message) ? e.message : e);
			}

		});

	}

	function testDirWritePromise() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test dir write promise");
				console.log("----------------");
				console.log("");

				console.log("mkdirpProm");

				fs.mkdirpProm(_dirtest).then(function() {

					console.log("must be == true :", fs.isDirectorySync(_dirtest));

					console.log("");
					console.log("rmdirpProm");

					return fs.rmdirpProm(path.join(__dirname, 'testlvl1'));

				}).then(function() {

					console.log("must be == false :", fs.isDirectorySync(_dirtest));

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

	// clean
	fs.unlinkProm(_filetest).then(function() {
		return fs.unlinkProm(_filetest2);
	}).then(function() {
		return fs.rmdirpProm(_dirtest);
	})

	// tests
	.then(function() {
		return testFileExists();
	}).then(function() {
		return testDirExists();
	}).then(function() {
		return testDirWriteSync();
	}).then(function() {
		return testDirWriteASync();
	}).then(function() {
		return testDirWritePromise();
	}).then(function() {
		return testFileWritePromise();
	}).then(function() {
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
