
#ifndef EXTEND_RMDIRP

	#define EXTEND_RMDIRP

	// node
	#include <node.h>
	#include <uv.h>

	// std
	#include <string>
	
	// tools
	#include "tools.h"
	#include "isDirectory.h"
	#include "isFile.h"

	#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
		#include <windows.h>
	#else
		#include <dirent.h>
		#include <sys/stat.h>
	#endif

	namespace _extends {

		namespace rmdirp {

			// public

			void rmdirpSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void rmdirp(const v8::FunctionCallbackInfo<v8::Value>& args);
			void rmdirpProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
