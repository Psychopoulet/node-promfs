/*
	eslint no-use-before-define: 0, no-loop-func: 0
*/

"use strict";

// deps

	// natives
	const { readdir, readdirSync, rmdir, rmdirSync, unlink, unlinkSync } = require("fs");
	const { join } = require("path");

	// locals
	const { isDirectoryProm, isDirectorySync } = require(join(__dirname, "_isDirectory.js"));

// private

	// methods

		/**
		* Remove directory's content
		* @param {Array} contents : directory content
		* @returns {Promise}: Operation's result
		*/
		function _removeDirectoryContentProm (contents) {

			const content = contents.shift();

			return isDirectoryProm(content).then((exists) => {

				return exists ? new Promise((resolve, reject) => {

					_rmdirp(content, (err) => {
						return err ? reject(err) : resolve();
					});

				}) : new Promise((resolve, reject) => {

					unlink(content, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			}).then(() => {
				return contents.length ? _removeDirectoryContentProm(contents) : Promise.resolve();
			});

		}

		/**
		* Async empty directory
		* @param {string} directory : directory path
		* @returns {Promise}: Operation's result
		*/
		function _emptyDirectoryProm (directory) {

			return new Promise((resolve, reject) => {

				readdir(directory, (err, files) => {
					return err ? reject(err) : resolve(files);
				});

			}).then((files) => {

				const result = [];

					for (let i = 0; i < files.length; ++i) {
						result.push(join(directory, files[i]));
					}

				return Promise.resolve(result);

			}).then((files) => {
				return files.length ? _removeDirectoryContentProm(files) : Promise.resolve();
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
