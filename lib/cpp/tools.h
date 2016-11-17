
#ifndef EXTEND_TOOLS

	#define EXTEND_TOOLS

	#include <string>
	//#include <time.h>

	#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
		#include <windows.h>
	#endif

	namespace _extends {

		namespace tools {

			// private

			#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)

				enum eIsWindowsVistaOrHigher { YES, NO, NOTTESTED };
				bool isWindowsVistaOrHigher();

			#endif

			std::string trim(const std::string &s);
			//void sleep(int milliseconds);

		}

	}
	
#endif
