<template>
	<view>
		<view class="title_box">
			您的问题或建议：
		</view>
		<textarea v-model="str" maxlength="300" @input="sub" placeholder="请输入您的反馈意见" placeholder-style="color:#dedede" />
		<!-- <text class="num">{{num}}</text> -->
<view class="title_box">
			上传图片
		</view>
		<view class="picInfo">
			<view v-for="(item, i) of imgSrc" class="picView" :key="i">
				<image class="delete" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/deletePic.png" @click="deleteImg(i)"></image>
				<image :src="item" class="pics"></image>
			</view>
			<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/uploadPics.png" class="uploadPics" @click="checkimg()"></image>
		</view>
		<!-- phone -->
		<view class="title_box">
					您的联系方式：
				</view>
				<input class="input_box" v-model="phone"  type="number" placeholder="输入电话号码" placeholder-style="color:#dedede" />
				<view class="pl_text">留下您的联系方式，以便我们了解问题后及时反馈和结果，紧急问题请联系客服。</view>
		<button class="btn" @click="tj()">确定</button>
		<view class="mgb">
			
		</view>
	</view>
</template>

<script>
	let app = getApp();
export default {
	data() {
		return {
			num: 300,
			str: '',
			phone: '',
			imgSrc: [],
			picData: '',
			tpmid:''
		};
	},
	onLoad() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		this.tpmid = app.globalData.settings.tmpid;
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
								url: _this.$api.url + 'applets/getUploadImage',
								filePath: res.tempFilePaths[i],
								name: 'img_url',
								formData: {
									token: this.token,
									file_path: 'wx_xcx/feedback/'
								},
								success: res => {
									_this.picData = JSON.parse(res.data).data.img;
									console.log('_this.picData', _this.picData );
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
			let arrTpmid = this.tpmid.feedback_notice;
			console.log(arrTpmid)
      // #ifdef MP-WEIXIN        uni.requestSubscribeMessage({
        	tmplIds: arrTpmid,
        	complete: res => {
        		if (uni.getStorageSync('type') == 3) {
        			var req = this.$api.teacher_feedback({ token: this.token, content: this.str, pics: this.imgSrc ,contact:this.phone });
        		} else {
        			var req = this.$api.feedback({ token: this.token, content: this.str, pics: this.imgSrc,contact:this.phone });
        		}
        		req.then(res => {
        			console.log(res);
        			if (res.code == 200) {
        				uni.showToast({
        					title: '提交成功!'
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
        	success: function(res) {},
        	fail: function(res) {}
        });        // #endif         // #ifdef APP-PLUS        if (uni.getStorageSync('type') == 3) {
        	var req = this.$api.teacher_feedback({ token: this.token, content: this.str, pics: this.imgSrc ,contact:this.phone });
        } else {
        	var req = this.$api.feedback({ token: this.token, content: this.str, pics: this.imgSrc,contact:this.phone });
        }
        req.then(res => {
        	console.log(res);
        	if (res.code == 200) {
        		uni.showToast({
        			title: '提交成功!'
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
        });        // #endif
			
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
.title_box{
	font-size: 30rpx;
	font-family: 'PingFang SC';
	font-weight: bold;
	color: #333333;
	margin: 24rpx;
}
textarea{
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
.input_box{
	height: 85rpx;
	background: #FFFFFF;
	border: 1px solid #E5E5E5;
	border-radius: 16rpx;
	padding: 20rpx;
	margin: 25rpx;
	box-sizing: border-box;
	font-size: 32rpx;
}
.pl_text{
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #CCCCCC;
margin: 25rpx;
text-align: center;
}
.num {
	display: block;
	text-align: right;
	color: #999;
	padding: 10rpx 30rpx;
}
.btn {
	margin: 0 auto;
	margin-top: 50rpx;
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 30rpx;
	color: #fff;
	background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
}
.mgb{
	width: 100%;
	height: 50rpx;
	background-color: #eee;
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
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.picView {
		width: 143rpx;
		height: 143rpx;
		position: relative;
		margin: 30rpx 20rpx 0 0;
	
		.pics {
			width: 139rpx;
			height: 140rpx;
			border-radius: 16rpx;

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
