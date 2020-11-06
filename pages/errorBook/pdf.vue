<template>
	<web-view :src="pdfurl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				pdfurl: ''
			}
		},
		onLoad(options) {
			const {
				pdfurl
			} = options
			this.pdfurl = "https://www.aictb.com/wechat/webview/user_errorbook_view/"
			 // wx.downloadFile({
			 //      url: 'https://www.aictb.com/test.doc',
			 //      // filePath: `${wx.env.USER_DATA_PATH}/` +'xxx.pdf', // 如果你发现你下载的pdf文件后缀为unknown，导致不可预料，你可以自己定义文件名字
			 //      success: function(res) {
			 //        console.log(res);
			 //        // var Path = res.filePath //自己定义的文件名，返回的时候就不是tempFilePath字段了，注意下。
			 //        var Path = res.tempFilePath; //返回的文件临时地址，用于后面打开本地预览所用
			 //        // that.webview=Path
			 //        console.log(Path);
			 //        wx.openDocument({
			 //          // filePath: `${wx.env.USER_DATA_PATH}/` +'xxx.pdf', //当然也可以不用上面的路径，直接打开你自己定义的文件名字，但是这个前提是你前面使用的是自定义的文件名
			 //          filePath: Path,
			 //          fileType: "doc", //后缀为unknown的话，可以直接以pdf的格式打开，也可以。我就是用这种，都行，反正开心就好。
			 //          success: function(res) {
			 //            console.log("打开文档成功");
			 //          }
			 //        });
			 //      },
			 //      fail: function(res) {
			 //        console.log(res);
			 //      }
			 //    });
		},
	}
</script>

<style>
</style>
