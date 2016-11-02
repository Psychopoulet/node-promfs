
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

			void sleep(int milliseconds) {

				clock_t time_end;

				time_end = clock() + milliseconds * CLOCKS_PER_SEC/1000;
				while (clock() < time_end) { }

			}


	}

}
