<template>
	<view class="customPhoto">
		<camera @error="handleCameraError" :device-position="devicePosition" flash="off" style="width: 100%; height: 81vh;">
			<cover-view><!-- <cover-image class="line" src="/images/outline.png"></cover-image> --></cover-view>
		</camera>
		<view class="content_box">
			<view class="left_box" @click="albumhandleClick">
				<image class="left_img" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/album.png" mode="widthFix"></image>
				<text class="left_text">相册</text>
			</view>
			<view class="conter_box" @click="takePhoto"><button class="btn_tap">拍照</button></view>
			<view class="right_box"></view>
		</view>
		<view class="Cameralicens" v-if="isCamera"><button class="Camera_btn" open-type="openSetting" @opensetting="opensetting">相机授权</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			devicePosition: 'back',
			token: '',
			textbook_id: '',
			choosePage: '',
			title: '',
			subject_name: '',
			isCamera: false
		};
	},
	onLoad(option) {
		this.textbook_id = option.textbook_id;
		this.choosePage = option.choosePage;
		this.title = option.title;
		this.subject_name = option.subject_name;
		console.log('onLoadoption', option);
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
	},
	methods: {
		albumhandleClick: function() {
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: res => {
					let file = res.tempFilePaths[0];
					let url = this.$api.url + 'main/upload_pic';
					uni.uploadFile({
						url: url,
						filePath: file,
						name: 'file',
						formData: {
							token: this.token,
							path: 'search'
						},
						success: reslove => {
							console.log('返回', reslove.data);
							uni.navigateTo({
								url:
									'/pages/myteaching/myteachingPhoto_result?pic=' +
									reslove.data +
									'&textbook_id=' +
									this.textbook_id +
									'&choosePage=' +
									this.choosePage +
									'&title=' +
									this.title +
									'&subject_name=' +
									this.subject_name
							});
						},
						fail: function(t) {
							uni.showToast({
								title: '上传图片失败',
								icon: 'none'
							});
							uni.navigateBack();
						}
					});
				}
			});
		},
		opensetting: function(res) {
			console.log('opensetting', res);
			if (res.target.authSetting['scope.camera']) {
				this.isCamera = false;
			} else {
				this.isCamera = true;
			}
			uni.navigateBack();
		},
		handleCameraError: function() {
			uni.showToast({
				title: '您拒绝使用摄像头',
				icon: 'none'
			});
			this.isCamera = true;
		},
		takePhoto: function() {
			wx.createCameraContext().takePhoto({
				quality: 'high',
				success: res => {
					let file = res.tempImagePath;
					let url = this.$api.url + 'main/upload_pic';
					wx.uploadFile({
						url: url,
						filePath: file,
						name: 'file',
						formData: {
							token: this.token,
							path: 'search'
						},
						success: res => {
							console.log('返回', res.data);
							uni.navigateTo({
								url:
									'/pages/myteaching/myteachingPhoto_result?pic=' +
									res.data +
									'&textbook_id=' +
									this.textbook_id +
									'&choosePage=' +
									this.choosePage +
									'&title=' +
									this.title +
									'&subject_name=' +
									this.subject_name
							});
						},
						fail: function(t) {
							uni.showToast({
								title: '上传图片失败',
								icon: 'none'
							});
							uni.navigateBack();
						}
					});
				},
				fail: res => {
					uni.showToast({
						title: '拍摄照片失败',
						icon: 'none'
					});
					uni.navigateBack();
				}
			});
		}
	}
};
</script>

<style lang="scss">
.customPhoto {
	.content_box {
		box-sizing: border-box;
		height: 230rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 75rpx 50rpx;
		.left_box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.left_img {
				width: 48rpx;
				height: 43rpx;
				margin-bottom: 13rpx;
			}
			.left_text {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}
		.conter_box {
			.btn_tap {
				width: 126rpx;
				height: 126rpx;
				line-height: 126rpx;
				background: #ff0000;
				border-radius: 50%;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #ffffff;
				text-align: center;
			}
		}
		.right_box {
			width: 48rpx;
		}
	}
	.Cameralicens {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		.Camera_btn {
			width: 400rpx;
			height: 98rpx;
			line-height: 98rpx;
			background-color: #4cd137;
			color: #fff;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			text-align: center;
		}
	}
}
</style>
