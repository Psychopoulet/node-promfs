
"use strict";

// deps

	const fs = require(require('path').join(__dirname, 'extends.js'));

// promises

	let functionsNames = [

		// simplefs
		'concatFiles', 'copy', 'isDirectory', 'isFile', 'mkdirp', 'rmdirp',

		// classical
		'access', 'appendFile', 'chmod', 'chown', 'close',
		'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimesProm',
		'link', 'lstat', 'mkdtemp', 'open',
		'read', 'readdir', 'readFile',
		'realpath', 'rename', 'stat', 'truncate', 'utimes',
		'write', 'writeFile'

	];

	functionsNames.forEach(name => {

		fs[name + 'Prom'] = function() {

			let args = Array.prototype.slice.call(arguments, 0);

			return new Promise(function(resolve, reject) {

				try {

					fs[name](...args, function(err) {

						if (err) {
							reject((err.message) ? err.message : err);
						}
						else {

							let args = Array.prototype.slice.call(arguments, 0);
							args.shift();

							resolve(...args);
						}

					});

				}
				catch(e) {
					reject(((e.message) ? e.message : e));
				}

			});

		};

	});

	fs.mkdirProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isDirectory(dir, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (exists) {
						resolve();
					}
					else {

						fs.mkdir(dir, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.rmdirProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isDirectory(dir, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (!exists) {
						resolve();
					}
					else {

						fs.rmdir(dir, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.unlinkProm = function(file) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isFile(file, function(err, exists) {

					if (err) {
						reject(err);
					}
					else if (!exists) {
						resolve();
					}
					else {

						fs.unlink(file, function(err) {

							if (err) {
								reject((err.message) ? err.message : err);
							}
							else {
								resolve();
							}

						});

					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

// module

module.exports = fs;
