
//修改文件解析样式
function changeStyle(item){
	item= item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
	item= item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
	return item
}


module.exports = {
  changeStyle,
}