let settings=''
//设置settings配置项
function set_settings(){
	let url='https://api.aictb.com/v1/main/get_settings/'
	let _this=this
	uni.request({
		url: url,
		method: "get",
		header: {
		  "Content-Type": "application/x-www-form-urlencoded"
		},
		success:(res)=>{
			if(res.code==200){
				return _this.settings=res.data //配置
			}
		}
	})
}

module.exports = {
	set_settings,
	settings
}