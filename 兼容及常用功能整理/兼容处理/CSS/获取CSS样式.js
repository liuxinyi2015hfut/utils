function getCss(curEle, attr) {
	var val = null;
	var reg = null;

	// try {
	// 	val = window.getComputedStyle(curEle)[attr];
	// } catch (e) {
	// 	if (attr === "opacity") {
	// 		val = curEle.currentStyle["filter"];
	// 		reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
	// 		val = parseFloat(reg.exec(val)[1] / 100);
	// 	} else {
	// 		val = curEle.currentStyle[attr];
	// 	}
	// }

	if ("getComputedStyle" in window) {
		val = window.getComputedStyle(curEle)[attr];
	} else {
		if (attr === "opacity") {
			val = curEle.currentStyle["filter"]; //alpha(opacity = 50.0)
			reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
			val = parseFloat(reg.exec(val)[1] / 100);
		} else {
			val = curEle.currentStyle[attr];
		}
	}
	var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
	val = reg1.test(val) ? parseFloat(val) : val;
	return val;
}