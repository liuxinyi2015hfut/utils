function getPrevEleNum(curEle) {
	var index = 0;
	var p = curEle.previousSibling;
	while(p){
		if(p.nodeType ===1){
			index++;
		}
		p=p.previousSibling
	}
	return index;
}