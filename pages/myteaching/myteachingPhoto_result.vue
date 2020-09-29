<template>
	<view>
		<!-- <view class='con'>
			<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/search/48e0d40fdca0156cb327deffd69639a6772.png'></image>
			<view class='mask'>
				<view class='light'></view>
			</view>
			<view class='bottom'>
				<view class='btn' @click="">重新拍摄</view>
			</view>
		</view> -->
		<div class="img-box">
			<image :src='pic'></image>
			<!-- <img src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/search/48e0d40fdca0156cb327deffd69639a6772.png" alt=""> -->
			<div class="wrapper" v-if='flag'></div>
			<view class='bottom'>
				<view class='btn' @click="toBack()">重新拍摄</view>
			</view>
		</div>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {uniPopup},
		data() {
			return {
				token:'',
				textbook_id:'',
				choosePage:1,
				pic:'',
				subtitle:'',
				subject_list:[],
				subject_id:'',
				type:4,
				textbook_list:[],
				tpage:'',
				title:'',
				subject_name:'',
				flag:true
			};
		},
		onReachBottom() {
			
		},
		onShow(){
			
		},
		onLoad(option){
			console.log(option.pic)
			this.flag=true
			if(uni.getStorageSync('userInfo').token){
				this.token=uni.getStorageSync('userInfo').token
			}
			this.pic=option.pic
			this.textbook_id=option.textbook_id
			this.choosePage=option.choosePage
			this.title=option.title
			this.subject_name=option.subject_name
			this.search_exercises()
		},
		methods:{
			toBack(){
				uni.navigateBack();
			},
			//获取题目数据
			search_exercises(){
				// console.log(this.textbook_id)
				this.$api.search_exercises({textbook_id:this.textbook_id,page:this.choosePage,pic:this.pic,token:this.token})
				.then(res=>{
					console.log('res',res)
					if(res.code==200){
						this.flag=false
						uni.redirectTo({
						  url: '/pages/myPaper/seePapers?status=photo&listData='+encodeURIComponent(JSON.stringify(res.data))+'&title='+this.title+'&subject_name='+this.subject_name
						})
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						this.flag=false
						return
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		width: 100vw;
		height: 100vh;
		font-family:PingFang SC;
		background: #eee;
	}
	/*
	.con{
		image{
			display: flex;
			margin:50% auto 0;
			transform: translateY(-50%);
		}
		.mask{
			width:100%;
			height: 100%;
			background: rgba(0,0,0,0.3);
			position: fixed;
			top:0;
			left:0;
			z-index:10;
			.light{
				position: ;
				width: 100%;
				height:500rpx;
				background-image: linear-gradient(to top,rgba(208,131,126,.5), rgba(208,131,126,0));
				animation: move 2s infinite linear;
			}
		}
		@keyframes move{
			to{
				background-position: 0 100%,0 0, 0 0, 0 0;
			}
		}
		.bottom{
			position: fixed;
			width: 100%;
			height: 100rpx;
			background: #fff;
			position: fixed;
			bottom:0;
			left:0;
			z-index: 100;
			.btn{
				margin:10rpx auto;
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size:30rpx;
				color:#fff;
				background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
				text-align: center;
				border-radius: 20rpx;
			}
		}
	} */
	
	div.img-box {
		position: relative;
		width: 100%;
		height: 100vh;
	}
	
	image {
		max-width: 100%;
		position: absolute;
		top:0;
		left:0;
		/* top:50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%); */
		width: 100%;
		height: 100%;
	}
	div.wrapper {
		width: 100%;
		height: 100vh;
		background: 
		linear-gradient(transparent, transparent),
		linear-gradient(90deg, #ffffff33 1rpx,transparent 0,transparent 19rpx),
		linear-gradient( #ffffff33 1rpx,transparent 0,transparent 19rpx),
		linear-gradient(transparent, rgb(208,131,126));
		background-size:100% 1.5%, 10% 100%,100% 8%, 100% 100%;
		background-repeat:no-repeat, repeat, repeat, no-repeat;
		background-position: 0% 0%, 0 0, 0 0, 0 0;
		/* 初始位置 */
		clip-path: polygon(0% 0%, 100% 0%, 100% 1.5%, 0% 1.5%);
		/* 添加动画效果 */
		animation: move 2s infinite linear;
	}
	
	@keyframes move{
		to{
			background-position: 0 100%,0 0, 0 0, 0 0;
			/* 终止位置 */
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		}
	}
	.bottom{
		position: fixed;
		width: 100%;
		height: 100rpx;
		background: #fff;
		position: fixed;
		bottom:0;
		left:0;
		z-index: 100;
		.btn{
			margin:10rpx auto;
			width: 400rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size:30rpx;
			color:#fff;
			background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
			text-align: center;
			border-radius: 20rpx;
		}
	}
</style>
