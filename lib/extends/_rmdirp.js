
"use strict";

// deps

	const { readdir, readdirSync, rmdir, rmdirSync, unlink, unlinkSync } = require("fs");
	const { join } = require("path");

	const { isDirectory, isDirectorySync } = require(join(__dirname, "_isDirectory.js"));

// private

	// methods

		/**
		* Async empty directory
		* @param {string} directory : directory path
		* @param {function|null} callback : operation's result
		* @returns {void}
		*/
		function _emptyDirectory (directory, callback) {

			process.nextTick(() => {

				readdir(directory, (err, files) => {

					if (err) {
						callback(err);
					}
					else if (!files.length) {
						callback(null);
					}
					else {

						let countFilesDeleted = 0;

						files.forEach((_file) => {

							const file = join(directory, _file);

							isDirectory(file, (_err, exists) => {

								if (countFilesDeleted >= files.length) {
									// nothing to do here
								}
								else if (_err) {
									countFilesDeleted = files.length;
									callback(_err);
								}
								else if (exists) {

									_rmdirp(file, (__err) => {

										if (countFilesDeleted >= files.length) {
											// nothing to do here
										}
										else if (__err) {
											countFilesDeleted = files.length;
											callback(__err);
										}
										else {

											++countFilesDeleted;

											if (countFilesDeleted >= files.length) {
												callback(null);
											}

										}

									});

								}
								else {

									unlink(file, (__err) => {

										if (countFilesDeleted >= files.length) {
											// nothing to do here
										}
										else if (__err) {
											countFilesDeleted = files.length;
											callback(__err);
										}
										else {

											++countFilesDeleted;

											if (countFilesDeleted >= files.length) {
												callback(null);
											}

										}

									});

								}

							});

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

				process.nextTick(() => {

					isDirectory(directory, (errIsDirectory, existsIsDirectory) => {

						if (errIsDirectory) {
							callback(errIsDirectory);
						}
						else if (!existsIsDirectory) {
							callback(null);
						}
						else {

							_emptyDirectory(directory, (err) => {

								if (err) {
									callback(err);
								}
								else {
									rmdir(directory, callback);
								}

							});

						}

					});

				});

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
