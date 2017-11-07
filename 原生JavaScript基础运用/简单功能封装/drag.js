(function () {
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

	window.drag = function (curEle, bindClassName, context, callback) {
		var bindEle = null;
		if (arguments.length === 1) {
			bindEle = curEle;
		} else if (arguments.length > 1) {
			switch (typeof arguments[1]) {
				case "string":
					bindEle = utils.getByClass(bindClassName, curEle)[0];
					if (arguments.length === 3 && typeof arguments[2] === "function") {
						callback = arguments[2];
						context = null;
					}
					break;
				case "object" :
					if (arguments.length === 3 && typeof arguments[2] === "function") {
						callback = arguments[2];
					}
					context = arguments[1];
					bindEle = curEle;
					break;
				case "function" :
					callback = arguments[1];
					context = null;
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
		callback ? callback.call(bindEle) : null;
	};
})();