# simplefs
A basic 'fs' object extension


## Installation

```bash
$ npm install simplefs
```

## Features

  * fs.fileExists
  * fs.dirExists
  * fs.mkdirp

## Examples

```js

const fs = require('simplefs'), path = require('path');

fs.dirExists(__dirname); // return true|false
fs.fileExists(__filename); // return true|false
fs.mkdirp(path.join(__dirname, 'testlvl1', 'testlvl2')); // sync version, return true|false
fs.rmdirp(path.join(__dirname, 'testlvl1')); // sync version, return true|false

```

## Tests

```bash
$ node tests/tests.js
```

## License

  [ISC](LICENSE)
