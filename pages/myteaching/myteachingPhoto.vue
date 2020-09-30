<template>
	<view>
		<view class="tabar" v-if="from == 1">
			<view class="item" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-if="subject_list.length != 1">
				<image :src="item.status ? item.icon1 : item.icon2"></image>
				<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
			</view>
			<view class="item item_special" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-else>
				<image :src="item.status ? item.icon1 : item.icon2"></image>
				<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
			</view>
		</view>
		<view class="name">{{ subtitle }}</view>
		<view class="list" v-if="from == 1">
			<view class="teachingCon" v-if="textbook_list.length != 0">
				<view class="card" @click="chooseTeaching(i)" v-for="(item, i) of textbook_list" :key="i">
					<image :src="item.icon" mode="" class="subject"></image>
					<view class="title">
						<view>{{ item.textbook_name }}</view>
						<view class="term">{{ item.semester }}学期</view>
						<view class="version">{{ item.version_title }}</view>
					</view>
					<image
						:src="item.status ? '//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/gou.png' : '//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/default_red.png'"
						mode=""
						class="detail"
					></image>
				</view>
			</view>
			<view class="nomore" v-if="textbook_list.length == 0 || !textbook_list">当前学科没有教辅！</view>
		</view>
		<view class="list listAttr" v-if="from == 2">
			<view class="card">
				<image :src="obj.icon" mode="" class="subject"></image>
				<view class="title">
					<view>{{ obj.textbook_name }}</view>
					<view class="term">{{ obj.semester }}学期</view>
					<view class="version">{{ obj.version_title }}</view>
				</view>
			</view>
		</view>

		<view class="name">页码</view>
		<view class="pickes">
			<view>当前页码</view>
			<picker :range="numArr" :value="index" @change="select_l">
				<view class="value" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
					{{ tpage ? (numArr[index] ? numArr[index] : '第1页') : '第1页' }}
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
				</view>
			</picker>
		</view>
		<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/photo.png" class="photo attr" @click="checkimg()" v-if="from == 1"></image>
		<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/photo.png" class="photo" @click="checkimg()" v-if="from == 2"></image>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			page: 1,
			choosePage: 1,
			is_more: 1,
			token: '',
			img: [],
			textbook_id: '',
			pic: '',
			obj: {},
			numArr: [],
			index: 0,
			subtitle: '',
			from: null,
			subject_list: [],
			subject_id: '',
			type: 4,
			textbook_list: [],
			tpage: '',
			title: '',
			subject_name: '',
			flag: true
		};
	},
	onReachBottom() {
		if (this.is_more) {
			this.page++;
			console.log('my_textbook_list1');
			this.my_textbook_list();
		}
	},
	onShow() {},
	onLoad(option) {
		this.subject_fenlei();
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		console.log('option', option);
		this.from = option.from;
		if (this.from == 1) {
			//首页拍照识题
			this.subtitle = '教辅';
			let _this = this;
			setTimeout(function() {
				_this.chooseTeaching(0);
			}, 1000);
		} else if (this.from == 2) {
			//我的教辅详情
			this.subtitle = '当前教辅';
			this.obj = JSON.parse(option.obj);
			this.textbook_id = this.obj.textbook_id;
			this.tpage = this.obj.tpage;
			this.subject_name = option.subject_name;
			console.log('this.obj', this.obj);
			console.log('this.obj.tpage', this.obj.tpage);
			//this.sumPage(5)
			if (!this.obj.tpage) {
				this.tpage = 1;
				this.numArr = ['第1页'];
			}
			this.sumPage(this.obj.tpage);
		}
	},
	methods: {
		//选中每一个教辅
		chooseTeaching(i) {
			let _this = this;
			_this.tpage = 1;
			_this.index = 0;
			_this.textbook_list.forEach((elem, j, arr) => {
				elem.status = false;
				if (i == j) {
					_this.tpage = elem.tpage;
					_this.textbook_id = elem.textbook_id;
					_this.title = elem.textbook_name;
					_this.textbook_list[i].status = true;
				}
			});
			//this.sumPage(5)
			_this.sumPage(_this.tpage);
		},
		//页码总页数
		sumPage(it) {
			if (it) {
				this.numArr = [];
				for (let i = 0; i < it; i++) {
					this.numArr.push('第' + (i + 1) + '页');
				}
			}
			return this.numArr;
		},
		//学科分类
		subject_fenlei() {
			this.$api.subject().then(res => {
				console.log('list', res.data);
				var list = res.data;
				list.forEach(function(elem, i, arr) {
					elem.status = false;
				});
				this.subject_list = list;
				this.selection(0); //默认数学状态
			});
		},
		//切换学科
		selection(i) {
			this.page = 1;
			this.numArr = ['第1页'];
			this.student_list = [];
			this.subject_id = 19; //默认数学查询
			this.subject_list.forEach((e, j, arr) => {
				console.log(i);
				if (i == j) {
					e.status = true;
					this.subject_id = e.id;
					this.subject_name = e.title;
					this.my_textbook_list();
				} else {
					e.status = false;
				}
			});
		},
		//教辅列表详情
		my_textbook_list() {
			this.$api.my_textbook_list({ token: this.token, type: this.type, subject_id: this.subject_id, page: this.page, page_size: 10 }).then(res => {
				if (res.code == 200) {
					this.is_more = res.is_more;
					if (this.page == 1) {
						this.textbook_list = res.data;
					} else {
						this.textbook_list = [...this.textbook_list, ...res.data];
					}
					console.log('this.textbook_list', this.textbook_list);
				} else {
					if (res.code == 500) {
						this.textbook_list = [];
					}
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				}
			});
			let _this = this;
			setTimeout(function() {
				_this.chooseTeaching(0);
			}, 1000);
		},
		//挑选页码
		select_l(e) {
			console.log('e.detail.value', e.detail.value);
			this.index = e.detail.value;
			this.choosePage = this.numArr[this.index];
		},
		//上传图片
		checkimg() {
			if (this.textbook_id) {
				// this.update=false
				let _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: res => {
						console.log(res.tempFilePaths);
						_this.img = res.tempFilePaths[0];
						let url = _this.$api.url + 'main/upload_pic';
						uni.uploadFile({
							url: url,
							filePath: _this.img,
							name: 'file',
							formData: {
								token: _this.token,
								path: 'search'
							},
							success: res => {
								_this.pic = res.data;
								console.log('返回', res.data);
								if (this.from == 2) {
									this.title = this.obj.textbook_name;
								}
								// _this.search_exercises()
								uni.navigateTo({
									url:
										'/pages/myteaching/myteachingPhoto_result?pic=' +
										_this.pic +
										'&textbook_id=' +
										_this.textbook_id +
										'&choosePage=' +
										_this.choosePage +
										'&title=' +
										_this.title +
										'&subject_name=' +
										_this.subject_name
								});
								/* if(_this.from==1){
										_this.textbook_id=''
										_this.tpage=1
										_this.numArr=['第1页']
									}
									_this.index=0 */
							},
							error: function(e) {
								/* if(_this.from==1){
										_this.textbook_id=''
										_this.tpage=1
										_this.numArr=['第1页']
									}
									_this.index=0 */
							}
						});
					},
					fail: e => {
						console.log(e);
						/* if(_this.from==1){
								_this.textbook_id=''
								_this.tpage=1
								_this.numArr=['第1页']
							}
							_this.index=0 */
					}
				});
			} else {
				uni.showToast({
					title: '请先选择相应的教辅',
					icon: 'none'
				});
				return;
			}
		}
		//获取题目数据
		/* search_exercises(){
				console.log(this.textbook_id)
				this.$api.search_exercises({textbook_id:this.textbook_id,page:this.choosePage,pic:this.pic,token:this.token})
				.then(res=>{
					console.log('res',res)
					uni.navigateTo({
						url:'/pages/myPaper/seePapers?status=photo&listData='+encodeURIComponent(JSON.stringify(res.data))+'&title='+this.title+'&subject_name='+this.subject_name
					})
				})
			} */
	}
};
</script>

<style lang="scss">
page {
	width: 100vw;
	font-family: PingFang SC;
	background: #eee;
}
.name {
	height: 28rpx;
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #333333;
	margin: 24rpx;
}
.teachingCon {
	border: 1rpx solid #e7e7e7;
	border-radius: 20rpx;
	margin: 0 24rpx;
	background: #fff;
	.card:nth-of-type(1) {
		border-radius: 20rpx 20rpx 0 0;
	}
	.card:nth-last-of-type(1) {
		border-radius: 0 0 20rpx 20rpx;
	}
}
.listAttr {
	margin: 0 25rpx;
	.card {
		border-radius: 20rpx;
		border: 1rpx solid #e7e7e7;
	}
}
.card {
	height: 180rpx;
	padding: 30rpx 0;
	margin: 0 30rpx;
	box-sizing: border-box;
	position: relative;
	background: #fff;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	border-bottom: 1px solid #e5e5e5;
	&:last-child {
		border-bottom: none;
	}
	image.subject {
		width: 99rpx;
		height: 120rpx;
		margin: 0 30rpx 0 0;
		vertical-align: middle;
	}
	.title {
		font-size: 0;
		view {
			color: #9a9a9a;
			font-size: 20rpx;
		}
		view:nth-of-type(1) {
			color: #666666;
			font-size: 30rpx;
			width: 430rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.term {
			margin: 2.5% 0;
		}
		.version {
			font-size: 20rpx;
			color: #e50304;
			border: 1rpx solid #e50304;
			border-radius: 20rpx;
			text-align: center;
			padding: 2rpx 15rpx;
			display: inline-block;
		}
	}
	image.detail {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		top: 50%;
		right: 35rpx;
		transform: translateY(-50%);
	}
}
.nomore {
	margin: 25rpx 30rpx;
	background: #fff;
	border: 1rpx solid #e7e7e7;
	height: 100rpx;
	line-height: 100rpx;
	border-radius: 20rpx;
	text-align: center;
	color: #999;
	font-size: 24rpx;
}
.pickes {
	height: 86rpx;
	margin: 0 24rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	box-sizing: border-box;
	background: #fff;
	border-radius: 20rpx;
	border: 1rpx solid #e7e7e7;
	.value {
		border-radius: 20rpx;
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
		color: #808080;
		font-size: 28rpx;
		font-weight: 500;
		text-align: center;
		image {
			position: absolute;
			top: 50%;
			right: 10rpx;
			transform: translateY(-50%);
			width: 12rpx;
			height: 22rpx;
		}
	}
}
.photo {
	width: 232rpx;
	height: 232rpx;
	display: flex;
	margin: 26rpx auto;
}

.tabar {
	height: 142rpx;
	padding: 30rpx;
	border-bottom: 1rpx solid #e7e7e7;
	box-sizing: border-box;
}
.c-c {
	color: #e50304;
}
</style>
