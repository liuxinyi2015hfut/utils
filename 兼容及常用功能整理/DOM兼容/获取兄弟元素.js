function getEleSiblings(curEle) {
	var nodes = curEle.parentNode.childNodes// 子节点
	var ary =[];
	for(var i=0;i<nodes.length;i++){
		var curNode = nodes[i];
		if(curNode !== curEle&&curNode.nodeType===1){
			ary.push(curNode)
		}
	}
	return ary;
}