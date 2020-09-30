<template>
	<view class="container">
		<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/email.png" class="emailPic" />
		<!-- <view class="reg">
			<input type="text" v-model="oldEmail" placeholder="请输入原邮箱" placeholder-style="color:#dedede"/>
			<image @click="del(1)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="name.length>0" mode=""></image>
		</view> -->
		<view class="reg">
			<input type="text" v-model="email" placeholder="请输入新邮箱" placeholder-style="color:#dedede" />
			<image @click="del(1)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="name.length > 0" mode=""></image>
		</view>
		<!-- 	<view class="yzcode">
			<input type="text" v-model="code" placeholder="请输入验证码" placeholder-style="color:#dedede"/>
			<button @click="getcode()">{{codeStr}}</button>
		</view>
		<view class="tishi">
			请设置不少于6位数字或字母的密码
		</view>
		<view class="reg">
			<input type="text" v-model="password" placeholder="请输入新密码" placeholder-style="color:#dedede"/>
			<image @click="del(2)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png"  v-show="password.length>0" mode=""></image>
		</view>
		<view class="reg">
			<input type="text" v-model="password2" placeholder="请再次输入新密码" placeholder-style="color:#dedede"/>
			<image @click="del(3)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png"  v-show="password2.length>0" mode=""></image>
		</view> -->
		<button class="btn" @click="xiugai()">修改邮箱</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			codeStr: '获取验证码',
			codeStatus: true,
			phone: '',
			password: '',
			password2: '',
			code: '',
			email: '',
			oldEmail: ''
		};
	},
	onLoad() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		if (uni.getStorageSync('type')) {
			this.type = uni.getStorageSync('type');
		}
		this.getuserinfo();
	},
	methods: {
		del(i) {
			if (i == 1) {
				this.phone = '';
			} else if (i == 2) {
				this.password = '';
			} else if (i == 3) {
				this.password2 = '';
			}
		},
		//获取用户信息
		getuserinfo() {
			if (this.type == 3) {
				var req = this.$api.get_teacher_info({ token: this.token });
			} else {
				var req = this.$api.get_user_info({ token: this.token });
			}
			req.then(res => {
				console.log(res);
				this.oldEmail = res.data.email;
			});
		},
		//提交
		xiugai() {
			if (!this.email) {
				uni.showToast({
					title: '请输入新邮箱',
					icon: 'none'
				});
				return;
			}
			if (this.email == this.oldEmail) {
				uni.showToast({
					title: '新邮箱不可与原邮箱一致',
					icon: 'none'
				});
				return;
			}
			if (this.type == 3) {
				var req = this.$api.save_teacher_email({ token: this.token, email: this.email });
			} else {
				var req = this.$api.save_email({ token: this.token, email: this.email });
			}
			req.then(res => {
				console.log(res);
				if (res.code == 200) {
					uni.showToast({
						title: '修改成功'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 1000);
				} else {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				}
			});
		},
		// xiugai(){
		// 	if(this.phone==''){
		// 		uni.showToast({
		// 			title:'手机号码不能为空',
		// 			icon:'none'
		// 		})
		// 		return
		// 	}
		// 	if(this.password==''){
		// 		uni.showToast({
		// 			title:'密码不能为空',
		// 			icon:'none'
		// 		})
		// 		return
		// 	}
		// 	if(this.password!=this.password2){
		// 		uni.showToast({
		// 			title:'两次密码不一致',
		// 			icon:'none'
		// 		})
		// 		return
		// 	}
		// 	if(!/^[0-9A-Za-z]{6,}$/.test(this.password)){
		// 		uni.showToast({
		// 			title:'请输入有效的密码！',
		// 			icon:'none'
		// 		})
		// 		return
		// 	}
		// 	var data={
		// 		mobile:this.phone,
		// 		verify_code:this.code,
		// 		password:this.password,
		// 		password_again:this.password2,
		// 	}
		// 	this.$api.search_password(data).then(res=>{
		// 		console.log(res)
		// 		if(res.code==200){
		// 			uni.showToast({
		// 				title:'修改成功！'
		// 			})
		// 			setTimeout(()=>{
		// 				uni.redirectTo({
		// 					url:'/pages/login/login'
		// 				},1000)
		// 			})
		// 		}else{
		// 			uni.showToast({
		// 				title:res.msg,
		// 				icon:"none"
		// 			})
		// 		}
		// 	})
		// },
		//发送验证码
		getcode() {
			if (this.codeStatus && this.phone) {
				this.codeStatus = false;
				this.$api.get_verify_code({ token: this.token, mobile: this.phone, type: 'change_password' });
				uni.showToast({
					title: '发送成功,请查看短信！',
					icon: 'none'
				});
				var time = 60;
				var t = setInterval(() => {
					time--;
					this.codeStr = time + 'S';
					if (time <= 0) {
						this.codeStatus = true;
						this.codeStr = '获取验证码';
						clearInterval(t);
					}
				}, 1000);
			}
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
button::after {
	border: none;
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
.reg {
	width: 570rpx;
	height: 85rpx;
	border: 1rpx solid #e7e7e7;
	border-radius: 16rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	margin: 30rpx auto;
	background: #fff;
	input {
		height: 100%;
		width: 80%;
		font-size: 30rpx;
	}
	image {
		width: 40rpx;
		height: 40rpx;
	}
}
.emailPic {
	width: 391rpx;
	height: 291rpx;
	margin: 200rpx auto 50rpx;
	display: block;
}
.yzcode {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	input {
		border: 1rpx solid #eee;
		height: 100rpx;
		width: 320rpx;
		border-radius: 8rpx;
		padding-left: 30rpx;
	}
	button {
		width: 220rpx;
		height: 100rpx;
		background: #fff;
		border: 1rpx solid #fdb79b;
		color: #fdb79b;
		line-height: 100rpx;
		margin: 0;
		font-size: 28rpx;
	}
}
.tishi {
	height: 80rpx;
	line-height: 80rpx;
	font-size: 24rpx;
	color: #b4b7c2;
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
</style>
