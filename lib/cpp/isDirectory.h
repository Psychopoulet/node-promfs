
#ifndef EXTEND_ISDIRECTORY

	#define EXTEND_ISDIRECTORY

	#include <string>
	#include <node.h>
	#include <sys/stat.h>
	#include <uv.h>

	#include "AsyncWorkStructureIsFileIsDirectory.h"
	#include "tools.h"

	namespace _extends {

		namespace isDirectory {

			// methods

			void isDirectorySync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isDirectory(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isDirectoryProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
