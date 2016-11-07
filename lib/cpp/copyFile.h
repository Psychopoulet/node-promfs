
#ifndef EXTEND_COPYFILE

	#define EXTEND_COPYFILE

	#include <string>
	#include <fstream>
	#include <node.h>
	#include <uv.h>

	#include "tools.h"
	#include "isFile.h"

	namespace _extends {

		namespace copyFile {

			// methods

			void copyFileSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void copyFile(const v8::FunctionCallbackInfo<v8::Value>& args);
			void copyFileProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
