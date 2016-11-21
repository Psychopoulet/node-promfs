
#ifndef EXTEND_COPYFILE

	#define EXTEND_COPYFILE

	// node
	#include <node.h>
	#include <uv.h>

	// std
	#include <string>
	#include <fstream>

	// tools
	#include "tools.h"
	#include "isFile.h"

	namespace _extends {

		namespace copyFile {

			// public

			void copyFileSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void copyFile(const v8::FunctionCallbackInfo<v8::Value>& args);
			void copyFileProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
