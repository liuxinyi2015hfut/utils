function getNextEleSiblings(curEle) {
	var ary = [];
	var n = curEle.nextSibling;
	while (n) {
		if (n.nodeType === 1) {
			ary.push(n)
		}
		n = n.nextSibling;
	}
	return ary;
}