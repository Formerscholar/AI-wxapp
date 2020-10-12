<template>
	<view class="content">
		<view class='topBg'>
			<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/loginBg.png'></image>
		</view>
		<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/aiFalse.png" mode="" class='aiFalse'>
		<view class="login">
			<view class="sf">
				请选择您的身份
			</view>
			<button open-type="getUserInfo" @getuserinfo="bindgetuserinfo($event,4)">我是学生</button>
			<button open-type="getUserInfo" @getuserinfo="bindgetuserinfo($event,3)">我是老师</button>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="bindphone">
				<view >
					需要授权获取手机号
				</view>
				<button open-type="getPhoneNumber" @getphonenumber="getphone">授权</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { 
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		components: {uniPopup},
		data() {
			return {
				number:'',
				password:'',
				loginmode:4,
				type:4,
				user_id:'',
				userInfo:{},
				sessionkey:'',
				openid:'',
				code:'',
			};
		},
		onLoad() {
			uni.login({
				success: (res) => {
					this.code = res.code
				}
			})
		},
		methods:{ 
			...mapMutations(['login','set_type']),
			bindgetuserinfo(e,i){
				uni.setStorage({
					key:'type',
					data:i,
				})
				console.log('bindgetuserinfo',e)
				this.userInfo = e.detail.userInfo
				uni.setStorageSync('info',e.detail.userInfo)//头像  姓名
				if(i==3){
					console.log(this.userInfo)
					this.$api.teacher_login({
						code:this.code,
					})
					.then(res=>{
						this.sessionkey=res.data.session_key
						this.openid=res.data.openid
						console.log('res.data.data ',res.data)
						if(res.code==200){
							this.login(res.data)
							uni.setStorage({//缓存用户登陆状态
								key: 'userInfo',  
								data: res.data
							})
							uni.setStorage({
								key:"type",
								data:3
							})
							uni.reLaunch({
								url:'/pages/index/index'
							})
							// this.user_id=res.data.user_id 
						}else{ 	
							uni.setStorage({
								key: 'openid',  
								data: res.data.openid
							})
							this.$refs.popup.open()
						}
					})
				}else{
					console.log('学生登录',this.userInfo);
					this.$api.student_login({
						code:this.code,
						openId: this.userInfo.openId,
						user_name: this.userInfo.nickName,
						gender: this.userInfo.gender,
						city: this.userInfo.city,
						province: this.userInfo.province,
						country: this.userInfo.country,
						avatar: this.userInfo.avatarUrl,
						unionId: this.userInfo.unionId,
						watermark: this.userInfo.watermark
					})
					.then(res=>{
						this.session_key=res.data.session_key
						this.openid=res.data.openid
						console.log('res',res) 
						if(res.code==200){
							this.login(res.data)
							uni.setStorage({
								key: 'is_vip',  
								data: res.data.is_vip
							})
							uni.setStorage({
								key:"type",
								data:4
							})
							if(!res.data.is_bind){
								uni.navigateTo({
									url:'/pages/login/bindinfo'
								})
							}else{
								uni.reLaunch({
									url:'/pages/index/index'
								})
							}
						}else{
							uni.showToast({
								title: res.msg,
								icon:'none'
							});
						}
					})
				}		
				console.log(e)
			},
			getphone(e){
				
				console.log(e)			
				let data={
					code:this.code,
					iv:e.detail.iv,
					encryptedData:e.detail.encryptedData,
					sessionkey:this.sessionkey,
					openid:this.openid,
					user_name:this.userInfo.nickName,
					avatar:this.userInfo.avatarUrl,
					gender:this.userInfo.gender,
				}
				this.$api.get_mobile(data)
				.then(res=>{
					if(res.code==200){
						this.login(res.data)
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}else if(res.code==300){
						uni.setStorageSync('mobile',res.data.mobile)
						uni.reLaunch({
							url:'/pages/login/bindinfo'
						})
					}
					else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		font-family:PingFang SC;
	}
	.content{
		position: relative;
		width:100vw;
		height: 100vh;
	}
	.topBg{
		width:100%;
		height: 518rpx;
		image{
			width:100%;
			height:100%;
		}
	}
	.aiFalse{
		width:367rpx;
		height:80rpx;
		margin: 72rpx auto 39rpx;
		display: block;
	}
	.btn{
		display: flex;
		justify-content: space-between;
		//margin-top: 387rpx;
		padding: 387rpx 30rpx 0;
		view{
			text-align: center;
			width: 256rpx;
			height: 20rpx;
			background: #fff;
			border: 1rpx solid #fff;
			border-radius: 10rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: rgb(236,119,39);
			font-size: 35rpx;
		}
	}
	.login{
		width: 590rpx;
		background: #fff;
		margin: 0 auto;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		.sf{
			height: 40rpx;
			line-height: 40rpx;
			font-size: 28rpx;
			color: #cccccc;
			text-align: left;
		}
		button{
			// border: 1rpx solid #fff;
			width: 100%;
			height: 112rpx;
			margin: 26rpx auto 0;
			line-height: 112rpx;
			color:#fff;
			font-size: 42rpx;
			background: #ff2121;
		}
		button:nth-of-type(2){
			margin-top: 34rpx;
		}
		.zhanhao{
			width:540rpx ;
			height: 80rpx;
			margin: 35rpx 0 0 50%;
			transform: translateX(-50%);
			border: 1rpx solid #eee;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			image{			
				width: 40rpx;
				height: 40rpx;
			}
			input{
				width: 80%;
				height: 100%;
			}
		}
	}
	.text{
		padding:0 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: space-between;
		color: rgb(236,119,39);
	}
	.login-btn{
		width: 580rpx;
		height: 80rpx;
		color: #fff;
		border-radius: 10rpx;
		background-image:linear-gradient(left,rgb(222,81,28) 0%,rgb(240,150,50) 100%);
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		margin-top: 50rpx;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	.wx-btn{
		width: 580rpx;
		height: 80rpx;
		border-radius: 50rpx;
		border: 1rpx solid rgb(222,81,28);
		background: #fff;
		color: rgb(222,81,28);
		margin-top: 50rpx;
		line-height: 80rpx
	}
	.banquan{
		font-size: 20rpx;
		color: #dedede;
		text-align: center;
		margin-top: 50rpx;
	}
	.bindphone{
		background: #fff;
		width: 550rpx;
		height: 600rpx;
		border-radius: 20rpx;
		view{
			font-size: 35rpx;
			color: #888;
			text-align: center;
			height: 300rpx;
			line-height: 300rpx;
		}
		button{
			width: 60%;
			height: 100rpx;
			margin: 0rpx auto;
			line-height: 100rpx;
			color:#fff;
			font-size: 32rpx;
			border-radius: 20rpx;
			background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
		}
	}
	.b-b{
		background: #F8601C !important;
		border:1rpx solid transparent !important;
		color: #fff !important;
	}
</style>
