/// <reference path="../../lib/index.d.ts" />

import * as fs from "../../lib/main.js";

fs.isFile(__filename, (err, data) => {
	console.log(err, data);
});

console.log(fs.isFileSync(__filename));

fs.isFileProm(__filename).then((data) => {
	console.log(data);
}).catch((err: Error) => {
	console.log(err);
});
