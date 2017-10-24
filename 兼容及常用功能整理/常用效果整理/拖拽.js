//需要引入utils.js
/*div, h2,h3{
	margin: 0;
	padding: 0;
}
#box {
	position: absolute;
	width: 300px;
	height: 300px;
	background: #ffaa2a;
	top: 0;
	left: 0;
}

#box h2 {
	font-size: 14px;
	background: #008CD7;
	padding: 0 10px;
	color: #ffffff;
	height: 30px;
	line-height: 30px;
	cursor: move;
	-webkit-user-select: none;
}*/
/*<div id="box">
	<h2 class="aaa">按住鼠标拖动</h2>
</div>*/

// curEle 移动元素
// bindClassName 点击元素（必须是curEle是后代元素，通过类名获取元素时索引为0）类名
// context 移动范围元素（与curEle不需要有任何关系，可以不传，默认为窗口）
function drag(curEle, bindClassName, context,callback){
	var bindEle = null;
	if (arguments.length === 1) {
		bindEle = curEle;
	} else if (arguments.length > 1) {
		switch (typeof arguments[1]){
			case "string":
				bindEle = utils.getByClass(bindClassName, curEle)[0];
				if(arguments.length===3&&typeof arguments[2]==="function"){
					callback=arguments[2];
					context=null;
				}
				break;
			case "object" :
				if(arguments.length===3&&typeof arguments[2]==="function"){
					callback=arguments[2];
				}
				context=arguments[1];
				bindEle = curEle;
				break;
			case "function" :
				callback=arguments[1];
				context=null;
				bindEle = curEle;
				break;
			default :
				break;
		}
	}
	bindEle.myDrag = {};
	bindEle.myDrag.target = curEle;
	bindEle.myDrag.context = context ? context : null;
	bindEle.myDrag.move = function (e) {
		dragMouseMove.call(bindEle, e);
	};
	bindEle.myDrag.up = function (e) {
		dragMouseUp.call(bindEle, e);
	};
	utils.on(bindEle, "mousedown", dragMouseDown);
	callback?callback.call(bindEle):null;
}

function dragData(bindEle) {
	var obj = bindEle.myDrag;
	var context = {};
	if (obj.context) {
		context.W = obj.context.clientWidth;
		context.H = obj.context.clientHeight;
		var contextOffset = utils.offsetToBody(obj.context);
		context.L = contextOffset.left;
		context.T = contextOffset.top;
		context.borderL = obj.context.clientLeft;
		context.borderT = obj.context.clientTop;
	} else {
		context.W = (document.documentElement.clientWidth || document.body.clientWidth);
		context.H = (document.documentElement.clientHeight || document.body.clientHeight);
		context.L = 0;
		context.T = 0;
		context.borderL = 0;
		context.borderT = 0;
	}
	var targetParentOffset = utils.offsetToBody(obj.target.offsetParent);
	obj.minL = context.L + context.borderL - targetParentOffset.left - obj.target.offsetParent.clientLeft;
	obj.maxL = obj.minL + context.W - obj.target.offsetWidth - utils.css(obj.target, "marginRight") - utils.css(obj.target, "marginLeft");
	obj.minT = context.T + context.borderT - targetParentOffset.top - obj.target.offsetParent.clientTop;
	obj.maxT = obj.minT + context.H - obj.target.offsetHeight - utils.css(obj.target, "marginBottom") - utils.css(obj.target, "marginTop");
	obj.targetL = utils.css(obj.target, "left");
	obj.targetT = utils.css(obj.target, "top");
	obj = null;
}

function dragMouseDown(e) {
	e.stopPropagation();
	dragData(this);
	this.myDrag.cursorX = e.clientX;
	this.myDrag.cursorY = e.clientY;
	if (this.setCapture) {
		this.setCapture();
		utils.on(this, "mousemove", dragMouseMove);
		utils.on(this, "mouseup", dragMouseUp);
	} else {
		utils.on(document, "mousemove", this.myDrag.move);
		utils.on(document, "mouseup", this.myDrag.up);
	}
	utils.run.call(this, "selfDragMouseDown", e);
}

function dragMouseMove(e) {
	var obj = this.myDrag;
	var changeL = e.clientX - obj.cursorX;
	var changeT = e.clientY - obj.cursorY;
	var left = obj.targetL + changeL;
	var top = obj.targetT + changeT;

	if (left < obj.minL) {
		left = obj.minL
	} else if (left > obj.maxL) {
		left = obj.maxL;
	}
	if (top < obj.minT) {
		top = obj.minT;
	} else if (top > obj.maxT) {
		top = obj.maxT
	}
	utils.css(obj.target, {left: left});
	utils.css(obj.target, {top: top});
	obj = null;
	utils.run.call(this, "selfDragMouseMove", e);
}

function dragMouseUp(e) {
	if (this.releaseCapture) {
		this.releaseCapture();
		utils.off(this, "mousemove", dragMouseMove);
		utils.off(this, "mouseup", dragMouseUp);
	} else {
		utils.off(document, "mousemove", this.myDrag.move);
		utils.off(document, "mouseup", this.myDrag.up);
	}
	utils.run.call(this, "selfDragMouseUp", e);
}