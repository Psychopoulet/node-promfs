"use strict";

// module

module.exports = (arg) => {

	return arg.replace(/-([a-z])/g, (cr, p1) => {
		return p1.toUpperCase();
	}) + "Prom";

};
