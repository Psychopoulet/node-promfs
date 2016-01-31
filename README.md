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

fs.mkdirp(path.join(__dirname, 'testlvl1', 'testlvl2')); // sync version
fs.dirExists(__dirname);
fs.fileExists(__filename);

```

## Tests

```bash
$ node tests/tests.js
```

## License

  [ISC](LICENSE)
