
"use strict";

// const

const fs = require(require('path').join(__dirname, 'extends.js'));

// module

	fs.isFileProm = function(file) {

		return new Promise(function(resolve, reject) {

			try {

				fs.isFile(file, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {
						resolve(exists);
					}

				});
	
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.isDirectoryProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.isDirectory(dir, function(err, exists) {

					if (err) {
						reject(err);
					}
					else {
						resolve(exists);
					}

				});
		
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.mkdirpProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.mkdirp(dir, function(err) {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});
	
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.rmdirpProm = function(dir) {

		return new Promise(function(resolve, reject) {

			try {
				
				fs.rmdirp(dir, function(err) {

					if (err) {
						reject(err);
					}
					else {
						resolve();
					}

				});
	
			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.writeFileProm = function(file, message, options) {

		return new Promise(function(resolve, reject) {

			try {

				fs.writeFile(file, message, (options) ? options : null, function(err) {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						resolve();
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.appendFileProm = function(file, message, options) {

		return new Promise(function(resolve, reject) {

			try {

				fs.appendFile(file, message, (options) ? options : null, function(err) {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						resolve();
					}

				});

			}
			catch(e) {
				reject(((e.message) ? e.message : e));
			}

		});

	};

	fs.readFileProm = function(file, options) {

		return new Promise(function(resolve, reject) {

			try {

				fs.readFile(file, (options) ? options : null, function(err, data) {

					if (err) {
						reject((err.message) ? err.message : err);
					}
					else {
						resolve(data);
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

	/*if (!fs.pconcat) {

		fs.pconcat = function(files) {

			return new Promise(function(resolve, reject) {

				try {

					if ('object' !== typeof files || !(files instanceof Array)) {
						reject('This is not an array');
					}
					else {

						let i = files.length, ok = true;

						files.forEach(function (file) {

							if (ok) {

								fs.pfileExists(file).then(function(exists) {

									if (exists) {

										fs.preadFile(p_sFile, 'utf8').then(function (data) {

											i--;

											sResult += data + "\r\n";

											if (0 === i) {
												resolve(sResult);
											}

										}).catch(function(err) {
											ok = false; reject(err);
										});

									}
									else if (0 === i) {
										i--;
										resolve(sResult);
									}

								}).catch(function(err) {
									ok = false; reject(err);
								});
								
							}

						});

					}

				}
				catch(e) {
					reject(((e.message) ? e.message : e));
				}

			});

		};

	}*/

module.exports = fs;
