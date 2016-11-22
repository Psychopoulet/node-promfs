
#include "mkdirp.h"

namespace _extends {

	namespace mkdirp {

		// private

			// structure

				struct _AsyncWork {

					uv_work_t request;
					v8::Persistent<v8::Function> callback;
					v8::Persistent<v8::Promise::Resolver> persistent;

					std::string directory;
					bool created;
					
				};

			// methods

				bool _mkdirp(const std::string &p_sDirname) {

					bool bResult = false;

					return bResult;

				}

				static void _workAsync(uv_work_t *req) {

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					work->created = _mkdirp(work->directory);

				}

				static void _workAsyncComplete(uv_work_t *req, int status) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope handleScope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						const unsigned argc = 1;
						v8::Local<v8::Value> argv[argc];

						if (!work->created) {
							argv[0] = v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot remove 'directory'"));
						}
						else {
							argv[0] = v8::Null(isolate);
						}

					v8::Local<v8::Function>::New(isolate, work->callback)
						->Call(isolate->GetCurrentContext()
						->Global(), argc, argv);

					isolate->RunMicrotasks();

					work->callback.Reset();
					delete work;

				}

				static void _workPromiseComplete(uv_work_t* req, int i) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope scope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						v8::Local<v8::Promise::Resolver> local = v8::Local<v8::Promise::Resolver>::New(isolate, work->persistent);

						if (!work->created) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot remove 'directory'")));
						}
						else {
							local->Resolve(v8::Undefined(isolate));
						}

					isolate->RunMicrotasks();

					work->callback.Reset();
					delete work;

				}

		// public

			void mkdirpSync(const v8::FunctionCallbackInfo<v8::Value>& args) {

				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= args.Length()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'path' argument")));
						
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'path' argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'path' argument is not a string")));
						}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sDirname = _extends::tools::trim(std::string(*param1));

						// function treatment

							if ("" == sDirname) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'path' argument is empty")));
							}
							else if (!_mkdirp(sDirname)) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot remove 'path' recursively")));
							}

					}

				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));
				
			}

			void mkdirp(const v8::FunctionCallbackInfo<v8::Value>& args) {

				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= args.Length()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'path' argument")));
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'path' argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'path' argument is not a string")));
						}
					else if (1 >= args.Length()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'callback' argument")));
					}
						else if (args[1]->IsUndefined()) {
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
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'path' argument is empty")));
							}
							else {

								// init asynchronous treatment

									_AsyncWork *work = new _AsyncWork();
									work->request.data = work;

									// callback
									work->callback.Reset(isolate, param2);

									// data
									work->directory = sDirname;
									work->created = false;

								// start asynchronous treatment
								uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workAsyncComplete);

							}

					}
				
				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));

			}

			void mkdirpProm(const v8::FunctionCallbackInfo<v8::Value>& args) {

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
					local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'path' argument")));
				}
					else if (args[0]->IsUndefined()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'path' argument")));
					}
					else if (!args[0]->IsString()) {
						local->Reject(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'path' argument is not a string")));
					}
				else {

					// params conversion

						v8::String::Utf8Value param1(args[0]->ToString());
							std::string sDirname = _extends::tools::trim(std::string(*param1));

					// function treatment

						if ("" == sDirname) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'path' argument is empty")));
						}
						else {

							// data
							work->directory = sDirname;
							work->created = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
