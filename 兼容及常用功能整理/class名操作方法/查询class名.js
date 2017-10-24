function hasClass(curEle, classN) {
	var curEleClass = curEle.className;
	var reg = new RegExp("(^| +)" + classN + "( +|$)");
	return reg.test(curEleClass);
}