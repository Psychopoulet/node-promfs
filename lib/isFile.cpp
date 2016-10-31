
#include "isFile.h"




namespace _extends {

	bool _isFile(std::string p_sFilename) {

		bool bResult = false;

			struct stat sb;
			if (0 == stat(p_sFilename.c_str(), &sb)) {

				if (S_IFREG == (sb.st_mode & S_IFMT)) {
					bResult = true;
				}

			}

		return bResult;

	}

	static void WorkAsyncComplete(uv_work_t *req, int status) {

		Isolate * isolate = Isolate::GetCurrent();
		v8::HandleScope handleScope(isolate);

    Work *work = static_cast<Work *>(req->data);

			const unsigned argc = 2;
			Local<Value> argv[argc];

			argv[0] = Exception::ReferenceError(String::NewFromUtf8(isolate, "test"));
			argv[1] = Null(isolate);

    Local<Function>::New(isolate, work->callback)->
      Call(isolate->GetCurrentContext()->Global(), 1, argv);


      work->callback.Reset();

    delete work;

}

	void isFileSync(const v8::FunctionCallbackInfo<Value>& args) {

		Isolate* isolate = args.GetIsolate();

		// params treatment

		if (0 >= args.Length()) {
			isolate->ThrowException(Exception::ReferenceError(String::NewFromUtf8(isolate, "Missing 'filename' argument")));
			
		}
			else if (!args[0]->IsString()) {
				isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is not a string")));
			}
		else if (1 > args.Length()) {
			isolate->ThrowException(Exception::RangeError(String::NewFromUtf8(isolate, "Missing some argument")));
		}
		else {

			// params conversion

			String::Utf8Value param1(args[0]->ToString());
			std::string sFilename = std::string(*param1);

			if ("" == sFilename) {
				isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is empty")));
			}
			else {

				args.GetReturnValue().Set(Boolean::New(isolate, _isFile(sFilename)));
				return;
				
			}

		}

		// global return

		args.GetReturnValue().Set(Undefined(isolate));
		
	}

	void isFile(const v8::FunctionCallbackInfo<Value>& args) {

		Isolate* isolate = args.GetIsolate();

		// params treatment

		if (0 >= args.Length()) {
			isolate->ThrowException(Exception::ReferenceError(String::NewFromUtf8(isolate, "Missing 'filename' argument")));
		}
			else if (!args[0]->IsString()) {
				isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is not a string")));
			}
		else if (1 >= args.Length()) {
			isolate->ThrowException(Exception::ReferenceError(String::NewFromUtf8(isolate, "Missing 'callback' argument")));
		}
			else if (!args[1]->IsFunction()) {
				isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'callback' argument is not a function")));
			}
		else if (2 > args.Length()) {
			isolate->ThrowException(Exception::RangeError(String::NewFromUtf8(isolate, "Missing some argument")));
		}
		else {

			// params conversion

			String::Utf8Value param1(args[0]->ToString());
				std::string sFilename = std::string(*param1);
			Local<Function> param2 = Local<Function>::Cast(args[1]);

			// return callback creation

			const unsigned argc = 2;
			Local<Value> argv[argc];

			argv[0] = Exception::ReferenceError(String::NewFromUtf8(isolate, "test"));
			argv[1] = Null(isolate);


			Work * work = new Work();
    work->request.data = work;


    		work->callback.Reset(isolate, param2);


    		uv_queue_work(uv_default_loop(), &work->request, NULL, WorkAsyncComplete);






/*Work * work = new Work();
    work->request.data = work;*/





			/*
			/*if ("" == sFilename) {
				argv[0] = Exception::ReferenceError(String::NewFromUtf8(isolate, "'filename' argument is empty"));
				argv[1] = Null(isolate);
			}
			else {
				argv[0] = Null(isolate);
				argv[1] = Boolean::New(handle.get());
			}*/

			// return callback execution

			//param2->Call(Null(isolate), argc, argv);

		}
		
		// global return

		args.GetReturnValue().Set(Undefined(isolate));

	}

}
