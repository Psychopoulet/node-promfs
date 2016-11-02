
#ifndef EXTEND_ISFILE

	#define EXTEND_ISFILE

	#include <node.h>

	#include <sys/stat.h>
	#include <uv.h>

	#include "tools.h"

	namespace _extends {

		namespace isFile {

			void isFileSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isFile(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isFileProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
