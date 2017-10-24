var DOM = {
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
	}
};