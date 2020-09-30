<template>
	<view>
		<view class="top">
			<text>{{ j_title }}</text>
			<view class="title">
				<text>{{ m_title }}</text>
				<text>{{ class_hour.title }}</text>
				<!-- <text>[练习P5]</text> -->
			</view>
		</view>

		<!-- 单选 -->
		<!-- <view class="title2">
			一、单项选择
		</view> -->
		<view class="item" v-for="(item, i) of exercises_list" :key="i">
			<!-- <rich-text :nodes=""></rich-text>
			<rich-text :nodes=""></rich-text> -->
			<view class="">
				<rich-text :nodes="changeStyle(item.title)"></rich-text>
				<rich-text :nodes="changeStyle(item.content)"></rich-text>
			</view>
			<view class="bottom">
				<view class="select" @click="open(item)">
					同类型题目
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/xiala.png" mode=""></image>
				</view>
				<view class="btn" :class="{ 's-b': item.is_error }" v-if="update" @click="join_error(i, item.exercises_id, item)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRuDefault.png" mode="" v-if="!item.is_error" />
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRu.png" mode="" v-else />
					{{ item.is_error ? '取消加入' : type == 3 ? '加入试卷' : '加入错题' }}
				</view>
			</view>
		</view>

		<uni-popup ref="popup" type="center">
			<view class="leixing">
				<view class="title">同类型题型加入错题</view>
				<scroll-view scroll-y="true">
					<view class="list" v-for="(item, i) of same_type" :key="i">
						<view class="">
							<rich-text :nodes="changeStyle(item.title)"></rich-text>
							<rich-text :nodes="changeStyle(item.content)"></rich-text>
						</view>
						<button :class="{ 's-b': item.is_error }" v-if="update" @click="join_error2(i, item.exercises_id)">
							{{ item.is_error ? '取消加入' : type == 3 ? '加入试卷' : '加入错题' }}
						</button>
					</view>
				</scroll-view>

				<view class="button">
					<button @click="hiddenmodal">取消</button>
					<button @click="hiddenmodal">确认</button>
				</view>
			</view>
		</uni-popup>
		<view class="kong" v-if="exercises_list.length == 0">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/kong.png" mode=""></image>
			<view class="">没有更多习题了！</view>
		</view>

		<!-- <view class="leixing" v-show="false">
			<view class="title">
				同类型题型加入错题
			</view>
			<view class="list" v-for="(item,i) of same_type" :key="i">
				<view class="">
					<rich-text :nodes="item.title"></rich-text>
					<rich-text :nodes="item.content"></rich-text>
				</view>
				<button>加入错题</button>
			</view>
			<view class="button">
				<button @click="hiddenmodal">取消</button><button @click="hiddenmodal">确认</button>
			</view>
		</view> -->

		<view class="zt" v-show="false"></view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			class_hour_id: 0,
			exercises_list: [],
			j_title: '',
			m_title: '',
			token: '',
			update: true,
			same_type: [],
			is_more: 1,
			page: 1,
			type: 3
		};
	},
	onLoad(options) {
		this.type = uni.getStorageSync('type');
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		this.class_hour = JSON.parse(options.class_hour_id);
		console.log(this.class_hour_id);
		this.get_list();
	},
	onReachBottom() {
		if (this.is_more) {
			this.page++;
			this.get_list();
		} else {
			uni.showToast({
				title: '没有更多了！',
				icon: 'none'
			});
		}
	},
	methods: {
		changeStyle(item) {
			item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
			item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
			return item;
		},
		//打开同类型题目
		open(item) {
			let data = {
				token: this.token,
				know_point: item.know_point,
				type: item.type,
				subject_id: item.subject_id,
				exercises_id: item.exercises_id
			};
			this.$api.same_type(data).then(res => {
				console.log(res);
				if (res.code == 200) {
					this.same_type = res.data.exercises_list;
					this.$refs.popup.open();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		get_list() {
			this.$api.catalogue_exercises({ token: this.token, class_hour_id: this.class_hour_id, page: this.page }).then(res => {
				console.log(res);
				this.is_more = res.is_more;
				if (res.code == 200) {
					this.exercises_list = [...this.exercises_list, ...res.data.exercises_list];
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					// setTimeout(()=>{
					// 	uni.navigateBack()
					// },1000)
				}
			});
		},
		//加入错题
		join_error(i, id, item) {
			if (this.exercises_list[i].status) {
				this.exercises_list[i].status = false;
			} else {
				this.exercises_list[i].status = true;
			}
			this.update = false;
			this.update = true;
			this.$api.join_error({ token: this.token, exercises_id: id }).then(res => {
				this.open(item);
				console.log(res);
				// if(res.msg=='取消成功！'){
				// 	this.same_type[i].status=false
				// 	this.update=false
				// 	this.update=true
				// }
				if (res.code == 200) {
					if (this.exercises_list[i].is_error) {
						this.exercises_list[i].is_error = 0;
					} else {
						this.exercises_list[i].is_error = 1;
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		join_error2(i, id) {
			if (this.same_type[i].status) {
				this.same_type[i].status = false;
			} else {
				this.same_type[i].status = true;
			}
			this.update = false;
			this.update = true;
			this.$api.join_error({ token: this.token, exercises_id: id, is_type: 1 }).then(res => {
				console.log(res);
				if (res.code == 200) {
					if (this.same_type[i].is_error) {
						this.same_type[i].is_error = 0;
					} else {
						this.same_type[i].is_error = 1;
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				// if(res.msg=='取消成功！'){
				// 	this.same_type[i].status=false
				// 	this.update=false
				// 	this.update=true
				// }
			});
		},
		hiddenmodal() {
			this.$refs.popup.close();
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
	padding: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	> text {
		font-size: 28rpx;
		color: #999;
	}
	.title {
		font-size: 32rpx;
		color: rgb(236, 119, 39);
		text {
			margin-right: 20rpx;
		}
		text:nth-child(3) {
			color: #999;
		}
	}
}
.title2 {
	padding: 30rpx;
	margin: 20rpx 0;
	font-size: 24rpx;
	background-color: #fff;
}
.item {
	padding: 10rpx 30rpx 0;
	display: flex;
	flex-direction: column;
	background: #fff;
	color: #999;
	margin-bottom: 20rpx;
	.bottom {
		display: flex;
		padding: 15rpx 0;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: rgb(236, 119, 39);
		.select {
			image {
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
			}
		}
		.btn {
			border: 1rpx solid #f8601c;
			border-radius: 8rpx;
			padding: 10rpx 30rpx;
		}
	}
}
.leixing {
	z-index: 999;
	// position: absolute;
	width: 650rpx;
	// height: 500rpx;
	background: #fff;
	// top:300rpx;
	// left: 50%;
	padding: 30rpx;
	// transform: translateX(-50%);
	.title {
		text-align: center;
		color: #f8601c;
		font-size: 30rpx;
		padding: 30rpx 0;
	}
	scroll-view {
		width: 100%;
		height: 500rpx;
		.list {
			z-index: 999;
			border-bottom: 1rpx solid #eee;
			overflow: hidden;
			button {
				float: right;
				margin: 20rpx;
				color: #f8601c;
				border: 1rpx solid #f8601c;
				border-radius: 8rpx;
				padding: 0;
				background: #fff;
				width: 159rpx;
				font-size: 20rpx;
			}
		}
	}

	.button {
		display: flex;
		justify-content: space-evenly;
		button {
			margin-top: 30rpx;
			font-size: 24rpx;
			border: 1rpx solid #fff;
			width: 100;
			height: 60rpx;
			line-height: 60rpx;
			color: #fff;
			background-image: linear-gradient(left, #e35f21 0%, #f09632 100%);
		}
	}
}
.zt {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: #666;
	opacity: 0.5;
	z-index: 99;
}
.s-b {
	// background: #F8601C !important;
	// color:#fff !important;
}
</style>
