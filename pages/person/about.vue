<template>
	<view class="container">
		<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/aboutUs.png" />
		<view class="edit">
			<view class="center">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/wechat.png"></image>
				<text>微信公众号</text>
				<text class="infoCon">{{ official_account }}</text>
			</view>
			<view class="center">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/weibo.png"></image>
				<text>官方微博</text>
				<text class="infoCon">{{ weibo }}</text>
			</view>
			<view class="center">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/website.png"></image>
				<text>官方网站</text>
				<text class="infoCon">{{ website }}</text>
			</view>
			<view class="center">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/phone.png"></image>
				<text>客服电话</text>
				<text class="infoCon">{{ customer_service }}</text>
			</view>
			<view class="center">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/emial.png"></image>
				<text>公司邮箱</text>
				<text class="infoCon">{{ email }}</text>
			</view>
    </view>
    <view class="center_text">
      <view class="protocol">
        <view class="privacy" @click="pageTopro(0)">服务协议</view>|<view class="privacy" @click="pageTopro(1)">隐私政策</view>
      </view>
    	<text class="info">扬州骐骥信息科技有限公司</text>
    </view>
	</view>
</template>

<script>
let app = getApp();
export default {
	data() {
		return {
			list: [],
			type: 'about',
			official_account: '',
			weibo: '',
			website: '',
			customer_service: '',
			email: ''
		};
	},
	onLoad(options) {
		this.official_account = app.globalData.settings.official_account;
		this.weibo = app.globalData.settings.weibo;
		this.website = app.globalData.settings.website;
		this.customer_service = app.globalData.settings.customer_service;
		this.email = app.globalData.settings.email;

		if (options.title == 'zhuce') {
			uni.setNavigationBarTitle({
				title: '注册协议'
			});
			this.type = 'register';
		}
		this.get_list();
	},
	methods: {
		get_list() {
			this.$api.get_agreement({ type: this.type }).then(res => {
				console.log(res.data.info);
				this.list = res.data.info;
			});
		},
    pageTopro(idx){
      if (idx) {
        uni.navigateTo({
          url: "/pages/login/agreement?type=income"
        });
      } else{
        uni.navigateTo({
          url: "/pages/login/agreement?type=register"
        });
      }
    }
	}
};
</script>

<style lang="scss">
page {
	background: #eee;
	font-family: PingFang SC;
}
.container {
	color: #999;
	font-size: 30rpx;
	> image {
		display: block;
		width: 125rpx;
		height: 165rpx;
		margin: 80rpx auto;
	}
}

.edit {
	width: 700rpx;
	background: #fff;
	margin: 0 auto;
	border: 1rpx solid #e5e5e5;
	border-radius: 16rpx;
}
.center {
	margin: 0 30rpx 0 30rpx;
	height: 100rpx;
	line-height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	border-bottom: 1rpx solid #f2f2f2;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #999999;
	text:nth-of-type(1) {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-left: 80rpx;
	}
	image {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
}
.center:nth-last-of-type(1) {
	border-bottom: none;
}
.center_text{
  position: absolute;
  bottom: 40rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  .protocol{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12rpx;
    .privacy{
      color: #0984e3;
      margin-right: 10rpx;
      &:last-child{
        margin-right: 0;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
