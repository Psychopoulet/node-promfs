
#include "isFile.h"

namespace _extends {

	namespace isFile {

		// private

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

			static void _workAsync(uv_work_t *req) {

				_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

				work->exists = _isFile(work->filename);

			}

			static void _workAsyncComplete(uv_work_t *req, int status) {

				Isolate *isolate = Isolate::GetCurrent();
				HandleScope handleScope(isolate);

				_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					const unsigned argc = 2;
					Local<Value> argv[argc];

					argv[0] = Null(isolate);
					argv[1] = Boolean::New(isolate, work->exists);

				Local<Function>::New(isolate, work->callback)
					->Call(isolate->GetCurrentContext()
					->Global(), 2, argv);

				work->callback.Reset();

				delete work;

			}

		// public

			void isFileSync(const FunctionCallbackInfo<Value>& args) {

				Isolate *isolate = args.GetIsolate();

				// params treatment

				if (0 >= args.Length()) {
					isolate->ThrowException(Exception::ReferenceError(String::NewFromUtf8(isolate, "missing 'filename' argument")));
					
				}
					else if (!args[0]->IsString()) {
						isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is not a string")));
					}
				else if (1 > args.Length()) {
					isolate->ThrowException(Exception::RangeError(String::NewFromUtf8(isolate, "missing some argument")));
				}
				else {

					// params conversion

						String::Utf8Value param1(args[0]->ToString());
						std::string sFilename = _extends::tools::trim(std::string(*param1));

					// function treatment

						if ("" == sFilename) {
							isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is empty")));
						}
						else {

							// bypass "null" return
							args.GetReturnValue().Set(Boolean::New(isolate, _isFile(sFilename)));
							return;
							
						}

				}

				// global return

				args.GetReturnValue().Set(Undefined(isolate));
				
			}

			void isFile(const FunctionCallbackInfo<Value>& args) {

				Isolate *isolate = args.GetIsolate();

				// params treatment

				if (0 >= args.Length()) {
					isolate->ThrowException(Exception::ReferenceError(String::NewFromUtf8(isolate, "missing 'filename' argument")));
				}
					else if (!args[0]->IsString()) {
						isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is not a string")));
					}
				else if (1 >= args.Length()) {
					isolate->ThrowException(Exception::ReferenceError(String::NewFromUtf8(isolate, "missing 'callback' argument")));
				}
					else if (!args[1]->IsFunction()) {
						isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'callback' argument is not a function")));
					}
				else if (2 > args.Length()) {
					isolate->ThrowException(Exception::RangeError(String::NewFromUtf8(isolate, "missing some argument")));
				}
				else {

					// params conversion

						String::Utf8Value param1(args[0]->ToString());
							std::string sFilename = _extends::tools::trim(std::string(*param1));
						Local<Function> param2 = Local<Function>::Cast(args[1]);

					// function treatment

						if ("" == sFilename) {
							isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "'filename' argument is empty")));
						}
						else {

							// init asynchronous treatment

								_AsyncWork *work = new _AsyncWork();
								work->request.data = work;

								// callback
								work->callback.Reset(isolate, param2);

								// data
								work->filename = sFilename;
								work->exists = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workAsyncComplete);

						}

				}
				
				// global return
				args.GetReturnValue().Set(Undefined(isolate));

			}

	}

}
