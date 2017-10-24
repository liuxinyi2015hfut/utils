function toArray(aryLike) {
	var ary = [];
	try{
		ary =  Array.prototype.slice.call(aryLike);//不兼容IE6、7、8
	}catch(e){
		for(var i=0;i<aryLike.length;i++){
			ary[ary.length] = aryLike[i];
		}
	}
	return ary;
}