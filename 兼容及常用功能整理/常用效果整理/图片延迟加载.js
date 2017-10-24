//需要引入utils.js
function delayImg(imgList, relImgAttr, callBack) {
	var winH = document.documentElement.clientHeight || document.body.clientHeight;
	if (!imgList.length) {
		imgList = new Array(imgList);
	}
	function delay() {
		var scrTop = utils.setScroll("scrollTop");
		for (var i = 0; i < imgList.length; i++) {
			if (!imgList[i].Load) {//判断是否已经加载过了

				var curT = utils.offsetToBody(imgList[i]).top;
				var curH=imgList[i].offsetHeight;
				var trueAddress = imgList[i].getAttribute(relImgAttr);
				if (winH + scrTop >= curT+curH) {
					var oImg = document.createElement("img");
					oImg.src = trueAddress;
					oImg.index=i;
					oImg.onload = function () {//确保图片地址正确
						imgList[this.index].src = this.src;
						imgList[this.index].Load = true;
						typeof callBack ==="function"?callBack(imgList[this.index]):null
					};
					oImg = null;
				}
			}
		}
	}
	utils.on(window,'scroll',delay);
	delay();
}