function css() {
	var  len = arguments.length,
		curEle = arguments[0],
		attr = null,
		value = null,
		options = null;
	if(len ===3){
		attr = arguments[1];
		value = arguments[2];
		setCss(curEle,attr,value);
		return;
	}
	if(len ===2 && typeof arguments[1] === "object"){
		options = arguments[1];
		setGroupCss(curEle,options)
		return;
	}
	attr = arguments[1];
	return getCss(curEle,attr);
}