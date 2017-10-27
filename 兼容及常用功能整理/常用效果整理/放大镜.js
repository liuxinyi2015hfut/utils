//需要引入utils.js

function magnifier(curEle,curEleBig,lensName,timesNum) {
	var oLens = utils.getByClass(lensName,curEle);
	var oBigImg = curEleBig.getElementsByTagName("img")[0];
	var oLeft = curEle.offsetLeft,oTop = curEle.offsetTop;
	var oLensW=null;
	var oLensH=null;
	var minL =0,maxL = null;
	var minT = 0, maxT = null;
	function computed(e){
		var left = e.clientX - oLeft-(oLensW/2);
		var top = e.clientY - oTop-(oLensH/2);
		if(left<minL ){
			left = minL;
		}else if(left > maxL){
			left = maxL;
		}
		if(top < minT){
			top = minT;
		}else if(top>maxT){
			top = maxT;
		}
		oLens[0].style.left = left + "px";
		oLens[0].style.top = top + "px";
		oBigImg.style.left = - left*timesNum +"px";
		oBigImg.style.top = -top*timesNum + "px";
	}

	utils.on(curEle,"mouseenter",function () {
		if(oLens.length===0){
			var lens = document.createElement("div");
			lens.className = lensName;
			this.appendChild(lens);
			oLensW=oLens[0].offsetWidth;
			oLensH=oLens[0].offsetHeight;
			maxL = curEle.offsetWidth - oLensW;
			maxT = curEle.offsetHeight - oLensH;
		}else{
			oLens[0].style.visibility="visible";
		}
		curEleBig.style.visibility="visible";
	});
	utils.on(curEle,"mousemove",function (e) {
		e = e || window.event;
		computed(e);
	});
	utils.on(curEle,"mouseleave",function () {
		oLens[0].style.visibility="hidden";
		curEleBig.style.visibility = "hidden";
	});
}