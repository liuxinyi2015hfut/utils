//需要引入utils.js


function Trundle(curEle,options) {
	var oTrundle=this;
	var trundleWidth = parseFloat(utils.css(curEle, "width"));
	var trundleWrapper = utils.getByClass("trundle-wrapper", curEle)[0];
	var trundleSliders = utils.getByClass("trundle-slider", trundleWrapper);
	var trundlePagination = utils.getByClass("trundle-pagination", curEle)[0];
	var trundleLeft = utils.getByClass("trundle-left", curEle)[0];
	var trundleRight = utils.getByClass("trundle-right", curEle)[0];
	var trundlePaginationSpan = trundlePagination.getElementsByTagName("span");
	var trundleIndex = 0;
	var trundleObj = {
		speed: 300
	};
	for (var key in options) {
		trundleObj[key] = options[key];
	}

	function trundleSelector(num) {
		if(!trundlePagination){
			return;
		}
		if(num===3){num=0}
		for(var i=0;i<trundlePaginationSpan.length;i++){
			utils.removeClass(trundlePaginationSpan[i],"trundle-selector")
		}
		utils.addClass(trundlePaginationSpan[num],"trundle-selector")
	}
	function trundleMove() {
		if (trundleIndex > trundleSliders.length - 1) {
			trundleIndex = 0;
			utils.css(trundleWrapper, "left", -trundleWidth * trundleIndex);
			trundleIndex++;
		} else if (trundleIndex < 0) {
			trundleIndex = trundleSliders.length - 1;
			utils.css(trundleWrapper, "left", -trundleWidth * trundleIndex);
			trundleIndex--;
		}
		utils.animate(trundleWrapper, {left: -trundleWidth * trundleIndex}, trundleObj.speed,trundleSelector(trundleIndex))
	}

	if (trundlePagination) {
		var str = "";
		for (var i = 0; i < trundleSliders.length - 1; i++) {
			str += "<span></span>"
		}
		trundlePagination.innerHTML += str;
		trundleSelector(trundleIndex);
	}
	if (parseFloat(trundleObj.autoplay)) {
		oTrundle.trundleAutoPlay = setInterval(function () {
			trundleIndex++;
			trundleMove();
		}, trundleObj.autoplay);
		utils.on(curEle, "mouseleave", function () {
			oTrundle.trundleAutoPlay = setInterval(function () {
				trundleIndex++;
				trundleMove();
			}, trundleObj.autoplay)
		})
	}
	utils.on(curEle, "mouseenter", function () {
		clearInterval(oTrundle.trundleAutoPlay);
	});
	for(var j=0;j<trundlePaginationSpan.length;j++){
		trundlePaginationSpan[j].trundleNum=j;
		utils.on(trundlePaginationSpan[j],'click',function () {
			trundleIndex=this.trundleNum;
			trundleMove()
		})
	}
	utils.on(trundleLeft,"click",function () {
		trundleIndex--;
		trundleMove();
	});
	utils.on(trundleRight,"click",function () {
		trundleIndex++;
		trundleMove();
	});
}