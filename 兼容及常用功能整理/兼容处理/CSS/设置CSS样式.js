function setCss(curEle,attr,value) {
	if(attr === "opacity"){
		curEle.style["opacity"] = value;
		curEle.style["filter"] = "alpha(opacity="+ value*100 +")";
	}
	if(attr==="float"){
		curEle.style["cssFloat"] = value;
		curEle.style["styleFloat"] = value;
	}
	var reg = /^width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?)$/;
	if(reg.test(attr)){
		if(!isNaN(value)){
			value+="px";
		}
	}
	curEle.style[attr] = value;
}

function setGroupCss(curEle, options) {
	for (var attr in options) {
		setCss(curEle, attr, options[attr])
	}
}