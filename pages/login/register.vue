<template>
	<view>
		<image class="bg2" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/bg2.png" mode=""></image>
		<!-- <view class="y-bg">
			
		</view> -->
		<view class="container">
			<text @click="back">登录</text>
			<view class="reg">
				<input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color:#dedede"/>
				<image @click="del(1)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="name.length>0" mode=""></image>
			</view>
			<view class="reg">
				<input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="color:#dedede"/>
				<image @click="del(2)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="phone.length>0" mode=""></image>
			</view>
			
			<view class="yzcode">
				<input type="number" v-model="code" placeholder="请输入验证码" placeholder-style="color:#dedede"/>
				<button @click="getcode()">{{codeStr}}</button>
			</view>
			<view class="tishi">
				请设置不少于六位数的密码
			</view>
			
			<view class="reg">
				<input type="text" v-model="password" placeholder="请输入密码" placeholder-style="color:#dedede"/>
				<image @click="del(3)" src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png"  v-show="password.length>0" mode=""></image>
			</view>
			
			<button class="zhuce" @click="register()">注 册</button>
		</view>
		<view class="radio">
			<!-- <radio-group @click='select' name="">
				<label>
					<uni-checkbox value="" />
					<text>我已阅读并同意《注册协议》</text>
				</label>
			</radio-group> -->
			<checkbox-group @change="select">
				<label>
						<checkbox value="true" checked="false"/><text>我已阅读并同意</text>
				</label>
			</checkbox-group>
			<text @click.stop="toxieyi()">《注册协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeStr:'获取验证码',
				codeStatus:true,
				name:'',
				phone:'',
				password:'',
				code:'',
				xieyi:true,
			}
		},
		methods: {
			//注册
			register(){
				if(!/^[0-9A-Za-z]{6,}$/.test(this.password)){
					uni.showToast({
						title:'请输入有效的密码！',
						icon:'none'
					})
					return
				}
				if(this.xieyi){
					var data={
						user_name:this.name,
						password:this.password,
						mobile:this.phone,
						verify_code:this.code
					}
					this.$api.register(data).then(res=>{
						console.log(res)
						if(res.code==200){
							uni.showToast({
								title:"注册成功"
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:"/pages/login/login"
								})
							},1000)
						
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					})
				}else{
					uni.showToast({
						title:'请同意协议！',
						icon:'none'
					})
				}
			},
			select(e){
				console.log(e)
				if(e.detail.value[0]){
					this.xieyi=true
				}else{
					this.xieyi=false
				}
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			del(i){
				if(i==1){
					this.name=""
				}else if(i==2){
					this.phone=""
				}else if(i==3){
					this.password=""
				}
			},
			getcode(){
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:'请输入正确的手机号！',
						icon:'none'
					})
					return
				}
				if(this.codeStatus){
					this.codeStatus=false
					this.$api.get_verify_code({token:this.token,mobile:this.phone,type:'register'})
					uni.showToast({
						title:"发送成功,请查看短信！",
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
			},
			toxieyi(){
				uni.navigateTo({
					url:'/pages/person/about?title=zhuce'
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: rgb(250,250,250);
		font-family:PingFang SC;
	}
	button::after{
		border: none;
	}
	.y-bg{
		position: absolute;
		background-image:linear-gradient(left,#F6A136 0%,#F8B25A 100%);
		top: 0;
		left: 0;
		width: 100%;
		height: 200rpx;
		z-index: -1;
		border-bottom-right-radius:100rpx;
		border-bottom-left-radius:100rpx;
	}
	.container{
		width: 600rpx;
		background: #fff;
		border-radius: 8rpx;
		margin: 50rpx 0 0 50%;
		transform: translateX(-50%);
		padding: 30rpx 30rpx 80rpx 30rpx;
		text:first-child{
			display: block;
			text-align: right;
			color:#999;
			margin-bottom: 50rpx;
		}
		.reg{
			width: 540rpx;
			height: 100rpx;
			border:1rpx solid #eee;
			border-radius: 8rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			margin-bottom:30rpx;
			input{
				height: 100%;
				width: 80%;			
			}
			image{
				width: 40rpx;
				height: 40rpx;
			}		
		}
		.yzcode{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			input{
				border: 1rpx solid #eee;
				height: 100rpx;
				width: 320rpx;
				border-radius: 8rpx;
				padding-left: 30rpx;
			}
			button{
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
		.tishi{
			height: 80rpx;
			line-height: 80rpx;
			font-size: 24rpx;
			color: #B4B7C2;
		}
		.zhuce{
			border: 1rpx solid #fff;
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			color:#fff;
			background-image:linear-gradient(left,#E35F21 0%,#f09632 100%);
		}
	}
	.radio{
		margin-top: 50rpx;
		font-size: 24rpx;
		color: #B4B7C2;
		text-align: center;
		width: 100%;
		checkbox{
			transform:scale(0.7)
		}
		radio{
			margin-right: 20rpx;
			width: 35rpx;
			height: 35rpx;
			transform: scale(0.7);
		}		
	}
	.bg2{
		z-index: -1;
		position: absolute;
		top:0;
		left: 0;
		width: 100vw;
		height: 220rpx;
	}
</style>
