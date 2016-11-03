
"use strict";

// deps

const fs = require("fs");

var _extends;

try {
		_extends = require(require("path").join("..", "build", "Release", "_extends.node"));
} catch (e) {
		_extends = require(require("path").join("..", "build", "Debug", "_extends.node"));
}

// module

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

module.exports = fs;