"use strict";

// deps

	const 	fs = require('../main.js'),
			path = require('path'),
			assert = require('assert');

// private

	var _dirtestBase = path.join(__dirname, 'testlvl1'),
			_dirtest = path.join(_dirtestBase, 'testlvl2', 'testlvl3', 'testlvl4'),
		_filetest = path.join(__dirname, 'test.txt'),
		_filetest2 = path.join(__dirname, 'test2.txt');

// tests

describe('rewrited', function() {

	describe('mkdirProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.rmdirSync(_dirtestBase); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.mkdirProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.mkdirProm('').then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.mkdirProm(_dirtestBase).then(function() {
				assert.strictEqual(true, fs.isDirectorySync(_dirtestBase), "test directory cannot be created");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

	describe('rmdirProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.mkdirSync(_dirtestBase); }, Error, "'before' function throw an error");
		});

		it('should check type value', function(done) {

			fs.rmdirProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.rmdirProm('').then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.rmdirProm(_dirtestBase).then(function() {
				assert.strictEqual(false, fs.isDirectorySync(_dirtestBase), "test directory cannot be created");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

	describe('unlinkProm', function() {

		before(function() {
			assert.doesNotThrow(function() { fs.appendFileSync(_filetest); }, Error, "'before' function throw an error");
		});

		it('should check type value', function(done) {

			fs.unlinkProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.unlinkProm('').then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.unlinkProm(_filetest).then(function() {
				assert.strictEqual(false, fs.isFileSync(_filetest), "test directory cannot be created");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

});

describe('classical', function() {

	describe('accessProm', function() {

		it('should check type value', function(done) {

			fs.accessProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.accessProm(__filename, fs.F_OK).then(done).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

	describe('appendFileProm', function() {

		after(function() {
			assert.doesNotThrow(function() { fs.unlinkSync(_filetest); }, Error, "'after' function throw an error");
		});

		it('should check type value', function(done) {

			fs.appendFileProm(false).then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check empty content value', function(done) {

			fs.appendFileProm('').then(function() {
				assert(false, "check type value does not generate an error");
				done();
			}).catch(function(err) {
				assert.strictEqual('string', typeof err, "check type value does not generate an error");
				done();
			});

		});

		it('should check normal running', function(done) {

			fs.appendFileProm(_filetest, 'test', 'utf8').then(function() {
				assert.strictEqual('test', fs.readFileSync(_filetest, 'utf8'), "test file content cannot be appended");
				done();
			}).catch(function(err) {
				assert(false, "check normal running generate an error");
				done();
			});

		});

	});

});
