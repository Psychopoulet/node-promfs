/// <reference types="node" />

declare module "node-promfs" {

	import { Transform } from "stream";

	type tError = ReferenceError|TypeError|Error|null;
	type tCallback = (err: tError, data: any) => void;

	class PromFS extends require("fs") {

		public static isFile(file: string, callback: (err: tError, exists: boolean) => void): void;
		public static isFileSync(file: string): boolean;
		public static isFileProm(file: string) : Promise<boolean>;

		public static isDirectory(dir: string, callback: (err: tError, exists: boolean) => void): void;
		public static isDirectorySync(dir: string): boolean;
		public static isDirectoryProm(dir: string) : Promise<boolean>;


		public static copyFile(origin: string, target: string, callback: (err: tError) => void): void;
		public static copyFileSync(origin: string, target: string): void;
		public static copyFileProm(origin: string, target: string) : Promise<void>;

		public static extractFiles(dir: string, callback: (err: tError,  files: Array<string>) => void): void;
		public static extractFilesSync(dir: string): Array<string>;
		public static extractFilesProm(dir: string) : Promise<Array<string>>;

		public static readFileProm(file: string, options) : Promise<string>;
		public static writeFileProm(file: string, data: string, options) : Promise<void>;

		public static readJSONFile(file: string, opts: tCallback | object | string | null, callback?: tCallback): void;
		public static readJSONFileSync(file: string, opts?: object | string): any;
		public static readJSONFileProm(file: string, opts?: object | string) : Promise<any>;

		public static writeJSONFile(file: string, data: any, callback: (err: tError) => void, replacer?: (k, v) => any, space?: string|number|null) : void;
		public static writeJSONFileSync(file: string, data: any, replacer?: (k, v) => any, space?: string|number|null): void;
		public static writeJSONFileProm(file: string, data: any, replacer?: (k, v) => any, space?: string|number|null) : Promise<void>;

		public static readJSONFile(file: string, callback: (err: tError, data: any) => void): void;
		public static readJSONFileSync(file: string): any;
		public static readJSONFileProm(file: string) : Promise<any>;

		public static mkdirp(file: string, callback: (err: tError, data: any) => void): void;
		public static mkdirpSync(file: string): any;
		public static mkdirpProm(file: string) : Promise<any>;

		public static mkdirp(path: string, callback: (err: tError, data: any) => void): void;
		public static mkdirp(path: string, mode: number, callback: (err: tError, data: any) => void): void;
		public static mkdirpSync(path: string, mode?: number): void;
		public static mkdirpProm(path: string, mode?: number): Promise<void>;

		public static rmdirp(path: string, callback: (err: tError) => void): void;
		public static rmdirpSync(path: string): void;
		public static rmdirpProm(path: string): Promise<void>;


		public static filesToStream(files: Array<string>, callback: (err: tError, data: Transform) => void): void;
		public static filesToStream(files: Array<string>, separator: string, callback: (err: tError, data: Transform) => void): void;
		public static filesToStreamSync(path: string, separator?: string): Transform;
		public static filesToStreamProm(path: string, separator?: string): Promise<Transform>;

		public static filesToString(files: Array<string>, callback: (err: tError, data: string) => void): void;
		public static filesToString(files: Array<string>, separator: string, callback: (err: tError, data: string) => void): void;
		public static filesToStringSync(files: Array<string>, separator?: string): string;
		public static filesToStringProm(files: Array<string>, separator?: string): Promise<string>;

		public static filesToFile(files: Array<string>, file: string, callback: (err: tError) => void): void;
		public static filesToFile(files: Array<string>, file: string, separator: string, callback: (err: tError) => void): void;
		public static filesToFileSync(files: Array<string>, file: string, separator?: string): void;
		public static filesToFileProm(files: Array<string>, file: string, separator?: string): Promise<void>;

		public static directoryToStream(directory: string, file: string, callback: (err: tError, data: Transform) => void): void;
		public static directoryToStream(directory: string, separator: string, callback: (err: tError, data: Transform) => void): void;
		public static directoryToStreamSync(directory: string, file: string, separator?: string): Transform;
		public static directoryToStreamProm(directory: string, file: string, separator?: string): Promise<Transform>;

		public static directoryToString(directory: string, callback: (err: tError, data: string) => void): void;
		public static directoryToString(directory: string, separator: string, callback: (err: tError, data: string) => void): void;
		public static directoryToStringSync(directory: string, separator?: string): string;
		public static directoryToStringProm(directory: string, separator?: string): Promise<string>;

		public static directoryToFile(directory: string, file: string, callback: (err: tError) => void): void;
		public static directoryToFile(directory: string, file: string, separator: string, callback: (err: tError) => void): void;
		public static directoryToFileSync(directory: string, file: string, separator?: string): void;
		public static directoryToFileProm(directory: string, file: string, separator?: string): Promise<void>;

	}

	export = PromFS;

}
