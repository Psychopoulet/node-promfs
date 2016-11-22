
#ifndef EXTEND_MKDIRP

	#define EXTEND_MKDIRP

	// node
	#include <node.h>
	#include <uv.h>

	// std
	#include <string>
	
	// tools
	#include "tools.h"
	#include "isDirectory.h"

	namespace _extends {

		namespace mkdirp {

			// public

			void mkdirpSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void mkdirp(const v8::FunctionCallbackInfo<v8::Value>& args);
			void mkdirpProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
