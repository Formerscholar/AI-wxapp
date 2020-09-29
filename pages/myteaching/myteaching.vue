<template>
	<view class="container">
		<view class="top pickes">
			<view class='subject'>教辅名称</view>
			<picker  :range="semester_list" range-key="name" @change="select_l" >
				<view class="value" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
				{{ semester_list[num_l].name?semester_list[num_l].name:'上学期'}}
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/xiala.png" mode=""></image>
				</view>
			</picker>
		</view>
		<view class="content">
			<block v-if="update">
				<view class="s-item" v-for="(item,i) in textbook_list" :key="i"   @click="select(item)">
					<image :src="item.icon" mode=""></image>
					<view class='infoCon'>
						<view class='bookname'>{{item.title}}</view>
						<view class='term'>{{item.semester}}学期</view>
						<view class='type'>{{item.version_title}}</view>
					</view>
					<view :class="{'b-g':item.status?item.status:item.is_select}" class='default'></view>
				</view>
			</block>
			<view class='btnCon btnConFix'>
				<button class="btn" @click="tochaxun()">确定</button>
			</view>
		</view>
		
		<uni-popup ref="popup" type="center">		
			<view class="mask">
				<view class="mc">
					<text> </text>
					<text>教辅名称</text>
					<text> </text>
				</view>
				<view class="content">
					<scroll-view class="scroll-view" scroll-y="true" >
						<block v-if="update">
							<view class="s-item" v-for="(item,i) in textbook_list" :key="i"   @click="select(i)">
								<image :src="item.icon" mode=""></image>
								<text>{{item.title}}</text>
								<view :class="{'b-g':item.is_select}"></view>
							</view>
						</block>				
					</scroll-view>
				</view>
				<view class='btnCon'>
					<button class="btn" @click="tochaxun()">确定</button>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {uniPopup},
		data() {
			return {
				mc:false,
				version_list:[],//教辅版本列表
				textbook_list:[],//教辅名称列表
				textbook_ids:{},//已选择的教辅名称id
				subject_id:'',//已选择的学科id
				num:1,
				update:true,
				page:1,
				is_more:1,
				token:'',
				semester_list:[],
				semester:'',
				num_l:0,//难度选择 
			};
		},
		onReachBottom() {	
			// this.page++
			// this.version()			
		},
		onShow(){
			this.get_semester() 
		},
		onLoad(options){
			this.subject_id=options.id
			if(uni.getStorageSync('userInfo').token){
				this.token=uni.getStorageSync('userInfo').token
			}
		},
		methods:{
			//习题难度
			get_semester(){
				this.$api.get_semester()
				.then(res=>{
					this.semester_list=res.data
					this.semester=res.data[0]['name']
					this.open()
				})
			},
			select_l(e){
				this.is_more=1
				this.page=1
				this.num_l=e.detail.value
				this.semester=this.semester_list[e.detail.value]['name']
				this.open()
			},
			//教辅版本列表
			version(){
				this.$api.version({subject_id:this.subject_id,page:this.page})
				.then(res=>{
					console.log(res)
					this.is_more=res.is_more
					if(this.page==1){
						this.version_list=res.data.version_list
					}else{
						this.version_list=[...this.version_list,...res.data.version_list]
					}
					
					})
			},
			//选择教辅名称
			select(item){
				console.log(item)
				if(item.is_select==1){
					item.is_select=0
				}else{
					item.is_select=1
				}
				this.update=false
				this.update=true	
			},
			//获取教辅名称列表
			open(){
				this.textbook_ids=[]
				this.$api.textbook({token:this.token,subject_id:this.subject_id,semester:this.semester}).then(res=>{
					console.log(res)
					if(res.code!=200){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					if(res.msg=='暂无相关教辅'){
						this.textbook_list=[]
						return
					}
					this.textbook_list=res.data.textbook_list
					// this.textbook_list.forEach((elem,i,arr)=>{
					// 	elem.status=false
					// })
					console.log(this.textbook_list)
					// this.$refs.popup.open()
				})  
			},
			// 点击确定添加教辅
			tochaxun(){
				console.log(this.textbook_list)
				var arr=this.textbook_list.map(function(elem,i,arr){
					return elem.is_select?elem.textbook_id:''
				})
				for(var i = 0;i<arr.length;i++){
				    if(arr[i]==''){
				        arr.splice(i,1);
				        i=i-1;
				    }
				}
				console.log('arr',arr)
				if(arr.length>3){
					uni.showToast({
						title:'最多可选择三本教辅',
						icon:'none'
					})
					return
				}
				if(arr.length>0){
					this.$api.add_my_textbook({token:this.token,textbook_ids:arr.toString(),subject_id:this.subject_id})
					.then(res=>{
						console.log(res)
						if(res.code==200){
							uni.navigateBack()
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
						
					})
					// uni.navigateTo({
					// 	url:`/pages/myteaching/contentReference?textbook_list=${JSON.stringify(arr)}&subject_id=${this.subject_id}`
					// })	
					this.$refs.popup.close()
				}else{
					uni.showToast({
						title:'请选择教辅',
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100vw;
		font-family:PingFang SC;
		background: #eee;
	}
	.container{
		width: 100%;
		padding: 125rpx 30rpx 100rpx;
		box-sizing: border-box;
	}
	.pickes{
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 99;
		padding: 0 25rpx;
		box-sizing: border-box;
		border-bottom: 1rpx solid #e7e7e7;
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
		background: #fff;
		height:100rpx;
		border-bottom: 1rpx solid #eee;
		padding:30rpx 60rpx;
		// margin:0 30rpx;
		display:flex;
		align-items:center;
		image{
			width: 100rpx;
			height: 100rpx;
			margin-right: 10rpx;
		}
		.title{
			width: 90%;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
				text:first-child{
					 color: #F8601C;
					 font-size: 30rpx;
				}
				text:last-child{
					font-size: 28rpx;
					color:#999
				}
		}
	}
	.mask{
		z-index: 999;
		width: 500rpx;
		// position: absolute;
		// left: 50%;
		// top:300rpx;
		// transform: translateX(-50%);
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
		margin-top: 30rpx;
		.s-item{
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
			}
		}
	}
	.btnConFix{
		position: fixed;
		bottom: 0;
		left:0;
		width: 100%;
		height:100rpx;
		background: #fff;
		border-top:1rpx solid #e7e7e7;
		z-index: 999;
		.btn{
			border: 1rpx solid #fff;
			width: 400rpx;
			height: 80rpx;
			line-height: 80rpx;
			color:#fff;
			font-size:28rpx;
			background-image:linear-gradient(left,#e50304 0%,#f74300 80%);
			margin: 10rpx auto;
			border-radius: 20rpx;
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
		color: #F8601C;
	}
	.s-item{
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		border:1rpx solid #eee;
		position: relative;
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom:25rpx;
		height:160rpx;
		border-radius:20rpx;
		>image{
			width: 120rpx;
			height: 100%;
			margin-right: 30rpx;
		}
		.infoCon{
			font-size:0;
			.bookname{
				color: #303030;
				font-size: 30rpx;
				// margin-bottom: 10rpx;
				width: 430rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.term{
				color: #9a9a9a;
				font-size: 20rpx;
				margin:2.5% 0;
			}
			.type{
				color: #e50304;
				border-radius: 20rpx;
				border:1rpx solid #e50304;
				font-size: 20rpx;
				padding: 2rpx 15rpx;
				display: inline-block;
			}
		}
		.default{
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 35rpx;
			height: 35rpx;
			background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/default_red.png) no-repeat center center;
			background-size: 100%;
		}
		.b-g{
			background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/gou.png) no-repeat center center;
			background-size: 100%;
		}
	}
</style>
