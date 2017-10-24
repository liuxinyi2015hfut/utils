function getPrevEleSiblings(curEle) {
	var ary = [];
	var p = curEle.previousSibling;
	while (p) {
		if (p.nodeType === 1) {
			ary.unshift(p)
		}
		p = p.previousSibling;
	}
	return ary;
}