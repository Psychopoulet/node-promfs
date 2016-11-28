
"use strict";

// deps

var fs = require("fs");

var _extends = null;

try {
			_extends = require(require("path").join("..", "build", "Release", "_extends.node"));
} catch (e) {

			try {
						_extends = require(require("path").join("..", "build", "Debug", "_extends.node"));
			} catch (e) {
						_extends = null;
			}
}

if (!_extends) {
			throw new Error("'node-promfs' : Impossible to load native functions");
} else {

			// module

			// copyFile

			// sync version

			fs.copyFileSync = _extends.copyFileSync;

			// async version

			fs.copyFile = _extends.copyFile;

			// promise version

			fs.copyFileProm = _extends.copyFileProm;

			// isDirectory

			// sync version

			fs.isDirectorySync = _extends.isDirectorySync;

			// async version

			fs.isDirectory = _extends.isDirectory;

			// promise version

			fs.isDirectoryProm = _extends.isDirectoryProm;

			// isFile

			// sync version

			fs.isFileSync = _extends.isFileSync;

			// async version

			fs.isFile = _extends.isFile;

			// promise version

			fs.isFileProm = _extends.isFileProm;

			// mkdirp

			// sync version

			fs.mkdirpSync = _extends.mkdirpSync;

			// async version

			fs.mkdirp = _extends.mkdirp;

			// promise version

			fs.mkdirpProm = _extends.mkdirpProm;

			// rmdirp

			// sync version

			fs.rmdirpSync = _extends.rmdirpSync;

			// async version

			fs.rmdirp = _extends.rmdirp;

			// promise version

			fs.rmdirpProm = _extends.rmdirpProm;

			module.exports = fs;
}