//需要引入utils.js
/*
<style>
div, ul, li, img, span {
	font-size: 0;
	margin: 0;
	padding: 0;
}

.trundle-container {
	width: 200px;
	height: 200px;
	margin: 0 auto;
	position: relative;
	border: 1px solid #000;
	overflow: hidden;
}

.trundle-wrapper {
	width: 800px;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

.trundle-wrapper:after {
	display: block;
	content: "";
	clear: both;
}

.trundle-slider {
	width: 200px;
	height: 100%;
	float: left;
}

.trundle-slider img {
	width: 100%;
	height: 100%;
}

.trundle-pagination {
	width: 48px;
	height: 10px;
	position: absolute;
	left: 50%;
	margin-left: -24px;
	bottom: 5px;
}

.trundle-pagination span {
	display: inline-block;
	width: 10px;
	height: 10px;
	margin-left: 3px;
	margin-right: 3px;
	background-color: gray;
	border-radius: 50%;
}

.trundle-pagination .trundle-selector {
	background-color: #000000;
}

.trundle-left, .trundle-right {
	font-size: 20px;
	line-height: 20px;
	color: #000000;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 50%;
	margin-top: -10px;
}

.trundle-left {
	left: 0;
}

.trundle-right {
	right: 0;
}
</style>*/
/*<div class="trundle-container">
	<ul class="trundle-wrapper">
		<li class="trundle-slider"><img src="images/1.jpg"></li>
		<li class="trundle-slider"><img src="images/2.jpg"></li>
		<li class="trundle-slider"><img src="images/3.jpg"></li>
		<li class="trundle-slider"><img src="images/1.jpg"></li>
	</ul>
	<div class="trundle-pagination"></div>
	<div class="trundle-left"><</div>
	<div class="trundle-right">></div>
</div>*/

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