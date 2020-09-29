<template>
	<view class="content">
		<view class="joinClassBg"></view>
		<view class="btn"></view>
		<view class="login">
			<view class="teacherName">
				<text>{{ teacher_name }}</text>
			</view>
			<view class="sf">邀请您加入{{ school }}{{ name }}</view>
			<view class="input"><input type="text" v-model="true_name" placeholder="请输入你的姓名" placeholder-class="p-c" /></view>
			<picker mode="selector" :range="subject_list" range-key="title" @change="bindChange" class="infoCon">
				<view class="picker">
					{{ !num ? (subject_id ? subject_title : '请选择你的学科') : subject_id ? (subject_title ? subject_title : subject_list[num].title) : subject_list[num].title }}
				</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode=""></image>
			</picker>
			<button open-type="getUserInfo" @getuserinfo="bindgetuserinfo($event, 3)">确认加入</button>
			<uni-popup ref="popup" type="center">
				<view class="bindphone">
					<view class="">需要授权获取手机号</view>
					<button open-type="getPhoneNumber" @getphonenumber="getphone">授权</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import { mapState, mapMutations } from 'vuex';
export default {
	components: { uniPopup },
	data() {
		return {
			user_info: { true_name: '', school_list: { school_name: '' } },
			id: '',
			name: '',
			school: '',
			class_id: '',
			teacher_name: '',
			subject_title: '',
			disable: false,
			token: '',
			true_name: '',
			subject_list: [],
			subject_id: '',
			team_id: '',
			num: '',
			code: '',
			mobile: '',
			$e: '',
			$i: '',
			sessionkey: '',
			openid: ''
		};
	},
	onLoad(options) {
		console.log('options', options);
		this.id = options.id;
		this.name = options.name;
		this.school = options.school;
		this.class_id = options.class_id;
		this.teacher_name = options.teacher_name;
		this.team_id = options.team_id;
		this.get_get_team_location();
		this.get_team_subject();
		this.get_teacher_login();
	},
	methods: {
		...mapMutations(['login', 'set_type']),
		getphone(e) {
			this.$refs.popup.close();
			console.log('getphone', e);
			this.$api
				.get_mobile({
					code: this.code,
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData,
					sessionkey: this.sessionkey,
					openid: this.openid,
					user_name: this.user_info.nickName,
					avatar: this.user_info.avatarUrl,
					gender: this.user_info.gender
				})
				.then(res => {
					console.log(res);
					this.mobile = res.data.mobile;
					this.subject_id = res.data.subject_id;
					if (res.code == 200) {
						console.log(res.data);
						this.login(res.data)
						this.joinTeam();
					}else{
						this.get_teacher_bind_info()
					}
				});
		},
		get_teacher_bind_info() {
			this.$api
				.teacher_bind_info({
					province_id: this.province_id,
					city_id: this.city_id,
					area_id: this.area_id,
					school_id: this.school,
					subject_id: this.subject_id,
					true_name: this.true_name,
					mobile: this.mobile,
					openid: this.openid,
					nickName: this.user_info.nickName,
					avatar: this.user_info.avatarUrl,
					gender: this.user_info.gender
				})
				.then(res => {
					console.log(res);
					if (res.code == 200) {
						this.login(res.data)
						this.joinTeam();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
		},
		bindgetuserinfo(e, i) {
			this.user_info = e.detail.userInfo;
			uni.setStorage({
				key: 'type',
				data: i
			});
			if (!this.true_name) {
				uni.showToast({
					title: '请输入真实姓名',
					icon: 'none'
				});
				return;
			}
			if (!this.num && !this.subject_id) {
				uni.showToast({
					title: '请选择学科',
					icon: 'none'
				});
				return;
			}
			if (this.disable) {
				this.joinTeam();
			} else {
				this.$refs.popup.open();
			}
		},
		get_teacher_login() {
			uni.login({
				success: res => {
					this.code = res.code;
					this.$api
						.teacher_login({
							code: this.code,
							openId: this.user_info.openId,
							nickName: this.user_info.nickName,
							gender: this.user_info.gender,
							city: this.user_info.city,
							province: this.user_info.province,
							country: this.user_info.country,
							avatarUrl: this.user_info.avatarUrl,
							unionId: this.user_info.unionId,
							watermark: this.user_info.watermark
						})
						.then(res => {
							console.log('get_teacher_login', res);
							this.sessionkey = res.data.session_key;
							this.openid = res.data.openid;
							if (res.code == 200) {
								uni.setStorage({
									key: 'userinfo_tmp',
									data: res.data
								});
								uni.setStorage({
									key: 'userInfo',
									data: res.data
								});
								this.user_info = res.data;
								this.mobile = res.data.mobile;
								this.true_name = res.data.true_name;
								this.subject_id = res.data.subject_id;
								this.subject_list.map(item => {
									if (item.id == this.subject_id) {
										this.num = item.sort - 1;
									}
								});
								this.subject_title = res.data.subject_title;
								this.disable = true;
							} else{
								this.disable = false;
							}
						});
				}
			});
		},
		joinTeam() {
			this.$api
				.ter_join_team({
					classid: this.class_id,
					subject_id: this.subject_id
				})
				.then(res => {
					if (res.code == 200) {
						this.login(res.data);
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						setTimeout(() => {
							uni.switchTab({
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
		},
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
				});
		},
		get_team_subject(e) {
			this.$api.subject({ team_id: this.team_id }).then(res => {
				this.subject_list = res.data;
			});
		},
		bindChange(e) {
			console.log(e);
			this.num = e.detail.value;
			this.subject_id = this.subject_list[this.num].id;
			console.log(this.subject_id);
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
	.infoCon {
		margin: 30rpx auto;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100rpx;
		width: 570rpx;
		border: 1rpx solid #e7e7e7;
		border-radius: 20rpx;
		font-size: 30rpx;
		background: #fff;
		position: relative;
		.picker {
			/* height: 100%;
				line-height: 100%; */
			width: 100%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		image {
			position: absolute;
			top: 50%;
			right: 30rpx;
			transform: translateY(-50%);
			width: 22rpx;
			height: 12rpx;
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
.bindphone {
	background: #fff;
	width: 550rpx;
	height: 600rpx;
	border-radius: 20rpx;
	view {
		font-size: 35rpx;
		color: #888;
		text-align: center;
		height: 300rpx;
		line-height: 300rpx;
	}
	button {
		width: 60%;
		height: 100rpx;
		margin: 0rpx auto;
		line-height: 100rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 20rpx;
		background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
	}
}
</style>
