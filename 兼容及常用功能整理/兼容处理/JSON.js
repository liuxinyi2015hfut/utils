//JSON不兼容IE6、7
function toJSONParse(str){
	var newObj="JSON" in window ? JSON.parse(str):eval("("+str+")");
	return newObj
}