<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://mall.aictb.com/m'
			}
		},
		onLoad: function(options) {
			console.log(options)
			const {
				url
			} = options
			if (url) {
				this.url = decodeURIComponent(url)
			}
		},
	}
</script>

<style>

</style>
