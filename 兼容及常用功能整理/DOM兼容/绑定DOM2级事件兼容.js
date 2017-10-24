//解决在IE6,7,8下执行时顺序，this问题，只用于IE6,7,8下（浏览器提供的事件）
function run(e) {
	//处理事件对象兼容问题
	e = window.event;
	e.target = e.srcElement;
	e.pageX = e.clientX + (document.documentElement.scrollLeft||document.body.scrollLeft);
	e.pageY = e.clientY + (document.documentElement.scrollTop||document.body.scrollTop);
	e.stopPropagation = function () {
		e.cancelBubble = true;
	};
	e.preventDefault = function () {
		e.returnValue = false;
	};
	var ary = this["myBind"+e.type];
	for(var i=0;i<ary.length;i++){//按绑定顺序执行方法，解决this问题
		if(typeof ary[i] == "function"){
			ary[i].call(this,e);
		}else{
			ary.splice(i,1);
			i--;
		}
	}
}


function on(curEle,evenType,evenFn){
	if(curEle.addEventListener){
		curEle.addEventListener(evenType,evenFn,false);
		return;
	}
	if(!curEle["myBind"+evenType]){//首次为一个行为绑定事件时才执行，开辟自定义事件池，为IE规定事件行为绑定唯一的2级事件方法，能执行自定义事件池的方法
		curEle["myBind"+evenType] = [];
		curEle.attachEvent("on"+evenType,function () {
			run.call(curEle);//bind不兼容IE6、7、8
		});
	}
	var ary = curEle["myBind"+evenType];
	for(var i=0;i<ary.length;i++){
		var cur = ary[i];
		if(cur === evenFn){//过滤重复绑定
			return;
		}
	}
	ary.push(evenFn);
}
function off(curEle,evenType,evenFn) {
	if(curEle.removeEventListener){
		curEle.removeEventListener(evenType,evenFn,false);
		return;
	}
	var ary = curEle["myBind"+evenType];
	for(var i=0;i<ary.length;i++){
		if(ary[i] === evenFn){
			//ary.splice(i,1);// 会导致数组塌陷，解决办法i--或者从最后一项开始循环
			ary[i] = null;
			break;
		}
	}
}