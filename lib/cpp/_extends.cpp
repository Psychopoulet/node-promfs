
#include <node.h>

#include "isDirectory.h"
#include "isFile.h"

namespace _extends {

	void Init(v8::Local<v8::Object> exports) {

		NODE_SET_METHOD(exports, "isDirectorySync", isDirectory::isDirectorySync);
		NODE_SET_METHOD(exports, "isDirectory", isDirectory::isDirectory);
		NODE_SET_METHOD(exports, "isDirectoryProm", isDirectory::isDirectoryProm);

		NODE_SET_METHOD(exports, "isFileSync", isFile::isFileSync);
		NODE_SET_METHOD(exports, "isFile", isFile::isFile);
		NODE_SET_METHOD(exports, "isFileProm", isFile::isFileProm);

	}

	NODE_MODULE(_extends, Init)

}
