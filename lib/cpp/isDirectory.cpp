
#include "isDirectory.h"

namespace _extends {

	namespace isDirectory {

		// private

			// stucts

				struct _AsyncWork {

					uv_work_t request;
					v8::Persistent<v8::Function> callback;
					v8::Persistent<v8::Promise::Resolver> persistent;

					std::string dirname;
					boolean exists;
					
				};

			// methods

				bool _isDirectory(std::string p_sDirname) {

					bool bResult = false;

						struct stat sb;
						if (0 == stat(p_sDirname.c_str(), &sb)) {

							if (S_IFDIR == (sb.st_mode & S_IFMT)) {
								bResult = true;
							}

						}

					return bResult;

				}

				static void _workAsync(uv_work_t *req) {

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					work->exists = _isDirectory(work->dirname);

				}

				static void _workAsyncComplete(uv_work_t *req, int status) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope handleScope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						const unsigned argc = 2;
						v8::Local<v8::Value> argv[argc];

						argv[0] = v8::Null(isolate);
						argv[1] = v8::Boolean::New(isolate, work->exists);

					v8::Local<v8::Function>::New(isolate, work->callback)
						->Call(isolate->GetCurrentContext()
						->Global(), 2, argv);

					work->callback.Reset();
					delete work;

				}

				static void _workPromiseComplete(uv_work_t* req, int i) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope scope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						v8::Local<v8::Promise::Resolver> local = v8::Local<v8::Promise::Resolver>::New(isolate, work->persistent);
						local->Resolve(v8::Boolean::New(isolate, work->exists));

					work->callback.Reset();
					delete work;

				}

		// public

			void isDirectorySync(const v8::FunctionCallbackInfo<v8::Value>& args) {

				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= args.Length()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'dirname' argument")));
						
					}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'dirname' argument is not a string")));
						}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sDirname = _extends::tools::trim(std::string(*param1));

						// function treatment

							if ("" == sDirname) {
								isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'dirname' argument is empty")));
							}
							else {

								// bypass "null" return
								args.GetReturnValue().Set(v8::Boolean::New(isolate, _isDirectory(sDirname)));
								return;
								
							}

					}

				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));
				
			}

			void isDirectory(const v8::FunctionCallbackInfo<v8::Value>& args) {

				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= args.Length()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'dirname' argument")));
					}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'dirname' argument is not a string")));
						}
					else if (1 >= args.Length()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'callback' argument")));
					}
						else if (!args[1]->IsFunction()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'callback' argument is not a function")));
						}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sDirname = _extends::tools::trim(std::string(*param1));
							v8::Local<v8::Function> param2 = v8::Local<v8::Function>::Cast(args[1]);

						// function treatment

							if ("" == sDirname) {
								isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'dirname' argument is empty")));
							}
							else {

								// init asynchronous treatment

									_AsyncWork *work = new _AsyncWork();
									work->request.data = work;

									// callback
									work->callback.Reset(isolate, param2);

									// data
									work->dirname = sDirname;
									work->exists = false;

								// start asynchronous treatment
								uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workAsyncComplete);

							}

					}
				
				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));

			}

			void isDirectoryProm(const v8::FunctionCallbackInfo<v8::Value>& args) {

				v8::Isolate *isolate = args.GetIsolate();

				// init promise

					_AsyncWork *work = new _AsyncWork();
					work->request.data = work;
					
					work->persistent.Reset(isolate, v8::Promise::Resolver::New(isolate));

				// return promise

					v8::Local<v8::Promise::Resolver> local = v8::Local<v8::Promise::Resolver>::New(isolate, work->persistent);
					args.GetReturnValue().Set(local->GetPromise());
				
				// params treatment

				if (0 >= args.Length()) {
					local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'dirname' argument")));
				}
					else if (!args[0]->IsString()) {
						local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "'dirname' argument is not a string")));
					}
				else {

					// params conversion

						v8::String::Utf8Value param1(args[0]->ToString());
							std::string sDirname = _extends::tools::trim(std::string(*param1));

					// function treatment

						if ("" == sDirname) {
							local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "'dirname' argument is empty")));
						}
						else {

								// data
								work->dirname = sDirname;
								work->exists = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
