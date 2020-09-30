<template>
	<view class="container">
		<view>
			<!-- <view class="reg">
				<input type="text" v-model="old_mobile" placeholder="请输入旧手机" placeholder-style="color:#dedede"/>
				<image @click="del(1)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="name.length>0" mode=""></image>
			</view>
			<view class="yzcode">
				<input type="text" v-model="code1" placeholder="请输入验证码" placeholder-style="color:#dedede"/>
				<button @click="getcode()">{{codeStr}}</button>
			</view> -->
			<view class="reg">
				<input type="text" v-model="new_mobile" placeholder="请输入新手机" placeholder-style="color:#dedede" />
				<image @click="del(1)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="name.length > 0" mode=""></image>
			</view>
			<view class="yzcode">
				<input type="text" v-model="code2" placeholder="请输入验证码" placeholder-style="color:#dedede" />
				<button @click="getcode2()">{{ codeStr2 }}</button>
			</view>

			<button class="btn" @click="baocun()">修改</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			codeStr: '获取验证码',
			codeStatus: true,
			codeStr2: '获取验证码',
			codeStatus2: true,
			old_mobile: '',
			new_mobile: '',
			password: '',
			password2: '',
			token: '',
			code1: '',
			code2: ''
		};
	},
	onLoad() {
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		this.old_mobile = uni.getStorageSync('userInfo').display.mobile;
	},
	methods: {
		baocun() {
			var reg = /^1[2|3|4|5|8]\d{9,}/;
			if (!reg.test(this.new_mobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}

			if (!this.code2) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
				return;
			}
			let data = {
				token: this.token,
				old_mobile: this.old_mobile,
				new_mobile: this.new_mobile,
				verify_code: this.code2
			};
			this.$api.change_mobile(data).then(res => {
				console.log(res);
				if (res.code == 200) {
					uni.showToast({
						title: '修改成功！'
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
		del(i) {
			if (i == 1) {
				this.name = '';
			} else if (i == 2) {
				this.password = '';
			} else if (i == 3) {
				this.password2 = '';
			}
		},
		/* getcode(){
				if(this.codeStatus){
					this.codeStatus=false
					this.$api.get_verify_code({token:this.token,type:'update',mobile:this.old_mobile})
					uni.showToast({
						title:"发送成功,请查看手机！",
						icon:'none'
					})
					
					var time=60
					var t=setInterval(()=>{
						time--					
						this.codeStr=time+'S'
						if(time<=0){
							this.codeStatus=true
							this.codeStr='获取验证码'
							clearInterval(t)
						}
					},1000)
				}		
			}, */
		getcode2() {
			if (this.codeStatus2) {
				this.codeStatus2 = false;
				this.$api.get_verify_code({ token: this.token, type: 'update', mobile: this.new_mobile });
				uni.showToast({
					title: '发送成功,请查看手机！',
					icon: 'none'
				});

				var time = 60;
				var y = setInterval(() => {
					time--;
					this.codeStr2 = time + 'S';
					if (time <= 0) {
						this.codeStatus2 = true;
						this.codeStr2 = '获取验证码';
						clearInterval(y);
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
		font-size: 28rpx;
	}
	image {
		width: 40rpx;
		height: 40rpx;
	}
}
.yzcode {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	input {
		border: 1rpx solid #e7e7e7;
		height: 85rpx;
		width: 320rpx;
		padding-left: 30rpx;
		font-size: 28rpx;
		border-radius: 16rpx;
		margin-left: 60rpx;
		background: #fff;
	}
	button {
		width: 220rpx;
		height: 85rpx;
		background: #fff;
		border: 1rpx solid #e50304;
		color: #e50304;
		line-height: 85rpx;
		margin: 0;
		font-size: 28rpx;
		border-radius: 16rpx;
		margin-left: 60rpx;
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
.bg2 {
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 220rpx;
}
</style>
