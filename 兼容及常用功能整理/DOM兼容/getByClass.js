// context：上下文，如果不传，默认是document
function getByClass(classN,context) {
	context = context || document;
	if(context.getElementsByClassName){
		return context.getElementsByClassName(classN);
	}
	var ary= [];
	var eles = context.getElementsByTagName("*")
	for(var i=0;i<eles.length;i++){
		var curEle = eles[i];
		var curClass = curEle.className;
		var reg = new RegExp("(^|\\s+)"+classN+"(\\s+|$)");
		if(reg.test(curClass)){
			ary.push(curEle)
		}
	}
	return ary;
}