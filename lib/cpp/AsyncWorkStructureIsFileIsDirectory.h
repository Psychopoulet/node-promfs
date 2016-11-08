
#ifndef EXTEND_ASIFID

	#define EXTEND_ASIFID

	#include <string>

	namespace _extends {

		struct AsyncWorkStructureIsFileIsDirectory {

			uv_work_t request;
			v8::Persistent<v8::Function> callback;
			v8::Persistent<v8::Promise::Resolver> persistent;

			std::string filename;
			bool exists;
			
		};

	}
	
#endif
