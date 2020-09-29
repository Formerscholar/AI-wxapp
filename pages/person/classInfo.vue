<template>
	<view>
		<view class="card" v-for="(item,i) of list " :key='i'>
			<view class='flex'>
				<view @click="add(item)" class='up'>
					<view class='className'>{{item.team_name}} <!-- <view class='guan'>管</view> --> </view>
					<view class='num'>ID:{{item.classid}}</view>
				</view>
				<view class='up' @click="add(item)">学生<view class='num'>{{item.team_student_count}}</view></view>
				<view class='up' @click="add(item)">老师<view class='num'>{{item.team_teacher_count}}</view></view>
			</view>
			<view class='flex'>
				<view class='down'><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/invent_stu.png"/><button class='downCon' open-type="share" :data-name='item.team_name' :data-class_id='item.classid' data-it='stu'>邀请学生</button></view>
				<view class='down'><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/invent_ter.png"/><button class='downCon' open-type="share" :data-team_id='item.team_id' :data-name='item.team_name' :data-class_id='item.classid' data-it='ter'>邀请老师</button></view>
			</view>
		</view>
		<view class='btn' @click="touser('/pages/person/addClass')">
			创建新的班级
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:'',
				list:[],
				team_name:''
			};
		},
		onShareAppMessage(e) {
			console.log(e.target.dataset.it)
			let path=''
			if(e.target.dataset.it=='stu'){
				path=`/pages/login/share?id=${uni.getStorageSync('userInfo').user_id}&school=${uni.getStorageSync('userInfo').school.name}&name=${e.target.dataset.name}&teacher_name=${uni.getStorageSync('userInfo').true_name}&class_id=${e.target.dataset.class_id}`
			}else{
				path=`/pages/login/share_ter?id=${uni.getStorageSync('userInfo').user_id}&school=${uni.getStorageSync('userInfo').school.name}&name=${e.target.dataset.name}&teacher_name=${uni.getStorageSync('userInfo').true_name}&class_id=${e.target.dataset.class_id}&team_id=${e.target.dataset.team_id}`
			}
			return{
				title:'错题宝',
				path:path
			}
		},
		onshow(){
			// this.get_class_list()
		},
		onLoad(){
			if (uni.getStorageSync('token')) {
				this.token = uni.getStorageSync('token');
			}
			this.get_class_list()
		},
		methods:{
			get(name){
				this.team_name=name
			},
			//班级列表
			get_class_list(){
				this.$api.my_team_ids_list({token:this.token})
				.then(res=>{
					console.log(res)
					this.list=res.data
				})
			},
			add(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/person/ListStudents?team_name='+item.team_name+'&team_id='+item.team_id
				})
			},
			touser(url){
				console.log(url)
				// var url=e.currentTarget.dataset.url
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: #eee;
		font-family:PingFang SC;
	}
	.card{
		width: 700rpx;
		margin: 25rpx;
		background: #fff;
		border-radius: 20rpx;
		border:1rpx solid #e6e6e6;
		.flex{
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			background: #fff;
			border-radius:20rpx 20rpx 0 0;
			/* >view.up{
				height: 100rpx;
			}
			>view.down{
				height:85rpx;
				line-height: 85rpx;
				font-size: 26rpx;
			} */
		}
		.flex:nth-of-type(1){
			background: #fff;
			height: 130rpx;
			align-items: center;
			font-size: 28rpx;
			.up{
				width:33.33%;
				text-align: center;
				position: relative;
				.className{
					position: relative;
					.guan{
						position: absolute;
						top:5rpx;
						right:10rpx;
						background: #e50304;
						border-radius: 50%;
						width: 28rpx;
						height: 28rpx;
						font-size:20rpx;
						line-height: 28rpx;
						text-align: center;
						color:#fff;
					}
				}
				.num{
					margin-top: 15rpx;
					color: #808080;
				}
				&:after{
					height: 100%;
					width: 2rpx;
					background: #e7e7e7;
					position: absolute;
					top:0;
					right: 0;
					content: '';
				}
			}
			.up:nth-last-of-type(1){
				&::after{
					display: none;
				}
			}
		}
		.flex:nth-of-type(2){
			background: #f2f2f2;
			border-radius:0 0 20rpx 20rpx;
			color:#818181;
			padding:0 15rpx 0 35rpx;
			box-sizing: border-box;
			.down{
				display: flex;
				flex-flow: row nowrap;
				justify-content:flex-start;
				image{
					// transform: translateY(-50%);
					width:40rpx;
					height:40rpx;
					vertical-align: middle;
					margin-top: 30rpx;
				}
				.downCon{
					font-size: 28rpx;
					line-height: 100rpx;
					height: 100rpx;
					display: inline-block;
					border-radius:0 20rpx 0 0;
					background: #f2f2f2;
				}
			}
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
</style>
