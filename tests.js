"use strict";

// deps

	const fs = require('./main.js');

// run

	try {

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
