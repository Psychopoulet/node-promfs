
"use strict";

// private

	// methods

		/**
		* Async rmdirp
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _rmdirp (callback) {

			process.nextTick(() => {

				callback(new Error("Building..."));

			});

		}

// module

module.exports = {

	// async version

	"rmdirp": _rmdirp,

	// promise version

	"rmdirpProm": () => {

		return new Promise((resolve, reject) => {

			_rmdirp((err) => {

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

	"rmdirpSync": () => {
		// nothing to do here
	}

};
