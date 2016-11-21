
#include "rmdirp.h"

namespace _extends {

	namespace rmdirp {

		// private

			// structure

				struct _AsyncWork {

					uv_work_t request;
					v8::Persistent<v8::Function> callback;
					v8::Persistent<v8::Promise::Resolver> persistent;

					std::string directory;
					bool removed;
					
				};

			// methods

				bool _rmdirp(const std::string &p_sDirname) {

					bool bResult = false;

						std::string sDirbasename = tools::basename(p_sDirname);
						std::string sDirname = (tools::dirname(p_sDirname) != tools::dirname(p_sDirname + tools::DIRECTORY_SEPARATOR))
													? tools::dirname(p_sDirname + tools::DIRECTORY_SEPARATOR)
													: p_sDirname;

						if (!isDirectory::_isDirectory(sDirname)) {
							bResult = true;
						}
						else {

							bool bFailToDelete = false;

							#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)

								WIN32_FIND_DATA FindFileData;
								HANDLE hFind = FindFirstFile((sDirname + "*").c_str(), &FindFileData);

								if (INVALID_HANDLE_VALUE != hFind) {

									do {

										if('.' != FindFileData.cFileName[0]) {

											if (FILE_ATTRIBUTE_DIRECTORY & FindFileData.dwFileAttributes) {
												
												if (!_rmdirp(sDirname + FindFileData.cFileName)) {
													bFailToDelete = true;
													break;
												}

											}
											else {

												if (!tools::unlink(sDirname + FindFileData.cFileName)) {
													bFailToDelete = true;
													break;
												}
												
											}

										}

									} while(FindNextFile(hFind, &FindFileData));

									FindClose(hFind);

								}

								hFind = NULL;

								if (!bFailToDelete) {
									bResult = (RemoveDirectory(sDirname.c_str()));
								}

							#else

								DIR *dp;

								struct dirent *entry;
								struct stat statbuf;

								if(NULL != (dp = opendir(dir))) {

									while(NULL != (entry = readdir(dp))) {

										if(0 != strcmp(".", entry->d_name) && 0 != strcmp("..", entry->d_name)) {

											lstat(entry->d_name,&statbuf);

											if(S_ISDIR(statbuf.st_mode)) {

												if (!_rmdirp(entry->d_name)) {
													bFailToDelete = true;
													break;
												}

											}
											else {

												if (!tools::unlink(entry->d_name)) {
													bFailToDelete = true;
													break;
												}

											}

										}

									}

									closedir(dp);
									
								}

								dp = NULL;

								entry = NULL;
								statbuf = NULL;
									
								if (!bFailToDelete) {
									bResult = rmdir(sDirname);
								}

							#endif

						}

					return bResult;

				}

				static void _workAsync(uv_work_t *req) {

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					work->removed = _rmdirp(work->directory);

				}

				static void _workAsyncComplete(uv_work_t *req, int status) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope handleScope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						const unsigned argc = 1;
						v8::Local<v8::Value> argv[argc];

						if (!work->removed) {
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

						if (!work->removed) {
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

			void rmdirpSync(const v8::FunctionCallbackInfo<v8::Value>& args) {

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
							else if (!_rmdirp(sDirname)) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "cannot remove 'path' recursively")));
							}

					}

				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));
				
			}

			void rmdirp(const v8::FunctionCallbackInfo<v8::Value>& args) {

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
									work->removed = false;

								// start asynchronous treatment
								uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workAsyncComplete);

							}

					}
				
				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));

			}

			void rmdirpProm(const v8::FunctionCallbackInfo<v8::Value>& args) {

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
							work->removed = false;

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
