
#ifndef EXTEND_ISDIRECTORY

	#define EXTEND_ISDIRECTORY

	#include <node.h>

	#include <sys/stat.h>
	#include <uv.h>

	#include "tools.h"

	namespace _extends {

		namespace isDirectory {

			void isDirectorySync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isDirectory(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isDirectoryProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
