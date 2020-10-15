<template>
	<view>
		<!-- 名校资源（学生） -->
		<view class="list stu" v-if="type == 4">
			<view class="tabar" v-show="type == 4">
				<view class="item" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-if="subject_list.length != 1">
					<image :src="item.status ? item.icon1 : item.icon2"></image>
					<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
				</view>
				<view class="item item_special" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-else>
					<image :src="item.status ? item.icon1 : item.icon2"></image>
					<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
				</view>
			</view>
			<view class="l-item" v-for="(item, i) of student_list" :key="i" @click="chakan(item.paper_id, item.title, item.subject_id, item.subject_name)">
				<view class="num">
					<image :src="item.icon"></image>
					<view>
						<view class="paperTitle">{{ item.title }}</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
				<view class="right"><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" class="arrow"></image></view>
			</view>
			<view v-if="is_more2 == 0" class="is_more">没有更多试卷了</view>
		</view>
		<!-- 名校资源（老师） -->
		<view class="list" v-show="type == 3">
			<view class="l-item" v-for="(item, i) of xb_list" :key="i" @click="chakan(item.based_id, item.title, item.subject_id, item.subject_name)">
				<view class="num">
					<image :src="item.icon"></image>
					<view>
						<view class="paperTitle">{{ item.title }}</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
				<view class="right" @click.stop="generated(item.based_id)"><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/download_de.png" class="download"></image></view>
				<!-- <image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png' class='right'></image> -->
			</view>
			<view v-if="is_more == 0" class="is_more">没有更多试卷了</view>
		</view>

		<view class="kong" v-if="(student_list.length == 0 || !student_list) && type == 4">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
			<view>空空如也~</view>
			<view>您还没有名校资源哦!</view>
		</view>
		<view class="kong" v-if="(xb_list.length == 0 || !xb_list) && type == 3">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
			<view>空空如也~</view>
			<view>您还没有名校资源哦!</view>
		</view>
		<!-- 绑定邮箱 -->
		<uni-popup ref="popup2" type="center">
			<view class="mask2">
				<view class="">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/creatPaper.png" style="left:130rpx" />
					绑定邮箱
				</view>
				<view class="put">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/inputIcon.png" />
					<input type="text" @input="inputHandle" v-model="email" placeholder="输入邮箱" />
					<view class="text_tip" v-if="is_tip">
						<text v-for="(item, index) in email_arr" :key="index" :data-suffix="item" @click="texthandleClick">{{ email + item }}</text>
					</view>
				</view>
				<view class="btnCon">
					<button @click="cancelEmial()">取消</button>
					<button @click="fasong2()">绑定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
let app = getApp();
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uniPopup },
	data() {
		return {
			page: 1,
			is_more: 1, //老师
			type: 4,
			token: '',
			xb_list: [],
			student_list: [],
			is_more2: 1, //学生
			subject_list: [],
			subject_id: '',
			based_id: '',
			email: '',
			tpmid: '',
			is_tip: false,
			email_arr: []
		};
	},
	onReachBottom() {
		if (this.is_more && uni.getStorageSync('type') == 3) {
			this.page++;
			this.school_test_paper();
		}
		if (this.is_more2 && uni.getStorageSync('type') == 4) {
			this.page++;
			this.get_my_test_paper();
		}
	},
	onShow() {},
	onLoad() {
		this.email_arr = app.globalData.email;
		this.tpmid = app.globalData.settings.tmpid;
		console.log('this.tpmid', this.tpmid);

		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		this.type = uni.getStorageSync('type');
		if (this.type == 3) {
			this.school_test_paper();
		} else {
			this.subject_fenlei();
		}
	},
	methods: {
		texthandleClick(e) {
			this.email = this.email + e.currentTarget.dataset.suffix;
			this.is_tip = false;
		},
		inputHandle() {
			if (this.email.indexOf('@') != -1) {
				this.is_tip = false;
			} else {
				if (this.email == '') {
					this.is_tip = false;
				} else {
					this.is_tip = true;
				}
			}
		},
		//点击生成错题本/生成试卷
		generated(id) {
			let _this = this;
			_this.based_id = id;

			console.log('_this.tpmid', _this.tpmid);
			let arrTpmid = [];
			if (_this.type == 4) {
				arrTpmid = _this.tpmid.user_errorbook;
			} else {
				arrTpmid = _this.tpmid.teacher_paper;
				console.log('arrTpmid', arrTpmid);
			}
			uni.requestSubscribeMessage({
				tmplIds: arrTpmid,
				complete: function(res) {
					let data = {
						id: id,
						token: _this.token
					};
					_this.fasong();
					// let req=''
					// if(_this.type==3){
					// 	req=_this.$api.get_paper(data)
					// }
					// req.then(res=>{
					// 	if(res.code==200){

					// 	}else{
					// 		uni.showToast({
					// 			title:res.msg,
					// 			icon:'none'
					// 		})
					// 	}
					// })

					// _this.fasong()
				},
				success: function(res) {},
				fail: function(res) {}
			});
		},
		//发送邮箱
		fasong() {
			let data = {
				token: this.token,
				based_id: this.based_id,
				flag: 2
				// email:this.email
			};
			if (uni.getStorageSync('type') == 3) {
				this.$api.get_download_based(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.email = '';
						this.$refs.popup2.close();
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					} else {
						/* uni.showToast({
								title:res.msg,
								icon:'none'
							}) */
						this.$refs.popup2.open();
					}
				});
			}
		},
		cancelEmial() {
			this.$refs.popup2.close();
		},
		//绑定邮箱发送
		fasong2() {
			if (uni.getStorageSync('type') == 3) {
				this.$api
					.get_download_based({
						token: this.token,
						based_id: this.based_id,
						email: this.email,
						flag: 2
					})
					.then(res => {
						console.log(res);
						if (res.code == 200) {
							this.email = '';
							uni.showToast({
								title: '下载成功，已发送邮箱！',
								icon: 'none'
							});
						}
						this.$refs.popup2.close();
					});
			}
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
		//选择学科
		selection(i) {
			this.page = 1;
			this.student_list = [];
			//this.subject_id=19  //默认数学查询
			this.subject_list.forEach((e, j, arr) => {
				console.log(i);
				if (i == j) {
					e.status = true;
					this.subject_id = e.id;
					this.get_my_test_paper();
				} else {
					e.status = false;
				}
			});
		},
		//名校资源（学生）
		get_my_test_paper() {
			this.$api.newest_paper({ token: this.token, page: this.page, page_size: 10, subject_id: this.subject_id }).then(res => {
				console.log(res);
				if (res.code != 200) {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				}
				this.is_more2 = res.is_more;
				if (this.page == 1) {
					this.student_list = res.data.paper_list;
				} else {
					this.student_list = [...this.student_list, ...res.data.paper_list];
				}
			});
		},
		//名校资源（老师）
		school_test_paper() {
			this.$api.teacher_newest_paper({ token: this.token, page: this.page, page_size: 10 }).then(res => {
				console.log(res);
				this.is_more = res.is_more;
				if (res.code != 200) {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				}
				if (this.page == 1) {
					this.xb_list = res.data.school_based_list;
				} else {
					this.xb_list = [...this.xb_list, ...res.data.school_based_list];
				}
			});
		},
		chakan(id, title, subject, subject_name) {
			uni.navigateTo({
				url: '/pages/myPaper/seePapers?based_id=' + id + '&title=' + title + '&subject=' + subject + '&subject_name=' + subject_name
			});
		}
	}
};
</script>

<style lang="scss">
button::after {
	border: none;
}
page {
	width: 100vw;
	height: 100vh;
	background: #eee;
	font-family: PingFang SC;
}
.list.stu {
	padding-top: 150rpx;
	.tabar {
		height: 150rpx;
		padding: 30rpx;
		border-bottom: 1rpx solid #e7e7e7;
		box-sizing: border-box;
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 200;
	}
	/* .l-item:nth-of-type(1){
			margin-top:175rpx;
		} */
}
.c-c {
	color: #e50304;
}
.list {
	.l-item {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		border: 1rpx solid #e6e6e6;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		margin: 25rpx;
		background: #fff;
		.num {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			color: #a5a5a5;
			font-size: 26rpx;
			image {
				display: flex;
				margin: auto 0;
				vertical-align: middle;
				width: 50rpx;
				height: 50rpx;
			}
			> view {
				margin-left: 30rpx;
				.paperTitle {
					color: #303030;
					font-size: 32rpx;
					margin: 0 0 15rpx 0;
					width: 520rpx;
				}
			}
		}
		.right {
			padding: 40rpx 0;
			display: flex;
			margin: auto 0;
			.arrow {
				width: 14rpx;
				height: 26rpx;
			}
			.download {
				width: 40rpx;
				height: 50rpx;
			}
		}
	}
}
.kong {
	margin-top: 0;
	image {
		margin: 225rpx auto 50rpx;
		width: 196rpx;
		height: 237rpx;
	}
	view {
		text-align: center;
		font-size: 30rpx;
		line-height: 50rpx;
		color: #c4c5c6;
	}
}
.mask2 {
	z-index: 999;
	width: 500rpx;
	height: 300rpx;
	background: #fff;
	border-radius: 20rpx;
	padding-bottom: 30rpx;
	view:first-child {
		font-size: 32rpx;
		color: #000;
		width: 100%;
		text-align: center;
		margin-top: 80rpx;
		padding-top: 30rpx;
		position: relative;
		image {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: 35rpx;
			left: 105rpx;
		}
	}
	.put {
		margin-top: 30rpx;
		height: 60rpx;
		width: 430rpx;
		margin: 50rpx auto;
		border: 1rpx solid #e50304;
		border-radius: 20rpx;
		position: relative;
		input {
			height: 100%;
			width: 80%;
			margin: 0 0 0 75rpx;
			font-size: 24rpx;
			color: #c0c0c0;
			text-align: left;
		}
		image {
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			top: 15rpx;
			left: 30rpx;
		}
		.text_tip {
			width: 80%;
			position: absolute;
			left: 75rpx;
			top: 70rpx;
			font-size: 24rpx;
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
			z-index: 11;
			overflow: hidden;
			text {
				width: 100%;
				text-align: left;
				padding: 10rpx;
				margin-bottom: 5rpx;
				padding-left: 30rpx;
			}
		}
	}
	.btnCon {
		font-size: 0;
	}
	button:nth-of-type(1) {
		background: transparent;
		border: 1rpx solid #c0c0c0;
		color: #c0c0c0;
	}
	button {
		color: #ffffff;
		display: inline-block;
		width: 200rpx;
		height: 60rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
		border-radius: 20rpx;
		margin-left: 35rpx;
	}
}
</style>
