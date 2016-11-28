
"use strict";

var fs = require("../../dist/main.js");

function test_isFile() {

	console.log("");
	console.log("test_isFile", __filename);

	return new Promise(function (resolve, reject) {

		console.log("sync");

		try {

			if (!fs.isFileSync(__filename)) {
				reject(new Error("fail to detect"));
			}
			else {
				resolve();
			}

		}
		catch(e) {
			reject(e);
		}

	}).then(function () {

		return new Promise(function (resolve, reject) {

			console.log("async");

			fs.isFile(__filename, function (err, exists) {

				if (err) {
					reject(err);
				} 
				else if (!exists) {
					reject(new Error("fail to detect"));
				}
				else {
					resolve();
				}

			});

		});

	}).then(function () {

		console.log("prom");

		return fs.isFileProm(__filename).then(function (exists) {

			if (!exists) {
				return Promise.reject(new Error("fail to detect"));
			}
			else {
				return Promise.resolve();
			}

		});

	});

}

function test_isDirectory() {

	console.log("");
	console.log("test_isDirectory", __dirname);

	return new Promise(function (resolve, reject) {

		console.log("sync");

		try {

			if (!fs.isDirectorySync(__dirname)) {
				reject(new Error("fail to detect"));
			}
			else {
				resolve();
			}

		}
		catch(e) {
			reject(e);
		}

	}).then(function () {

		return new Promise(function (resolve, reject) {

			console.log("async");

			fs.isDirectory(__dirname, function (err, exists) {

				if (err) {
					reject(err);
				} 
				else if (!exists) {
					reject(new Error("fail to detect"));
				}
				else {
					resolve();
				}

			});

		});

	}).then(function () {

		console.log("prom");

		return fs.isDirectoryProm(__dirname).then(function (exists) {

			if (!exists) {
				return Promise.reject(new Error("fail to detect"));
			}
			else {
				return Promise.resolve();
			}

		});

	});

}

function test_copyFile() {

	var target = require("path").join(__dirname, "test.txt");

	console.log("");
	console.log("test_copyFile", __filename);

	return new Promise(function (resolve, reject) {

		console.log("sync");

		try {

			fs.copyFileSync(__filename, target);

			resolve();

		}
		catch(e) {
			reject(e);
		}

	}).then(function () {
		return fs.unlinkProm(target);
	}).then(function () {

		return new Promise(function (resolve, reject) {

			console.log("async");

			fs.copyFile(__filename, target, function (err) {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	}).then(function () {
		return fs.unlinkProm(target);
	}).then(function () {

		console.log("prom");

		return fs.copyFileProm(__filename, target);

	}).then(function () {
		return fs.unlinkProm(target);
	});

}

function test_rmdirp() {

	var target = require("path").join(__dirname, "testlvl1", "testlvl2", "testlvl3", "testlvl4");

	function _createTargetProm() {

		return fs.isDirectoryProm(require("path").join(__dirname, "testlvl1")).then(function(exists) {
			return (exists) ? Promise.resolve() : fs.mkdirProm(require("path").join(__dirname, "testlvl1"));
		}).then(function() {
			return fs.isDirectoryProm(require("path").join(__dirname, "testlvl1", "testlvl2"));
		}).then(function(exists) {
			return (exists) ? Promise.resolve() : fs.mkdirProm(require("path").join(__dirname, "testlvl1", "testlvl2"));
		}).then(function() {
			return fs.isDirectoryProm(require("path").join(__dirname, "testlvl1", "testlvl2", "testlvl3"));
		}).then(function(exists) {
			return (exists) ? Promise.resolve() : fs.mkdirProm(require("path").join(__dirname, "testlvl1", "testlvl2", "testlvl3"));
		}).then(function() {
			return fs.isDirectoryProm(target);
		}).then(function(exists) {
			return (exists) ? Promise.resolve() : fs.mkdirProm(target);
		});

	}

	console.log("");
	console.log("test_rmdirp", target);

	return _createTargetProm().then(function() {

		return new Promise(function (resolve, reject) {

			console.log("sync");

			try {

				fs.rmdirpSync(target);

				resolve();

			}
			catch(e) {
				reject(e);
			}

		});

	}).then(function () {
		return _createTargetProm();
	}).then(function () {

		return new Promise(function (resolve, reject) {

			console.log("async");

			fs.rmdirp(target, function (err) {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	}).then(function () {
		return _createTargetProm();
	}).then(function () {

		console.log("prom");

		return fs.rmdirpProm(target);

	});

}

function test_mkdirp() {

	var target = require("path").join(__dirname, "testlvl1", "testlvl2", "testlvl3", "testlvl4");

	console.log("");
	console.log("test_mkdirp", target);

	return fs.rmdirpProm(target).then(function() {

		return new Promise(function (resolve, reject) {

			console.log("sync");

			try {

				fs.mkdirpSync(target);

				resolve();

			}
			catch(e) {
				reject(e);
			}

		});

	}).then(function () {
		return fs.rmdirpProm(target);
	}).then(function () {

		return new Promise(function (resolve, reject) {

			console.log("async");

			fs.mkdirp(target, function (err) {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	}).then(function () {
		return fs.rmdirpProm(target);
	}).then(function () {

		console.log("prom");

		return fs.mkdirpProm(target);

	}).then(function () {
		return fs.rmdirpProm(target);
	});

}


console.log("[START]");

test_isFile().then(function () {
	return test_isDirectory();
}).then(function () {
	return test_copyFile();
}).then(function () {
	return test_rmdirp();
}).then(function () {
	return test_mkdirp();
}).then(function () {
	console.log("");
	console.log("[SUCCESS]");
}).catch(function (err) {
	console.log("");
	console.log("[ERR]", err);
});