# node-promfs
'fs' object extensions & promisifications

[![Build Status](https://api.travis-ci.org/Psychopoulet/node-promfs.svg)](https://travis-ci.org/Psychopoulet/node-promfs)
[![Coverage Status](https://coveralls.io/repos/Psychopoulet/node-promfs/badge.svg)](https://coveralls.io/r/Psychopoulet/node-promfs)
[![Dependency Status](https://img.shields.io/david/Psychopoulet/node-promfs/master.svg)](https://github.com/Psychopoulet/node-promfs)

## Installation

```bash
$ npm install node-promfs
```

## Features

  * promise all fs asynchronous functions

  * checks for file & directory existence, with synchrone & asynchrone versions
  * extract directory's files, with synchrone & asynchrone versions
  * create & delete directories recursively, with synchrone & asynchrone versions
  * concat files content in a string or a file, with synchrone & asynchrone versions
  * copy files, with synchrone & asynchrone versions

## Doc

### -- Extended --

> in "separator" parameter, you can use "{{filename}}" pattern, it will be replaced by the file's basename (ex : separator = "\r\n\r\n--- {{filename}} ---\r\n\r\n")

   [isFile] : does the file exists and is a regular file ?
   * ``` isFile(string path) ``` callback(ReferenceError|TypeError|Error|null err, bool exists)
   * ``` isFileSync(string path) : bool ```
   * ``` isFileProm(string path) : Promise ``` then(bool exists)

   [isDirectory] : does the file exists and is a directory ?
   * ``` isDirectory(string path) ``` callback(ReferenceError|TypeError|Error|null err, bool exists)
   * ``` isDirectorySync(string path) : bool ```
   * ``` isDirectoryProm(string path) : Promise ``` then(bool exists)


  [copyFile] : copy a file with streams (copy then control with isFile)
   * ``` copyFile(string origin, string origin, function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` copyFileSync(string origin, string origin) : void ```
   * ``` copyFileProm(string origin, string origin) : Promise ```

   [extractFiles] : return only files from a directory
   * ``` extractFiles(string directory, function callback) ``` callback(ReferenceError|TypeError|Error|null err, array files)
   * ``` extractFilesSync(string directory) : array ```
   * ``` extractFilesProm(string directory) : Promise ``` then(array files)


   [mkdirp] : recursively create a directory
   * The arguments are the same as [the official documentation's ones for mkdir & mkdirSync](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback)
   * ``` mkdirp(string path [, int mode], function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` mkdirpSync(string path [, int mode]) : void ```
   * ``` mkdirpProm(string path [, int mode]) : Promise ```

   [rmdirp] : recursively delete a directory
   * ``` rmdirp(string path) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` rmdirpSync(string path) : void ```
   * ``` rmdirpProm(string path) : Promise ```


   [filesToStream] : converge files content in a Readable stream
   * ``` filesToStream(array files [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err, Transform stream)
   * ``` filesToStreamProm(array files [ , string separator = " " ]) : Promise ``` then(Transform stream)

   [filesToString] : concat files content in a string
   * ``` filesToString(array files [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err, string content)
   * ``` filesToStringSync(array files [ , string separator = " " ]) : string ```
   * ``` filesToStringProm(array files [ , string separator = " " ]) : Promise ``` then(string content)

   [filesToFile] : concat files content in a file with streams
   * ``` filesToFile(array files, string targetPath [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` filesToFileSync(array files, string targetPath [ , string separator = " " ]) : void ```
   * ``` filesToFileProm(array files, string targetPath [ , string separator = " " ]) : Promise ```


   [directoryToStream] : converge directory's files content in a Readable stream
   * ``` directoryToStream(string directory [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err, string content, Transform stream)
   * ``` directoryToStreamProm(string directory [ , string separator = " " ]) : Promise ``` then(Transform stream)

   [directoryToString] : concat directory's files content in a string
   * ``` directoryToString(string directory [ , string encoding = "utf8" [ , string separator = " " ] ], function callback) ``` callback(ReferenceError|TypeError|Error|null err, string content)
   * ``` directoryToStringSync(string directory [ , string encoding = "utf8" [ , string separator = " " ] ]) : string ```
   * ``` directoryToStringProm(string directory [ , string encoding = "utf8" [ , string separator = " " ] ]) : Promise ``` then(string content)

   [directoryToFile] : concat directory's files content in a file
   * ``` directoryToFile(string directory, string file [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` directoryToFileSync(string directory, string file [ , string separator = " " ]) : void ```
   * ``` directoryToFileProm(string directory, string file [ , string separator = " " ]) : Promise ```


### -- Classical --

  * The arguments are the same as [the official documentation's ones](https://nodejs.org/api/fs.html)
  * "then" data are the same as the callbacks' ones
  * all the methods cannot be tested (too much arguments)
  * ``` accessProm() : Promise ``` -> tested
  * ``` appendFileProm() : Promise ``` -> tested
  * ``` chmodProm() : Promise ``` -> tested
  * ``` chownProm() : Promise ``` -> tested
  * ``` closeProm() : Promise ``` -> tested
  * ``` fchmodProm() : Promise ```
  * ``` fchownProm() : Promise ```
  * ``` fdatasyncProm() : Promise ```
  * ``` fstatProm() : Promise ```
  * ``` fsyncProm() : Promise ```
  * ``` ftruncateProm() : Promise ```
  * ``` futimesProm() : Promise ```
  * ``` linkProm() : Promise ```
  * ``` lstatProm() : Promise ```
  * ``` mkdirProm() : Promise ``` -> tested
  * ``` mkdtempProm() : Promise ```
  * ``` openProm() : Promise ``` -> tested
  * ``` readdirProm() : Promise ``` -> tested
  * ``` readFileProm() : Promise ``` -> tested
  * ``` realpathProm() : Promise ``` -> tested
  * ``` renameProm() : Promise ``` -> tested
  * ``` rmdirProm() : Promise ``` -> tested
  * ``` statProm() : Promise ```
  * ``` truncateProm() : Promise ```
  * ``` unlinkProm() : Promise ``` -> tested
  * ``` utimesProm() : Promise ```
  * ``` writeProm() : Promise ```
  * ``` writeFileProm() : Promise``` -> tested

## Tests

```bash
$ gulp
```

## License

  [ISC](LICENSE)
