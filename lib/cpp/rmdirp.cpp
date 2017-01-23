
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
					std::string notremoved;
					
				};

			// methods

				#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
					
					std::string _rmdirp(const std::string &p_sDirname) {

						std::string sResult = "";

							if (isDirectory::_isDirectory(p_sDirname)) {

								std::size_t length = p_sDirname.size();
								std::string sDirname = (tools::DIRECTORY_SEPARATOR == p_sDirname.substr(length - 1, length))
															? p_sDirname
															: p_sDirname + tools::DIRECTORY_SEPARATOR;

								WIN32_FIND_DATA FindFileData;
								HANDLE hFind = FindFirstFile((sDirname + "*").c_str(), &FindFileData);

								if (INVALID_HANDLE_VALUE != hFind) {

									do {

										if(0 != strcmp(FindFileData.cFileName, ".") && 0 != strcmp(FindFileData.cFileName, "..")) {

											// remove blocking attributes

											int attr = GetFileAttributes((sDirname + FindFileData.cFileName).c_str());
											if (FILE_ATTRIBUTE_HIDDEN == (attr & FILE_ATTRIBUTE_HIDDEN)) {

												if (!SetFileAttributes((sDirname + FindFileData.cFileName).c_str(), attr & ~FILE_ATTRIBUTE_HIDDEN)) {
													sResult = (sDirname + FindFileData.cFileName).c_str();
												}

											}
											if ("" == sResult && FILE_ATTRIBUTE_READONLY == (attr & FILE_ATTRIBUTE_READONLY)) {

												if (!SetFileAttributes((sDirname + FindFileData.cFileName).c_str(), attr & ~FILE_ATTRIBUTE_READONLY)) {
													sResult = (sDirname + FindFileData.cFileName).c_str();
												}

											}

											// remove file/directory

											if ("" == sResult) {

												if (isDirectory::_isDirectory(sDirname + FindFileData.cFileName)) {
													sResult = _rmdirp(sDirname + FindFileData.cFileName);
													if ("" != sResult) { break; }
												}
												else if (!tools::unlink(sDirname + FindFileData.cFileName)) {
													sResult = sDirname + FindFileData.cFileName;
													break;
												}

											}

										}

									} while(FindNextFile(hFind, &FindFileData));

									FindClose(hFind);

								}

								hFind = NULL;

								if ("" == sResult && !RemoveDirectory(sDirname.c_str())) {
									sResult = sDirname;
								}

							}

						return sResult;

					}

				#else
					
					std::string _rmdirp(const std::string &p_sDirname) {

						std::string sResult = "";

							if (isDirectory::_isDirectory(p_sDirname)) {

								std::size_t length = p_sDirname.size();
								std::string sDirname = (tools::DIRECTORY_SEPARATOR == p_sDirname.substr(length - 1, length))
															? p_sDirname
															: p_sDirname + tools::DIRECTORY_SEPARATOR;

								std::string sFilename = "";

								DIR *dp;
								struct dirent *entry;

								if(NULL != (dp = opendir(sDirname.c_str()))) {

									while(NULL != (entry = readdir(dp))) {

										sFilename = entry->d_name;

										if("." != sFilename && ".." != sFilename ) {

											sFilename = sDirname + sFilename;

											if (isDirectory::_isDirectory(sFilename)) {
												sResult = sFilename;
												if ("" != sResult) { break; }
											}
											else if (!tools::unlink(sFilename)) {
												sResult = sFilename;
												break;
											}

										}

									}

									closedir(dp);
									
								}

								dp = NULL;
								entry = NULL;
								
								if ("" == sResult && 0 != rmdir(sDirname.c_str())) {
									sResult = sDirname;
								}

							}

						return sResult;

					}

				#endif

				static void _workAsync(uv_work_t *req) {

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

					work->notremoved = _rmdirp(work->directory);

				}

				static void _workAsyncComplete(uv_work_t *req, int status) {

					v8::Isolate *isolate = v8::Isolate::GetCurrent();
					v8::HandleScope handleScope(isolate);

					_AsyncWork *work = static_cast<_AsyncWork *>(req->data);

						const unsigned argc = 1;
						v8::Local<v8::Value> argv[argc];

						if ("" != work->notremoved) {
							work->notremoved = "cannot remove \"" + work->notremoved + "\"";
							argv[0] = v8::Exception::Error(v8::String::NewFromUtf8(isolate, work->notremoved.c_str()));
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

						if ("" != work->notremoved) {
							work->notremoved = "cannot remove \"" + work->notremoved + "\"";
							local->Reject(v8::Exception::Error(v8::String::NewFromUtf8(isolate, work->notremoved.c_str())));
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
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
						
					}
						else if (args[0]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
						}
						else if (!args[0]->IsString()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"path\" argument is not a string")));
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

								std::string sResult = _rmdirp(sDirname);

								if ("" != sResult) {
									sResult = "cannot remove \"" + sResult + "\"";
									isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, sResult.c_str())));
								}

							}

					}

				// global return
				args.GetReturnValue().Set(v8::Undefined(isolate));
				
			}

			void rmdirp(const v8::FunctionCallbackInfo<v8::Value>& args) {

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
						else if (args[1]->IsUndefined()) {
							isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"callback\" argument")));
						}
						else if (!args[1]->IsFunction()) {
							isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"callback\" argument is not a function")));
						}
					else {

						// params conversion

							v8::String::Utf8Value param1(args[0]->ToString());
								std::string sDirname = _extends::tools::trim(std::string(*param1));
							v8::Local<v8::Function> param2 = v8::Local<v8::Function>::Cast(args[1]);

						// function treatment

							if ("" == sDirname) {
								isolate->ThrowException(v8::Exception::Error(v8::String::NewFromUtf8(isolate, "\"path\" argument is empty")));
							}
							else {

								// init asynchronous treatment

									_AsyncWork *work = new _AsyncWork();
									work->request.data = work;

									// callback
									work->callback.Reset(isolate, param2);

									// data
									work->directory = sDirname;
									work->notremoved = "";

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
					local->Reject(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
				}
					else if (args[0]->IsUndefined()) {
						isolate->ThrowException(v8::Exception::ReferenceError(v8::String::NewFromUtf8(isolate, "missing \"path\" argument")));
					}
					else if (!args[0]->IsString()) {
						local->Reject(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "\"path\" argument is not a string")));
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
							work->notremoved = "";

							// start asynchronous treatment
							uv_queue_work(uv_default_loop(), &work->request, _workAsync, _workPromiseComplete);

						}

				}

			}

	}

}
