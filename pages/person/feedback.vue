<template>
	<view>
		<textarea v-model="str" maxlength="300" @input="sub" placeholder="请留下您的宝贵建议(500字以内)" placeholder-style="color:#dedede" />
		<!-- <text class="num">{{num}}</text> -->

		<view class="picInfo">
			<view class="advice">上传图片(最多三张,图片大小不超过2M)</view>
			<view v-for="(item, i) of imgSrc" class="picView" :key="i">
				<image class="delete" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/deletePic.png" @click="deleteImg(i)"></image>
				<image :src="item" class="pics"></image>
			</view>
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/uploadPics.png" class="uploadPics" @click="checkimg()"></image>
		</view>
		<button class="btn" @click="tj()">确定</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: 300,
			str: '',
			imgSrc: [],
			picData: ''
		};
	},
	onLoad() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
	},
	methods: {
		deleteImg: function(i) {
			console.log(i);
			this.imgSrc.splice(i, 1);
		},
		checkimg() {
			this.update = false;
			let _this = this;
			if (_this.imgSrc.length <= 2) {
				uni.chooseImage({
					count: 3 - _this.imgSrc.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							uni.uploadFile({
								url: _this.$api.url + 'main/upload_pic',
								filePath: res.tempFilePaths[i],
								name: 'file',
								formData: {
									token: this.token,
									path: 'feedback'
								},
								success: res => {
									_this.picData = res.data;
									console.log('_this.picData', _this.picData);
									_this.imgSrc.push(_this.picData);
									console.log('_this.imgSrc', _this.imgSrc);
								}
							});
						}
					}
				});
			} else {
				uni.showToast({
					title: '已超过上传图片数量的上限',
					icon: 'none'
				});
			}
		},
		tj() {
			if (uni.getStorageSync('type') == 3) {
				var req = this.$api.teacher_feedback({ token: this.token, content: this.str, pics: this.imgSrc });
			} else {
				var req = this.$api.feedback({ token: this.token, content: this.str, pics: this.imgSrc });
			}
			req.then(res => {
				console.log(res);
				if (res.code == 200) {
					uni.showToast({
						title: '提交成功！'
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
		},
		sub(e) {
			this.num = 300 - e.detail.value.length;
		}
	}
};
</script>

<style lang="scss">
page {
	box-sizing: border-box;
	background: #eee;
}
textarea {
	padding: 30rpx;
	width: 700rpx;
	height: 500rpx;
	margin: 25rpx;
	border-radius: 20rpx;
	box-sizing: border-box;
	border: 1rpx solid #dedede;
	font-size: 32rpx;
	background: #fff;
	// color:#cdcdcd;
}
.num {
	display: block;
	text-align: right;
	color: #999;
	padding: 10rpx 30rpx;
}
.btn {
	margin: 50rpx auto;
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 30rpx;
	color: #fff;
	background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
}
.picInfo {
	.advice {
		font-size: 32rpx;
		color: #e2e2e2;
		margin: 30rpx 0 0 0;
	}
	margin: 25rpx 25rpx 50rpx;
	background: #fff;
	border: 1rpx solid #e6e6e6;
	padding: 0 20rpx 30rpx;
	box-sizing: border-box;
	width: 700rpx;
	border-radius: 20rpx;
	.picView {
		width: 143rpx;
		height: 143rpx;
		position: relative;
		margin: 30rpx 20rpx 0 0;
		display: inline-block;
		.pics {
			width: 100%;
			height: 100%;
			vertical-align: middle;
		}
	}
	.uploadPics {
		width: 143rpx;
		height: 143rpx;
		vertical-align: middle;
		margin: 30rpx 20rpx 0 0;
	}
	.delete {
		width: 29rpx;
		height: 29rpx;
		position: absolute;
		top: -10rpx;
		right: -10rpx;
		z-index: 999;
	}
}
</style>
