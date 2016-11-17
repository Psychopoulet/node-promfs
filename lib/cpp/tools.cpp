
#include "tools.h"

namespace _extends {

	namespace tools {

		// public

			std::string trim(const std::string &s) {

				std::string::const_iterator it = s.begin();

				while (it != s.end() && isspace(*it)) {
					it++;
				}

				std::string::const_reverse_iterator rit = s.rbegin();

				while (rit.base() != it && isspace(*rit)) {
					rit++;
				}

				return std::string(it, rit.base());

			}

			/*void sleep(int milliseconds) {

				clock_t time_end;

				time_end = clock() + milliseconds * CLOCKS_PER_SEC/1000;
				while (clock() < time_end) { }

			}*/

			// patch XP
			#if defined(WIN32) || defined(_WIN32) || defined(__WIN32) && !defined(__CYGWIN__)

				bool isWindowsVistaOrHigher() {

					/*if (eIsWindowsVistaOrHigherTested::NOTTESTED == nIsWindowsVistaOrHigherTested) {
						nIsWindowsVistaOrHigherTested = (5 < (DWORD)(LOBYTE(LOWORD(GetVersion())))) ? eIsWindowsVistaOrHigherTested::YES : eIsWindowsVistaOrHigherTested::NO;
					}

					return (eIsWindowsVistaOrHigherTested::YES);*/

					return false;

				}

			#endif

	}

}
