function removeClass(curEle, classN) {
	var reg = new RegExp("^ +| +$", "g");
	classN = classN.replace(reg, "");
	var ary = classN.split(/ +/g)
	for (var i = 0; i < ary.length; i++) {
		var curName = ary[i];
		if (hasClass(curEle, curName)) {
			var reg1 = new RegExp("(^| +)" + curName + "( +|$)");
			curEle.className = curEle.className.replace(reg1, " ")
		}
	}
}