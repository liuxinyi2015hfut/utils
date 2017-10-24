function getChildren(curEle) {
	var children=curEle.children;
	if(typeof curEle.nextElementSibling !="object"){
		var ary = [];
		for(var i=0;i<children.length;i++){
			var curChild = children[i];
			if(curChild.nodeType ===1){
				ary.push(curChild);
			}
		}
		return ary;
	}
	return children;
}