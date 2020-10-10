<template>
	<view>
		<view class="joinClassBg"></view>
		<view class="input">
			<image class="input_searchIcon" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/searchIcon.png" mode="widthFix"></image>
			<input type="text" v-model="num" placeholder="请输入班级ID或老师手机号码" />
			<image class="input_X" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/X.png" mode="widthFix"></image>
		</view>

		<button class="btn" @click="search_team()">查找班级</button>
		<view class="cardCon" v-if="classList">
			<view v-for="(item, i) of classList" :key="i" class="card">
				<view class="flex">
					<view class="up" @click="add(item)">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/grade.png" />
						<view class="upCon">{{ item.team_name }}</view>
					</view>
					<view class="up">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/invent.png" />
						<button class="upCon" @click="join(item.classid)">加入班级</button>
					</view>
				</view>
				<view class="flex">
					<view class="down" @click="add(item)">班级ID:&nbsp;{{ item.classid }}</view>
					<view class="down" @click="add(item)">学生人数:&nbsp;{{ item.team_student_count }}人</view>
				</view>
			</view>
		</view>
		<view v-if="!classList || classList.length == 0">
			<view class="text">
				<text>什么是班级ID</text>
				<text style="margin-left: 0;">班级ID是有字母C加7未数字组成，请向自己的老师询问自己的班级ID</text>
			</view>
			<view class="text">
				<text>温馨提示</text>
				<text>1、加入班级后可以查看到校本试卷</text>
				<text>2、向你的老师询问加入班级ID</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num: '',
			classid: '',
			classList: []
		};
	},
	onLoad() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
	},
	methods: {
		search_team() {
			this.$api.search_team({ token: this.token, key: this.num }).then(res => {
				console.log(res);
				if (res.code == 200) {
					/* uni.showToast({
							title:'加入成功！',
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/index/index'
							})
						},1000) */
					this.classList = res.data;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		join(classid) {
			this.$api.join_team({ token: this.token, classid: classid }).then(res => {
				console.log(res);
				if (res.code == 200) {
					uni.showToast({
						title: '加入成功！'
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}, 1000);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
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
}
.joinClassBg {
	width: 100%;
	height: 450rpx;
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/joinClass.png) no-repeat center center;
	background-size: 100% 101%;
	image {
		display: block;
		width: 325rpx;
		margin: 0 auto 0;
		padding-top: 150rpx;
		height: 313rpx;
	}
}
.input {
	border: 1px solid #eee;
	margin: 60rpx auto 0;
	width: 570rpx;
	border-radius: 20rpx;
	position: relative;
	input {
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		text-align: center;
		color: #747474;
	}
	.input_searchIcon{
		position: absolute;
		top: 50%;
		left: 30rpx;
		transform: translate(0,-50%);
		width: 30rpx;
		height: 30rpx;
	}
	.input_X{
		position: absolute;
		top: 50%;
		right: 30rpx;
		transform: translate(0,-50%);
		width: 27rpx;
		height: 27rpx;
	}
}

.btn {
	border: 1rpx solid #fff;
	width: 400rpx;
	font-size: 30rpx;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	color: #fff;
	background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
	margin-top: 50rpx;
	border-radius: 20rpx;
}
.text {
	width: 570rpx;
	margin: 0 auto 50rpx;
	display: flex;
	flex-direction: column;
	margin-top: 50rpx;

	text:nth-of-type(1) {
		font-size: 28rpx;
		font-weight: bold;
		color: #737373;
		margin-bottom: 20rpx;
	}
	text:nth-of-type(2),
	text:nth-of-type(3) {
		margin-left: 30rpx;
	}
	text {
		font-size: 24rpx;
		color: #999;
	}
}
.card {
	width: 700rpx;
	margin: 25rpx;
	background: #fff;
	border-radius: 20rpx;
	border: 1rpx solid #e6e6e6;
	.flex {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
		> view.up {
			height: 100rpx;
		}
		> view.down {
			height: 85rpx;
			line-height: 85rpx;
			font-size: 26rpx;
		}
	}
	.flex:nth-of-type(1) {
		background: #fff;
		.up {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			position: relative;
			image {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 40rpx;
				height: 40rpx;
				line-height: 40rpx;
				display: inline-block;
				z-index: 9;
			}
			.upCon {
				font-size: 28rpx;
				line-height: 100rpx;
				height: 100rpx;
				display: inline-block;
				border-radius: 0 20rpx 0 0;
				background: #fff;
			}
		}
		.up:nth-of-type(1) {
			image {
				left: 30rpx;
			}
			.upCon {
				margin-left: 90rpx;
			}
		}
		.up:nth-of-type(2) {
			image {
				left: -30rpx;
			}
		}
	}
	.flex:nth-of-type(2) {
		background: #f2f2f2;
		border-radius: 0 0 20rpx 20rpx;
		color: #818181;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
}
</style>
