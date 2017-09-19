
"use strict";

// deps

var path = require("path");
var fs = require("fs");

var isFile = require(path.join(__dirname, "_isFile.js"));
var isDirectory = require(path.join(__dirname, "_isDirectory.js"));

var copyFile = require(path.join(__dirname, "_copyFile.js"));
var extractFiles = require(path.join(__dirname, "_extractFiles.js"));

var mkdirp = require(path.join(__dirname, "_mkdirp.js"));
var rmdirp = require(path.join(__dirname, "_rmdirp.js"));

var filesToStream = require(path.join(__dirname, "_filesToStream.js"));
var filesToString = require(path.join(__dirname, "_filesToString.js"));
var filesToFile = require(path.join(__dirname, "_filesToFile.js"));

var directoryToStream = require(path.join(__dirname, "_directoryToStream.js"));
var directoryToString = require(path.join(__dirname, "_directoryToString.js"));
var directoryToFile = require(path.join(__dirname, "_directoryToFile.js"));

// module

// isFile

fs.isFileSync = isFile.isFileSync;
fs.isFile = isFile.isFile;
fs.isFileProm = isFile.isFileProm;

// isDirectory

fs.isDirectorySync = isDirectory.isDirectorySync;
fs.isDirectory = isDirectory.isDirectory;
fs.isDirectoryProm = isDirectory.isDirectoryProm;

// copyFile

fs.copyFileSync = copyFile.copyFileSync;
fs.copyFile = copyFile.copyFile;
fs.copyFileProm = copyFile.copyFileProm;

// extractFiles

fs.extractFilesSync = extractFiles.extractFilesSync;
fs.extractFiles = extractFiles.extractFiles;
fs.extractFilesProm = extractFiles.extractFilesProm;

// mkdirp

fs.mkdirpSync = mkdirp.mkdirpSync;
fs.mkdirp = mkdirp.mkdirp;
fs.mkdirpProm = mkdirp.mkdirpProm;

// rmdirp

fs.rmdirpSync = rmdirp.rmdirpSync;
fs.rmdirp = rmdirp.rmdirp;
fs.rmdirpProm = rmdirp.rmdirpProm;

// filesToStream

fs.filesToStream = filesToStream.filesToStream;
fs.filesToStreamProm = filesToStream.filesToStreamProm;

// filesToString

fs.filesToStringSync = filesToString.filesToStringSync;
fs.filesToString = filesToString.filesToString;
fs.filesToStringProm = filesToString.filesToStringProm;

// filesToFile

fs.filesToFileSync = filesToFile.filesToFileSync;
fs.filesToFile = filesToFile.filesToFile;
fs.filesToFileProm = filesToFile.filesToFileProm;

// directoryToStream

fs.directoryToStream = directoryToStream.directoryToStream;
fs.directoryToStreamProm = directoryToStream.directoryToStreamProm;

// directoryToString

fs.directoryToStringSync = directoryToString.directoryToStringSync;
fs.directoryToString = directoryToString.directoryToString;
fs.directoryToStringProm = directoryToString.directoryToStringProm;

// directoryToFile

fs.directoryToFileSync = directoryToFile.directoryToFileSync;
fs.directoryToFile = directoryToFile.directoryToFile;
fs.directoryToFileProm = directoryToFile.directoryToFileProm;

module.exports = fs;