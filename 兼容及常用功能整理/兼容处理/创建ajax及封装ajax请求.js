// 1 创建ajax对象 ,兼容所有的浏览器
function createXHR() {
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
			createXHR = function () {//惰性函数思想
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
}


function ajax(options) {
	// 初始化默认常用的参数
	var _default = {
		url: "",
		type: "get",
		dataType: "json",
		async: true,
		data: null,
		timeout: 1000,//请求超时
		success: null
	}
	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			_default[key] = options[key];
		}
	}
	// get 请求是有缓存的
	if (_default.type === "get") {
		// 问号后面的参数用“&” 连接起来
		_default.url.indexOf("?") >= 0 ? _default.url += "&" : _default.url += "?";
		_default.url += "_=" + Math.random();
	}
	;
	var xhr = createXHR();// 创建的ajax 的对象

	xhr.open(_default.type, _default.url, _default.async);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
			var val = xhr.responseText;
			if (_default.dataType === "json") {
				val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")");
			}
			_default.success.call(xhr, val)
		}
	}
	xhr.send(_default.data);
}
