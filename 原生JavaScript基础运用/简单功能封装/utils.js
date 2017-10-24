(function () {
	var xhrIE = (function () {
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
				flag = true;
				return ary[i];
			} catch (e) {
			}
		}
		if (!flag) {
			return 'throw new Error("你的浏览器不支持ajax")'
		}
	})();

	function createXHR() {//惰性函数思想
		return eval(xhrIE)
	}

	function getCssIE(curEle, attr) {
		if (attr === "opacity") {
			var val = curEle.currentStyle["filter"];
			var reg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
			val = parseFloat(reg.exec(val)[1] / 100);
		} else {
			val = curEle.currentStyle[attr];
		}
		var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
		val = reg1.test(val) ? parseFloat(val) : val;
		return val;
	}

	var getCss = null;
	if ("getComputedStyle" in window) {
		getCss = function (curEle, attr) {
			var val = window.getComputedStyle(curEle)[attr];
			var reg1 = /^([+-]?(\d|[1-9]\d+)(\.\d+)?)(px|pt|rem|em)?$/;
			val = reg1.test(val) ? parseFloat(val) : val;
			return val;
		};
		getCssIE = null;
	} else {
		getCss = getCssIE;
	}

	function setCss(curEle, attr, value) {
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
	}

	function setGroupCss(curEle, options) {
		for (var attr in options) {
			setCss(curEle, attr, options[attr])
		}
	}

	var toJSONParse = "JSON" in window ? function (str) {
		return JSON.parse(str)
	} : function (str) {
		return eval("(" + str + ")");
	};

	var offsetToBodyFlag = (navigator.userAgent.indexOf("MSIE 8.0") == -1);

	var myEffect = {
		// 匀速运动公式
		Linear: function (t, b, c, d) {
			return t / d * c + b;
		},
		//指数衰减的反弹缓动
		Bounce: {
			easeIn: function (t, b, c, d) {
				return c - myEffect.Bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut: function (t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOut: function (t, b, c, d) {
				if (t < d / 2) {
					return myEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				}
				return myEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		},
		//二次方的缓动
		Quad: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOut: function (t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t + b;
				}
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			}
		},
		//三次方的缓动
		Cubic: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		//四次方的缓动
		Quart: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t * t + b;
				}
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		//五次方的缓动
		Quint: {
			easeIn: function (t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut: function (t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		//正弦曲线的缓动
		Sine: {
			easeIn: function (t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut: function (t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut: function (t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},
		//指数曲线的缓动
		Expo: {
			easeIn: function (t, b, c, d) {
				return (t == 0)
					? b
					: c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut: function (t, b, c, d) {
				return (t == d)
					? b + c
					: c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut: function (t, b, c, d) {
				if (t == 0)
					return b;
				if (t == d)
					return b + c;
				if ((t /= d / 2) < 1)
					return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		//圆形曲线的缓动
		Circ: {
			easeIn: function (t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut: function (t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOut: function (t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				}
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		//超过范围的三次方缓动
		Back: {
			easeIn: function (t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut: function (t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut: function (t, b, c, d, s) {
				if (s == undefined)
					s = 1.70158;
				if ((t /= d / 2) < 1) {
					return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				}
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			}
		},
		//指数衰减的正弦曲线缓动
		Elastic: {
			easeIn: function (t, b, c, d, a, p) {
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				var s;
				!a || a < Math.abs(c)
					? (a = c, s = p / 4)
					: s = p / (2 * Math.PI) * Math.asin(c / a);
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut: function (t, b, c, d, a, p) {
				if (t == 0)
					return b;
				if ((t /= d) == 1)
					return b + c;
				if (!p)
					p = d * .3;
				var s;
				!a || a < Math.abs(c)
					? (a = c, s = p / 4)
					: s = p / (2 * Math.PI) * Math.asin(c / a);
				return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			},
			easeInOut: function (t, b, c, d, a, p) {
				if (t == 0)
					return b;
				if ((t /= d / 2) == 2)
					return b + c;
				if (!p)
					p = d * (.3 * 1.5);
				var s;
				!a || a < Math.abs(c)
					? (a = c, s = p / 4)
					: s = p / (2 * Math.PI) * Math.asin(c / a);
				if (t < 1)
					return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			}
		}
	};

	window.utils = {
		toJSONParse: toJSONParse,
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
		css: function () {
			var len = arguments.length,
				curEle = arguments[0],
				attr = null,
				value = null,
				options = null;
			if (len === 3) {
				attr = arguments[1];
				value = arguments[2];
				setCss(curEle, attr, value);
				return;
			}
			if (len === 2 && typeof arguments[1] === "object") {
				options = arguments[1];
				setGroupCss(curEle, options)
				return;
			}
			attr = arguments[1];
			return getCss(curEle, attr);
		},
		offsetToBody: function (curEle) {
			var l = curEle.offsetLeft;
			var t = curEle.offsetTop;
			var p = curEle.offsetParent;
			while (p) {
				if (offsetToBodyFlag) {
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
		ajax: function (options) {
			var _default = {
				url: "",
				type: "get",
				dataType: "json",
				async: true,
				data: null,
				timeout: 1000,
				success: null
			};
			for (var key in options) {
				if (options.hasOwnProperty(key)) {
					_default[key] = options[key];
				}
			}
			if (_default.type === "get") {
				_default.url.indexOf("?") >= 0 ? _default.url += "&" : _default.url += "?";
				_default.url += "_=" + Math.random();
			}
			var xhr = createXHR();
			xhr.open(_default.type, _default.url, _default.async);

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
					var val = xhr.responseText;
					if (_default.dataType === "json") {
						val = utils.toJSONParse(val)
					}
					_default.success.call(xhr, val)
				}
			};
			xhr.send(_default.data);
		},
		hasClass: function (curEle, classN) {
			var curEleClass = curEle.className;
			var reg = new RegExp("(^| +)" + classN + "( +|$)");
			return reg.test(curEleClass);
		},
		addClass: function (curEle, classN) {
			var reg = new RegExp("^ +| +$", "g");
			classN = classN.replace(reg, "");
			var ary = classN.split(/ +/g);
			for (var i = 0; i < ary.length; i++) {
				if (!utils.hasClass(curEle, ary[i])) {
					curEle.className += " " + ary[i];
				}
			}
		},
		removeClass: function (curEle, classN) {
			var reg = new RegExp("^ +| +$", "g");
			classN = classN.replace(reg, "");
			var ary = classN.split(/ +/g)
			for (var i = 0; i < ary.length; i++) {
				var curName = ary[i];
				if (utils.hasClass(curEle, curName)) {
					var reg1 = new RegExp("(^| +)" + curName + "( +|$)");
					curEle.className = curEle.className.replace(reg1, " ")
				}
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
		},
		getPrevEleNum: function (curEle) {
			var index = 0;
			var p = curEle.previousSibling;
			while (p) {
				if (p.nodeType === 1) {
					index++;
				}
				p = p.previousSibling
			}
			return index;
		},
		getEleSiblings: function (curEle) {
			var nodes = curEle.parentNode.childNodes// 子节点
			var ary = [];
			for (var i = 0; i < nodes.length; i++) {
				var curNode = nodes[i];
				if (curNode !== curEle && curNode.nodeType === 1) {
					ary.push(curNode)
				}
			}
			return ary;
		},
		getPrevEleSiblings: function (curEle) {
			var ary = [];
			var p = curEle.previousSibling;
			while (p) {
				if (p.nodeType === 1) {
					ary.unshift(p)
				}
				p = p.previousSibling;
			}
			return ary;
		},
		getNextEleSiblings: function (curEle) {
			var ary = [];
			var n = curEle.nextSibling;
			while (n) {
				if (n.nodeType === 1) {
					ary.push(n)
				}
				n = n.nextSibling;
			}
			return ary;
		},
		getPrevEle: function (curEle) {
			var pre;
			if (curEle.previousElementSibling) {
				pre = curEle.previousElementSibling;
				return pre;
			}
			;
			var p = curEle.previousSibling;
			while (p) {
				if (p.nodeType == 1) {
					return p
				}
				p = p.previousSibling;
			}
		},
		getNextEle: function (curEle) {
			var nex;
			if (curEle.nextElementSibling) {
				nex = curEle.nextElementSibling;
				return nex;
			}
			var n = curEle.nextSibling;
			while (n) {
				if (n.nodeType == 1) {
					return n
				}
				n = n.nextSibling;
			}
		},
		getChildren: function (curEle) {
			var children = curEle.children;
			if (typeof curEle.nextElementSibling != "object") {
				var ary = [];
				for (var i = 0; i < children.length; i++) {
					var curChild = children[i];
					if (curChild.nodeType === 1) {
						ary.push(curChild);
					}
				}
				return ary;
			}
			return children;
		},
		animate: function (curEle, target, duration, effect, callBack) {
			var tempEffect = myEffect.Linear;
			if (typeof effect === "number") {
				switch (effect) {
					case 0:
						tempEffect = myEffect.Linear;
						break;
					case 1:
						tempEffect = myEffect.Quad.easeInOut;
						break;
					case 2:
						tempEffect = myEffect.Bounce.easeIn;
						break;
					case 3:
						tempEffect = myEffect.Cubic.easeInOut;
						break;
				}
			} else if (effect instanceof Array) {
				tempEffect = effect.length === 2 ? myEffect[effect[0]][effect[1]] : myEffect[effect[0]];
			} else if (typeof effect === "function") {
				callBack = effect;
			}
			curEle.myTimer ? clearInterval(curEle.myTimer) : null;

			var begin = {};
			var change = {};
			for (var key in target) {
				if (target.hasOwnProperty(key)) {
					begin[key] = utils.css(curEle, key);
					change[key] = target[key] - begin[key]
				}
			}

			var time = null;
			curEle.myTimer = setInterval(function () {
				time += 10;
				if (time >= duration) {
					utils.css(curEle, target);
					clearInterval(curEle.zfTimer);
					typeof callBack === "function" ? callBack.call(curEle) : null;
					return;
				}
				for (var key in target) {
					if (target.hasOwnProperty(key)) {
						var curPos = tempEffect(time, begin[key], change[key], duration);
						utils.css(curEle, key, curPos);
					}
				}
			}, 10);
		},
		on: function (curEle, evenType, evenFn) {
			var ary = null;
			if (/^self/.test(evenType)) {
				if (!curEle[evenType]) {
					curEle[evenType] = []
				}
				ary = curEle[evenType];
				for (var j = 0; j < ary.length; j++) {
					if (ary[j] === evenFn) return;
				}
				ary.push(evenFn);
				return;
			}
			if (curEle.addEventListener) {
				curEle.addEventListener(evenType, evenFn, false);
				return;
			}
			if (!curEle["myBind" + evenType]) {
				curEle["myBind" + evenType] = [];
				curEle.attachEvent("on" + evenType, function () {
					run.call(curEle);
				});
			}
			ary = curEle["myBind" + evenType];
			for (var i = 0; i < ary.length; i++) {
				var cur = ary[i];
				if (cur === evenFn) {
					return;
				}
			}
			ary.push(evenFn);
		},
		run: function (evenType, e) {
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
		},
		off: function (curEle, evenType, evenFn) {
			var ary = null;
			if (/^self/.test(evenType)) {
				ary = this[evenType];
				for (var j = 0; j < ary.length; j++) {
					if (ary[j] === evenFn) {
						ary[j] = null;
						break;
					}
				}
				return;
			}
			if (curEle.removeEventListener) {
				curEle.removeEventListener(evenType, evenFn, false);
				return;
			}
			ary = curEle["myBind" + evenType];
			for (var i = 0; i < ary.length; i++) {
				if (ary[i] === evenFn) {
					ary[i] = null;
					break;
				}
			}
		}
	};
})();
