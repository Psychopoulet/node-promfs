
#include "isDirectory.h"

namespace _extends {

	namespace isDirectory {

		// private

			bool _isDirectory(const std::string &p_sDirname) {

				bool bResult = false;

					// patch XP
					#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)

						DWORD dwAttrib = GetFileAttributes(p_sDirname.c_str());

						if (INVALID_FILE_ATTRIBUTES == dwAttrib) {

							DWORD lastError = GetLastError();

							bResult = !(
								ERROR_PATH_NOT_FOUND == lastError ||
								ERROR_FILE_NOT_FOUND == lastError ||
								ERROR_INVALID_NAME == lastError ||
								ERROR_BAD_NETPATH == lastError
							);

						}
						else if (dwAttrib & FILE_ATTRIBUTE_DIRECTORY) {
							bResult = true;
						}
						else {
							bResult = false;
						}

					#else

						struct stat sb;
						bResult = (0 == stat(p_sDirname.c_str(), &sb) && S_IFDIR == (sb.st_mode & S_IFMT));

					#endif

				return bResult;

			}

			static void _workAsync(uv_work_t *req) {

				_extends::AsyncWorkStructureIsFileIsDirectory *work = static_cast<_extends::AsyncWorkStructureIsFileIsDirectory *>(req->data);

				work->exists = _isDirectory(work->filename);

			}

			static void _workAsyncComplete(uv_work_t *req, int status) {

				v8::Isolate *isolate = v8::Isolate::GetCurrent();
				v8::HandleScope handleScope(isolate);

				_extends::AsyncWorkStructureIsFileIsDirectory *work = static_cast<_extends::AsyncWorkStructureIsFileIsDirectory *>(req->data);

					const unsigned argc = 2;
					v8::Local<v8::Value> argv[argc];

					argv[0] = v8::Null(isolate);
					argv[1] = v8::Boolean::New(isolate, work->exists);

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

				_extends::AsyncWorkStructureIsFileIsDirectory *work = static_cast<_extends::AsyncWorkStructureIsFileIsDirectory *>(req->data);

					v8::Local<v8::Promise::Resolver> local = v8::Local<v8::Promise::Resolver>::New(isolate, work->persistent);
					local->Resolve(v8::Boolean::New(isolate, work->exists));

				isolate->RunMicrotasks();

				work->callback.Reset();
				delete work;

			}

		// public

			void isDirectorySync(const v8::FunctionCallbackInfo<v8::Value>& args) {

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

									_extends::AsyncWorkStructureIsFileIsDirectory *work = new _extends::AsyncWorkStructureIsFileIsDirectory();
									work->request.data = work;

									// callback
									work->callback.Reset(isolate, param2);

									// data
									work->filename = sDirname;
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

					_extends::AsyncWorkStructureIsFileIsDirectory *work = new _extends::AsyncWorkStructureIsFileIsDirectory();
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
							work->filename = sDirname;
							work->exists = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
