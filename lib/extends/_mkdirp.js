
"use strict";

// private

	// methods

		/**
		* Async mkdirp
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _mkdirp (callback) {

			process.nextTick(() => {

				callback(new Error("Building..."));

			});

		}

// module

module.exports = {

	// async version

	"mkdirp": _mkdirp,

	// promise version

	"mkdirpProm": () => {

		return new Promise((resolve, reject) => {

			_mkdirp((err) => {

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

	"mkdirpSync": () => {
		// nothing to do here
	}

};
