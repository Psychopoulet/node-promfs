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
// use fs.dirExists
fs.mkdirp(path.join(__dirname, 'testlvl1', 'testlvl2'));

// recursively delete a directory (sync version, return true|false)
// use fs.dirExists
fs.rmdirp(path.join(__dirname, 'testlvl1'));

```

```js

const fs = require('simplefs'), path = require('path');

// async version of dirExists
fs.adirExists(path.join(__dirname, 'testlvl1', 'testlvl2'), function(err, exists) {

	if (err) {
		console.log(err);
	}
	else if (exists) {
		console.log('already exists');
	}
	else {
		console.log('does not exist');
	}

}); // exists for afileExists

// async version of mkdirp
// use fs.adirExists
fs.amkdirp(path.join(__dirname, 'testlvl1', 'testlvl2'), function(err) {

	if (err) {
		console.log(err);
	}
	else {
		
		// async version of rmdirp
		// use fs.adirExists
		fs.armdirp(path.join(__dirname, 'testlvl1'), function(err) {

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

// promise version of dirExists
fs.pdirExists(path.join(__dirname, 'testlvl1', 'testlvl2')).then(function(err, exists) {

	if (exists) {
		console.log('already exists');
	}
	else {
		console.log('does not exist');
	}

}).catch(function(err) {
	console.log(err);
}); // exists for pfileExists

// promise version of mkdirp
// use fs.adirExists
fs.pmkdirp(path.join(__dirname, 'testlvl1', 'testlvl2')).then(function() {

	// promise version of rmdirp
	// use fs.adirExists
	fs.prmdirp(path.join(__dirname, 'testlvl1')).then(function() {

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
