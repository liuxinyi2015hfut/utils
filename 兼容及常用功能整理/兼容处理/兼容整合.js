var compatible = {
	toJSONParse: function (str) {
		var newObj = "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
		return newObj
	},
	toArray: function (aryLike) {
		var ary = [];
		try {
			ary = Array.prototype.slice.call(aryLike);
		} catch (e) {
			for (var i = 0; i < aryLike.length; i++) {
				ary[ary.length] = aryLike[i];
			}
		}
		return ary;
	},
	getCss: function (curEle, attr) {
		var val = null;
		var reg = null;
		if ("getComputedStyle" in window) {
			val = window.getComputedStyle(curEle)[attr];
		} else {
			if (attr === "opacity") {
				val = curEle.currentStyle["filter"];
				reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
				val = parseFloat(reg.exec(val)[1] / 100);
			} else {
				val = curEle.currentStyle[attr];
			}
		}
		return val;
	},
	setCss: function (curEle, attr, value) {
		if (attr === "opacity") {
			curEle.style["opacity"] = value;
			curEle.style["filter"] = "alpha(opacity=" + value * 100 + ")";
		}
		if (attr === "float") {
			curEle.style["cssFloat"] = value;
			curEle.style["styleFloat"] = value;
		}
		var reg = /^width|height|top|left|bottom|right|((margin|padding)(Top|Bottom|Left|Right)?)$/;
		if (reg.test(attr)) {
			if (!isNaN(value)) {
				value += "px";
			}
		}
		curEle.style[attr] = value;
	},
	offsetToBody: function (curEle) {
		var l = curEle.offsetLeft;
		var t = curEle.offsetTop;
		var p = curEle.offsetParent;
		var flag = (navigator.userAgent.indexOf("MSIE 8.0") == -1);
		while (p) {
			if (flag) {
				l += p.clientLeft;
				t += p.clientTop;
			}
			l += p.offsetLeft;
			t += p.offsetTop;
			p = p.offsetParent;
		}
		return {left: l, top: t};
	},
	setScroll: function (attr, value) {
		if (value === undefined) {
			return document.documentElement[attr] || document.body[attr];
		}
		document.documentElement[attr] = value;
		document.body[attr] = value;
	},
	createXHR: function () {
		var xhr = null;
		var flag = false;
		var ary = [
			'new XMLHttpRequest()',
			'new ActiveXObject("Microsoft.XMLHTTP")',
			'new ActiveXObject("Msxml2.XMLHTTP")',
			'new ActiveXObject("Msxml3.XMLHTTP")'
		];
		for (var i = 0; i < ary.length; i++) {
			try {
				xhr = eval(ary[i]);
				utils.createXHR = function () {//惰性函数思想
					return eval(ary[i])
				};
				flag = true;
				return xhr;
			} catch (e) {
			}
		}
		if (!flag) {
			throw new Error("你的浏览器不支持ajax");
		}
	},
	getByClass: function (classN, context) {
		context = context || document;
		if (context.getElementsByClassName) {
			return context.getElementsByClassName(classN);
		}
		var ary = [];
		var eles = context.getElementsByTagName("*")
		for (var i = 0; i < eles.length; i++) {
			var curEle = eles[i];
			var curClass = curEle.className;
			var reg = new RegExp("(^|\\s+)" + classN + "(\\s+|$)");
			if (reg.test(curClass)) {
				ary.push(curEle)
			}
		}
		return ary;
	}
};