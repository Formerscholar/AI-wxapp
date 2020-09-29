<template>
	<view>
		<view class="container"> 
			<view class='joinClassBg'>
				<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/joinClass.png'/>
			</view>
			<view class='schoolName'>{{userInfo.school.name}}</view>
			<view class="item">
				<picker  :range="grade" range-key="name" @change="change1">
					<view class="select" :class="{'c-d':g_num==0}">{{grade[g_num].name}}</view>
				</picker>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" />
			</view>
			<view class="item">
				<picker  :range="class_name" @change="change2">
					<view class="select" :class="{'c-d':s_num==0}">{{class_name[s_num]}}</view>
				</picker>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" />
			</view>
			<button class="btn" @click="tijiao()">创建</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				grade:[],
				g_num:0,
				s_num:0,
				class_name:['请选择班级'],
				token:'',
				userInfo:''
			};
		},
		onLoad() { 
			if(uni.getStorageSync('userInfo').token){
				this.token=uni.getStorageSync('userInfo').token
			}
			this.userInfo=uni.getStorageSync('userInfo')
			this.get_grade() 
			this.get_class()
		},
		methods:{
			tijiao(){
				if(this.g_num==0){
					uni.showToast({
						title:'请选择年级！',
						icon:'none'
					})
					return
				} 	
				if(this.s_num==0){
					uni.showToast({
						title:'请选择班级！',
						icon:'none'
					})
					return
				}
			 
				let data={ 
					grade_id:this.grade[this.g_num].grade_id,
					class_name:this.class_name[this.s_num],
					token:this.token
				} 
				this.$api.teacher_add_class(data)
				.then(res=>{
					console.log(res)
					if(res.code==200){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						},1000)
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						}) 
					}
				}) 
			},
			 
			//获取年级
			get_grade(){ 
				this.$api.get_grade({token:this.token})
				.then(res=>{
					console.log(res)
					this.grade=[{name:'请选择年级'},...res.data.grade_list]
				}) 
			},
			//获取年级
			get_class(){
				 for(let i=0;i<50;i++){
					this.class_name.push((i+1)+'班')
				 }
				 console.log(this.class_name)
			},
			 //选择年级
			change1(e){
				console.log(e)
				this.g_num=e.detail.value
			},
			//选择班级
			change2(e){
				console.log(e)
				this.s_num=e.detail.value
			} 
		}
		
	}
</script>

<style lang="scss">
	page{
		background: #eee;
		font-family:PingFang SC;
	}
	.joinClassBg{
		width:100%;
		height:650rpx;
		background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/mineBg.png) no-repeat center center;
		background-size: 100% 101%;
		image{
			display:block;
			width:325rpx;
			margin: 0 auto 0;
			padding-top:150rpx;
			height: 313rpx;
		}
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
		width:100vw;
		height:100vh;
	}
	.schoolName{
		color:#636363;
		font-weight: bold;
		margin: 60rpx 0 45rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.item{
		width:570rpx;
		height: 85rpx;
		line-height: 85rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1rpx solid #e7e7e7;
		border-radius: 20rpx;
		margin:40rpx auto 25rpx;
		background: #fff;
		position: relative;
		picker{
			height: 100%;
			width:100% ;
			padding-left: 30rpx;
			font-size:28rpx;
			.select{
				line-height: 80rpx;
			}
		}
		input{
			height: 100%;
			width:80% ;
			padding-left: 30rpx;
			font-size:28rpx;
		}
		image{
			width: 22rpx;
			height: 12rpx;
			position: absolute;
			right:30rpx;
			top:50%;
			transform: translateY(-50%);
		}
	}
	.btn{
		border: 1rpx solid #fff;
		width: 400rpx;
		font-size:30rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color:#fff;
		background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
		margin: 50rpx auto 20rpx;
		border-radius: 20rpx;
	}
	.c-d{
		color: #dedede;
	}
</style>
