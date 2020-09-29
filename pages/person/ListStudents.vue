<template>
	<view>
		<view v-if='teacher.length!=0'>
			<view class='name'>老师</view>
			<view class="list">
				<view class="item">
					<view class="left" v-for='(item,i) in teacher' :key='i'>
						<view class='content'>
							<image :src='item.avatar'></image>
							<view>{{item.true_name}}</view>
						</view>
						<view class='subjectName'>{{item.subject_title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if='student.length!=0'>
			<view class='name'>学生</view>
			<view class='list'>
				<view class="item">
					<view class="left" v-for='(item,i) in student' :key='i' @click="report_detail(team_name,item.student_name,item.user_id)">
						<view class='content'>
							<image :src='item.avatar' v-if='item.avatar'></image>
							<view v-if='item.student_name'>
								{{item.student_name}}
								<!-- <image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon.png' v-if='item.is_vip==1'></image> -->
							</view>
						</view>
						<view>
							<view class='cuo_tag'>已收集{{item.err_cnt}}道错题</view>
							<!-- <image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/delete.png' class='delete' @click.stop="deItem(item.user_id)"></image> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class='kong' v-if='teacher.length==0&&student.length==0'>
			<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png'/>
			<view>空空如也~</view>
			<view>没有班级成员哦!</view>
		</view>
		<view class='btn' @click="delClass">
			<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del.png'></image>
			删除班级
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				student: [],
				teacher:[],
				team_id:'',
				team_name:'',
				update:true
			};
		},
		onLoad(options) {
			console.log(options)
			this.team_id=options.team_id
			this.team_name=options.team_name
			
			if (uni.getStorageSync('token')) {
				this.token = uni.getStorageSync('token');
			}
			
			this.get_student_list()
		},
		computed: {
			
		},
		methods:{
			get_student_list(){
				this.$api.team_student_list({token:this.token,team_id:this.team_id})
				.then(res=>{
					console.log(res)					
					if(res.code==200){
						console.log(res.data)
						this.student=res.data.student
						this.teacher=res.data.teacher
					}else{
						
					}
				})
			},
			deItem(id){
				uni.showModal({
					title:'确定删除吗？',
					success:(res) =>{
						if(res.confirm){
							let data={
								token:this.token,
								user_id:id
							}
							console.log(data)
							this.$api.remove_student(data)
							.then(res=>{
								if(res.code==200){
									uni.showToast({
										title:'删除成功'
									})
									this.get_student_list()
								}else{
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
			delClass(){
				uni.showModal({
					title:'确定删除吗？',
					success:(res) =>{
						if(res.confirm){
							this.$api.remove_team({token:this.token,team_id:this.team_id})
							.then(res=>{
								console.log(res)
								if(res.code==200){
									uni.showToast({
										title:'删除成功'
									});
									this.get_student_list();
									 let pages = getCurrentPages(); // 当前页面
									 let beforePage = pages[pages.length - 2]; // 前一个页面
									 uni.navigateBack({
										 success: function() {
											 beforePage.onLoad(); // 执行前一个页面的onLoad方法
										 }
									 });
								}else{
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
								}
							})			
						}
					}
				})
			},
			report_detail(team_name,student_name,user_id){
				uni.navigateTo({
					url:`/pages/learningReport/learningReport_detail?team_name=${team_name}&student_name=${student_name}&user_id=${user_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #eee;
		font-family:PingFang SC;
	}
	// .top{
	// 	display: flex;
	// 	justify-content: space-evenly;
	// 	align-items: center;
	// 	margin: 30rpx;
	// 	.class{
	// 		color: #F8601C;
	// 		border: 1rpx solid #F8601C;
	// 		border-radius: 8rpx;
	// 		background: #fff;
	// 		font-size: 28rpx;
	// 		// width: 210rpx;
	// 		height: 40rpx;
	// 		line-height: 40rpx;
	// 		text-align: center;
	// 	}
	// }
	.name{
		margin: 25rpx;
	}
	.list{
		background: #fff;
		margin:25rpx;
		border-radius: 20rpx;
		.item{
			display: flex;
			flex-direction: column;
			padding:30rpx;
			border:1rpx solid #e7e7e7;
			.left{	
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #e7e7e7;
				padding: 30rpx 0;
				.content{
					display: flex;
					flex-flow: row nowrap;
					justify-content: flex-start;
					align-items: center;
					>image{
						width: 80rpx;
						height:80rpx;
						border-radius: 50%;
						vertical-align: middle;
						margin-right: 30rpx;
					}
					>view{
						font-size: 28rpx;
						image{
							vertical-align: middle;
							width: 42rpx;
							height:20rpx;
							margin-left: 22rpx;
						}
					}
				}
				.cuo_tag{
					font-size: 26rpx;
					color: #999999;
					display: inline-block;
				}
				.delete{
					width:40rpx;
					height: 50rpx;
					vertical-align: middle;
					margin-left: 20rpx;
				}
				.subjectName{
					font-size: 24rpx ;
					color: #fff;
					background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
					padding:5rpx 15rpx;
					border-radius: 16rpx;
				}
			}
			.left:nth-of-type(1){
				padding-top: 0;
			}
			.left:nth-last-of-type(1){
				border-bottom: none;
				padding-bottom: 0;
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
		image{
			vertical-align: middle;
			width: 40rpx;
			height: 40rpx;
			margin-right: 25rpx;
		}
	}
	.b-c{
		background-image: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/gou.png);
		background-size: cover;
		border: 0 !important;
		width: 30rpx !important;
		height: 30rpx !important;
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
