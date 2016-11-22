
#ifndef EXTEND_ISFILE

	#define EXTEND_ISFILE

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

		namespace isFile {

			// private

			bool _isFile(const std::string &p_sFilename);

			// public

			void isFileSync(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isFile(const v8::FunctionCallbackInfo<v8::Value>& args);
			void isFileProm(const v8::FunctionCallbackInfo<v8::Value>& args);

		}

	}
	
#endif
