//在xp系统的IE8浏览器中，偏移量是当前元素的边框**外**边缘距离父级参照物的边框**外**边缘的距离
function offsetToBody(curEle) {
	var l = curEle.offsetLeft;
	var t = curEle.offsetTop;
	var p = curEle.offsetParent;
	var flag=navigator.userAgent.indexOf("MSIE 8.0") == -1;
	while(p){
		//在标准的IE8 浏览器中，offsetLeft会把参照物的边框宽度算进去
		if(flag){
			l+= p.clientLeft;
			t+= p.clientTop;
		}
		l+= p.offsetLeft;
		t+= p.offsetTop;
		p= p.offsetParent;
	}
	return {left : l,top: t};
}