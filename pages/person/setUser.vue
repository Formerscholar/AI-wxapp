<template>
	<view class="container">
		<input type="text" v-model="value" :placeholder="'请输入' + title" />
		<button @click="baocun" class="btn">保存</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			title: ''
		};
	},
	onLoad(options) {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		this.title = options.title;
		uni.setNavigationBarTitle({
			title: '编辑' + options.title
		});
	},
	methods: {
		baocun() {
			if (!this.value) {
				uni.showToast({
					title: '不能为空！',
					icon: 'none'
				});
				return;
			}
			var data;
			if (this.title == '姓名') {
				data = {
					true_name: this.value,
					token: this.token
				};
			} else if (this.title == '性别') {
				data = {
					sex: this.value,
					token: this.token
				};
			}
			this.$api.change_user_info(data).then(res => {
				console.log(res);
				if (res.code == 200) {
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.data.user_info.display_list.true_name = this.value;
					console.log(prevPage);
					uni.showToast({
						title: '修改成功'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
	font-family: PingFang SC;
}
.container {
	input {
		width: 570rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin: 50rpx auto;
		border: 1rpx solid #e9e9e9;
		border-radius: 16rpx;
		color: #eaeaea;
		font-size: 30rpx;
		padding-left: 30rpx;
	}
	.btn {
		margin: 50rpx auto 20rpx;
		border: 1rpx solid #fff;
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
	}
}
</style>
