#!/usr/bin/env node
"use strict";

// deps

	// locals
	const extractFromArgs = require(require("path").join(__dirname, "extractFromArgs.js"));

// module

(0, console).log("");
extractFromArgs((0, process).argv.slice(2, (0, process).argv.length));
