<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			const {
				url,
				title
			} = options
			// this.url = url
			this.url = "https://www.aictb.com/wechat/webview/user_errorbook_view/"
			wx.setNavigationBarTitle({
				title: title
			})
		}

	}
</script>

<style>
</style>
