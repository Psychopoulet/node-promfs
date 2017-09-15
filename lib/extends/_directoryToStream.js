
"use strict";

// deps

	const { Duplex } = require("stream");

// private

	// methods

		/**
		* Async directoryToStream
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _directoryToStream (callback) {

			if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				process.nextTick(() => {

					callback(new Duplex());

				});

			}

		}

// module

module.exports = {

	// async version

	"directoryToStream": _directoryToStream,

	// promise version

	"directoryToStreamProm": () => {

		return new Promise((resolve, reject) => {

			_directoryToStream((err, stream) => {
				return err ? reject(err) : resolve(stream);
			});

		});

	}

};
