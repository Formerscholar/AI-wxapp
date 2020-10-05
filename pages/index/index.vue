<template>
	<view class="content">
		<view class="bg"></view>
		<swiper class="top" circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="white" indicator-active-color="#e50304">
			<swiper-item v-for="(item, i) of banner_list" :key="i" v-if="item.type == type"><image :src="item.img" mode=""></image></swiper-item>
		</swiper>

		<!-- 教师端 -->
		<view class="teacher" v-if="type == 3">
			<view class="tab_info">
				<view class="tb">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/subject.png" mode=""></image>
					<text>学科</text>
					<text>{{ teacher_info.subject_name.title }}</text>
				</view>

				<view class="tb" @click="toclassinfo()">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/class.png" mode=""></image>
					<text>班级</text>
					<text>{{ teacher_info.team_count }}</text>
				</view>

				<view class="tb" @click="toclassinfo()">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/classmate.png" mode=""></image>
					<text>学生</text>
					<text>{{ teacher_info.student_count ? teacher_info.student_count : 0 }}</text>
				</view>
			</view>
			<view class="upload" @click="uploadPaper()"><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/upload.png"></image></view>
			<view class="item left" @click="todetail(8)">
				<view class="title">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/report.png" mode="" class="report"></image>
					<text>学情报告</text>
					<text class="showDe" v-for="(item, i) of teacher_info.analysis" :key="i" v-if="teacher_info.analysis">
						{{ item.grade_name }}{{ item.team_name }},
						<text class="remark_red">{{ item.cnt ? item.cnt : 0 }}</text>
						道错题
					</text>
				</view>
			</view>
			<view class="right">
				<view class="item" @click="todetail(7)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mine_shijuan.png" mode=""></image>
					<view class="title">
						<text>校本试卷</text>
						<view>
							<text class="remark_red">{{ teacher_info.recent_paper ? teacher_info.recent_paper : 0 }}</text>
							份
						</view>
					</view>
				</view>

				<view class="item" @click="todetail(9)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaofu.png" mode=""></image>
					<view class="title">
						<text>名校资源</text>
						<view>
							<text class="remark_red">{{ teacher_info.recent_school_based ? teacher_info.recent_school_based : 0 }}</text>
							份
						</view>
					</view>
				</view>
			</view>
			<div class="clear"></div>
		</view>

		<!-- 学生端 -->
		<view class="student" v-else>
			<view class="item itemPhoto" @click="todetail(0)">
				<view><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/photo.png" mode=""></image></view>
				<view class="title">
					<text>拍照识题</text>
					<view>目前只支持教辅材料拍照识题</view>
				</view>
			</view>

			<view class="flex">
				<view class="item itemSpec0" @click="todetail(1)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaofu.png" mode=""></image>
					<view class="title">
						<text>我的教辅</text>
						<view>
							<text class="remark_red">{{ student_info.textbook_count ? student_info.textbook_count : 0 }}</text>
							本
						</view>
					</view>
				</view>

				<view class="item itemSpec" @click="todetail(2)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mine_shijuan.png" mode=""></image>
					<view class="title">
						<text>校本试卷</text>
						<view>
							<text class="remark_red">{{ student_info.paper_total ? student_info.paper_total : 0 }}</text>
							份
						</view>
					</view>
				</view>
			</view>

			<view class="flex">
				<view class="item itemSpec0" @click="todetail(9)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mingxiao.png" mode=""></image>
					<view class="title">
						<text>名校资源</text>
						<view>
							<text class="remark_red">{{ student_info.recent_paper ? student_info.recent_paper : 0 }}</text>
							份
						</view>
					</view>
				</view>

				<view class="item itemSpec" @click="todetail(4)">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mine_xueqingbaogao.png" mode=""></image>
					<view class="title">
						<text>学情报告</text>
						<view>
							<text class="remark_red">{{ student_info.error_exercises_total ? student_info.error_exercises_total : 0 }}</text>
							道错题
							<!-- 知识分布为：<text v-for="(item,i) of student_info.analysis_detail" :key='i'>{{item.name+" "}}</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// let app = getApp()
import { mapState, mapMutations } from 'vuex';
import { de_vip } from '@/common/common.js';
export default {
	data() {
		return {
			title: 'Hello',
			type: 4,
			banner_list: '',
			token: '',
			teacher_info: {},
			student_info: {},
			is_vip: ''
		};
	},
	onLoad() {
		this.token = uni.getStorageSync('token');
		if (this.token == '') {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		}
	},
	onShow() {
		this.type = uni.getStorageSync('type');
		if (uni.getStorageSync('is_vip')) {
			this.is_vip = uni.getStorageSync('is_vip');
		}
		if (this.type == 3) {
			uni.setTabBarItem({
				index: 1,
				text: '我的试卷',
				iconPath: '/static/imgs/icon/myPaper1.png',
				selectedIconPath: '/static/imgs/icon/myPaper.png'
			});
		} else {
			uni.setTabBarItem({
				index: 1,
				text: '错题本',
				iconPath: '/static/imgs/icon/cuotiben1.png',
				selectedIconPath: '/static/imgs/icon/cuotiben.png'
			});
		}
		this.get_banner();
		if (this.token && this.type == 3) {
			this.get_teacher();
		}
		if (this.token && this.type == 4) {
			this.get_student();
		}
	},
	computed: {
		// ...mapState(['type'])
	},
	methods: {
		uploadPaper: function() {
			uni.navigateTo({
				url: '/pages/person/mineUploadPaper?id=1'
			});
		},
		toclassinfo() {
			uni.navigateTo({
				url: '/pages/person/classInfo'
			});
		},
		//获取学生信息
		get_student() {
			let _this = this;
			_this.$api.student_index({ token: _this.token }).then(res => {
				console.log(res);
				_this.student_info = res.data;
				_this.is_vip = res.data.is_vip;
				uni.setStorage({
					key: 'is_vip',
					data: this.is_vip
				});
			});
		},
		//获取老师信息
		get_teacher() {
			this.$api.teacher_index({ token: this.token }).then(res => {
				console.log(res);
				this.teacher_info = res.data;
			});
		},
		get_banner() {
			this.$api.banner({ type: this.type }).then(res => {
				console.log(res);
				this.banner_list = res.data.banner_list;
			});
		},
		todetail(i) {
			var url = '';
			if (i == 0) {
				url = '/pages/myteaching/myteachingPhoto?from=1';
			} else if (i == 1) {
				url = '/pages/myteaching/contentReference';
			} else if (i == 2) {
				url = '/pages/myPaper/myPaper';
			} else if (i == 3) {
				uni.switchTab({
					url: '/pages/errorBook/errorBook'
				});
			} else if (i == 4) {
				// url=de_vip(this.is_vip,'学情报告','/pages/learningReport/learningReport')
				url = '/pages/learningReport/learningReport';
			} else if (i == 5) {
				url = '';
			} else if (i == 6) {
				uni.switchTab({
					url: '/pages/errorBook/errorBook'
				});
			} else if (i == 7) {
				url = '/pages/myPaper/myPaper';
			} else if (i == 8) {
				url = '/pages/learningReport/j-xueqingbaogao';
			} else if (i == 9) {
				if (this.type == 4) {
					url = de_vip(this.is_vip, '名校资源', '/pages/myPaper/new_paper');
				} else {
					url = '/pages/myPaper/new_paper';
				}
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #eee;
	font-family: PingFang SC;
	width: 100vw;
	height: 100vh;
}
.clear {
	clear: both;
}
.bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 175rpx;
	background: #e50304;
}
.top {
	width: 100%;
	height: 350rpx;
	border-radius: 20rpx;
	.uni-swiper-dot {
		background-color: #fff !important;
	}
	.uni-swiper-dot-active {
		background-color: #e50304 !important;
	}
	image {
		width: 700rpx;
		height: 100%;
		margin: 0 25rpx;
		border-radius: 20rpx;
	}
}
.flex {
	display: flex;
	justify-content: space-between;
	align-content: center;
}
.teacher {
	margin: 25rpx;
	.upload {
		width: 100%;
		height: 150rpx;
		margin: 25rpx 0;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.item.left {
		float: left;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		height: 383rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border: 1rpx solid #e7e7e7;
		.title {
			> text:nth-of-type(1) {
				text-align: center;
				font-weight: bold;
				font-size: 36rpx;
				margin-bottom: 20rpx;
			}
		}
		.showDe {
			font-size: 26rpx;
			color: #afafaf;
			width: 310rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
			margin-bottom: 10rpx !important;
			.remark_red{
				margin-left: 10rpx;
			}
		}
		.title {
			margin-top: 0 !important;
		}
		image {
			margin: 45rpx auto 30rpx !important;
		}
	}
	.right {
		float: right;
		.item {
			.title {
				> text:nth-of-type(1) {
					font-weight: bold;
					margin-bottom: 15rpx;
				}
			}
			image {
				/* position:absolute;
					top:50%;
					transform: translateY(-50%);
					left:0; */
			}
		}
	}
	.item {
		position: relative;
		width: 340rpx;
		height: 180rpx;
		background-color: #fff;
		margin: 0 0 25rpx 0;
		border-radius: 20rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		box-sizing: border-box;
		border: 1rpx solid #e7e7e7;
		.title {
			margin: auto 0;
			display: flex;
			flex-direction: column;
			position: relative;
			> text {
				color: #000;
				font-size: 36rpx;
				margin-bottom: 20rpx;
			}
			> view {
				color: #afafaf;
				font-size: 26rpx;
			}
			.report {
				width: 86rpx;
				height: 89rpx;
				margin: 30rpx auto;
			}
		}
		> image {
			display: flex;
			margin: auto 0;
			margin-left: 50rpx;
			margin-right: 30rpx;
			width: 80rpx;
			height: 90rpx;
		}
	}
}
.student {
	.item.itemSpec0 {
		flex: 1;
		height: 180rpx;
		margin: 0 25rpx 25rpx 25rpx;
	}
	.item.itemSpec {
		flex: 1;
		height: 180rpx;
		margin: 0 25rpx 25rpx 0;
	}
	.item.itemPhoto {
		width: 700rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.title {
			text:last-child {
				width: auto;
			}
		}
		image {
			width: 124rpx;
			height: 100rpx;
		}
	}
	.item {
		position: relative;
		height: 219rpx;
		background-color: #fff;
		margin: 25rpx;
		border-radius: 20rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		box-sizing: border-box;
		.title {
			display: flex;
			flex-direction: column;
			margin: auto 0;
			box-sizing: border-box;
			> text {
				color: #000;
				font-weight: bold;
				font-size: 36rpx;
			}
			> view {
				color: #afafaf;
				font-size: 26rpx;
				padding-top: 15rpx;
			}
		}
		image {
			display: flex;
			align-items: center;
			margin: auto 0;
			margin-left: 50rpx;
			margin-right: 30rpx;
			width: 80rpx;
			height: 90rpx;
		}
	}
}

.tab_info {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	// justify-content: space-evenly;
	.tb {
		width: 100%;
		height: 213rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin-right: 25rpx;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		border: 1rpx solid #e7e7e7;
		border-radius: 20rpx;
		image {
			width: 60rpx;
			height: 60rpx;
		}
		text:nth-child(2) {
			color: #333333;
			font-size: 30rpx;
		}
		text:nth-child(3) {
			color: #cccccc;
			font-size: 26rpx;
		}
	}
	.tb:last-child{
		margin-right: 0;
	}
}
</style>
