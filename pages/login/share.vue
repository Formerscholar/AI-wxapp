<template>
	<view class="content">
		<view class="joinClassBg"></view>
		<view class="login">
			<view class="teacherName">
				<text>{{ teacher_name }}老师</text>
			</view>
			<view class="sf">邀请您加入{{ school }}{{ name }}</view>
			<view class="input"><input type="text" v-model="true_name" placeholder="请输入你的姓名" placeholder-class="p-c" /></view>
			<button @click="bindgetuserinfo">确认加入</button>
		</view>
    <uni-popup ref="popup" type="center">
    	<view class="bindphone">
    		<view class="">需要授权获取手机号</view>
    		<button open-type="getPhoneNumber" @getphonenumber="getphone">授权</button>
    	</view>
    </uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
  import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
    components: {
    	uniPopup
    },
		data() {
			return {
				user_info: {
					true_name: '',
					school_list: {
						school_name: ''
					}
				},
				id: '',
				true_name: '',
				name: '',
				school: '',
				class_id: '',
				school_id: '',
				province_id: '',
				city_id: '',
				area_id: '',
				grade_ids: '',
				team_ids: '',
				teacher_name: '',
				token: '',
				userInfo: {},
				code: '',
				openid: '',
				unionid:''
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
      this.get_get_team_location();
		},
    onShow() {
      this.get_wx_login()
    },
		methods: {
			...mapMutations(['login', 'set_type']),
      getphone(e) {
        let data = {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          openid: this.openid
        }
        this.$api.mobile_login(data)
          .then(res => {
            if (res.code == 200) {
              this.login(res.data)
              if (res.data.is_bind == 0) {
                uni.navigateTo({
                  url: '/pages/login/bindinfo'
                })
              } else {
                uni.reLaunch({
                  url: '/pages/index/index'
                })
              }
            } else {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          })
      },
			get_get_team_location() {
				this.$api
					.get_team_location({
						classid: this.class_id
					})
					.then(res => {
						console.log('get_team_location', res);
						this.school_id = res.data?.school_id || 0;
						this.province_id = res.data?.area?.province_id || 0;
						this.city_id = res.data?.area?.city_id || 0;
						this.area_id = res.data?.area?.area_id || 0;
						this.grade_ids = res.data?.grade_id || 0;
						this.team_ids = res.data?.id || 0;
						console.log('if (!res.data.isbind)', this.school_id);
					});
			},
			get_wx_login() {
				uni.login({
					success: res => {
						this.code = res.code;
            this.$api.get_wechat_login({
              code: res.code,
            }).then(res => {
              this.openid = res.data.openid
              uni.setStorage({
                key: "openid",
                data: this.openid
              })
            })
					}
				});
			},
			get_bind_info(token) {
				this.$api
					.bind_info({
            token,
						school_id: this.school_id,
						province_id: this.province_id,
						city_id: this.city_id,
						area_id: this.area_id,
						grade_ids: this.grade_ids,
						team_ids: this.team_ids,
						true_name: this.true_name,
					})
					.then(reslove => {
						console.log('bind_info', reslove);
						uni.showToast({
							title: reslove.msg,
							icon: 'none'
						});
						if (reslove.code == 200) {
							this.login(reslove.data);
							uni.setStorage({
								key: 'userinfo_tmp',
								data: reslove.data
							});
							uni.setStorage({
								key: 'token',
								data: reslove.data.token
							});
							uni.setStorage({
								key: 'userInfo',
								data: reslove.data
							});
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}
					});
			},
			get_student_login() {
				this.$api
					.student_login({
						openid: this.openid
					})
					.then(res => {
						this.openid_tmp = res.data.openid;
						console.log(this.openid_tmp);
						if (res.code == 200) {
							this.user_id = res.data.user_id;
							this.true_name = res.data.true_name;
							this.unionid = res.data.unionid
							uni.setStorageSync({
								key: 'userinfo_tmp',
								data: res.data
							});
							uni.setStorageSync({
								key: 'token',
								data: res.data.token
							});
							uni.setStorageSync({
								key: 'type',
								data: 4
							});
							this.login(res.data);
              this.get_bind_info(res.data.token)
						}else if (res.code == 500) {
              this.$refs.popup.open()
            }
					});
			},
			bindgetuserinfo() {
				if (!this.true_name) {
					uni.showToast({
						title: '请输入真实姓名',
						icon: 'none'
					});
					return;
				}
				uni.setStorage({
					key: 'type',
					data: 4
				});
        this.get_student_login();
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
		background: url(https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/joinClass.png) no-repeat center center;
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
