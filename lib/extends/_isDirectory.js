
"use strict";

// private

	// methods

		/**
		* Async isDirectory
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _isDirectory (callback) {

			callback(new Error("Building..."));

		}

// module

module.exports = {

	// async version

	"isDirectory": _isDirectory,

	// promise version

	"isDirectoryProm": () => {

		return new Promise((resolve, reject) => {

			_isDirectory((err) => {

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

	"isDirectorySync": () => {
		// nothing to do here
	}

};
