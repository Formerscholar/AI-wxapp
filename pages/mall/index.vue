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
		onLoad: function(options) {
			console.log(options)
			const {
				url
			} = options
			if (url) {
				this.url = decodeURIComponent(url)
			} else {
				this.url = 'https://mall.aictb.com/m?wxapp_openid=' + uni.getStorageSync('openid')
			}
		},
	}
</script>

<style>

</style>
