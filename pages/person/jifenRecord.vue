<template>
	<view>
		<view class="top">
			<view>{{ total ? total : 0 }}</view>
			<view>当前积分</view>
		</view>
		<view class="subtitle">积分记录</view>
		<view class="jifenCon">
			<view class="item" v-for="(item, i) of dataList" :key="i" v-if="dataList.length != 0">
				<view>
					<view class="paperTitle">{{ item.remark }}</view>
					<text class="time">{{ item.add_time }}</text>
				</view>
				<view class="jifen">
					<text>{{ item.point }}</text>
				</view>
			</view>
			<view v-if="is_more == 0" class="is_more">没有更多积分记录了</view>
			<view class="kong" v-if="dataList.length == 0 || !dataList">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
				<view>空空如也~</view>
				<view>您还没有试卷记录哦!</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			token: '',
			dataList: [],
			total: '',
			page: 1,
			is_more: 1
		};
	},
	onReachBottom() {
		if (this.is_more) {
			this.page++;
			this.getRecordList();
		}
	},
	onLoad(options) {
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		this.getRecordList();
	},
	methods: {
		getRecordList() {
			let _this = this;
			_this.$api.teacher_pointlog({ token: _this.token, page: _this.page, page_size: 10 }).then(res => {
				console.log(res);
				if (res.code != 200) {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				} else {
					console.log(res.data);
					_this.total = res.total;

					// _this.dataList = res.data
					_this.is_more = res.is_more;
					if (_this.page == 1) {
						_this.dataList = res.data;
					} else {
						_this.dataList = [..._this.dataList, ...res.data];
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #eee;
	font-family: PingFang SC;
}
.top {
	width: 100%;
	height: 167rpx;
	text-align: center;
	font-size: 36rpx;
	color: #fff;
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/recordBg.png) no-repeat top left;
	background-size: cover;
	view:nth-of-type(1) {
		font-size: 48rpx;
		padding: 20rpx 0;
	}
}
.subtitle {
	font-size: 36rpx;
	padding: 0 30rpx;
	height: 90rpx;
	line-height: 90rpx;
	box-sizing: border-box;
	color: #4e4d4d;
	border-bottom: 1rpx solid #e6e6e6;
	background: #fff;
}
.jifenCon {
	.item {
		margin: 25rpx;
		border-radius: 20rpx;
		border: 1rpx solid #e6e6e6;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		color: #303030;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		font-size: 26rpx;
		position: relative;
		.paperTitle {
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.time {
			color: #b9b9b9;
		}
		.jifen {
			display: flex;
			margin: auto 0;
		}
	}
}
.kong {
	margin-top: 0;
	image {
		margin: 230rpx auto 50rpx;
		width: 196rpx;
		height: 237rpx;
	}
	view {
		text-align: center;
		font-size: 30rpx;
		line-height: 50rpx;
		color: #c4c5c6;
	}
}
</style>
