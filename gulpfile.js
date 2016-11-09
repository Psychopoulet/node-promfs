
"use strict";

// deps

	const	path = require("path"),

			gulp = require("gulp"),
			plumber = require("gulp-plumber"),
			excludeGitignore = require("gulp-exclude-gitignore"),
			replace = require("gulp-replace"),

			eslint = require("gulp-eslint"),

			babel = require("gulp-babel"),

			mocha = require("gulp-mocha");

	require("babel-preset-es2015-node4");

// private

	var _gulpFile = path.join(__dirname, "gulpfile.js"),
		_libFiles = path.join(__dirname, "lib", "**", "*.js"),
		_distFiles = path.join(__dirname, "dist", "**", "*.js"),
		_unitTestsFiles = path.join(__dirname, "tests", "**", "*.js"),
		_allJSFiles = [_gulpFile, _libFiles, _distFiles, _unitTestsFiles];

// tasks

	gulp.task("babel", function () {

		return gulp.src(_libFiles)
			.pipe(babel({
				presets: ["es2015-node4"]
			}))
			.pipe(gulp.dest("dist"));

	});

	gulp.task("replace", ["babel"], function () {

		return gulp.src(_distFiles)
			.pipe(replace("    ", "	"))
			.pipe(replace("  ", "	"))
			.pipe(gulp.dest("dist"));

	});

	gulp.task("eslint", ["replace"], function () {

		return gulp.src(_allJSFiles)
			.pipe(plumber())
			.pipe(excludeGitignore())
			.pipe(eslint({
				"parserOptions": {
					"ecmaVersion": 6
				},
				"rules": {
					"linebreak-style": 0,
					"quotes": [ 1, "double" ],
					"indent": 0,
					// "indent": [ 2, "tab" ],
					"semi": [ 2, "always" ]
				},
				"env": {
					"node": true, "es6": true, "mocha": true
				},
				"extends": "eslint:recommended"
			}))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());

	});

	gulp.task("mocha", ["eslint"], function () {

		return gulp.src(_unitTestsFiles)
			.pipe(plumber())
			.pipe(mocha({reporter: "spec"}));

	});

// watcher

	gulp.task("watch", function () {
		gulp.watch(_allJSFiles, ["mocha"]);
	});


// default

	gulp.task("default", ["mocha"]);
	