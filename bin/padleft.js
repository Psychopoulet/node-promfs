"use strict";

// module

module.exports = (msg) => {
	return 2 > msg.length ? "0" + msg : msg;
};
