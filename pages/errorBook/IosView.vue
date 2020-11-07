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
				url
			} = options
			this.url = url
		},
		onShareAppMessage: (res) =>{
			return {
				title: '自定义转发标题',
				path: this.url
			}
		}

	}
</script>

<style>
</style>
