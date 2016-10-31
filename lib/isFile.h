
#ifndef EXTEND_SAY_H

	#define EXTEND_SAY_H

	#include <node.h>
	#include <sys/stat.h>
	#include <uv.h>

	using namespace std;

	namespace _extends {

		using v8::Boolean;
		using v8::Exception;
		using v8::Function;
		using v8::Isolate;
		using v8::Local;
		using v8::Null;
		using v8::String;
		using v8::Undefined;
		using v8::Value;

		void isFileSync(const v8::FunctionCallbackInfo<Value>& args);
		void isFile(const v8::FunctionCallbackInfo<Value>& args);

	}

	struct Work {

		uv_work_t  request;
		v8::Persistent<v8::Function> callback;
		
	};

#endif
