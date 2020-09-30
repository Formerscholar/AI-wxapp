<template>
	<view class="container">
		<view class="card" v-if="mulu_list.length != 0">
			<block v-for="(item, i) of mulu_list" :key="i">
				<view class="title">{{ i + 1 }}、{{ item.title }}</view>
				<view class="item" v-for="(item2, j) of item.class_hour_list" :key="j">
					<text @click="topicSelection(item2, item2.class_hour_id)">{{ item2.title }}</text>
					<!-- <text>{{item2.}}</text> -->
				</view>
			</block>
		</view>

		<view class="kong" v-if="mulu_list.length == 0">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
			<view>空空如也~</view>
			<view>没有更多目录!</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			textbook_id: '',
			mulu_list: [],
			j_title: '',
			page: 1,
			is_more: 1
		};
	},
	onReachBottom() {
		if (this.is_more) {
			this.page++;
			this.get_list();
		} else {
			uni.showToast({
				title: '没更多数据了！',
				icon: 'none'
			});
		}
	},
	onLoad(options) {
		this.textbook_id = options.textbook_id;
		this.j_title = options.j_title;
		console.log(this.j_title);
		this.get_list();
	},
	methods: {
		topicSelection(item, class_hour_id) {
			console.log(item);
			console.log(class_hour_id);
			wx.navigateTo({
				url: '/pages/myteaching/topicSelection?item=' + JSON.stringify(item) + '&class_hour_id=' + class_hour_id
			});
		},
		get_list() {
			this.$api.catalogue({ textbook_id: this.textbook_id }).then(res => {
				console.log(res);

				if (res.code != 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				this.is_more = res.is_more;
				this.mulu_list = [...this.mulu_list, ...res.data.catalogue_list];
			});
		}
	}
};
</script>

<style lang="scss">
page {
	font-family: PingFang SC;
	background: #eee;
}
.card {
	background: #fff;
	margin: 20rpx 30rpx 30rpx 30rpx;
	padding-bottom: 30rpx;
	border-radius: 20rpx;
	.title {
		color: #e50304;
		font-size: 30rpx;
		padding: 30rpx;
	}
	.item {
		color: #999;
		font-size: 24rpx;
		border-bottom: 1rpx solid #eee;
		margin: 30rpx 30rpx;
		text {
			margin-right: 30rpx;
		}
	}
}
.kong {
	margin-top: 0;
	image {
		margin: 225rpx auto 50rpx;
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
