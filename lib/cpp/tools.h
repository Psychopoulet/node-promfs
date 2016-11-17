
#ifndef EXTEND_TOOLS

	#define EXTEND_TOOLS

	#include <string>
	//#include <time.h>

	// patch XP
	#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)
		#include <windows.h>
	#endif

	namespace _extends {

		namespace tools {

			// private

			std::string trim(const std::string &s);
			//void sleep(int milliseconds);

			// patch XP
			#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)

				enum eIsWindowsVistaOrHigherTested { YES, NO, NOTTESTED };
				static int nIsWindowsVistaOrHigherTested = eIsWindowsVistaOrHigherTested::NOTTESTED;
				
				bool isWindowsVistaOrHigher();

			#endif

		}

	}
	
#endif
