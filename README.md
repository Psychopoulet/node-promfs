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

  #### concatFiles : contact files content in a string
   * ``` concatFiles(array files [ , string encoding [ , string separator ] ], function callback) ``` callback(mixed err, string content)
   * ``` concatFilesSync(array files [ , string encoding [ , string separator ] ]) : return string ```
   * ``` concatFilesProm(array files [ , string encoding [ , string separator ] ]) : return Promise ``` then(string content)

  #### copy : copy a file
   * ``` copy(string origin, string origin, function callback) ``` callback(mixed err)
   * ``` copySync(string origin, string origin) : return bool ```
   * ``` copyProm(string origin, string origin) : return Promise ```

  #### isDirectory
   * ``` isDirectory(string path) ``` callback(mixed err, bool exists)
   * ``` isDirectorySync(string path) : return bool ```
   * ``` isDirectoryProm(string path) : return Promise ``` then(bool exists)

  #### isFile
   * ``` isFile(string path) ``` callback(mixed err, bool exists)
   * ``` isFileSync(string path) : return bool ```
   * ``` isFileProm(string path) : return Promise ``` then(bool exists)

  #### mkdirp : recursively create a directory
   * ``` mkdirp(string path, function callback) ``` callback(mixed err)
   * ``` mkdirpSync(string path) : return bool ```
   * ``` mkdirpProm(string path) : return Promise ```

  #### rmdirp : recursively delete a directory
   * ``` rmdirp(string path) ``` callback(mixed err)=
   * ``` rmdirpSync(string path) : return bool ```
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
