
#ifndef EXTEND_TOOLS

	#define EXTEND_TOOLS

	// std
	#include <string>
	//#include <time.h>

	// tools
	#include "isFile.h"

	namespace _extends {

		namespace tools {

			// private

			#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
				static const std::string DIRECTORY_SEPARATOR = "\\";
			#else
				static const std::string DIRECTORY_SEPARATOR = "/";
			#endif

			std::string basename(std::string source);
			std::string dirname(std::string source);
			bool unlink(const std::string p_sFilename);
			std::string trim(const std::string &s);
			//void sleep(int milliseconds);

		}

	}
	
#endif
