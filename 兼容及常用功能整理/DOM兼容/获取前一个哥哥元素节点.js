function getPrevEle(curEle) {
	var pre;
	if(curEle.previousElementSibling){
		pre = curEle.previousElementSibling;
		return pre;
	};
	var p = curEle.previousSibling;
	while (p){
		if(p.nodeType==1){
			return p
		}
		p = p.previousSibling;
	}
}