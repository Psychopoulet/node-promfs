# simplefs
A basic 'fs' object extension


## Installation

```bash
$ npm install simplefs
```

## Features

  * fs.fileExists
  * fs.dirExists

## Examples

```js

const fs = require('simplefs');

fs.dirExists(__dirname);
fs.fileExists(__filename);

```

## Tests

```bash
$ node tests.js
```

## License

  [ISC](LICENSE)
