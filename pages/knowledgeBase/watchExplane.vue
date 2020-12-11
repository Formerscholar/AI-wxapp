<template>
	<view>
		<view class="subtitle" v-if="jiexiList.subject_title && jiexiList.grade_name">{{ jiexiList.subject_title }} · {{ jiexiList.grade_name }}</view>
		<view class="con">
			<view class="content">
				<rich-text :nodes="changeStyle(jiexiList.content ? jiexiList.content : '')"></rich-text>

				<view class="bottom" @click="open(jiexiList.id, 0)">
					<view class="select">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/tongLei.png" mode="" />
						同类型题目
					</view>
					<view class="btn" :class="{ 's-b': jiexiList.is_error }" v-if="update" @click.stop="join_error(i, jiexiList.id)">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRuDefault.png" mode="" v-if="!jiexiList.is_error" />
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRu.png" mode="" v-else />
						{{ jiexiList.is_error ? '取消加入' : type == 3 ? '加入试卷' : '加入错题' }}
					</view>
				</view>
			</view>

			<view v-if="jiexiList.answer && is_vip == 1 && type == 4" class="daAn">
				<view class="tag">答案</view>
				<view class="context"><rich-text :nodes="changeStyle(jiexiList.answer ? jiexiList.answer : '')"></rich-text></view>
			</view>
			<view v-if="jiexiList.analysis && is_vip == 1 && type == 4" class="jieXi">
				<view class="tag">解析</view>
				<view class="context"><rich-text :nodes="changeStyle(jiexiList.analysis ? jiexiList.analysis : '')"></rich-text></view>
			</view>

			<view v-if="jiexiList.answer && type == 3" class="daAn">
				<view class="tag">答案</view>
				<view class="context"><rich-text :nodes="changeStyle(jiexiList.answer ? jiexiList.answer : '')"></rich-text></view>
			</view>
			<view v-if="jiexiList.analysis && type == 3" class="jieXi">
				<view class="tag">解析</view>
				<view class="context"><rich-text :nodes="changeStyle(jiexiList.analysis ? jiexiList.analysis : '')"></rich-text></view>
			</view>

			<view v-if="jiexiList.know_point_info" class="knowPoint">
				<view class="tag">知识点</view>
				<view class="context"><rich-text :nodes="changeStyle(jiexiList.know_point_info ? jiexiList.know_point_info : '')"></rich-text></view>
			</view>
		</view>

		<!-- <view class="kong"  v-if="errorbook_list.length==0||!errorbook_list">
			<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png'/>
			<view>空空如也~</view>
			<view>您还还有创建试卷哦!</view>
		</view> -->
		<uni-popup ref="popup" type="center">
			<view class="leixing">
				<view class="title">
					<view class="sameType">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/sameType.png"></image>
						同类型题目
					</view>
					<view class="change" @click="changeData()">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/change.png"></image>
						换一批
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="list" v-for="(item, i) of same_type" :key="i">
						<view class="">
							<rich-text :nodes="changeStyle(item.content)"></rich-text>
							<!-- <uParse :content="item.content"/> -->
						</view>
						<view class="btnCon">
							<view @click="jiexi(item.exercises_id)">
								<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiexi.png"></image>
								查看解析
							</view>
							<view :class="{ 's-b': item.is_error }" v-if="update" @click="join_error2(i, item.exercises_id)">
								<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRuDefault.png" mode="" v-if="!item.is_error" />
								<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRu.png" mode="" v-else />
								{{ item.is_error ? '取消加入' : type == 3 ? '加入试卷' : '加入错题' }}
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="button">
					<button @click="hiddenmodal">取消</button>
					<button @click="hiddenmodal">确认</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			jiexiList: {},
			is_vip: '',
			type: '',
			update: true,
			same_type: ''
		};
	},
	onLoad(options) {
		this.id = options.id;
		this.token = uni.getStorageSync('token');
	},
	onShow() {
		this.get_exercise_analysis();
		if (uni.getStorageSync('is_vip')) {
			this.is_vip = uni.getStorageSync('is_vip');
		}
		this.type = uni.getStorageSync('type');
	},
	methods: {
		jiexi(id) {
			uni.navigateTo({
				// url:'/pages/person/ListStudents?name='+item.team_name+'&team_id='+item.team_id
				url: '/pages/knowledgeBase/watchExplane?id=' + id
			});
		},
		join_error2(i, id) {
			if (uni.getStorageSync('type') == 3) {
				var req = this.$api.teacher_join_error({
					token: this.token,
					exercises_id: id
					// subject_id:this.subject_id,
					// know_point:this.know_point_list[this.num_z].know_point_id,
					// type:this.question_id,
					//is_vip:1
				});
			} else {
				var req = this.$api.join_error({
					token: this.token,
					exercises_id: id,
					// subject_id:this.subject_id,
					// know_point:this.know_point_list[this.num_z].know_point_id,
					// type:this.question_id,
					is_vip: 1
				});
			}

			req.then(res => {
				if (res.code == 200) {
					if (this.same_type[i].is_error) {
						this.same_type[i].is_error = 0;
					} else {
						this.same_type[i].is_error = 1;
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				this.update = false;
				this.update = true;
			});
		},
		changeData() {
			this.page_change++;
			this.open(this.exercises_id, 0);
		},
		join_error(i, id) {
			if (uni.getStorageSync('type') == 3) {
				var req = this.$api.teacher_join_error({ token: this.token, exercises_id: id, is_vip: 1 });
			} else {
				var req = this.$api.join_error({ token: this.token, exercises_id: id, is_vip: 1 });
			}
			req.then(res => {
				if (res.code == 200) {
					console.log(this.jiexiList, this.jiexiList.is_error, 'agufhiu时代光华');
					if (this.jiexiList.is_error) {
						this.jiexiList.is_error = 0;
					} else {
						this.jiexiList.is_error = 1;
					}
					if (this.type == 4) {
						if (res.msg == '取消成功！') {
							// this.jiexiList.status=false
							return true;
						} else if (res.msg == '加入成功') {
							// this.jiexiList.status=true
							this.open(id, 1);
						}
					}
				} else {
					/* uni.showToast({
							title:res.msg,
							icon:'none'
						}) */
				}

				this.update = false;
				this.update = true;
			});
		},
		hiddenmodal() {
			this.$refs.popup.close();
		},
		open(id, status) {
			this.exercises_id = id;
			let data = {
				token: this.token,
				//know_point:this.know_point_list[this.num_z].know_point_id,
				type: this.question_id,
				subject_id: this.subject_id,
				exercises_id: id,
				page: this.page_change,
				size: this.size_change
			};
			//consle.log('data2',this.know_point_list[this.num_z].know_point_id)
			if (this.type == 3) {
				var req = this.$api.teacher_same_type(data);
			} else {
					var req = this.$api.same_type(data);
				// if (this.is_vip == 1) {
				// } else {
				// 	// var req=this.$api.same_type(data)

				// 	//1是不要提示 0是要提示
				// 	if (status != 1) {
				// 		uni.showToast({
				// 			title: '非会员用户不可查看同类型题目',
				// 			icon: 'none'
				// 		});
				// 		return;
				// 	} else {
				// 		return;
				// 	}
				// }
			}
			req.then(res => {
				console.log(res);
				if (res.code == 200) {
					this.same_type = res.data.exercises_list;
					this.$refs.popup.open();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
			// this.$refs.popup.open()
		},
		changeStyle(item) {
			item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
			item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
			return item;
		},
		get_exercise_analysis() {
			this.$api.get_exercise_analysis({ id: this.id, user_type: uni.getStorageSync('type') }).then(res => {
				if (res.code == 200) {
					this.jiexiList = res.data;
					console.log('watchExplane', res.data);
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	//font-family:PingFang SC;
	background: #eee;
}
.subtitle {
	margin: 25rpx;
	font-size: 32rpx;
}
.con {
	> view {
		margin: 25rpx;
		background: #fff;
		border: 1rpx solid #e6e6e6;
		border-radius: 20rpx;
		padding: 60rpx 30rpx 30rpx;
		box-sizing: border-box;
		position: relative;
		.tag {
			font-size: 30rpx;
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			color: #fff;
			position: absolute;
			top: 0;
			left: 0;
			background-size: cover;
			border-radius: 20rpx 0 30rpx 0;
			padding: 5rpx 15rpx;
		}
		.context {
			margin-top: 30rpx;
			font-size: 30rpx;
			color: #878787;
		}
	}
	.content {
		padding: 30rpx;
		margin-top: 95rpx;
		overflow: hidden;
		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #666666;
			border-top: 1rpx solid #f5f5f5;
			padding: 15rpx 0 0;
			margin-top: 30rpx;
			.select {
				image {
					width: 35rpx;
					height: 35rpx;
					vertical-align: middle;
					margin: 0 15rpx 0 0;
				}
			}
			.btn {
				image {
					width: 35rpx;
					height: 35rpx;
					vertical-align: middle;
					margin: 0 15rpx 0 0;
				}
				border-radius: 8rpx;
				padding: 10rpx 0rpx;
			}
		}
	}
	.daAn {
		.context {
			font-weight: bold;
			color: #595656;
		}
		.tag {
			background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/daAnBg.png) no-repeat top right;
		}
	}
	.jieXi {
		.tag {
			background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/jixiBg.png) no-repeat top right;
		}
	}
	.knowPoint {
		margin-bottom: 50rpx;
		.tag {
			background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/kPointBg.png) no-repeat top right;
		}
		.context {
			display: inline-block;
			border: 1rpx solid #cccccc;
			border-radius: 20rpx;
			padding: 5rpx 20rpx;
		}
	}
	.content {
		margin: 25rpx;
		background: #fff;
		border-radius: 20rpx;
		width: 700rpx;
		padding: 25rpx;
		box-sizing: border-box;
	}
}
.kong {
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
</style>
