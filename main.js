
"use strict";

// deps

const 	fs = require('fs'),
		path = require('path');

// module

fs.dirExists = function(dir) {

	let bResult = false;

		try {

			if ('string' === typeof dir && fs.lstatSync(dir).isDirectory()) {
				bResult = true;
			}

		}
		catch (e) {
			bResult = false;
		}

	return bResult;

};

fs.fileExists = function(file) {

	let bResult = false;

		try {

			if ('string' === typeof file && fs.lstatSync(file).isFile()) {
				bResult = true;
			}

		}
		catch (e) {
			bResult = false;
		}

	return bResult;

};

fs.mkdirp = function(dir) {

	let bResult = false;

		try {

			if (fs.dirExists(dir)) {
				bResult = true;
			}
			else if (fs.dirExists(path.dirname(dir)) || fs.mkdirp(path.dirname(dir))) {
				fs.mkdirSync(dir, parseInt('0777', 8));
				bResult = true;
			}

		}
		catch (e) {
			bResult = false;
		}

	return bResult;

};

fs.rmdirp = function(dir) {

	let bResult = false;

		try {

			if(!fs.dirExists(dir)) {
				bResult = true;
			}
			else {

				fs.readdirSync(dir).forEach(function(file) {

					let curPath = path.join(dir, file);

					if(fs.dirExists(curPath)) {
						fs.rmdirp(curPath);
					}
					else if (fs.fileExists(curPath)) {
						fs.unlinkSync(curPath);
					}

				});

				fs.rmdirSync(dir);

				bResult = true;

			}

		}
		catch (e) {
			bResult = false;
		}

	return bResult;

};

module.exports = fs;
