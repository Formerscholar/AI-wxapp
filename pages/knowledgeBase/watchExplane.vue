<template>
	<view>
		<view class="subtitle" v-if='jiexiList.subject_title&&jiexiList.grade_name'>{{jiexiList.subject_title}}<text>【{{jiexiList.grade_name}}】</text></view>
		<view class='con'>
			<view class='content'>
				<rich-text :nodes="changeStyle(jiexiList.content?jiexiList.content:'')"></rich-text>
			</view>

			<view v-if='jiexiList.answer&&is_vip==1&&type==4' class='daAn'>
				<view class='tag'>答案</view>
				<view class='context'>
					<rich-text :nodes="changeStyle(jiexiList.answer?jiexiList.answer:'')"></rich-text>
				</view>
			</view>
			<view v-if='jiexiList.analysis&&is_vip==1&&type==4' class='jieXi'>
				<view  class='tag'>解析</view>
				<view class='context'>
					<rich-text :nodes="changeStyle(jiexiList.analysis?jiexiList.analysis:'')"></rich-text>
				</view>
			</view>

			<view v-if='jiexiList.answer&&type==3' class='daAn'>
				<view class='tag'>答案</view>
				<view class='context'>
					<rich-text :nodes="changeStyle(jiexiList.answer?jiexiList.answer:'')"></rich-text>
				</view>
			</view>
			<view v-if='jiexiList.analysis&&type==3' class='jieXi'>
				<view  class='tag'>解析</view>
				<view class='context'>
					<rich-text :nodes="changeStyle(jiexiList.analysis?jiexiList.analysis:'')"></rich-text>
				</view>
			</view>
			
			<view v-if='jiexiList.know_point_info' class='knowPoint'>
				<view  class='tag'>知识点</view>
				<view class='context'>
					<rich-text :nodes="changeStyle(jiexiList.know_point_info?jiexiList.know_point_info:'')"></rich-text>
				</view>
			</view>
		</view>
		
		<!-- <view class="kong"  v-if="errorbook_list.length==0||!errorbook_list">
			<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png'/>
			<view>空空如也~</view>
			<view>您还还有创建试卷哦!</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				jiexiList:{},
				is_vip:'',
				type:''
			}
		},
		onLoad(options) {
			this.id=options.id
			this.token = uni.getStorageSync('token')
		},
		onShow() {
			this.get_exercise_analysis()
			if(uni.getStorageSync('is_vip')){
				this.is_vip=uni.getStorageSync('is_vip')
			}
			this.type =	uni.getStorageSync('type')
		},
		methods: {
			changeStyle(item) {
				item= item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
				item= item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
				return item
			},
			get_exercise_analysis(){
				this.$api.get_exercise_analysis({id:this.id})
				.then(res=>{
					if(res.code!=200){
						/* uni.showToast({
							title:res.msg,
							icon:"none",
							//duration:3000
						}) */
					}else{
						this.jiexiList = res.data
						console.log('watchExplane',res.data)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		//font-family:PingFang SC;
		background: #eee;
	}
	.subtitle{
		height:70rpx;
		line-height: 70rpx;
		width: 100%;
		text-align: center;
		background: #fff;
		color: #2c2c2c;
		font-size: 32rpx;
		position: fixed;
		z-index:999;
		top:0;
		left:0;
		border-bottom: 1rpx solid #cccccc;
		text{
			color:#e50304;
		}
	}
	.con{
		>view{
			margin: 25rpx;
			background: #fff;
			border:1rpx solid #e6e6e6;
			width: 700rpx;
			border-radius: 20rpx;
			padding: 60rpx 30rpx 30rpx;
			box-sizing: border-box;
			position: relative;
			.tag{
				font-size: 30rpx;
				width: 100rpx;
				height:40rpx;
				line-height: 40rpx;
				text-align: center;
				color:#fff;
				position: absolute;
				top:0;
				left:0;
				background-size: cover;
				border-radius: 20rpx 0 30rpx 0;
				padding:5rpx 15rpx;
			}
			.context{
				margin-top: 30rpx;
				font-size:30rpx;
				color:#878787;
			}
		}
		.content{
			padding:30rpx;
			margin-top: 95rpx;
		}
		.daAn{
			.context{
				font-weight:bold;
				color: #595656;
			}
			.tag{
				background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/daAnBg.png) no-repeat top right;
			}
		}
		.jieXi{
			.tag{
				background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/jixiBg.png) no-repeat top right;
			}
		}
		.knowPoint{
			margin-bottom:50rpx;
			.tag{
				background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/kPointBg.png) no-repeat top right;
			}
			.context{
				display: inline-block;
				border:1rpx solid #cccccc;
				border-radius: 20rpx;
				padding: 5rpx 20rpx;
			}
		}
		.content{
			margin: 95rpx 25rpx 25rpx;
			background: #fff;
			border-radius: 20rpx;
			width: 700rpx;
			padding: 25rpx;
			box-sizing: border-box;
		}
	}
	.kong{
		image{
			margin: 225rpx auto 50rpx;
			width:196rpx;
			height:237rpx;
		}
		view{
			text-align: center;
			font-size:30rpx;
			line-height: 50rpx;
			color:#c4c5c6;
		}
	}
</style>
