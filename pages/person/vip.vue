<template>
	<view class="container">
		<view class="bg2"></view>
		<view class="card">
			<view class="price">
				<view class="original" v-if="is_discount">￥{{ price }}</view>
				<view class="discount">￥{{ info.vip_money ? info.vip_money : '' }}</view>
			</view>
			<!-- <view class="nick">
					<image :src="userInfo.avatar" mode=""></image>
					<text>{{userInfo.true_name}}</text>
				</view> -->
			<view class="time" v-if="info.user_vip_end_time">到期时间：{{ info.user_vip_end_time }}</view>
			<view class="time" v-if="!info.user_vip_end_time">到期时间：未开通</view>
		</view>
		<view class="b-title">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon1.png" />
			<text>电子错题本下载</text>
			<text>节省时间、方便快捷</text>
		</view>
		<view class="b-title">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon2.png" />
			<text>下载举一反三相似题</text>
			<text>加强同类知识点训练，提高学校效率</text>
		</view>
		<view class="b-title">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon3.png" />
			<text>查看答案和解析</text>
			<text>了解解题思路，掌握知识结构</text>
		</view>
		<view class="b-title">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon4.png" />
			<text>查看和下载名校资源</text>
			<text>拓展训练，方便区域错位比较</text>
		</view>
		<view class="b-title">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon6.png" />
			<text>知识库资源任意组卷和下载</text>
			<text>丰富学习资源，拓展训练好帮手</text>
		</view>
		<view class="b-title">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon5.png" />
			<text>学情报告统计错题数据</text>
			<text>总结学习过程，方便提优补差</text>
		</view>
		<view class="xufei" @click="pay()">
			<text>{{ userInfo.is_vip ? '立即续费' : '开通会员' }}</text>
			<!-- <text>(自购买当日开始计算至次年当日凌晨截至)</text> -->
		</view>
		<!-- <view class="b-t">
			— 详情解释权最终归扬州骐骥信息科技有限公司 —
		</view> -->
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			userInfo: {},
			info: {},
			price: 0,
			is_discount: 1,
			is_vip: 0,
			tpmid: ''
		};
	},
	onLoad() {
		this.token = uni.getStorageSync('userInfo').token;
		this.userInfo = uni.getStorageSync('userInfo');
		this.price = app.globalData.settings.vip_money;
		this.tpmid = app.globalData.settings.tpmid;
		console.log('this.tpmid', this.tpmid);
	},
	onShow() {
		this.get_info();
	},
	methods: {
		get_info() {
			this.$api.vip_info({ token: this.token }).then(res => {
				console.log(res);
				this.info = res.data;
				if (res.data.vip_money == this.price) {
					this.is_discount = 0;
				}
				/* this.is_vip=res.is_vip
					uni.setStorage({
					    key: 'is_vip',
					    data: this.is_vip
					}) */
			});
		},
		pay() {
			uni.login({
				success: res => {
					console.log(res);
					this.$api.app_pay({ code: res.code, token: this.token }).then(res => {
						console.log(res);
						var wx_pay = res.data.wx_pay;
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: wx_pay.timeStamp,
							nonceStr: wx_pay.nonceStr,
							package: wx_pay.package,
							signType: 'MD5',
							paySign: wx_pay.paySign,
							success: res => {
								console.log(res);
								uni.setStorage({
									key: 'is_vip',
									data: 1
								});
								uni.requestSubscribeMessage({
									tmplIds: this.tpmid.vip_end_notice,
									complete: function(res) {
										console.log('status', res);
										// _this.fasong();
									},
									success: function(res) {
										// _this.fasong()
									},
									fail: function(res) {}
								});
							},
							fail: err => {
								console.log(err);
							}
						});
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
	width: 100vw;
	height: 100vh;
}
.bg2 {
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 150rpx;
	background: #e50304;
}
.card {
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vip-bg.png) no-repeat top left;
	background-size: cover;
	width: 700rpx;
	height: 244rpx;
	border-radius: 12rpx;
	margin: 25rpx auto 50rpx;
	position: relative;
	.price {
		font-size: 40rpx;
		position: absolute;
		bottom: 25%;
		right: 80rpx;
		.discount {
			color: rgba(225, 1, 1, 1);
			transform: translateY(-50%);
			color: #fff;
		}
		.original {
			text-decoration: line-through;
			color: rgba(89, 87, 87, 1);
			margin-bottom: 20rpx;
		}
	}
	.nick {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 17rpx;
		right: 28rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(89, 87, 87, 1);
		image {
			width: 97rpx;
			height: 97rpx;
			border-radius: 50%;
		}
	}
	.time {
		position: absolute;
		left: 60rpx;
		bottom: 30rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #cdc4c4;
	}
}
.xufei {
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	margin: 50rpx auto;
	background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
	border-radius: 16rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text:first-child {
		font-size: 30rpx;
		font-weight: 800;
		color: rgba(255, 255, 255, 1);
	}
	// text:last-child{
	// 	font-size:17rpx;
	// 	font-weight:400;
	// 	color:rgba(255,255,255,1);
	// }
}
.b-title {
	width: 659rpx;
	height: 129rpx;
	background: #fff;
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
	padding: 20rpx 30rpx 0 120rpx;
	image {
		position: absolute;
		left: 30rpx;
		top: 50%;
		width: 60rpx;
		height: 55rpx;
		transform: translateY(-50%);
	}
	text:nth-of-type(1) {
		display: block;
		font-size: 28rpx;
		font-weight: bold;
		color: rgba(89, 87, 87, 1);
	}
	text:nth-of-type(2) {
		display: block;
		font-size: 28rpx;
		margin-top: 8rpx;
		color: #cdcdcd;
	}
}
.b-t {
	text-align: center;
	font-size: 14rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(89, 87, 87, 1);
	margin-top: 35rpx;
}
</style>
