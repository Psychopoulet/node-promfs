
"use strict";

// deps

	const path = require("path");

	// gulp
	const gulp = require("gulp");
	const plumber = require("gulp-plumber");

	// tests
	const istanbul = require("gulp-istanbul");
	const eslint = require("gulp-eslint");
	const mocha = require("gulp-mocha");

	// compilation
	const babel = require("gulp-babel");
	
// consts

	const UNITTESTSFILES = path.join(__dirname, "tests", "*.js");

	const TOTESTFILES = [
		path.join(__dirname, "gulpfile.js"),
		path.join(__dirname, "lib", "*.js"),
		UNITTESTSFILES
	];

// tasks

	gulp.task("eslint", () => {

		return gulp.src([])
			.pipe(plumber())
			.pipe(eslint({
				"env": require(path.join(__dirname, "gulpfile", "eslint", "env.json")),
				"globals": require(path.join(__dirname, "gulpfile", "eslint", "globals.json")),
				"parserOptions": {
					"ecmaVersion": 6
				},
				// http://eslint.org/docs/rules/
				"rules": require(path.join(__dirname, "gulpfile", "eslint", "rules.json"))

			}))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());

	});

	gulp.task("istanbul", [ "eslint" ], () => {

		return gulp.src(TOTESTFILES)
			.pipe(istanbul())
			.pipe(istanbul.hookRequire());

	});

	gulp.task("mocha", [ "istanbul" ], () => {

		return gulp.src(UNITTESTSFILES)
			.pipe(plumber())
			.pipe(mocha())
			.pipe(istanbul.writeReports());

	});

	gulp.task("babel", [ "mocha" ], () => {

		return gulp.src(path.join(__dirname, "lib", "*.js"))
			.pipe(babel({
				presets: ["es2015"]
			}))
			.pipe(gulp.dest(path.join(__dirname, "dist")));

	});

// watcher

	gulp.task("watch", () => {
		gulp.watch(TOTESTFILES, ["eslint"]);
	});


// default

	gulp.task("default", ["mocha"]);
	