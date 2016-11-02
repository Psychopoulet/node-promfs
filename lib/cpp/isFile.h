
#ifndef EXTEND_ISFILE

	#define EXTEND_ISFILE

	#include <node.h>

	#include <sys/stat.h>
	#include <uv.h>

	#include "tools.h"

	namespace _extends {

		namespace isFile {

			using v8::Boolean;
			using v8::Exception;
			using v8::Function;
			using v8::FunctionCallbackInfo;
			using v8::HandleScope;
			using v8::Isolate;
			using v8::Local;
			using v8::Null;
			using v8::Persistent;
			using v8::String;
			using v8::Undefined;
			using v8::Value;

			// private

				// structs

					struct _AsyncWork {

						uv_work_t request;
						Persistent<Function> callback;

						std::string filename;
						boolean exists;
						
					};

			// public

				void isFileSync(const FunctionCallbackInfo<Value>& args);
				void isFile(const FunctionCallbackInfo<Value>& args);

		}

	}
	
#endif
