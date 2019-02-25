/// <reference types="node" />

declare module "node-promfs" {

	import { Transform } from "stream";

	type iError = ReferenceError|TypeError|Error|null;

	class PromFS extends require("fs") {

		public static isFile(file: string, callback: (err: iError, exists: boolean) => void): void;
		public static isFileSync(file: string): boolean;
		public static isFileProm(file: string) : Promise<boolean>;

		public static isDirectory(dir: string, callback: (err: iError, exists: boolean) => void): void;
		public static isDirectorySync(dir: string): boolean;
		public static isDirectoryProm(dir: string) : Promise<boolean>;


		public static copyFile(origin: string, target: string, callback: (err: iError) => void): void;
		public static copyFileSync(origin: string, target: string): void;
		public static copyFileProm(origin: string, target: string) : Promise<void>;

		public static extractFiles(dir: string, callback: (err: iError,  files: Array<string>) => void): void;
		public static extractFilesSync(dir: string): Array<string>;
		public static extractFilesProm(dir: string) : Promise<Array<string>>;

		public static writeJSONFile(file: string, data: any, callback: (err: iError) => void, replacer?: (k, v) => any, space?: string|number|null) : void;
		public static writeJSONFileSync(file: string, data: any, replacer?: (k, v) => any, space?: string|number|null): void;
		public static writeJSONFileProm(file: string, data: any, replacer?: (k, v) => any, space?: string|number|null) : Promise<void>;

		public static readJSONFile(file: string, callback: (err: iError, data: any) => void): void;
		public static readJSONFileSync(file: string): any;
		public static readJSONFileProm(file: string) : Promise<any>;

		public static mkdirp(file: string, callback: (err: iError, data: any) => void): void;
		public static mkdirpSync(file: string): any;
		public static mkdirpProm(file: string) : Promise<any>;

		public static mkdirp(path: string, callback: (err: iError, data: any) => void): void;
		public static mkdirp(path: string, mode: number, callback: (err: iError, data: any) => void): void;
		public static mkdirpSync(path: string, mode?: number): void;
		public static mkdirpProm(path: string, mode?: number): Promise<void>;

		public static rmdirp(path: string, callback: (err: iError) => void): void;
		public static rmdirpSync(path: string): void;
		public static rmdirpProm(path: string): Promise<void>;


		public static filesToStream(files: Array<string>, callback: (err: iError, data: Transform) => void): void;
		public static filesToStream(files: Array<string>, separator: string, callback: (err: iError, data: Transform) => void): void;
		public static filesToStreamSync(path: string, separator?: string): Transform;
		public static filesToStreamProm(path: string, separator?: string): Promise<Transform>;

		public static filesToString(files: Array<string>, callback: (err: iError, data: string) => void): void;
		public static filesToString(files: Array<string>, separator: string, callback: (err: iError, data: string) => void): void;
		public static filesToStringSync(files: Array<string>, separator?: string): string;
		public static filesToStringProm(files: Array<string>, separator?: string): Promise<string>;

		public static filesToFile(files: Array<string>, file: string, callback: (err: iError) => void): void;
		public static filesToFile(files: Array<string>, file: string, separator: string, callback: (err: iError) => void): void;
		public static filesToFileSync(files: Array<string>, file: string, separator?: string): void;
		public static filesToFileProm(files: Array<string>, file: string, separator?: string): Promise<void>;

		public static directoryToStream(directory: string, file: string, callback: (err: iError, data: Transform) => void): void;
		public static directoryToStream(directory: string, separator: string, callback: (err: iError, data: Transform) => void): void;
		public static directoryToStreamSync(directory: string, file: string, separator?: string): Transform;
		public static directoryToStreamProm(directory: string, file: string, separator?: string): Promise<Transform>;

		public static directoryToString(directory: string, callback: (err: iError, data: string) => void): void;
		public static directoryToString(directory: string, separator: string, callback: (err: iError, data: string) => void): void;
		public static directoryToStringSync(directory: string, separator?: string): string;
		public static directoryToStringProm(directory: string, separator?: string): Promise<string>;

		public static directoryToFile(directory: string, file: string, callback: (err: iError) => void): void;
		public static directoryToFile(directory: string, file: string, separator: string, callback: (err: iError) => void): void;
		public static directoryToFileSync(directory: string, file: string, separator?: string): void;
		public static directoryToFileProm(directory: string, file: string, separator?: string): Promise<void>;

	}

	export = PromFS;

}
