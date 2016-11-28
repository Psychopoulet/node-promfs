
#ifndef EXTEND_ISDIRECTORY

	#define EXTEND_ISDIRECTORY

	// node
	#include <node.h>
	#include <uv.h>

	// std
	#include <string>
	
	// tools
	#include "AsyncWorkStructureIsFileIsDirectory.h"
	#include "tools.h"

	#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
		#include <windows.h>
	#else
		#include <sys/stat.h>
	#endif

	namespace _extends {

		namespace isDirectory {

			// private

			bool _isDirectory(const std::string &p_sDirname);

			// public

			void isDirectorySync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isDirectory(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isDirectoryProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
