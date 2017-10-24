function getNextEle(curEle) {
	var nex;
	if(curEle.nextElementSibling){
		nex = curEle.nextElementSibling;
		return nex;
	}
	var n = curEle.nextSibling;
	while (n){
		if(n.nodeType==1){
			return n
		}
		n = n.nextSibling;
	}
}