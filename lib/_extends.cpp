
#include <node.h>
#include "isFile.h"

namespace _extends {

	void Init(v8::Local<v8::Object> exports) {
		NODE_SET_METHOD(exports, "isFileSync", isFileSync);
		NODE_SET_METHOD(exports, "isFile", isFile);
	}

	NODE_MODULE(_extends, Init)

}
