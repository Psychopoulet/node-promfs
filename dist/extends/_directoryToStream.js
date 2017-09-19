
"use strict";

// deps

var _require = require("path"),
    join = _require.join;

var _require2 = require(join(__dirname, "_extractFiles.js")),
    extractFiles = _require2.extractFiles;

var _require3 = require(join(__dirname, "_filesToStream.js")),
    filesToStream = _require3.filesToStream;

// private

// methods

/**
* Async directoryToStream
* @param {string} directory : directory to work with
* @param {string} separator : used to separate content (can be "")
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _directoryToStream(directory, separator, callback) {

	if ("undefined" === typeof directory) {
		throw new ReferenceError("missing \"directory\" argument");
	} else if ("string" !== typeof directory) {
		throw new TypeError("\"directory\" argument is not a string");
	} else if ("" === directory.trim()) {
		throw new Error("\"directory\" argument is empty");
	} else if ("undefined" === typeof callback && "undefined" === typeof separator) {
		throw new ReferenceError("missing \"callback\" argument");
	} else if ("function" !== typeof callback && "function" !== typeof separator) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		extractFiles(directory, function (err, files) {
			var _callback = "undefined" === typeof callback ? separator : callback;
			return err ? _callback(err) : filesToStream(files, separator, _callback);
		});
	}
}

// module

module.exports = {

	// async version

	"directoryToStream": _directoryToStream,

	// promise version

	"directoryToStreamProm": function directoryToStreamProm(directory, separator) {

		return new Promise(function (resolve, reject) {

			_directoryToStream(directory, separator, function (err, stream) {
				return err ? reject(err) : resolve(stream);
			});
		});
	}

};