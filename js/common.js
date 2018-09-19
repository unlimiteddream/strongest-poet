function handlerElm(elm){
	var c = $(elm);
	if(c.is(":hidden")){
		c.show();
	}else{
		c.hide();
	}
}
function setTitle(cnt){
	$(".s_title").html(cnt);
}