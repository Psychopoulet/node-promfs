
"use strict";

// deps

var _require = require("stream"),
    Duplex = _require.Duplex;

// private

// methods

/**
* Async directoryToStream
* @param {function|null} callback : operation's result
* @returns {void}
*/


function _directoryToStream(callback) {

	if ("function" !== typeof callback) {
		throw new TypeError("\"callback\" argument is not a function");
	} else {

		process.nextTick(function () {

			var stream = new Duplex();

			stream.once("error", function (_err) {
				callback(_err);
			}).once("readable", function () {
				callback(stream);
			});
		});
	}
}

// module

module.exports = {

	// async version

	"directoryToStream": _directoryToStream,

	// promise version

	"directoryToStreamProm": function directoryToStreamProm() {

		return new Promise(function (resolve, reject) {

			_directoryToStream(function (err, stream) {
				return err ? reject(err) : resolve(stream);
			});
		});
	}

};