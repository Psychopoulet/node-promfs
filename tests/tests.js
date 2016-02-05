"use strict";

// deps

	const 	fs = require('../main.js'),
			path = require('path');

// run

	try {

		var dirtest = path.join(__dirname, 'testlvl1', 'testlvl2');

		console.log("");
		console.log("----------------");
		console.log("test dir");
		console.log("----------------");
		console.log("must be == false :");
		console.log(fs.dirExists(false));
		console.log("must be == false :");
		console.log(fs.dirExists('eivrjeoirvneornv'));
		console.log("must be == true :");
		console.log(fs.dirExists(__dirname));
		console.log("must be == false :");
		console.log(fs.dirExists(dirtest));
		console.log("must be == true :");
		console.log(fs.mkdirp(dirtest));
		console.log("must be == true :");
		console.log(fs.dirExists(dirtest));
		console.log("must be == true :");
		console.log(fs.rmdirp(path.join(__dirname, 'testlvl1')));
		console.log("----------------");
		console.log("");

		console.log("");
		console.log("----------------");
		console.log("test file");
		console.log("----------------");
		console.log("must be == false :");
		console.log(fs.fileExists(false));
		console.log("must be == false :");
		console.log(fs.fileExists('eivrjeoirvneornv'));
		console.log("must be == true :");
		console.log(fs.fileExists(__filename));
		console.log("----------------");
		console.log("");

	}
	catch(e) {
		console.log((e.message) ? e.message : e);
	}
