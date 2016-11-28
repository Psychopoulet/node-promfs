
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

	#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
		#include <windows.h>
	#else
		#include <sys/stat.h>
	#endif

	namespace _extends {

		namespace mkdirp {

			// public

			void mkdirpSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void mkdirp(const v8::FunctionCallbackInfo<v8::Value>& args);
			void mkdirpProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
