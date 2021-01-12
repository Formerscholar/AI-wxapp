<template>
</template>

<script>
	export default {
		onLoad(options) {
			const {
				param
			} = options
			console.log('param', param)
			let params = JSON.parse(decodeURIComponent(param))

			uni.requestPayment({
				timeStamp: params.timeStamp,
				nonceStr: params.nonceStr,
				package: params.package,
				signType: params.signType,
				paySign: params.paySign,
				success: function(res) {
					uni.redirectTo({
						url: '/pages/mall/index?url=https://mall.aictb.com/m/member/'
					})
					console.log('支付成功', res)
				},
				fail: function(res) {
					uni.redirectTo({
						url: '/pages/mall/index?url=https://mall.aictb.com/m/member/'
					})
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
