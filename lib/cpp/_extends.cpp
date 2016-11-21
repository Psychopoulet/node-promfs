
#include <node.h>

#include "copyFile.h"
#include "isDirectory.h"
#include "isFile.h"
#include "rmdirp.h"

namespace _extends {

	void Init(v8::Local<v8::Object> exports) {

		NODE_SET_METHOD(exports, "copyFileSync", copyFile::copyFileSync);
		NODE_SET_METHOD(exports, "copyFile", copyFile::copyFile);
		NODE_SET_METHOD(exports, "copyFileProm", copyFile::copyFileProm);

		NODE_SET_METHOD(exports, "isDirectorySync", isDirectory::isDirectorySync);
		NODE_SET_METHOD(exports, "isDirectory", isDirectory::isDirectory);
		NODE_SET_METHOD(exports, "isDirectoryProm", isDirectory::isDirectoryProm);

		NODE_SET_METHOD(exports, "isFileSync", isFile::isFileSync);
		NODE_SET_METHOD(exports, "isFile", isFile::isFile);
		NODE_SET_METHOD(exports, "isFileProm", isFile::isFileProm);

		NODE_SET_METHOD(exports, "rmdirpSync", rmdirp::rmdirpSync);
		NODE_SET_METHOD(exports, "rmdirp", rmdirp::rmdirp);
		NODE_SET_METHOD(exports, "rmdirpProm", rmdirp::rmdirpProm);

	}

	NODE_MODULE(_extends, Init)

}
