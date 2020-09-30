<template>
	<view>
		<view class="top" :class="type == 3 ? 'teacher' : ''">
			<view class="mineInfo" @click="touser('/pages/person/user')">
				<view class="tou"><image :src="user_info.avatar"></image></view>
				<view class="info">
					<view class="nick" v-if="user_info.true_name">{{ user_info.true_name }}</view>
					<view class="schoolName" v-if="type == 4">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/schoolIcon.png"></image>
						<text>{{ school }}</text>
					</view>
					<view class="schoolName" v-if="type == 3">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/jifen.png"></image>
						<text>积分:{{ user_info.points ? user_info.points : 0 }}</text>
					</view>
				</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/rightWhite.png" class="detail"></image>
			</view>

			<view class="vip" v-if="info.user_vip_end_time && type == 4" @click="touser('/pages/person/vip')">
				<view class="endTimeInfo">
					<view>我的VIP会员</view>
					<view>VIP到期时间: {{ info.user_vip_end_time }}</view>
				</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/vipEndTime.png"></image>
			</view>
			<view class="vip" v-if="!info.user_vip_end_time && type == 4" @click="touser('/pages/person/vip')">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/vip.png"></image>
			</view>
			<view class="minePaper" @click="tocuoti()" v-if="type == 3">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/minePaper.png" mode=""></image>
				<view>
					<text>我的试卷</text>
					<view class="paperInfo">已生成试卷{{ user_info.created ? user_info.created : 0 }}份,未生成试卷{{ user_info.uncreate ? user_info.uncreate : 0 }}题</view>
				</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
		</view>

		<!-- 教师端 -->
		<view class="card" v-if="type == 3">
			<view class="item" @click="toMyUploadPaper()">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/uploadPaper.png" mode=""></image>
				<text>我上传的试卷</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<view class="item" @click="toJifen()">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/mineJifen.png" mode=""></image>
				<text>我的积分</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<view class="item" @click="touser('/pages/person/classInfo')">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/classId.png" mode=""></image>
				<text>我的班级</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<view class="item" @click="touser('/pages/person/feedback')">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/advice.png" mode=""></image>
				<text>意见反馈</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<!-- <view class="item">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/share.png" mode=""></image>
				<button open-type="share">分享给老师</button>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view> -->
		</view>

		<!-- 学生端 -->
		<view class="card student" v-if="type == 4">
			<view class="item" @click="toClassID()">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/classId.png" mode=""></image>
				<text>绑定班级</text>
				<view class="item_info">{{ grade_names ? grade_names : '' }}{{ team_name ? team_name : '' }}</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<view class="item" @click="touser('/pages/person/about')">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/aboutWe.png" mode=""></image>
				<text>关于我们</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<view class="item" @click="touser('/pages/person/feedback')">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/advice.png" mode=""></image>
				<text>意见反馈</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
			<view class="item">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/share.png" mode=""></image>
				<button open-type="share">分享</button>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view>
		</view>

		<button class="logout" @click="logout()" v-show="token">切换身份</button>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			user_info: {},
			token: '',
			type: 4,
			info: {},
			school: '',
			flag: false,
			grade_names: '',
			team_name: '',
			is_vip: 0
		};
	},
	onLoad() {
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		this.school = uni.getStorageSync('userInfo').school.school_name;
	},
	onShow() {
		this.getuserinfo();
		this.type = uni.getStorageSync('type');
		if (uni.getStorageSync('type') == 4) {
			this.get_vip_info();
		}
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	onShareAppMessage() {
		return {
			title: '错题宝',
			path: '/pages/login/login?id=' + this.user_info.user_id
		};
	},
	methods: {
		...mapMutations(['login', 'logout']),
		get_vip_info() {
			this.$api.vip_info({ token: this.token }).then(res => {
				console.log(res);
				this.info = res.data;
				this.is_vip = res.data.is_vip;
				uni.setStorage({
					key: 'is_vip',
					data: this.is_vip
				});
			});
		},
		//获取用户信息
		getuserinfo() {
			if (uni.getStorageSync('type') == 4) {
				this.$api.get_user_info({ token: this.token }).then(res => {
					console.log(res);
					this.user_info = res.data;
					this.grade_names = res.data.school_list.grade_names;
					this.team_name = res.data.school_list.team_name;
				});
			} else {
				this.$api.get_teacher_info({ token: this.token }).then(res => {
					console.log('jiaoshi', res);
					this.user_info = res.data;
				});
			}
		},
		touser(url) {
			console.log(url);
			// var url=e.currentTarget.dataset.url
			uni.navigateTo({
				url: url
			});
		},
		tocuoti() {
			uni.switchTab({
				url: '/pages/errorBook/errorBook'
			});
		},
		toClassID() {
			uni.navigateTo({
				url: '/pages/person/bindClassID'
			});
		},
		toMyUploadPaper: function() {
			uni.navigateTo({
				url: '/pages/person/mineUploadPaper?id=2'
			});
		},
		toJifen: function() {
			uni.navigateTo({
				url: '/pages/person/jifenRecord'
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
.y-bg {
	position: absolute;
	background-image: linear-gradient(left, #f6a136 0%, #f8b25a 100%);
	top: 0;
	left: 0;
	width: 100%;
	height: 200rpx;
	z-index: -1;
	border-bottom-right-radius: 100rpx;
	border-bottom-left-radius: 100rpx;
}
.teacher {
	height: 210rpx !important;
}
.minePaper {
	position: relative;
	display: flex;
	align-items: center;
	height: 130rpx;
	margin: 0 25rpx 25rpx;
	background: #fff;
	border-radius: 16rpx;
	border: 1rpx solid #e6e6e6;
	image:first-child {
		width: 64rpx;
		height: 72rpx;
		margin: 0 20rpx 0 30rpx;
	}
	text {
		display: inline-block;
		width: 90%;
		font-size: 28rpx;
	}
	.paperInfo {
		font-size: 24rpx;
		color: #b3b3b3;
		margin-top: 10rpx;
	}
	image:last-child {
		width: 14rpx;
		height: 26rpx;
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}
}
.top {
	width: 100%;
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/personInfo_bg.png) no-repeat center center;
	background-size: cover;
	position: relative;
	margin-top: -2rpx;
	.vip {
		width: 700rpx;
		height: 125rpx;
		margin: 0 25rpx;
		position: relative;
		.endTimeInfo {
			color: #ffeeb9;
			font-size: 28rpx;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 100rpx;
			/* >view{
					height: 62rpx;
					line-height: 62rpx;
				} */
			> view:last-child {
				color: #947057;
				font-size: 22rpx;
				margin-top: 5rpx;
			}
		}
		image {
			height: 100%;
			width: 100%;
		}
	}
	.w-bg {
		z-index: -1;
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: -35rpx;
		transform: translateX(-50%);
		background: #fafafa;
	}
	.mineInfo {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		position: relative;
		.tou {
			width: 120rpx;
			border: 5rpx solid #e9b4b4;
			border-radius: 50%;
			padding: 10rpx;
			display: inline-block;
			margin: 10rpx 20rpx 19rpx 50rpx;
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				vertical-align: center;
				display: block;
			}
		}
		.info {
			margin-top: 35rpx;
			.nick {
				color: #fff;
				font-size: 36rpx;
			}
			.schoolName {
				margin-top: 15rpx;
				background: rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
				padding: 0 15rpx;
				font-size: 28rpx;
				color: #fff;
				image {
					width: 30rpx;
					height: 30rpx;
					margin: -8rpx 10rpx 0 0;
					vertical-align: middle;
				}
			}
		}
		.detail {
			width: 14rpx;
			height: 26rpx;
			position: absolute;
			top: 80rpx;
			right: 30rpx;
		}
	}
}
.student.card {
	margin: 25rpx 25rpx 50rpx;
}
.card {
	margin: 125rpx 25rpx 50rpx;
	padding: 0 30rpx;
	background: #fff;
	border-radius: 16rpx;
	border: 1rpx solid #e6e6e6;
	.item {
		position: relative;
		display: flex;
		align-items: center;
		height: 100rpx;
		// border-bottom: 1rpx solid #f8f8f8;
		image:first-child {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
		button::after {
			border: none;
		}
		button {
			margin: 0;
			display: inline-block;
			border: none;
			padding: 0;
			background: #fff;
			width: 90%;
			height: 100%;
			text-align: left;
			line-height: 100rpx;
			font-size: 32rpx;
		}
		text {
			display: inline-block;
			width: 90%;
			height: 100%;
			line-height: 100rpx;
			font-size: 28rpx;
		}
		.item_info {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			font-size: 24rpx;
			color: #d3d3d3;
		}
		image:last-child {
			width: 14rpx;
			height: 26rpx;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.item:last-child {
		text {
			border: none;
		}
	}
}
.logout {
	margin: 20rpx auto;
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 30rpx;
	color: #fff;
	background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
}
.bg2 {
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 220rpx;
}
</style>
