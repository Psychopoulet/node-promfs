
#ifndef EXTEND_ISFILE

	#define EXTEND_ISFILE

	#include <node.h>
	#include <sys/stat.h>
	#include <uv.h>

	#include "AsyncWorkStructureIsFileIsDirectory.h"
	#include "tools.h"

	namespace _extends {

		namespace isFile {

			// methods

			void isFileSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isFile(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isFileProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
