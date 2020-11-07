<template>
</template>

<script>
	export default {
		onLoad(options) {
			const {
				param
			} = options
			console.log('param', param)
			uni.requestPayment({
				...param,
				success: function(res) {
					// uni.navigateTo({
					// 	url:'/pages/mall/index?url=https://mall.aictb.com/m/member/'
					// })
					console.log('支付成功', res)
				},
				fail: function(res) {
					// uni.navigateTo({
					// 	url:'/pages/mall/index?url=https://mall.aictb.com/m/member/'
					// })
					console.log('支付失败', res)
				},
				complete: function(res) {
					console.log('支付必执行', res)
				}
			})
		}
	}
</script>

<style>
</style>
