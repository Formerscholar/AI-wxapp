<template>
	<view>
		<view class="subtitle">
			{{ student_name }} <text>{{ team_name }}</text>
		</view>
		<view class="flex">
			<view class="timeTabCon">
				<view class="timeTab" @click="selectDate(i)" :class="{ tabActive: item.dateStaus }" v-for="(item, i) of dateList" :key="i">{{ item.time }}</view>
			</view>
			<view class="time">
				<picker mode="date" :value="time" @change="bindMultiPickerChange" :fields="it">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/rili.png" class="rili"></image>
					<view class="picker">{{ time }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" class="down"></image>
				</picker>
				-
				<picker mode="date" :value="time2" @change="bindMultiPickerChange2" :fields="it">
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/rili.png" class="rili"></image>
					<view class="picker">{{ time2 }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" class="down"></image>
				</picker>
			</view>
		</view>

		<view class="fenbu">
			<view class="blank"></view>
			<text>错题知识点分布图：</text>
		</view>
		<view class="qiun-charts" v-if="Pie.series && Pie.series.length != 0"><canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas></view>
		<view class="qiun-charts noData" v-else>{{ msg }}</view>

		<view class="hotTitle" v-if="exercises_list.length != 0">
			<view class="beforeLine"></view>
			<view class="hotTitleCon">
				<text>该学生收集的错题</text>
			</view>
			<view class="afterLine"></view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, i) of exercises_list" :key="i">
				<view class="" @click="jiexi(item.exercises_id)">
					<rich-text :nodes="changeStyle(item.content)"></rich-text>
					<!-- <uParse :content="item.content"/> -->
				</view>
				<view class="bottom" @click="open(item.exercises_id, 0)">
					<view class="select">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/tongLei.png" mode="" />
						同类型题目
					</view>
					<view class="btn" :class="{ 's-b': item.is_error }" v-if="update" @click.stop="join_error(i, item.exercises_id)">
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRuDefault.png" mode="" v-if="!item.is_error" />
						<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRu.png" mode="" v-else />
						{{ item.is_error ? '取消加入' : '加入试卷' }}
					</view>
				</view>
			</view>
			<view v-if="is_more == 0 && exercises_list.length != 0" class="is_more">没有更多错题了</view>
		</view>
		<!-- 同类型题目弹框 -->
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
								{{ item.is_error ? '取消加入' : '加入试卷' }}
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
import uCharts from '@/components/u-charts/u-charts.js/';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
var _self;
var canvaPie = null;
export default {
	components: { uniPopup },
	data() {
		return {
			type: '',
			pieData: [],
			cWidth: uni.upx2px(750),
			cHeight: uni.upx2px(500),
			pixelRatio: 1,
			serverData: '',
			token: '',
			error_count: 0,
			count_list: [],
			team_id: '',
			time: '2020-06-04',
			time2: '2020-06-04',
			dateList: [{ time: '近一周', dateStaus: true }, { time: '近一个月', dateStaus: false }, { time: '近一年', dateStaus: false }],
			it: 'day',
			msg: '该学生暂无错题!',
			Pie: { series: [] },
			student_name: '',
			team_name: '',
			user_id: '',
			exercises_id: '',
			exercises_list: [],
			exercises_count: 0,
			page_change: 1,
			size_change: 5,
			update: true,
			page: 1,
			is_more: 1,
			same_type: []
		};
	},
	onReachBottom() {
		if (this.is_more) {
			this.page++;
			this.get_hot_title();
		}
	},
	onLoad(options) {
		_self = this;
		console.log(options);
		this.student_name = options.student_name;
		this.team_name = options.team_name;
		this.user_id = options.user_id;
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		this.type = uni.getStorageSync('type');

		this.selectDate(0);
		this.get_baogao();
		this.get_hot_title();
	},
	methods: {
		changeStyle(item) {
			item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
			item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
			return item;
		},
		getDateRange(dateNow, intervalDays, bolPastTime) {
			let oneDayTime = 24 * 60 * 60 * 1000;
			let list = [];
			let lastDay;
			if (bolPastTime == true) {
				lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
				list.push(this.formateDate(lastDay));
				list.push(this.formateDate(dateNow));
			} else {
				lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime);
				list.push(this.formateDate(dateNow));
				list.push(this.formateDate(lastDay));
			}
			return list;
		},
		formateDate(time) {
			let year = time.getFullYear();
			let month = time.getMonth() + 1;
			let day = time.getDate();
			if (month < 10) {
				month = '0' + month;
			}
			if (day < 10) {
				day = '0' + day;
			}
			return year + '-' + month + '-' + day;
		},
		selectDate(i) {
			const date = new Date();

			this.dateList.forEach((e, j, arr) => {
				if (i == j) {
					e.dateStaus = true;
					if (i == 0) {
						this.it = 'day';
						let list1 = this.getDateRange(date, 6, true);
						this.time = list1[0];
						this.time2 = list1[1];
					} else if (i == 1) {
						this.it = 'day';
						let list2 = this.getDateRange(date, 30, true);
						this.time = list2[0];
						this.time2 = list2[1];
					} else {
						this.it = 'day';
						let list3 = this.getDateRange(date, 365, true);
						this.time = list3[0];
						this.time2 = list3[1];
					}
				} else {
					e.dateStaus = false;
				}
			});
			this.get_baogao();
			this.page = 1;
			this.exercises_list = [];
			this.get_hot_title();
		},
		get_baogao() {
			let _this = this;
			_this.$api
				.analysis_detail({
					token: _this.token,
					user_id: _this.user_id,
					start_time: _this.time,
					end_time: _this.time2
				})
				.then(res => {
					this.pieData = res.data.count_list;
					if (res.data.length !== undefined) {
						this.Pie.series = res.data;
					} else {
						this.Pie.series = [];
						this.pieData = [];
					}
					this.showPie('canvasPie', this.Pie);
				});
		},
		showPie(canvasId, chartData) {
			canvaPie = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'pie',
				fontSize: 11,
				legend: { show: true },
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio - uni.upx2px(200) * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						lableWidth: 15
					}
				}
			});
		},
		touchPie(e) {
			canvaPie.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},
		//获取时间日期
		bindMultiPickerChange: function(e) {
			// console.log('picker发送选择改变，携带值为', e.detail.value)
			console.log(e);
			this.time = e.detail.value;
			this.get_baogao();
			this.page = 1;
			this.exercises_list = [];
			this.get_hot_title();
		},
		bindMultiPickerChange2: function(e) {
			// console.log('picker发送选择改变，携带值为', e.detail.value)
			console.log(e);
			this.time2 = e.detail.value;
			this.get_baogao();
			this.page = 1;
			this.exercises_list = [];
			this.get_hot_title();
		},

		//换一批
		changeData() {
			this.page_change++;
			this.open();
		},
		//查看解析
		jiexi(id) {
			uni.navigateTo({
				// url:'/pages/person/ListStudents?name='+item.team_name+'&team_id='+item.team_id
				url: '/pages/knowledgeBase/watchExplane?id=' + id
			});
		},
		//获取热门易错题型
		get_hot_title() {
			let _this = this;
			_this.$api
				.hot_error_exercises({
					token: _this.token,
					user_id: _this.user_id,
					start_time: _this.time,
					end_time: _this.time2,
					page: _this.page,
					page_size: 5
				})
				.then(res => {
					if (res.code == 200) {
						console.log('res', res);
						_this.is_more = res.is_more;
						if (_this.page == 1) {
							_this.exercises_list = res.data;
						} else {
							_this.exercises_list = [..._this.exercises_list, ...res.data];
						}
					} else {
					}
				});
		},
		open(id) {
			this.exercises_id = id;
			let data = {
				token: this.token,
				exercises_id: id,
				page: this.page_change,
				size: this.size_change
			};
			let req = this.$api.teacher_same_type(data);
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
		hiddenmodal() {
			this.$refs.popup.close();
		},
		//加入错题
		join_error(i, id) {
			var req = this.$api.teacher_join_error({ token: this.token, exercises_id: id, is_vip: 1 });
			req.then(res => {
				if (res.code == 200) {
					if (this.exercises_list[i].is_error) {
						this.exercises_list[i].is_error = 0;
					} else {
						this.exercises_list[i].is_error = 1;
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
		join_error2(i, id) {
			var req = this.$api.teacher_join_error({
				token: this.token,
				exercises_id: id
				//is_vip:1
			});
			req.then(res => {
				if (res.code == 200) {
					if (this.same_type[i].is_error) {
						this.same_type[i].is_error = 0;
					} else {
						this.same_type[i].is_error = 1;
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
		}
	}
};
</script>

<style lang="scss">
page {
	background: #eee;
	font-family: PingFang SC;
}
.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	width: 96%;
	padding: 10upx 2%;
	flex-wrap: nowrap;
}
.qiun-title-dot-light {
	border-left: 10upx solid #0ea391;
	padding-left: 10upx;
	font-size: 32upx;
	color: #000000;
}
// .qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
// .charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.qiun-charts.noData {
	height: 500rpx;
	line-height: 500rpx;
	text-align: center;
	font-size: 26rpx;
	color: #686868;
}
.qiun-charts {
	height: auto;
	background-color: #ffffff;
	margin: 0 25rpx;
	padding-bottom: 20rpx;
	border-radius: 0 0 20rpx 20rpx;
	// display: flex;
	// flex-flow: row nowrap;
	// justify-content: space-between;
	.fenlei {
		color: #999;
		font-size: 28rpx;
		margin: 25rpx 0 25rpx 280rpx;
		text:first-child {
			display: inline-block;
			background: #e50304;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			margin-right: 10rpx;
			// font-size: 20rpx;
		}
	}
	.charts {
		height: 477upx;
		// height:400upx;
		background-color: #ffffff;
		margin: 0 auto;
	}
}

.subtitle {
	margin: 25rpx;
	font-size: 32rpx;
	text {
		color: #999999;
		font-size: 24rpx;
		margin-left: 10rpx;
	}
}

button::after {
	border: none;
}
.t-title {
	text-align: center;
	color: #f8601c;
	height: 80rpx;
	line-height: 80rpx;
}
.top {
	height: 100rpx;
	padding: 0 60rpx;
	font-size: 32rpx;
	line-height: 100rpx;
	// color:#888;
	color: #f8601c;
	background: #fff;
	border-bottom: 1rpx solid #eee;
	text {
		color: #f8601c;
	}
}

.c-title {
	margin-top: 20rpx;
	padding-left: 60rpx;
	height: 80rpx;
	border-bottom: 1rpx solid #eee;
	background-color: #fff;
	line-height: 80rpx;
	text:first-child {
		display: inline-block;
		height: 100%;
		font-size: 35rpx;
		font-weight: bold;
	}
	text:last-child {
		display: inline-block;
		height: 100%;
		color: #f8601c;
	}
}
.fenbu {
	padding: 30rpx 60rpx;
	background: #fff;
	margin: 0rpx 25rpx 0;
	border-radius: 20rpx 20rpx 0 0;
	.blank {
		width: 8rpx;
		height: 25rpx;
		background: #e50304;
		display: inline-block;
		margin: 0rpx 20rpx 0 -8rpx;
	}
	> text:first-child {
		font-size: 26rpx;
		color: #999;
	}
}
.btn {
	button {
		background: #f8601c;
		font-size: 24rpx;
		width: 150rpx;
		height: 50rpx;
		color: #fff;
		line-height: 50rpx;
		float: right;
		margin: 20rpx;
	}
}
.class {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 30rpx;
	color: #f8601c;
	view {
		border: 1rpx solid #b3b3b3;
		border-radius: 20rpx;
		font-size: 28rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin: 25rpx 10px 0 0;
		color: #303030;
		padding: 0 30rpx;
	}
}
.pie_chart {
	background: #fff;
}
.b-b {
	border: 1rpx solid #e50304 !important;
	color: #e50304 !important;
}

.flex {
	border: 1rpx solid #e8e8e8;
	// display: flex;
	// justify-content: space-between;
	// align-items: center;
	background: #fff;
	margin: 0rpx 25rpx 25rpx;
	border-radius: 20rpx;
	height: 215rpx;
	.timeTabCon {
		width: 640rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 50rpx;
		background: #f5f5f5;
		color: #303030;
		margin: 30rpx;
		.timeTab {
			width: 33.33%;
			height: 100%;
			text-align: center;
			display: inline-block;
		}
		.timeTab.tabActive {
			background: #e50304;
			color: #fff;
			border-radius: 50rpx;
		}
	}
	.time {
		picker:nth-last-of-type(1) {
			margin-left: 10rpx;
		}
		picker {
			position: relative;
			.rili {
				position: absolute;
				width: 30rpx;
				height: 30rpx;
				left: 30rpx;
				top: 50%;
				transform: translateY(-50%);
			}
			.down {
				position: absolute;
				width: 22rpx;
				height: 12rpx;
				right: 35rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		display: flex;
		align-items: center;
		margin: 30rpx;
		.picker {
			// border: 1rpx soid #666;
			width: 300rpx;
			height: 60rpx;
			background: #eee;
			color: #686868;
			font-size: 28rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 50rpx;
			margin: 0 15rpx 0 0;
		}
		.btn {
			color: #fff;
			background: #e50304;
			width: 100rpx;
			height: 80rpx;
			border-radius: 20rpx;
			font-size: 30rpx;
			text-align: center;
			line-height: 80rpx;
			margin-left: 20rpx;
		}
	}
}
.hotTitle {
	margin: 25rpx;
	position: relative;
	.beforeLine {
		width: 180rpx;
		height: 2rpx;
		background: #949292;
		position: absolute;
		top: 50%;
		left: 30rpx;
		transform: translateY(-50%);
	}
	.hotTitleCon {
		text-align: center;
		font-size: 32rpx;
		color: #303030;
		image {
			width: 28rpx;
			height: 30rpx;
			margin: 0 15rpx 0 0;
			vertical-align: middle;
		}
	}
	.afterLine {
		position: absolute;
		top: 50%;
		right: 30rpx;
		transform: translateY(-50%);
		width: 180rpx;
		height: 2rpx;
		background: #949292;
	}
}
.list {
	.item {
		padding: 30rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #fff;
		color: #999;
		margin: 25rpx;
		border-radius: 20rpx;
		border: 1rpx solid #f9f9f9;
		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			color: #666666;
			border-top: 1rpx solid #e9e9e9;
			padding-top: 15rpx;
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
}
</style>
