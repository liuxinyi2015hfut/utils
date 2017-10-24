//需要引入utils.js和拖拽.js
function getSpeed(e) {
	if (!this.myDrag.prevClientX) {
		this.myDrag.prevClientX = e.clientX;
	} else {
		this.myDrag.speedX = e.clientX - this.myDrag.prevClientX;
		this.myDrag.prevClientX = e.clientX;
	}
}

function fly() {
	var obj = this.myDrag;
	var maxL = obj.maxL;
	var minL = obj.minL;
	var targetEle = obj.target;
	targetEle.flyTimer = setInterval(function () {
		var targetLeft = utils.css(targetEle, "left") + obj.speedX;
		if (targetLeft > maxL) {
			targetEle.style.left = maxL + "px";
			obj.speedX *= -1;
		} else if (targetLeft <= minL) {
			targetEle.style.left = minL + "px";
			obj.speedX *= -1;
		} else {
			targetEle.style.left = targetLeft + "px";
		}
		obj.speedX *= 0.97;
		if (Math.abs(obj.speedX) < 0.5) {
			obj.prevClientX = null;
			obj.speedX = null;
			clearInterval(targetEle.flyTimer);
		}
	}, 15)

}

function drop() {
	var obj = this.myDrag;
	var maxT = obj.maxT;
	var minT = obj.minT;
	var targetEle = obj.target;
	targetEle.dropTimer = setInterval(function () {
		if (!obj.dropSpeed) {
			obj.dropSpeed = 9;
			obj.dropFlag = 0;
		} else {
			obj.dropSpeed += 9.8;
		}
		obj.dropSpeed *= 0.97;
		var targetTop = utils.css(targetEle, "top") + obj.dropSpeed;
		if (targetTop >= maxT) {
			// 这里面代码连续走两次，说明当前盒子已经到底部了
			obj.dropSpeed *= -1;
			targetEle.style.top = maxT + "px";
			obj.dropFlag++;
		} else {
			targetEle.style.top = targetTop + "px";
			obj.dropFlag = 0;
		}
		if (obj.dropFlag > 1) {
			obj.dropSpeed = null;
			clearInterval(targetEle.dropTimer);
		}
	}, 18)
}

function clearFlyDrop() {
	var obj = this.myDrag;
	clearTimeout(obj.target.flyTimer);
	clearTimeout(obj.target.dropTimer);
	obj.prevClientX = null;
	obj.speedX = null;
	obj.dropSpeed = null;
}

function flyAndDrop() {
	utils.on(this,"selfDragMouseDown",clearFlyDrop)
	utils.on(this,"selfDragMouseMove",getSpeed);
	utils.on(this,"selfDragMouseUp",fly);
	utils.on(this,"selfDragMouseUp",drop)
}