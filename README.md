# node-promfs
'fs' object extensions & promisifications

[![Build status](https://api.travis-ci.org/Psychopoulet/node-promfs.svg?branch=master)](https://travis-ci.org/Psychopoulet/node-promfs)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/node-promfs/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/node-promfs)
[![Dependency status](https://david-dm.org/Psychopoulet/node-promfs/status.svg)](https://david-dm.org/Psychopoulet/node-promfs)
[![Dev dependency status](https://david-dm.org/Psychopoulet/node-promfs/dev-status.svg)](https://david-dm.org/Psychopoulet/node-promfs?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/node-promfs.svg)](https://github.com/Psychopoulet/node-promfs/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/node-promfs.svg)](https://github.com/Psychopoulet/node-promfs/pulls)

## Installation

```bash
$ npm install node-promfs
```

## Features

  * promise all fs asynchronous functions

  * checks for file & directory existence, with synchrone & asynchrone versions
  * extract directory's files, with synchrone & asynchrone versions
  * create & delete directories recursively, with synchrone & asynchrone versions
  * concat files content in a string or a file, with synchrone & asynchrone versions
  * copy files, with synchrone & asynchrone versions

## Doc

```bash
$ npx node-promfs mkdirp <file: string> <?mode: number>

$ npx node-promfs rmdirp <file: string>
```

> you can use following method by replacing uppercase by lowercase with "-" before (ex : directoryToFile => "directory-to-file")
> Array arguments "files-to-file", "files-to-string", etc... is just list of strings (ex : [ "1", "2" ] => "1" "2")

```typescript
type tError = ReferenceError|TypeError|Error|null;
type tCallback = (err: tError, data: any) => void;
```

```typescript
interface iReadJSONOptions {
  "encoding"?: string;
  "flag"?: string;
  "signal"?: AbortSignal;
}

interface iWriteJSONOptions extends iReadJSONOptions {
  "mode"?: number;
  "replacer"?: (k, v) => any;
  "space"?: string|number|null;
}

type tReadJSONOptions = string|iReadJSONOptions|null;
type tWriteJSONOptions = string|iWriteJSONOptions|null;
```

### -- Extended --

> in "separator" parameter, you can use "{{filename}}" pattern, it will be replaced by the file's basename (ex : separator = "\r\n\r\n--- {{filename}} ---\r\n\r\n")

   [isFile] : does the file exists and is a regular file ?
   * ``` isFile(file: string, callback: (err: tError, exists: boolean) => void): void ```
   * ``` isFileSync(file: string): boolean ```
   * ``` isFileProm(file: string): Promise<boolean> ```

   [isDirectory] : does the file exists and is a directory ?
   * ``` isDirectory(dir: string, callback: (err: tError, exists: boolean) => void): void ```
   * ``` isDirectorySync(dir: string): boolean ```
   * ``` isDirectoryProm(dir: string): Promise<boolean> ```


  [copyFile] : copy a file with streams (copy then control with isFile)
   * ``` copyFile(origin: string, target: string, callback: (err: tError) => void): void ```
   * ``` copyFileSync(origin: string, target: string): void ```
   * ``` copyFileProm(origin: string, target: string): Promise<void> ```

   [extractFiles] : return only files from a directory
   * ``` extractFiles(dir: string, callback: (err: tError,  files: Array<string>) => void): void ```
   * ``` extractFilesSync(dir: string): Array<string> ```
   * ``` extractFilesProm(dir: string): Promise<Array<string>> ```

   [writeJSONFile] : stringify JSON and writeFile
   * ``` writeJSONFile(file: string, data: any, options: tCallback | tWriteJSONOptions, callback?: tCallback): void ```
   * ``` writeJSONFileSync(file: string, data: any, options?: tReadJSONOptions): void ```
   * ``` writeJSONFileProm(file: string, data: any, options?: tReadJSONOptions): Promise<void> ```

   [readJSONFile] : readFile and parse JSON
   * ``` readJSONFile(file: string, opts: tCallback | tReadJSONOptions, callback?: tCallback): void ```
   * ``` readJSONFileSync(file: string, opts?: tReadJSONOptions): any ```
   * ``` readJSONFileProm(file: string, opts?: tReadJSONOptions) : Promise<any> ```


   [mkdirp] : recursively create a directory
   * The arguments are the same as [the official documentation's ones for mkdir & mkdirSync](https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback)
   * ``` mkdirp(path: string, callback: (err: tError, data: any) => void): void ```
   * ``` mkdirp(path: string, mode: number, callback: (err: tError, data: any) => void): void ```
   * ``` mkdirpSync(path: string, mode?: number): void ```
   * ``` mkdirpProm(path: string, mode?: number): Promise<void> ```

   [rmdirp] : recursively delete a directory
   * ``` rmdirp(path: string, callback: (err: tError) => void): void ```
   * ``` rmdirpSync(path: string): void ```
   * ``` rmdirpProm(path: string): Promise<void> ```


   [filesToStream] : converge files content in a Readable stream
   * ``` filesToStream(files: Array<string>, callback: (err: tError, Transform) => void): void ```
   * ``` filesToStream(files: Array<string>, separator: string, callback: (err: tError, data: Transform) => void): void ```
   * ``` filesToStreamSync(path: string, separator?: string): Transform ```
   * ``` filesToStreamProm(path: string, separator?: string): Promise<Transform> ```

   [filesToString] : concat files content in a string
   * ``` filesToString(files: Array<string>, callback: (err: tError, data: string) => void): void ```
   * ``` filesToString(files: Array<string>, separator: string, callback: (err: tError, data: string) => void): void ```
   * ``` filesToStringSync(files: Array<string>, separator?: string): string ```
   * ``` filesToStringProm(files: Array<string>, separator?: string): Promise<string> ```

   [filesToFile] : concat files content in a file with streams
   * ``` filesToFile(files: Array<string>, file: string, callback: (err: tError) => void): void ```
   * ``` filesToFile(files: Array<string>, file: string, separator: string, callback: (err: tError) => void): void ```
   * ``` filesToFileSync(files: Array<string>, file: string, separator?: string): void ```
   * ``` filesToFileProm(files: Array<string>, file: string, separator?: string): Promise<void> ```


   [directoryToStream] : converge directory's files content in a Readable stream
   * ``` directoryToStream(directory: string, file: string, callback: (err: tError, data: Transform) => void): void ```
   * ``` directoryToStream(directory: string, separator: string, callback: (err: tError, data: Transform) => void): void ```
   * ``` directoryToStreamSync(directory: string, file: string, separator?: string): Transform ```
   * ``` directoryToStreamProm(directory: string, file: string, separator?: string): Promise<Transform> ```

   [directoryToString] : concat directory's files content in a string
   * ``` directoryToString(directory: string, callback: (err: tError, data: Transform) => void): void ```
   * ``` directoryToString(directory: string, separator: string, callback: (err: tError, data: Transform) => void): void ```
   * ``` directoryToStringSync(directory: string, separator?: string): Transform ```
   * ``` directoryToStringProm(directory: string, separator?: string): Promise<Transform> ```

   [directoryToFile] : concat directory's files content in a file
   * ``` directoryToFile(directory: string, file: string, callback: (err: tError) => void): void ```
   * ``` directoryToFile(directory: string, file: string, separator: string, callback: (err: tError) => void) ```
   * ``` directoryToFileSync(directory: string, file: string, separator?: string): void ```
   * ``` directoryToFileProm(directory: string, file: string, separator?: string): Promise<void> ```


### -- Classical --

  * The arguments are the same as [the official documentation's ones](https://nodejs.org/api/fs.html)
  * "then" data are the same as the callbacks' ones
  * all the methods cannot be tested (too much arguments)
  * ``` accessProm(): Promise ``` -> tested
  * ``` appendFileProm(): Promise ``` -> tested
  * ``` chmodProm(): Promise ``` -> tested
  * ``` chownProm(): Promise ``` -> tested
  * ``` closeProm(): Promise ``` -> tested
  * ``` fchmodProm(): Promise ```
  * ``` fchownProm(): Promise ```
  * ``` fdatasyncProm(): Promise ```
  * ``` fstatProm(): Promise ```
  * ``` fsyncProm(): Promise ```
  * ``` ftruncateProm(): Promise ```
  * ``` futimesProm(): Promise ```
  * ``` linkProm(): Promise ```
  * ``` lstatProm(): Promise ```
  * ``` mkdirProm(): Promise ``` -> tested
  * ``` mkdtempProm(): Promise ```
  * ``` openProm(): Promise ``` -> tested
  * ``` readdirProm(): Promise ``` -> tested
  * ``` readFileProm(): Promise ``` -> tested
  * ``` realpathProm(): Promise ``` -> tested
  * ``` renameProm(): Promise ``` -> tested
  * ``` rmdirProm(): Promise ``` -> tested
  * ``` statProm(): Promise ```
  * ``` truncateProm(): Promise ```
  * ``` unlinkProm(): Promise ``` -> tested
  * ``` utimesProm(): Promise ```
  * ``` writeProm(): Promise ```
  * ``` writeFileProm(): Promise``` -> tested

## Import

### Native

```javascript
const fs = require("node-promfs");
const { readJSONFileProm } = require("node-promfs");
```

### Typescript

```typescript
import fs = require("node-promfs");
```

## Tests

```bash
$ git clone git://github.com/Psychopoulet/node-promfs.git
$ cd ./node-promfs
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
