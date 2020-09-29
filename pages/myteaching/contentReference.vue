<template>
	<view class="container">
		<view class="top pickes">			
			<view class='subject'>学科</view>
		</view>
		
		<view class="tabar">
			<view class="item" @click="selection(i)" v-for="(item,i) of subject_list" :key='i' v-if='subject_list.length!=1'>
				<image :src="item.status?item.icon1:item.icon2" ></image>
				<text :class="{'c-c':item.status}">{{item.title}}</text>
			</view>
			<view class="item item_special" @click="selection(i)" v-for="(item,i) of subject_list" :key='i' v-else>
				<image :src="item.status?item.icon1:item.icon2" ></image>
				<text :class="{'c-c':item.status}">{{item.title}}</text>
			</view>
		</view>
		
		<view class="card" @click="toTeachingPhoto(textbook_list[i],subject_name)" 
		v-for="(item,i) of textbook_list" :key='i' v-if='textbook_list.length!=0'>
			<image :src="item.icon" mode="" class='subject'></image>
			<view class="title">
				<view>{{item.textbook_name}}</view>
				<view class='term'>{{item.semester}}学期</view> 
				<view class='version'>{{item.version_title}}</view>
			</view>
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode="" class='detail'></image>
		</view> 
		<view class="nomore" v-if="textbook_list.length==0||!textbook_list">
			你还没有添加自己的教辅！
		</view>
		<view class="btn" @click="toselect()">
			选择教辅
		</view>
		<!-- 遮罩层 -->
		<view class="zt" v-show="false"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textbook_list:[],
				subject_id:"",
				subject_list:[],
				semester_list:[],//难度列表
				num_l:0,//难度选择 
				semester:'',
				page:1,
				is_more:1,
				subject_name:''
			};
		},
		onReachBottom() {
			if(this.is_more){
				this.page++
				console.log('my_textbook_list1')
				this.my_textbook_list()
			}
		},
		onShow(){  
			this.subject_fenlei()
			// this.get_semester() 
		},
		onLoad(options){
			if(uni.getStorageSync('userInfo').token){
				this.token=uni.getStorageSync('userInfo').token
			}
			if(uni.getStorageSync('type')){
				this.type=uni.getStorageSync('type')
			}
		},
		methods:{
			//习题难度
			/* get_semester(){
				this.$api.get_semester()
				.then(res=>{
					console.log(res)
					this.semester_list=res.data
					this.semester=res.data[0]['name']
				})
				
			}, */
			//学科分类
			subject_fenlei(){
				this.$api.subject()
				.then(res=>{
					console.log('list',res.data)
					var list=res.data
					list.forEach(function(elem,i,arr){
						elem.status=false
					})
					this.subject_list=list
					this.selection(0) 
				})
			},
			my_textbook_list(){
				this.$api.my_textbook_list({token:this.token,type:this.type,subject_id:this.subject_id,page:this.page,page_size:10})
				.then(res=>{			
					if(res.code==200){
						this.is_more=res.is_more
						if(this.page==1){
							this.textbook_list=res.data;
						}else{
							this.textbook_list=[...this.textbook_list,...res.data]
						}
					}else{
						if(res.code==500){
							this.textbook_list=[]
						}
						/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
					} 
				})
			},
			/* select_l(e){ 
				this.is_more=1
				this.page=1
				this.num_l=e.detail.value   
				this.semester=this.semester_list[e.detail.value]['name']    
				this.my_textbook_list()
			}, */
			toselect(){
				uni.navigateTo({
					url:'/pages/myteaching/myteaching?id='+this.subject_id
				})
			}, 
			selection(i){
				this.page=1
				this.subject_list.forEach((e,j,arr)=>{ 
					console.log(i)
					if(i==j){
						e.status=true
						this.subject_id=e.id
						this.subject_name=e.title
				        console.log('my_textbook_list4')
						this.my_textbook_list()
					}else{
						e.status=false
					}
				})
			},
			toTeachingPhoto(obj,subject_name){
				uni.navigateTo({
					url:'/pages/myteaching/myteachingPhoto?from=2&obj='+JSON.stringify(obj)+'&subject_name='+subject_name,
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100vw;
		height: 100vh;
		background: #eee;
		font-family:PingFang SC;
	}
	.container{
		width: 100%;
		padding:0 30rpx;
		box-sizing: border-box;
	}
	.top{
		height: 100rpx;
		font-size: 32rpx;
		line-height: 100rpx;
		color:#4c4c4c;
		text{
			color: #F8601C;
		}
	}
	
	.tabar{
		height: 150rpx;
		padding: 30rpx;
		border:1rpx solid #e7e7e7;
		box-sizing: border-box;
		border-radius: 20rpx;
	}
	.pickes{
		// margin-bottom: 20rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.subject{
			font-size: 32rpx;
		}
		.value{
			border: 1rpx solid #e50304;
			border-radius: 10rpx;
			padding-left: 20rpx;
			width: 150rpx;
			height: 50rpx;
			line-height: 50rpx;
			position: relative;
			color: #e50304;
			font-size: 28rpx;
			font-weight: 500;
			image{
				position: absolute;
				top:50%;
				right: 10rpx;
				transform: translateY(-50%);
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	.card{
		height:160rpx;
		border: 1rpx solid #eee;
		padding:15rpx 30rpx;
		margin:0 30rpx;
		border-radius: 20rpx;
		margin: 25rpx 0;
		box-sizing:border-box;
		position: relative;
		background: #fff;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		image.subject{
			width: 120rpx;
			height: 100%;
			margin: 0 30rpx 0 0;
			vertical-align: middle;
		}
		.title{
			font-size: 0;
			position: relative;
			view{
				color:#9a9a9a;
				font-size: 20rpx;
			}
			view:nth-of-type(1){
				 color: #666666;
				 font-size: 30rpx;
				 width: 450rpx;
				 overflow: hidden;
				 white-space: nowrap;
				 text-overflow: ellipsis;
			}
			.term{
				margin:2.5% 0;
			}
			.version{
				font-size: 20rpx;
				color:#e50304;
				border:1rpx solid #e50304;
				border-radius: 20rpx;
				text-align: center;
				padding: 2rpx 15rpx;
				display: inline-block;
			}
		}
		image.detail{
			width: 14rpx;
			height: 26rpx;
			position: absolute;
			top:50%;
			right:35rpx;
			transform: translateY(-50%);
		}
	}
	.card:nth-last-of-type(1){
		margin-bottom: 50rpx !important;
	}
	.mask{
		z-index: 999;
		width: 500rpx;
		position: absolute;
		left: 50%;
		top:300rpx;
		transform: translateX(-50%);
		background: #fff;
		
		border-radius: 8rpx;
		padding: 30rpx;
			.mc{
				display: flex;
				justify-content: space-between;
				color: #F8601C;
				text-align:center
			}	
	}
	.mc{
		text:first-child{
			display:block;
			width:25%;
			height: 30rpx;
			border-bottom: 1rpx solid #F8601C;
		}
		text:nth-child(2){
			margin-top:10rpx;
		}
		text:last-child{
			display:block;
			width:25%;
			border-bottom: 1rpx solid #F8601C;
			height: 30rpx;
		}
	}
	.scroll-view{
		height: 500rpx;
		.s-item{
			display: flex;
			align-items: center;
			position: relative;
				image{
					width: 50rpx;
					height: 50rpx;
					margin-right: 10rpx;
				}
				text{
					display: block;
					width: 95%;
					height: 100%;		
					border-bottom:1rpx solid #eee;
					padding: 18rpx 0;
					color: #777;
					font-size: 28rpx;
				}
				view{
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 35rpx;
					height: 35rpx;
					border: 1rpx solid #F8601C;
					border-radius: 50%;
					// image{
					// 	width: 40rpx;
					// 	height: 40rpx;
					// 	background-size: cover;
					// 	margin: 0;
					// };
					
				}
		}
	}
	.zt{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: #666;
		opacity: 0.5;
		z-index: 99;
	}
	.c-c{
		color: #e50304;
	}
	.b-n{
		border: 0;
		background-image: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/gou.png);
		background-size: cover;
	}
	.btn{
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		color:#fff;
		background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
		margin: 50rpx auto;
		font-size: 30rpx;
		text-align: center;
		border-radius: 20rpx;
	}
	.nomore{
		margin: 50rpx 0;
		text-align: center;
		color: #999;
		font-size: 24rpx;
	}
</style>
