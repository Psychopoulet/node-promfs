
"use strict";

// deps

	const path = require("path");
	const fs = require("fs");

	const copyFile = require(path.join(__dirname, "_copyFile.js"));
	const directoryToFile = require(path.join(__dirname, "_directoryToFile.js"));
	const directoryToString = require(path.join(__dirname, "_directoryToString.js"));
	const extractFiles = require(path.join(__dirname, "_extractFiles.js"));
	const filesToFile = require(path.join(__dirname, "_filesToFile.js"));
	const filesToString = require(path.join(__dirname, "_filesToString.js"));
	const isDirectory = require(path.join(__dirname, "_isDirectory.js"));
	const isFile = require(path.join(__dirname, "_isFile.js"));
	const mkdirp = require(path.join(__dirname, "_mkdirp.js"));
	const rmdirp = require(path.join(__dirname, "_rmdirp.js"));

// module

	// copyFile

		fs.copyFileSync = copyFile.copyFileSync;
		fs.copyFile = copyFile.copyFile;
		fs.copyFileProm = copyFile.copyFileProm;

	// directoryToFile

		fs.directoryToFileSync = directoryToFile.directoryToFileSync;
		fs.directoryToFile = directoryToFile.directoryToFile;
		fs.directoryToFileProm = directoryToFile.directoryToFileProm;

	// directoryToString

		fs.directoryToStringSync = directoryToString.directoryToStringSync;
		fs.directoryToString = directoryToString.directoryToString;
		fs.directoryToStringProm = directoryToString.directoryToStringProm;

	// extractFiles

		fs.extractFilesSync = extractFiles.extractFilesSync;
		fs.extractFiles = extractFiles.extractFiles;
		fs.extractFilesProm = extractFiles.extractFilesProm;

	// filesToFile

		fs.filesToFileSync = filesToFile.filesToFileSync;
		fs.filesToFile = filesToFile.filesToFile;
		fs.filesToFileProm = filesToFile.filesToFileProm;

	// filesToString

		fs.filesToStringSync = filesToString.filesToStringSync;
		fs.filesToString = filesToString.filesToString;
		fs.filesToStringProm = filesToString.filesToStringProm;

	// isDirectory

		fs.isDirectorySync = isDirectory.isDirectorySync;
		fs.isDirectory = isDirectory.isDirectory;
		fs.isDirectoryProm = isDirectory.isDirectoryProm;

	// isFile

		fs.isFileSync = isFile.isFileSync;
		fs.isFile = isFile.isFile;
		fs.isFileProm = isFile.isFileProm;

	// mkdirp

		fs.mkdirpSync = mkdirp.mkdirpSync;
		fs.mkdirp = mkdirp.mkdirp;
		fs.mkdirpProm = mkdirp.mkdirpProm;

	// rmdirp

		fs.rmdirpSync = rmdirp.rmdirpSync;
		fs.rmdirp = rmdirp.rmdirp;
		fs.rmdirpProm = rmdirp.rmdirpProm;

module.exports = fs;
