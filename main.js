
"use strict";

const fs = require('fs');

fs.dirExists = function(dir) {

	var bResult = false;

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

	var bResult = false;

		try {

			if (fs.lstatSync(file).isFile()) {
				bResult = true;
			}

		}
		catch (e) {
			bResult = false;
		}

	return bResult;

};

module.exports = fs;
