
#include "copyFile.h"

namespace _extends {

	namespace copyFile {

		// private

			// structure

				struct _AsyncWork {

					uv_work_t request;
					v8::Persistent<v8::Function> callback;
					v8::Persistent<v8::Promise::Resolver> persistent;

					std::string origin;
					std::string target;
					bool copied;
					
				};

			// methods

				bool _copyFile(const std::string &p_sOrigin, std::string p_sTarget) {

					bool bResult = false;

						if (tools::unlink(p_sTarget)) {
							
							std::ifstream originFileStream;
							std::ofstream targetFileStream;

							originFileStream.open(p_sOrigin, std::ios::in | std::ios::binary);

							if (originFileStream.is_open()) {

								targetFileStream.open(p_sTarget, std::ios::out | std::ios::binary);

								if (targetFileStream.is_open()) {

									targetFileStream << originFileStream.rdbuf();

									targetFileStream.close();

								}

								originFileStream.close();

							}

							bResult = isFile::_isFile(p_sTarget);

						}

					return bResult;

				}

				static void _workAsync(uv_work_t *req) {

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					work->copied = _copyFile(work->origin, work->target);

				}

				static void _workAsyncComplete(uv_work_t *req, int status) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope handleScope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						const unsigned argc = 1;
						v8::Local<v8::Value> argv[argc];

						if (!work->copied) {
							argv[0] = v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot copy 'origin' into 'target'"));
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

						if (!work->copied) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot copy 'origin' into 'target'")));
						}
						else {
							local->Resolve(v8::Undefined(isolate));
						}

					isolate->RunMicrotasks();

					work->callback.Reset();
					delete work;

				}

		// public

			void copyFileSync(const v8::FunctionCallbackInfo<v8::Value>& args) {

				const int nArgsLength = args.Length();
				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'origin' argument")));
						
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'origin' argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'origin' argument is not a string")));
						}
					else if (1 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'target' argument")));
						
					}
						else if (args[1]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'target' argument")));
						}
						else if (!args[1]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'target' argument is not a string")));
						}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sOrigin = _extends::tools::trim(std::string(*param1));

							v8::String::Utf8Value param2(args[1]->ToString());
								std::string sTarget = _extends::tools::trim(std::string(*param2));

						// function treatment

							if ("" == sOrigin) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'origin' argument is empty")));
							}
							else if ("" == sTarget) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'target' argument is empty")));
							}
							else if (!isFile::_isFile(sOrigin)) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'origin' is not a valid file")));
							}
							else if (!_copyFile(sOrigin, sTarget)) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot copy 'origin' into 'target'")));
							}

					}

				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));
				
			}

			void copyFile(const v8::FunctionCallbackInfo<v8::Value>& args) {

				const int nArgsLength = args.Length();
				v8::Isolate *isolate = args.GetIsolate();

					// params treatment
					if (0 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'origin' argument")));
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'origin' argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'origin' argument is not a string")));
						}
					else if (1 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'target' argument")));
					}
						else if (args[1]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'target' argument")));
						}
						else if (!args[1]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'target' argument is not a string")));
						}
					else if (2 >= nArgsLength) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'callback' argument")));
					}
						else if (args[2]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'callback' argument")));
						}
						else if (!args[2]->IsFunction()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'callback' argument is not a function")));
						}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sOrigin = _extends::tools::trim(std::string(*param1));

							v8::String::Utf8Value param2(args[1]->ToString());
								std::string sTarget = _extends::tools::trim(std::string(*param2));

							v8::Local<v8::Function> param3 = v8::Local<v8::Function>::Cast(args[2]);

						// function treatment

							if ("" == sOrigin) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'origin' argument is empty")));
							}
							else if ("" == sTarget) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'target' argument is empty")));
							}
							else if (!isFile::_isFile(sOrigin)) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'origin' is not a valid file")));
							}
							else {

								// init asynchronous treatment

									_AsyncWork *work = new _AsyncWork();
									work->request.data = work;

									// callback
									work->callback.Reset(isolate, param3);

									// data
									work->origin = sOrigin;
									work->target = sTarget;
									work->copied = false;

								// start asynchronous treatment
								uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workAsyncComplete);

							}

					}
				
				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));

			}

			void copyFileProm(const v8::FunctionCallbackInfo<v8::Value>& args) {

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
					local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'origin' argument")));
				}
					else if (args[0]->IsUndefined()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'origin' argument")));
					}
					else if (!args[0]->IsString()) {
						local->Reject(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'origin' argument is not a string")));
					}
				else if (1 >= nArgsLength) {
					local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'target' argument")));
				}
					else if (args[1]->IsUndefined()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing 'target' argument")));
					}
					else if (!args[1]->IsString()) {
						local->Reject(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "'target' argument is not a string")));
					}
				else {

					// params conversion

						v8::String::Utf8Value param1(args[0]->ToString());
							std::string sOrigin = _extends::tools::trim(std::string(*param1));

						v8::String::Utf8Value param2(args[1]->ToString());
							std::string sTarget = _extends::tools::trim(std::string(*param2));

					// function treatment

						if ("" == sOrigin) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'origin' argument is empty")));
						}
						else if ("" == sTarget) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'target' argument is empty")));
						}
						else if (!isFile::_isFile(sOrigin)) {
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "'origin' is not a valid file")));
						}
						else {

							// data
							work->origin = sOrigin;
							work->target = sTarget;
							work->copied = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
