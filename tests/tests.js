"use strict";

// deps

	const 	fs = require('../main.js'),
			path = require('path');

// private

	var _dirtest = path.join(__dirname, 'testlvl1', 'testlvl2', 'testlvl3', 'testlvl4');
	var _filetest = path.join(__dirname, 'test.txt');

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
				console.log("must be == true :");

				fs.isFile(__filename, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {

						console.log(exists);

						console.log("");
						console.log("isFileProm");
						console.log("must be == true :");

						fs.isFileProm(__filename).then(function(exists) {

							console.log(exists);

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
				console.log("must be == true :");

				fs.isDirectory(__dirname, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {

						console.log(exists);

						console.log("");
						console.log("isDirectoryProm");
						console.log("must be == true :");

						fs.isDirectoryProm(__dirname).then(function(exists) {

							console.log(exists);

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

				console.log("");
				console.log("mkdirp");
				console.log("must be == true :");

				fs.mkdirp(_dirtest, function(err) {

					if (err) {
						reject(err);
					}
					else {

						console.log(fs.isDirectorySync(_dirtest));

						console.log("");
						console.log("rmdirp");
						console.log("must be == false :");

						fs.rmdirp(path.join(__dirname, 'testlvl1'), function(err) {

							if (err) {
								reject(err);
							}
							else {

								console.log(fs.isDirectorySync(_dirtest));

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
				console.log("must be == true :");

				fs.mkdirpProm(_dirtest).then(function() {

					console.log(fs.isDirectorySync(_dirtest));

					console.log("");
					console.log("rmdirpProm");
					console.log("must be == false :");

					return fs.rmdirpProm(path.join(__dirname, 'testlvl1'));

				}).then(function() {

					console.log(fs.isDirectorySync(_dirtest));

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
				console.log("must be == true :");

				fs.writeFileProm(_filetest, '', 'utf8').then(function() {

					console.log(fs.isFileSync(_filetest));

					console.log("");
					console.log("appendFileProm");
					console.log("must be == true :");

					return fs.appendFileProm(_filetest, 'test', 'utf8');

				}).then(function() {

					console.log(true);

					console.log("");
					console.log("readFileProm");
					console.log("must be == 'test' :");

					return fs.readFileProm(_filetest, 'utf8');

				}).then(function(content) {

					console.log(content);

					console.log("");
					console.log("unlinkProm");
					console.log("must be == false :");

					return fs.unlinkProm(_filetest);

				}).then(function() {

					console.log(fs.isFileSync(_filetest));

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
				console.log("must be == true :");

				fs.writeFileProm(_filetest, 'test', 'utf8').then(function() {

					console.log(fs.isFileSync(_filetest));

					console.log("");
					console.log("concatFilesSync");
					console.log("must be == 'test test test' :", fs.concatFilesSync([ _filetest, _filetest, _filetest ], ' '));

					console.log("");
					console.log("concatFiles");
					console.log("must be == 'test test test' :");

					fs.concatFiles([ _filetest, _filetest, _filetest ], ' ', function(err, content) {

						if (err) {
							reject(err);
						}
						else {

							console.log(content);

							console.log("");
							console.log("concatFilesProm");
							console.log("must be == 'test test test' :");

							fs.concatFilesProm([ _filetest, _filetest, _filetest ], ' ').then(function(content) {

								console.log(content);

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

				let target = path.join(__dirname, 'test2.txt');

				console.log("");
				console.log("----------------");
				console.log("test file copy");
				console.log("----------------");
				console.log("");

				console.log("writeFileProm");
				console.log("must be == true :");

				fs.writeFileProm(_filetest, 'test', 'utf8').then(function() {

					console.log(fs.isFileSync(_filetest));

					console.log("");
					console.log("copySync");

					fs.copySync(_filetest, target);

					console.log("must be == true :", fs.isFileSync(target));
					console.log("must be == 'test' :", fs.readFileSync(target, 'utf8'));

					fs.unlinkSync(target);

					console.log("");
					console.log("copy");
					console.log("must be == true :");

					fs.copy(_filetest, target, function(err) {

						if (err) {
							reject(err);
						}
						else {

							console.log(fs.isFileSync(target));
							console.log("must be == 'test' :", fs.readFileSync(target, 'utf8'));

							console.log("");
							console.log("copyProm");
							console.log("must be == true :");

							fs.copyProm(_filetest, target).then(function() {

								console.log(fs.isFileSync(target));
								console.log("must be == 'test' :", fs.readFileSync(target, 'utf8'));

								return fs.unlinkProm(_filetest);

							}).then(function() {
								return fs.unlinkProm(target);
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
		return fs.rmdirpProm(_dirtest);
	})

	// tests
	.then(function() {
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
		return fs.rmdirpProm(_dirtest);
	})

	.catch(function(err) {
		console.log('tests interruption', err);
	});
