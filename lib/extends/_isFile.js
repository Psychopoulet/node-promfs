
"use strict";

// private

	// methods

		/**
		* Async isFile
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _isFile (callback) {

			callback(new Error("Building..."));

		}

// module

module.exports = {

	// async version

	"isFile": _isFile,

	// promise version

	"isFileProm": () => {

		return new Promise((resolve, reject) => {

			_isFile((err) => {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	},

	// sync version

	"isFileSync": () => {
		// nothing to do here
	}

};
