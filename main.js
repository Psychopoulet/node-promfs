
"use strict";

// deps

const fs = require('fs'), path = require('path');

// dirExists
	
	// sync version

	fs.dirExists = function(dir) {

		let bResult = false;

			try {
				bResult = ('string' === typeof dir && fs.lstatSync(dir).isDirectory());
			}
			catch (e) {
				bResult = false;
			}

		return bResult;

	};

	// async version

	fs.adirExists = function(dir, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			if ('string' !== typeof dir) {
				callback("'dir' is not a string");
			}
			else {

				fs.lstat(dir, function(err, stats) {
					callback(null, (!err && stats && stats.isDirectory()));
				});

			}

		}
		catch (e) {
			callback((e.message) ? e.message : e);
		}

	};

	// promise version

	fs.pdirExists = function(dir) {

		return new Promise(function(resolve, reject) {

			fs.adirExists(dir, function(err, exists) {

				if (err) {
					reject(err);
				}
				else {
					resolve(exists);
				}

			});

		});

	};

// fileExists
	
	// sync version

	fs.fileExists = function(file) {

		let bResult = false;

			try {
				bResult = ('string' === typeof file && fs.lstatSync(file).isFile());
			}
			catch (e) {
				bResult = false;
			}

		return bResult;

	};

	// async version

	fs.adfileExists = function(file, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			if ('string' !== typeof file) {
				callback("'file' is not a string");
			}
			else {

				fs.lstat(file, function(err, stats) {
					callback(null, (!err && stats && stats.isFile()));
				});

			}

		}
		catch (e) {
			callback((e.message) ? e.message : e);
		}

	};

	// promise version

	fs.pfileExists = function(file) {

		return new Promise(function(resolve, reject) {

			fs.adfileExists(file, function(err, exists) {

				if (err) {
					reject(err);
				}
				else {
					resolve(exists);
				}

			});

		});

	};

// mkdir
	
	// sync version

	fs.mkdirp = function(dir) {

		let bResult = false;

			try {

				if (fs.dirExists(dir)) {
					bResult = true;
				}
				else if (fs.dirExists(path.dirname(dir)) || fs.mkdirp(path.dirname(dir))) {
					fs.mkdirSync(dir, parseInt('0777', 8));
					bResult = true;
				}

			}
			catch (e) {
				bResult = false;
			}

		return bResult;

	};

	// async version

	fs.amkdirp = function(dir, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			fs.adirExists(dir, function(err, exists) {

				if (err) {
					callback(err);
				}
				else if (exists) {
					callback(null);
				}
				else {

					fs.amkdirp(path.dirname(dir), function(err) {

						if (err) {
							callback(err);
						}
						else {

							fs.mkdir(dir, parseInt('0777', 8), function(err) {

								if (err) {
									callback((err.message) ? err.message : err);
								}
								else {
									callback(null);
								}
								
							});

						}
						
					});

				}

			});

		}
		catch (e) {
			callback((e.message) ? e.message : e);
		}

	};

	// promise version

	fs.pmkdirp = function(dir) {

		return new Promise(function(resolve, reject) {

			fs.amkdirp(dir, function(err) {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	};

// rmdir

	// sync version

	fs.rmdirp = function(dir) {

		let bResult = false;

			try {

				if(!fs.dirExists(dir)) {
					bResult = true;
				}
				else {

					fs.readdirSync(dir).forEach(function(file) {

						let curPath = path.join(dir, file);

						if(fs.dirExists(curPath)) {
							fs.rmdirp(curPath);
						}
						else if (fs.fileExists(curPath)) {
							fs.unlinkSync(curPath);
						}

					});

					fs.rmdirSync(dir);

					bResult = true;

				}

			}
			catch (e) {
				bResult = false;
			}

		return bResult;

	};

	// async version

	fs.armdirp = function(dir, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			fs.adirExists(dir, function(err, exists) {

				if (err) {
					callback(err);
				}
				else if (!exists) {
					callback(null);
				}
				else {

					fs.readdir(dir, function(err, files) {

						if (err) {
							callback((err.message) ? err.message : err);
						}
						else {

							function removeContent(i) {

								if (i >= files.length) {

									fs.rmdir(dir, function(err) {

										if (err) {
											callback((err.message) ? err.message : err);
										}
										else {
											callback(null);
										}

									});

								}
								else {

									let curPath = path.join(dir, files[i]);

									fs.adirExists(curPath, function(err, exists) {

										if (err) {
											callback(err);
										}
										else if (exists) {

											fs.armdirp(curPath, function(err) {

												if (err) {
													callback(err);
												}
												else {
													removeContent(i + 1);
												}

											});

										}
										else {
											
											fs.unlink(curPath, function(err) {

												if (err) {
													callback((err.message) ? err.message : err);
												}
												else {
													removeContent(i + 1);
												}

											});

										}

									});

								}

							}

							removeContent(0);

						}

					});

				}

			});

		}
		catch (e) {
			callback((e.message) ? e.message : e);
		}

	};

	// promise version

	fs.prmdirp = function(dir) {

		return new Promise(function(resolve, reject) {

			fs.armdirp(dir, function(err) {

				if (err) {
					reject(err);
				}
				else {
					resolve();
				}

			});

		});

	};

module.exports = fs;
