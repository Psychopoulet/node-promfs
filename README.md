# node-promfs
'fs' object native extensions & promisifications

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

note : in "separator" parameter, you can use "{{filename}}" pattern, it will be replaced by the file's basename
(ex : separator = "\r\n\r\n--- {{filename}} ---\r\n\r\n")

  #### copyFile : copy a file with streams (copy then control with isFile) -> native
   * ``` copyFile(string origin, string origin, function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` copyFileSync(string origin, string origin) : void ```
   * ``` copyFileProm(string origin, string origin) : Promise ```

  #### directoryToFile : concat directory's files content in a file (extractFilesSync && filesToFileSync)
   * ``` directoryToFile(string path [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` directoryToFileSync(string path [ , string separator = " " ]) : void ```
   * ``` directoryToFileProm(string path [ , string separator = " " ]) : Promise ```

  #### directoryToString : concat directory's files content in a string (extractFilesSync && filesToStringSync)
   * ``` directoryToString(string path [ , string encoding = "utf8" [ , string separator = " " ] ], function callback) ``` callback(ReferenceError|TypeError|Error|null err, string content)
   * ``` directoryToStringSync(string path [ , string encoding = "utf8" [ , string separator = " " ] ]) : string ```
   * ``` directoryToStringProm(string path [ , string encoding = "utf8" [ , string separator = " " ] ]) : Promise ``` then(string content)

  #### extractFiles : return only files from a directory
   * ``` extractFiles(string directory, function callback) ``` callback(ReferenceError|TypeError|Error|null err, array files)
   * ``` extractFilesSync(string directory) : array ```
   * ``` extractFilesProm(string directory) : Promise ``` then(array files)

  #### filesToFile : concat files content in a file with streams
   * ``` filesToFile(array files, string targetPath [ , string separator = " " ], function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` filesToFileSync(array files, string targetPath [ , string separator = " " ]) : void ```
   * ``` filesToFileProm(array files, string targetPath [ , string separator = " " ]) : Promise ```

  #### filesToString : concat files content in a string
   * ``` filesToString(array files [ , string encoding = "utf8" [ , string separator = " " ] ], function callback) ``` callback(ReferenceError|TypeError|Error|null err, string content)
   * ``` filesToStringSync(array files [ , string encoding = "utf8" [ , string separator = " " ] ]) : string ```
   * ``` filesToStringProm(array files [ , string encoding = "utf8" [ , string separator = " " ] ]) : Promise ``` then(string content)

  #### isDirectory : does the file exists and is a directory ? -> native
   * ``` isDirectory(string path) ``` callback(ReferenceError|TypeError|Error|null err, bool exists)
   * ``` isDirectorySync(string path) : bool ```
   * ``` isDirectoryProm(string path) : Promise ``` then(bool exists)

  #### isFile : does the file exists and is a regular file ? -> native
   * ``` isFile(string path) ``` callback(ReferenceError|TypeError|Error|null err, bool exists)
   * ``` isFileSync(string path) : bool ```
   * ``` isFileProm(string path) : Promise ``` then(bool exists)

  #### mkdirp : recursively create a directory
   * ``` mkdirp(string path, function callback) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` mkdirpSync(string path) : void ```
   * ``` mkdirpProm(string path) : Promise ```

  #### rmdirp : recursively delete a directory
   * ``` rmdirp(string path) ``` callback(ReferenceError|TypeError|Error|null err)
   * ``` rmdirpSync(string path) : void ```
   * ``` rmdirpProm(string path) : Promise ```

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
