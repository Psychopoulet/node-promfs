# node-promfs
A basic 'fs' object extension


## Installation

```bash
$ npm install node-promfs
```

## Features

  * promise all fs asynchronous functions

  * checks for file & directory existence, with synchrone & asynchrone versions
  * create & delete directories recursively, with synchrone & asynchrone versions
  * concat files content in a string, with synchrone & asynchrone versions
  * copy files, with synchrone & asynchrone versions

## Doc

 ### Extended

  #### filesToString : concat files content in a string
   * ``` filesToString(array files [ , string encoding = "utf8" [ , string separator = " " ] ], function callback) ``` callback(string|null err, string content)
   * ``` filesToStringSync(array files [ , string encoding = "utf8" [ , string separator = " " ] ]) : return string ```
   * ``` filesToStringProm(array files [ , string encoding = "utf8" [ , string separator = " " ] ]) : return Promise ``` then(string content)

  #### filesToFile : concat files content in a file
   * ``` filesToFile(array files, string targetPath [ , string separator = " " ], function callback) ``` callback(string|null err)
   * ``` filesToFileSync(array files, string targetPath [ , string separator = " " ]) ```
   * ``` filesToFileProm(array files, string targetPath [ , string separator = " " ]) : return Promise ```

  #### directoryFilesToString : concat directory's files content in a string
   * ``` directoryFilesToString(string path [ , string encoding = "utf8" [ , string separator = " " ] ], function callback) ``` callback(string|null err, string content)
   * ``` directoryFilesToStringSync(string path [ , string encoding = "utf8" [ , string separator = " " ] ]) : return string ```
   * ``` directoryFilesToStringProm(string path [ , string encoding = "utf8" [ , string separator = " " ] ]) : return Promise ``` then(string content)

  #### directoryFilesToFile : concat directory's files content in a file
   * ``` directoryFilesToFile(string path [ , string separator = " " ], function callback) ``` callback(string|null err)
   * ``` directoryFilesToFileSync(string path [ , string separator = " " ]) ```
   * ``` directoryFilesToFileProm(string path [ , string separator = " " ]) : return Promise ```

  #### copy : copy a file with streams
   * ``` copy(string origin, string origin, function callback) ``` callback(string|null err)
   * ``` copySync(string origin, string origin) ``` /!\ does not use streams /!\
   * ``` copyProm(string origin, string origin) : return Promise ```

  #### isDirectory
   * ``` isDirectory(string path) ``` callback(string|null err, bool exists)
   * ``` isDirectorySync(string path) : return bool ```
   * ``` isDirectoryProm(string path) : return Promise ``` then(bool exists)

  #### isFile
   * ``` isFile(string path) ``` callback(string|null err, bool exists)
   * ``` isFileSync(string path) : return bool ```
   * ``` isFileProm(string path) : return Promise ``` then(bool exists)

  #### mkdirp : recursively create a directory
   * ``` mkdirp(string path, function callback) ``` callback(string|null err)
   * ``` mkdirpSync(string path) ```
   * ``` mkdirpProm(string path) : return Promise ```

  #### rmdirp : recursively delete a directory
   * ``` rmdirp(string path) ``` callback(string|null err)=
   * ``` rmdirpSync(string path) ```
   * ``` rmdirpProm(string path) : return Promise ```

 ### Classical

  * The arguments are the same as [the official documentation's ones](https://nodejs.org/api/fs.html)
  * "then" data are the same as the callbacks' ones
  * ``` accessProm() : return Promise ```
  * ``` appendFileProm() : return Promise ```
  * ``` chmodProm() : return Promise ```
  * ``` chownProm() : return Promise ```
  * ``` closeProm() : return Promise ```
  * ``` fchmodProm() : return Promise ```
  * ``` fchownProm() : return Promise ```
  * ``` fdatasyncProm() : return Promise ```
  * ``` fstatProm() : return Promise ```
  * ``` fsyncProm() : return Promise ```
  * ``` ftruncateProm() : return Promise ```
  * ``` futimesProm() : return Promise ```
  * ``` linkProm() : return Promise ```
  * ``` lstatProm() : return Promise ```
  * ``` mkdirProm() : return Promise ```
  * ``` mkdtempProm() : return Promise ```
  * ``` openProm() : return Promise ```
  * ``` readdirProm() : return Promise ```
  * ``` readFileProm() : return Promise ```
  * ``` realpathProm() : return Promise ```
  * ``` renameProm() : return Promise ```
  * ``` rmdirProm() : return Promise ```
  * ``` statProm() : return Promise ```
  * ``` truncateProm() : return Promise ```
  * ``` unlinkProm() : return Promise ```
  * ``` utimesProm() : return Promise ```
  * ``` writeProm() : return Promise ```
  * ``` writeFileProm() : return Promise```

## Tests

```bash
$ gulp
```

## License

  [ISC](LICENSE)
