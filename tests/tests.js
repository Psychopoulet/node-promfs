"use strict";

// deps

	const 	fs = require('../main.js'),
			path = require('path');

// private

	var _dirtest = path.join(__dirname, 'testlvl1', 'testlvl2', 'testlvl3', 'testlvl4');

// tests

	function testFileExists() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("tests fileExists");
				console.log("----------------");
				console.log("");

				console.log("must be == false :", fs.fileExists(false));
				console.log("must be == false :", fs.fileExists('eivrjeoirvneornv'));
				console.log("must be == true :", fs.fileExists(__filename));

				console.log("");
				console.log("afileExists");
				console.log("must be == true :");

				fs.afileExists(__filename, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {

						console.log(exists);

						console.log("");
						console.log("pfileExists");
						console.log("must be == true :");

						fs.pfileExists(__filename).then(function(exists) {

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

	function testDirSync() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test dir sync");
				console.log("----------------");
				console.log("");

				console.log("dirExists");
				console.log("must be == false :", fs.dirExists(false));
				console.log("must be == false :", fs.dirExists('eivrjeoirvneornv'));
				console.log("must be == true :", fs.dirExists(__dirname));
				console.log("must be == false :", fs.dirExists(_dirtest));

				console.log("");
				console.log("mkdirp");
				console.log("must be == true :", fs.mkdirp(_dirtest));
				console.log("must be == true :", fs.dirExists(_dirtest));

				console.log("");
				console.log("rmdirp");
				console.log("must be == true :", fs.rmdirp(path.join(__dirname, 'testlvl1')));
				console.log("must be == false :", fs.dirExists(_dirtest));

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

	function testDirASync() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test dir async");
				console.log("----------------");
				console.log("");

				console.log("adirExists");
				console.log("must be == true :");

				fs.adirExists(__dirname, function(err, exists) {

					if (err) {
						console.log(err);
					}
					else {

						console.log(exists);

						console.log("");
						console.log("amkdirp");
						console.log("must be == true :");

						fs.amkdirp(_dirtest, function(err) {

							if (err) {
								reject(err);
							}
							else {

								console.log(fs.dirExists(_dirtest));

								console.log("");
								console.log("armdirp");
								console.log("must be == false :");

								fs.armdirp(path.join(__dirname, 'testlvl1'), function(err) {

									if (err) {
										reject(err);
									}
									else {

										console.log(fs.dirExists(_dirtest));

										console.log("");
										console.log("----------------");
										console.log("");

										resolve();

									}

								});

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

	function testDirPromise() {

		return new Promise(function(resolve, reject) {

			try {

				console.log("");
				console.log("----------------");
				console.log("test dir promise");
				console.log("----------------");
				console.log("");

				console.log("pdirExists");
				console.log("must be == true :");

				fs.pdirExists(__dirname).then(function(exists) {

					console.log(exists);

					console.log("");
					console.log("pmkdirp");
					console.log("must be == true :");

					return fs.pmkdirp(_dirtest);

				}).then(function() {

					console.log(fs.dirExists(_dirtest));

					console.log("");
					console.log("prmdirp");
					console.log("must be == false :");

					return fs.prmdirp(path.join(__dirname, 'testlvl1'));

				}).then(function() {

					console.log(fs.dirExists(_dirtest));

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

// run

	testFileExists().then(function() {
		return testDirSync();
	}).then(function() {
		return testDirASync();
	}).then(function() {
		return testDirPromise();
	}).catch(function(err) {
		console.log('tests interruption', err);
	});
