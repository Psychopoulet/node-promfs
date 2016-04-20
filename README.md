# simplefs
A basic 'fs' object extension


## Installation

```bash
$ npm install simplefs
```

## Notes

Be carefull ! To be more stable and logicaly "fs compatible", this new version does no longer work like the previous.

## Features

  * checks for file & directory existence, with synchrone & asynchrone versions
  * create & delete directories recursively, with synchrone & asynchrone versions
  * concat files content in a string, with synchrone & asynchrone versions
  * move and copy files, with synchrone & asynchrone versions

  * ... and add promise wrappers for some asynchrone functions (more will come later)

## Examples

```js

// sync

const fs = require('simplefs'), path = require('path');

fs.isFileSync(__filename); // return true|false
fs.isDirectorySync(__dirname); // return true|false

// recursively create a directory
// check if the directory already exists before, so you don't have to do it
fs.mkdirpSync(path.join(__dirname, 'testlvl1', 'testlvl2')); // return true|false

// recursively delete a directory
// check if the directory doesn't exist before, so you don't have to do it
fs.rmdirpSync(path.join(__dirname, 'testlvl1')); // return true|false

// concate files content
// (array files [, string separator = ''])
fs.concatFilesSync([ file1, file2, file3 ], "\n"); // return true|false

// copy file
fs.copySync(origin, target); // return true|false

```

```js

// async

const fs = require('simplefs'), path = require('path');

fs.isFile(__filename, callback); // callback(null|string err, bool exists)
fs.isDirectory(__dirname, callback); // callback(null|string err, bool exists)

// recursively create a directory
// check if the directory already exists before, so you don't have to do it
fs.mkdirp(path.join(__dirname, 'testlvl1', 'testlvl2'), callback); // callback(null|string err)

// recursively delete a directory
// check if the directory doesn't exist before, so you don't have to do it
fs.rmdirp(path.join(__dirname, 'testlvl1'), callback); // callback(null|string err)

// concate files content
// (array files [, string separator = ''], callback)
fs.concatFiles([ file1, file2, file3 ], "\n", callback); // callback(null|string err, string content)

// copy file
fs.copySync(origin, target, callback); // callback(null|string err)

```

```js

// promise

const fs = require('simplefs'), path = require('path');

fs.isFileProm(__filename); // return a Promise instance
fs.isDirectoryProm(__dirname); // return a Promise instance

// recursively create a directory
// check if the directory already exists before, so you don't have to do it
fs.mkdirpProm(path.join(__dirname, 'testlvl1', 'testlvl2')); // return a Promise instance

// recursively delete a directory
// check if the directory doesn't exist before, so you don't have to do it
fs.rmdirpProm(path.join(__dirname, 'testlvl1')); // return a Promise instance

// concate files content
// (array files [, string separator = ''])
fs.concatFilesProm([ file1, file2, file3 ], "\n"); // return a Promise instance

// copy file
fs.copyProm(origin, target); // return a Promise instance

// and some classical others...
// fs.writeFileProm
// fs.appendFileProm
// fs.readFileProm
// fs.unlinkProm

```

## Tests

```bash
$ node tests/tests.js
```

## License

  [ISC](LICENSE)
