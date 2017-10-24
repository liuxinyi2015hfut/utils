function setScroll(attr,value) {
	if(value === undefined){
		return document.documentElement[attr] || document.body[attr];
	}
	document.documentElement[attr] = value;
	document.body[attr] = value;
}