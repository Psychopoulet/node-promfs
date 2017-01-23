
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
					int mode;
					bool created;
					
				};

			// methods

				bool _mkdirp(const std::string &p_sDirname, unsigned int p_nMode = 0777) {

					bool bResult = false;

						if (isDirectory::_isDirectory(p_sDirname)) {
							bResult = true;
						}
						else {

							std::size_t length = p_sDirname.size();
							std::string sDirname = (tools::DIRECTORY_SEPARATOR == p_sDirname.substr(length - 1, length))
														? p_sDirname
														: p_sDirname + tools::DIRECTORY_SEPARATOR;
							std::string sDirbasename = sDirname;

							sDirbasename = sDirbasename.substr(0, sDirbasename.size() - 1);

							length = sDirbasename.find_last_of(tools::DIRECTORY_SEPARATOR);
							sDirbasename = sDirbasename.substr(0, length);

							if (!isDirectory::_isDirectory(sDirbasename)) {
								
								if (_mkdirp(sDirbasename, p_nMode)) {

									#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
										bResult = (CreateDirectory(sDirname.c_str(), NULL));
									#else
										bResult = (0 == mkdir(sDirname.c_str(), p_nMode));
									#endif

								}

							}
							else {

								#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
									bResult = (CreateDirectory(sDirname.c_str(), NULL));
								#else
									bResult = (0 == mkdir(sDirname.c_str(), p_nMode));
								#endif

							}

						}

					return bResult;

				}

				static void _workAsync(uv_work_t *req) {

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					if (0 < work->mode) {
						work->created = _mkdirp(work->directory, work->mode);
					}
					else {
						work->created = _mkdirp(work->directory);
					}
					
				}

				static void _workAsyncComplete(uv_work_t *req, int status) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope handleScope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						const unsigned argc = 1;
						v8::Local<v8::Value> argv[argc];

						if (!work->created) {
							argv[0] = v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot create \"directory\""));
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
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot create \"directory\"")));
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

				const int nArgsLength = args.Length();
				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
						
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"path\" argument is not a string")));
						}
					else if (1 < nArgsLength && !args[1]->IsUndefined() && !args[1]->IsNumber()) {
						isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"mode\" argument is not an integer")));
					}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sDirname = _extends::tools::trim(std::string(*param1));

						// function treatment

							if ("" == sDirname) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "\"path\" argument is empty")));
							}
							else {

								if (1 < nArgsLength) {

									if (!_mkdirp(sDirname, args[1]->Uint32Value())) {
										isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot create \"path\" recursively")));
									}

								}
								else if (!_mkdirp(sDirname)) {
									isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot create \"path\" recursively")));
								}

							}

					}

				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));
				
			}

			void mkdirp(const v8::FunctionCallbackInfo<v8::Value>& args) {

				const int nArgsLength = args.Length();
				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"path\" argument is not a string")));
						}
					else if (1 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"callback\" argument")));
					}

						// callback without options
						else if (args[1]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"callback\" argument")));
						}
						else if (2 == nArgsLength && !args[1]->IsFunction()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"callback\" argument is not a function")));
						}

						// callback & options
						else if (2 < nArgsLength && !args[1]->IsNumber()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"mode\" argument is not an integer")));
						}
						else if (2 < nArgsLength && !args[2]->IsFunction()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"callback\" argument is not a function")));
						}

					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sDirname = _extends::tools::trim(std::string(*param1));
							v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast((2 < nArgsLength) ? args[2] : args[1]);

						// function treatment

							if ("" == sDirname) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "\"path\" argument is empty")));
							}
							else {

								// init asynchronous treatment

									_AsyncWork *work = new _AsyncWork();
									work->request.data = work;

									// callback
									work->callback.Reset(isolate, callback);

									// data
									work->directory = sDirname;
									work->mode = (2 < nArgsLength) ? args[1]->Uint32Value() : 0;
									work->created = false;

								// start asynchronous treatment
								uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workAsyncComplete);

							}

					}
				
				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));

			}

			void mkdirpProm(const v8::FunctionCallbackInfo<v8::Value>& args) {

				const int nArgsLength = args.Length();
				v8::Isolate *isolate = args.GetIsolate();

				// init promise

					_AsyncWork *work = new _AsyncWork();
					work->request.data = work;
					
					work->persistent.Reset(isolate, v8::Promise::Resolver::New(isolate));

				// return promise

					v8::Local<v8::Promise::Resolver> local = v8::Local<v8::Promise::Resolver>::New(isolate, work->persistent);
					args.GetReturnValue().Set(local->GetPromise());
				
				// params treatment

				if (0 >= nArgsLength) {
					local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
				}
					else if (args[0]->IsUndefined()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
					}
					else if (!args[0]->IsString()) {
						local->Reject(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"path\" argument is not a string")));
					}
				else if (1 < nArgsLength && !args[1]->IsUndefined() && !args[1]->IsNumber()) {
					local->Reject(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"mode\" argument is not an integer")));
				}
				else {

					// params conversion

						v8::String::Utf8Value param1(args[0]->ToString());
							std::string sDirname = _extends::tools::trim(std::string(*param1));

					// function treatment

						if ("" == sDirname) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "\"path\" argument is empty")));
						}
						else {

							// data
							work->directory = sDirname;
							work->mode = (1 < nArgsLength) ? args[1]->Uint32Value() : 0;
							work->created = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
