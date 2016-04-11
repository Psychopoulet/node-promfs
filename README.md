# simplefs
A basic 'fs' object extension


## Installation

```bash
$ npm install simplefs
```

## Features

  * checks for file & directory existence
  * create & delete directories recursively, with synchrone & asynchone versions

## Examples

```js

const fs = require('simplefs'), path = require('path');

fs.dirExists(__dirname); // return true|false
fs.fileExists(__filename); // return true|false

// recursively create a directory (sync version, return true|false)
fs.mkdirp(path.join(__dirname, 'testlvl1', 'testlvl2'));

// recursively delete a directory (sync version, return true|false)
fs.rmdirp(path.join(__dirname, 'testlvl1'));

```

```js

const fs = require('simplefs'), path = require('path');

fs.amkdirp(path.join(__dirname, 'testlvl1', 'testlvl2'), function(err) { // async version of mkdirp

	if (err) {
		console.log(err);
	}
	else {
		
		fs.armdirp(path.join(__dirname, 'testlvl1'), function(err) { // async version of rmdirp

			if (err) {
				console.log(err);
			}
			else {
				console.log('ok');
			}

		});

	}

});

```

```js

const fs = require('simplefs'), path = require('path');

fs.pmkdirp(path.join(__dirname, 'testlvl1', 'testlvl2')).then(function() { // promise version of mkdirp

	fs.prmdirp(path.join(__dirname, 'testlvl1')).then(function() { // promise version of rmdirp

		console.log('ok');

	}).catch(function(err) {
		console.log(err);
	});

}).catch(function(err) {
	console.log(err);
});

```

## Tests

```bash
$ node tests/tests.js
```

## License

  [ISC](LICENSE)
