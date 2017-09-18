
"use strict";

// deps

	const { readdir, readdirSync, rmdir, rmdirSync, unlink, unlinkSync } = require("fs");
	const { join } = require("path");

	const { isDirectoryProm, isDirectorySync } = require(join(__dirname, "_isDirectory.js"));

// private

	// methods

		/**
		* Async empty directory
		* @param {string} directory : directory path
		* @returns {void}
		*/
		function _emptyDirectoryProm (directory) {

			return new Promise((resolve, reject) => {

				readdir(directory, (err, files) => {
					return err ? reject(err) : resolve(files);
				});

			}).then((files) => {

				return !files.length ? Promise.resolve() : new Promise((resolve, reject) => {

					let countFilesDeleted = 0;

					for (let i = 0; i < files.length && countFilesDeleted < files.length; ++i) {

						const file = join(directory, files[i]);

						isDirectoryProm(file).then((exists) => {

							return exists ? new Promise((resolveRemove, rejectRemove) => {

								_rmdirp(file, (err) => {
									return err ? rejectRemove(err) : resolveRemove();
								});

							}) : new Promise((resolveRemove, rejectRemove) => {

								unlink(file, (err) => {
									return err ? rejectRemove(err) : resolveRemove();
								});

							});

						}).then(() => {

							++countFilesDeleted;

							if (countFilesDeleted >= files.length) {
								resolve();
							}

						}).catch((err) => {
							countFilesDeleted = files.length;
							reject(err);
						});

					}

				});

			});

		}

		/**
		* Async rmdirp
		* @param {string} directory : directory path
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _rmdirp (directory, callback) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if ("undefined" === typeof callback) {
				throw new ReferenceError("missing \"callback\" argument");
			}
				else if ("function" !== typeof callback) {
					throw new TypeError("\"callback\" argument is not a function");
				}
			else {

				isDirectoryProm(directory).then((exists) => {

					return !exists ? Promise.resolve() : _emptyDirectoryProm(directory).then(() => {

						return new Promise((resolve, reject) => {

							rmdir(directory, (err) => {
								return err ? reject(err) : resolve();
							});

						});

					});

				}).then(() => {
					callback(null);
				}).catch(callback);

			}

		}

		/**
		* Recursive rmdirpSync
		* @param {string} directory : directory path
		* @returns {void}
		*/
		function _rmdirpSync (directory) {

			if ("undefined" === typeof directory) {
				throw new ReferenceError("missing \"directory\" argument");
			}
				else if ("string" !== typeof directory) {
					throw new TypeError("\"directory\" argument is not a string");
				}
				else if ("" === directory.trim()) {
					throw new Error("\"directory\" argument is empty");
				}
			else if (isDirectorySync(directory)) {

				readdirSync(directory).forEach((_file) => {

					const file = join(directory, _file);

					if (isDirectorySync(file)) {
						_rmdirpSync(file);
					}
					else {
						unlinkSync(file);
					}

				});

				rmdirSync(directory);

			}

		}

// module

module.exports = {

	// async version

	"rmdirp": _rmdirp,

	// promise version

	"rmdirpProm": (directory) => {

		return new Promise((resolve, reject) => {

			_rmdirp(directory, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	},

	// sync version

	"rmdirpSync": _rmdirpSync

};
