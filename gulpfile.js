
"use strict";

// deps

	const	path = require("path"),

			gulp = require("gulp"),
			plumber = require("gulp-plumber"),
			excludeGitignore = require("gulp-exclude-gitignore"),

			babel = require("gulp-babel"),
			uglify = require("gulp-uglify"),

			del = require("del"),

			eslint = require("gulp-eslint"),
			mocha = require("gulp-mocha");

// private

	var _gulpFile = path.join(__dirname, "gulpfile.js"),
		_libDir = path.join(__dirname, "lib"),
			_libFiles = path.join(_libDir, "*.js"),
		_tmpDir = path.join(__dirname, "tmp"),
			_tmpFiles = path.join(_tmpDir, "*.js"),
		_distDir = path.join(__dirname, "dist"),
			_distFiles = path.join(_distDir, "*.js"),
		_unitTestsFiles = path.join(__dirname, "tests", "*.js"),
		_toTestFiles = [_gulpFile, _libFiles, _unitTestsFiles];

// tasks

	gulp.task("babel", () => {

		return gulp.src(_libFiles)
			.pipe(babel({
				presets: ["es2015"]
			}))
			.pipe(gulp.dest(_tmpDir));

	});

	gulp.task("compress", ["babel"], () => {

		return gulp.src(_tmpFiles)
			.pipe(uglify({

			}).on("error", (err) => {
				(0, console).log(err);
			}))
			.pipe(gulp.dest(_distDir));

	});

	gulp.task("clean", ["compress"], function () {

		return del(_tmpDir);

	});

	gulp.task("eslint", ["clean"], () => {

		return gulp.src(_toTestFiles)
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

	gulp.task("mocha", ["eslint"], () => {

		return gulp.src(_unitTestsFiles)
			.pipe(plumber())
			.pipe(mocha({reporter: "spec"}));

	});

// watcher

	gulp.task("watch", () => {
		gulp.watch(_toTestFiles, ["mocha"]);
	});


// default

	gulp.task("default", ["mocha"]);
	