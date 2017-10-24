function addClass(curEle, classN) {
	var reg = new RegExp("^ +| +$", "g");
	classN = classN.replace(reg, "");
	var ary = classN.split(/ +/g);
	for (var i = 0; i < ary.length; i++) {
		if (!hasClass(curEle, ary[i])) {
			curEle.className += " " + ary[i];
		}
	}
}