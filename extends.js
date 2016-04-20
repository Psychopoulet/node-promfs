
"use strict";

// deps

const path = require('path'), fs = require('fs');

// isFile
	
	// sync version

	fs.isFileSync = function(file) {

		if ('string' !== typeof file) {
			throw "This is not a string"
		}

		try {
			return (fs.lstatSync(file).isFile());
		}
		catch (e) {
			return false;
		}

	};

	// async version

	fs.isFile = function(file, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			if ('string' !== typeof file) {
				callback("This is not a string");
			}
			else {

				fs.stat(file, function(err, stats) {
					callback(null, (!err && stats && stats.isFile()));
				});

			}

		}
		catch (e) {
			callback((e.message) ? e.message : e);
		}

	};

// isDirectory
	
	// sync version

	fs.isDirectorySync = function(dir) {

		if ('string' !== typeof dir) {
			throw "This is not a string"
		}

		try {
			return (fs.statSync(dir).isDirectory());
		}
		catch (e) {
			return false;
		}

	};

	// async version

	fs.isDirectory = function(dir, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			if ('string' !== typeof dir) {
				callback("This is not a string");
			}
			else {

				fs.stat(dir, function(err, stats) {
					callback(null, (!err && stats && stats.isDirectory()));
				});

			}

		}
		catch (e) {
			callback((e.message) ? e.message : e);
		}

	};

// mkdirp
	
	// sync version

	fs.mkdirpSync = function(dir) {

		if (fs.isDirectorySync(dir)) {
			return true;
		}
		else if (fs.isDirectorySync(path.dirname(dir)) || fs.mkdirpSync(path.dirname(dir))) {
			fs.mkdirSync(dir, parseInt('0777', 8));
			return true;
		}

	};

	// async version

	fs.mkdirp = function(dir, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			fs.isDirectory(dir, function(err, exists) {

				if (err) {
					callback(err);
				}
				else if (exists) {
					callback(null);
				}
				else {

					fs.mkdirp(path.dirname(dir), function(err) {

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

// rmdirp

	// sync version

	fs.rmdirpSync = function(dir) {

		if(!fs.isDirectorySync(dir)) {
			return true;
		}
		else {

			fs.readdirSync(dir).forEach(function(file) {

				let curPath = path.join(dir, file);

				if(fs.isDirectorySync(curPath)) {
					fs.rmdirpSync(curPath);
				}
				else if (fs.isFileSync(curPath)) {
					fs.unlinkSync(curPath);
				}

			});

			fs.rmdirSync(dir);

			return true;

		}

	};

	// async version

	fs.rmdirp = function(dir, callback) {

		callback = ('function' === typeof callback) ? callback : function(){};

		try {

			fs.isDirectory(dir, function(err, exists) {

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

									// no content anymore
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

									fs.isDirectory(curPath, function(err, exists) {

										if (err) {
											callback(err);
										}
										else if (exists) {

											fs.rmdirp(curPath, function(err) {

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

/*// concat

	// sync version

	fs.concatFilesSync = function(files) {

	};

	// async version

	fs.concatFile = function(files) {

	};*/

module.exports = fs;
