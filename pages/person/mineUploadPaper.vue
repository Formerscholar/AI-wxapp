<template>
	<view>
		<view class='top'>
			<view v-for='(item,i) of subtitleArr' :class='{active:item.active}' @click="changeTitle(i)" :key='i'>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class='formCon' v-show='flag'>
			<view class='inputInfo'>
				<view>
					<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/tianxie.png'></image>
					<input type="text" v-model="value1" placeholder="填写试卷名称" placeholder-style="color:#e7e7e7"/>
				</view>
				<view>
					<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/beizhu.png'></image>
					<input type="text" v-model="value2" placeholder="备注:" placeholder-style="color:#e7e7e7"/>
				</view>
			</view>
			<view class="picInfo">
				<view v-for='(item,i) of imgSrc' class='picView' :key='i'>
					<image class='delete' src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/deletePic.png' @click="deleteImg(i)"></image>
					<image :src='item' class='pics'></image>
				</view>
				<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/uploadPics.png' class='uploadPics' @click="checkimg()"></image>
			</view>
			<view class='btn' @click="save()">保存</view>
		</view>
		<view class='paperRecord' v-show='!flag'>
			<view :class="{'recordList':recordList.length!=0}" v-if='recordList.length!=0'>
				<view class="item" v-for='(item,i) of recordList' :key='i'>
					<view>
						<view class='recordTitle'>{{item.paper_name}}</view>
						<view class='recordTime'>{{item.add_time}}</view>
					</view>
					<view class='status' v-if='item.status==1'>待审核</view>
					<view class='status' v-if='item.status==2' style='color:green'>通过</view>
					<view class='status' v-if='item.status==3' style='color:#e50304;'>未通过</view>
				</view>
			</view>
			<view v-if='is_more==0' class='is_more'>
				没有更多试卷记录了
			</view>
			<view class="kong" v-if='recordList.length==0||!recordList'>
				<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png'/>
				<view>空空如也~</view>
				<view>您还没有试卷记录哦!</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				subtitleArr:[{'title':'上传试卷','active':true},{'title':'试卷记录','active':false}],
				token:'',
				imgSrc:[],
				value1:'',
				value2:'',
				flag:true,
				recordList:[],
				page:1,
				is_more:1,
				picData:''
			};
		},
		onReachBottom() {
			if(this.is_more){
				this.page++
				this.getRecordList()
			}
		},
		onLoad(options){
			if(uni.getStorageSync('userInfo').token){
				this.token=uni.getStorageSync('userInfo').token
			}
			console.log('options',options)
			if(options.id==1){
				this.changeTitle(0)
			}
			if(options.id==2){
				this.changeTitle(1)
			}
		},
		methods:{
			upPaper:function(){
				this.flag=true
				this.changeTitle(0)
			},
			deleteImg:function(i){
				console.log(i)
				this.imgSrc.splice(i,1);
			},
			changeTitle:function(i){
				let _this=this
				_this.subtitleArr.forEach((e,j,arr)=>{
					if(i==j){
						e.active = true
						_this.flag = false
						if(i==1){
							_this.getRecordList()
						}
					}else{
						e.active = false
						_this.flag = true
					}
				})
			},
			getRecordList:function(){
				let _this=this
				_this.$api.my_upload_list({token:_this.token,page:_this.page,page_size:10}).then(res=>{
					console.log(res)
					
					_this.is_more=res.is_more
					// _this.recordList=res.data
					if(_this.page==1){
						_this.recordList=res.data
					}else{
						_this.recordList=[..._this.recordList,...res.data]
					}
					console.log('recordList',_this.recordList)
				}) 
			},
			checkimg(){
				this.update=false
				if(this.imgSrc.length<=8){
					let _this=this
					uni.chooseImage({
						count: 9-_this.imgSrc.length, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册选择
						success:  (res)=> {
							for(let i=0;i<res.tempFilePaths.length;i++){
								uni.uploadFile({
									url: _this.$api.url+'main/upload_pic',
									filePath: res.tempFilePaths[i],
									name:'file',
									formData: {
										'token': this.token,
										'path':'paper'
									},
									success:(res)=>{
										_this.picData=res.data
										console.log('_this.picData',_this.picData)
										_this.imgSrc.push(_this.picData)
										console.log('_this.imgSrc',_this.imgSrc)
									}
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:'已超过上传图片数量的上限',
						icon:'none'
					})
				}
			},
			save:function(){
				let _this=this
				if(_this.value1==''){
					uni.showToast({
						title:'请填写试卷名称',
						icon:'none'
					})
					return
				}
				if(_this.imgSrc.length==0){
					uni.showToast({
						title:'请选择要上传的试卷图片',
						icon:'none'
					})
					return
				}
				_this.$api.teacher_add_point({token:_this.token,remark:_this.value2,title:_this.value1,pics:_this.imgSrc}).then(res=>{
					console.log(res)
					if(res.code!=200){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					_this.value2=''
					_this.value1=''
					_this.imgSrc=[]
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
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
	.top{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		border-bottom:1rpx solid #e6e6e6;
		background:#fff;
		position: fixed;
		top:0;
		left:0;
		z-index: 999;
		.active{
			color: #e50304;
			position: relative;
			&::after{
				content:'';
				position: absolute;
				width:80rpx;
				height:8rpx;
				background: #e50304;
				border-radius: 15rpx;
				bottom: 0;
				left:50%;
				transform: translateX(-50%);
			}
		}
	}
	.formCon{
		margin: 95rpx 0 50rpx;
		.inputInfo{
			margin: 25rpx;
			background: #fff;
			border:1rpx solid #e6e6e6;
			padding:0 30rpx;
			box-sizing:border-box;
			width: 700rpx;
			border-radius: 20rpx;
			>view{
				height:90rpx;
				line-height: 90rpx;
				position: relative;
				image{
					position: absolute;
					left:0;
					width:30rpx;
					height:30rpx;
					vertical-align: center;
					top:50%;
					transform: translateY(-50%);
				}
				input{
					color:#cdcdcd;
					font-size: 26rpx;
					font-size: 26rpx;
					padding: 25rpx 55rpx;
				}
			}
			>view:nth-of-type(1){
				border-bottom:1rpx solid #e6e6e6;
			}
		}
		.picInfo{
			margin: 25rpx 25rpx 50rpx;
			background: #fff;
			border:1rpx solid #e6e6e6;
			padding:0 20rpx 30rpx;
			box-sizing:border-box;
			width: 700rpx;
			border-radius: 20rpx;
			.picView{
				width: 143rpx;
				height:143rpx;
				position:relative;
				margin:30rpx 20rpx 0 0;
				display: inline-block;
				.pics{
					width:100%;
					height:100%;
					vertical-align: middle;
				}
			}
			.uploadPics{
				width: 143rpx;
				height:143rpx;
				vertical-align: middle;
				margin:30rpx 20rpx 0 0;
			}
			.delete{
				width:29rpx;
				height:29rpx;
				position: absolute;
				top:-10rpx;
				right: -10rpx;
				z-index:999;
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
	.recordList{
		background: #fff;
		width: 700rpx;
		margin: 25rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		border:1rpx solid #e7e7e7;
		margin-top: 95rpx;
		.item{
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			color:#828282;
			font-size: 26rpx;
			border-bottom: 1rpx solid #e7e7e7;
			padding-bottom: 20rpx;
			margin-bottom:20rpx;
			.recordTitle{
				color:#4e4e4e;
				// font-weight: bold;
				font-size: 30rpx;
				margin-bottom: 10rpx;
			}
			.recordTime{
				
			}
			.status{
				font-size: 26rpx;
				display: flex;
				margin: auto 0;
			}
		}
		.item:nth-last-of-type(1){
			padding-bottom: 0;
			margin-bottom:0;
			border-bottom: none;
		}
	}
	.kong{
		margin-top: 0;
		image{
			margin: 300rpx auto 50rpx;
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
