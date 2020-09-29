
//修改文件解析样式
function changeStyle(item){
	item= item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
	item= item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
	return item
}
//首页判断非会员
function de_vip(define,title,url){
	if(define!=1){
		uni.showToast({
			title:'非会员用户不可查看'+title,
			icon:'none'
		})
		return ''
		
		// return url
	}else{
		return url
	}
}


module.exports = {
  changeStyle,
  de_vip,
}