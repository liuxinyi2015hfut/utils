//需要引入utils.js
function goTop(curEle) {
	utils.on(curEle,'click', function () {
		var distance = utils.setScroll("scrollTop");
		var duration = 500;
		var interval = 10;
		var step = distance/duration*interval;
		var timer=setInterval(function () {
			var curT = utils.setScroll("scrollTop");
			if(curT == 0){
				clearInterval(timer)
			}
			utils.setScroll("scrollTop",curT-step)
		},interval)
	});
	utils.on(window,'scroll',function () {
		var winH = document.documentElement.clientHeight || document.body.clientHeight;
		var curT = utils.setScroll("scrollTop");
		curEle.style.visibility= curT>winH ? "visible" : "hidden";//相比display，发生回流，visibility只发生重绘显然更好
	})
}