<template>
	<view class="content">
		<view class="joinClassBg"></view>
		<view class="login">
			<view class="teacherName">
				<text>{{ teacher_name }}老师</text>
			</view>
			<view class="sf">邀请您加入{{ school }}{{ name }}</view>
			<view class="input"><input type="text" v-model="true_name" placeholder="请输入你的姓名" placeholder-class="p-c" /></view>
			<button open-type="getUserInfo" @getuserinfo="bindgetuserinfo($event, 4)">确认加入</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			user_info: { true_name: '', school_list: { school_name: '' } },
			id: '',
			true_name: '',
			name: '',
			school: '',
			class_id: '',
			school_id: '',
			teacher_name: '',
			disable: false,
			token: '',
			userInfo: {},
			code: ''
		};
	},
	onLoad(options) {
		console.log('options', options);
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		this.id = options.id;
		this.name = options.name;
		this.class_id = options.class_id;
		this.school = options.school;
		this.teacher_name = options.teacher_name;
		console.log('this.school', this.school);
		this.get_wx_login();
	},
	methods: {
		...mapMutations(['login', 'set_type']),
		get_get_team_location() {
			this.$api
				.get_team_location({
					classid: this.class_id
				})
				.then(res => {
					console.log('get_team_location', res);
					this.school_id = res.data.school_id;
					this.province_id = res.data.area.province_id;
					this.city_id = res.data.area.city_id;
					this.area_id = res.data.area.area_id;
					this.grade_ids = res.data.grade_id;
					this.team_ids = res.data.id;
					console.log('if (!res.data.isbind)', this.school_id);
				});
		},
		get_wx_login() {
			uni.login({
				success: res => {
					this.code = res.code;
					this.get_get_team_location();
					this.get_student_login();
				}
			});
		},
		get_bind_info() {
			this.$api
				.bind_info({
					school_id: this.school_id,
					province_id: this.province_id,
					city_id: this.city_id,
					area_id: this.area_id,
					grade_ids: this.grade_ids,
					team_ids: this.team_ids,
					true_name: this.true_name,
					user_id: this.user_id,
					user_name: this.userInfo.nickName,
					avatar: this.userInfo.avatarUrl,
					gender: this.userInfo.gender
				})
				.then(reslove => {
					console.log('bind_info', reslove);
					uni.showToast({
						title: reslove.msg,
						icon: 'none'
					});
					if(reslove.code == 200 ){
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}
				});
		},
		get_student_login() {
			let data = {
				code: this.code,
				openId: this.userInfo.openId,
				user_name: this.userInfo.nickName,
				gender: this.userInfo.gender,
				city: this.userInfo.city,
				province: this.userInfo.province,
				country: this.userInfo.country,
				avatar: this.userInfo.avatarUrl,
				unionId: this.userInfo.unionId,
				watermark: this.userInfo.watermark
			};
			this.$api.student_login(data).then(res => {
				this.openid_tmp = res.data.openid;
				console.log(this.openid_tmp);
				if (res.code == 200) {
					this.user_id = res.data.user_id;
					uni.setStorage({
						key: 'userinfo_tmp',
						data: res.data
					});
					uni.setStorage({
						key: 'token',
						data: res.data.token
					});
					uni.setStorage({
						key: 'userInfo',
						data: res.data
					});
					this.true_name = res.data.true_name;
					this.disable = true;
				} else {
					this.disable = false;
				}
			});
		},
		bindgetuserinfo(e, i) {
			uni.setStorage({
				key: 'type',
				data: i
			});
			console.log('bindgetuserinfo', e);
			this.userInfo = e.detail.userInfo;
			if (!this.true_name) {
				uni.showToast({
					title: '请输入真实姓名',
					icon: 'none'
				});
				return;
			}
			this.get_bind_info();
		}
	}
};
</script>

<style lang="scss">
page {
	font-family: PingFang SC;
	background: #eee;
}
.content {
	width: 100%;
	height: 100%;
}
.joinClassBg {
	width: 100%;
	height: 510rpx;
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/joinClass.png) no-repeat center center;
	background-size: 100% 100%;
	display: flex;
	image {
		display: block;
		width: 325rpx;
		margin: auto;
		height: 313rpx;
	}
}
.login {
	width: 570rpx;
	margin: 0 auto;
	.teacherName {
		display: inline-block;
		font-size: 36rpx;
		text-align: left;
		position: relative;
		font-weight: bold;
		margin-top: 90rpx;
		text {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 15rpx;
				border-radius: 16rpx;
				background: #e50304;
				left: 0;
				bottom: -15rpx;
			}
		}
	}
	.sf {
		margin: 50rpx 0rpx 25rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #888;
		width: 100%;
		text-align: left;
	}
	.input {
		margin: 30rpx auto;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100rpx;
		width: 570rpx;
		border: 1rpx solid #e7e7e7;
		border-radius: 20rpx;
		font-size: 30rpx;
		background: #fff;
		input {
			height: 100%;
			width: 100%;
		}
	}
	button {
		border: 1rpx solid #fff;
		width: 400rpx;
		font-size: 30rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
		background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
		margin: 50rpx auto 20rpx;
		border-radius: 20rpx;
	}
	.zhanhao {
		width: 540rpx;
		height: 80rpx;
		margin: 35rpx 0 0 50%;
		transform: translateX(-50%);
		border: 1rpx solid #eee;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		image {
			width: 40rpx;
			height: 40rpx;
		}
		input {
			width: 80%;
			height: 100%;
		}
	}
}
.text {
	padding: 0 50rpx;
	height: 100rpx;
	line-height: 100rpx;
	display: flex;
	justify-content: space-between;
	color: rgb(236, 119, 39);
}
.login-btn {
	width: 580rpx;
	height: 80rpx;
	color: #fff;
	border-radius: 10rpx;
	background-image: linear-gradient(left, rgb(222, 81, 28) 0%, rgb(240, 150, 50) 100%);
	line-height: 80rpx;
	text-align: center;
	font-size: 30rpx;
	margin-top: 50rpx;
	margin-left: 50%;
	transform: translateX(-50%);
}
.wx-btn {
	width: 580rpx;
	height: 80rpx;
	border-radius: 50rpx;
	border: 1rpx solid rgb(222, 81, 28);
	background: #fff;
	color: rgb(222, 81, 28);
	margin-top: 50rpx;
	line-height: 80rpx;
}
.banquan {
	font-size: 20rpx;
	color: #dedede;
	text-align: center;
	margin-top: 50rpx;
}
.b-b {
	background: #f8601c !important;
	border: 1rpx solid transparent !important;
	color: #fff !important;
}
.p-c {
	font-family: PingFang SC;
	color: #808080;
}
</style>
