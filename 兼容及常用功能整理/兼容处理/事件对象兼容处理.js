function toE(e) {
	e = e || window.event;
	e.target=e.target||e.srcElement;
	e.pageX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	e.pageY = e.pageY || (e.clientY + (document.documentElement.scrollTop|| document.body.scrollTop));
	e.preventDefault? e.preventDefault():e.returnValue=false;
	e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
	return e
}