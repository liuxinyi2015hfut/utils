//自定义事件和浏览器事件合并，兼容IE6/7/8

//订阅
function on(curEle,evenType,evenFn){
	var ary=null;
	//自定义事件
	if(/^self/.test(evenType)){
		if(!curEle[evenType]){
			curEle[evenType] = []
		}
		ary = curEle[evenType];
		for(var j=0;j<ary.length;j++){
			if(ary[j] === evenFn)return;
		}
		ary.push(evenFn);
		return;
	}

	// 浏览器事件
	if(curEle.addEventListener){
		curEle.addEventListener(evenType,evenFn,false);
		return;
	}
	if(!curEle["myBind"+evenType]){
		curEle["myBind"+evenType] = [];
		curEle.attachEvent("on"+evenType,function () {
			run.call(curEle);
		});
	}
	ary = curEle["myBind"+evenType];
	for(var i=0;i<ary.length;i++){
		var cur = ary[i];
		if(cur === evenFn){
			return;
		}
	}
	ary.push(evenFn);
}

//发布执行
function run(evenType, e) {
	var ary = null;
	if (this[evenType] && /^self/.test(evenType)) {
		ary = this[evenType];
		for (var j = 0; j < ary.length; j++) {
			ary[j].call(this, e);
		}
		return;
	}
	e = window.event;
	e.target = e.srcElement;
	e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
	e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
	e.stopPropagation = function () {
		e.cancelBubble = true;
	};
	e.preventDefault = function () {
		e.returnValue = false;
	};

	ary = this["myBind" + e.type];
	if (ary) {
		for (var i = 0; i < ary.length; i++) {
			if (typeof ary[i] == "function") {
				ary[i].call(this, e);
			} else {
				ary.splice(i, 1);
				i--;
			}
		}
	}
}

function off(curEle,evenType,evenFn) {
	var ary=null;
	if(/^self/.test(evenType)){
		ary = this[evenType];
		for(var j=0;j<ary.length;j++){
			if(ary[j] === evenFn){
				ary[j] = null;
				break;
			}
		}
		return;
	}
	if(curEle.removeEventListener){
		curEle.removeEventListener(evenType,evenFn,false);
		return;
	}
	ary = curEle["myBind"+evenType];
	for(var i=0;i<ary.length;i++){
		if(ary[i] === evenFn){
			ary[i] = null;
			break;
		}
	}
}

