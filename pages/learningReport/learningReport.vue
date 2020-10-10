<template>
	<view>
		<!-- <view class="t-title">
			{{class_name}}同学
		</view> -->
		<view class="tabar">
			<view class="item" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-if="subject_list.length != 1">
				<image :src="item.status ? item.icon1 : item.icon2"></image>
				<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
			</view>
			<view class="item item_special" @click="selection(i)" v-for="(item, i) of subject_list" :key="i" v-else>
				<image :src="item.status ? item.icon1 : item.icon2"></image>
				<text :class="{ 'c-c': item.status }">{{ item.title }}</text>
			</view>
		</view>

		<view class="flex">
			<!-- <view class="top">
				学科
			</view> -->
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
				<!-- <view class="btn" @click="get_baogao()">
					查询
				</view> -->
			</view>
		</view>

		<!-- <view class="c-title">
			<text>错题数量：</text><text>你有{{error_count}}道错题</text>
		</view> -->
		<view class="fenbu">
			<view class="blank"></view>
			<text>错题知识点分布图：</text>
		</view>
		<!--<view class="pie_chart">
			<piechart  v-if='update' :key='key'  ref="pieChart0" :dataAs="pieData" canvasId="index_pie_1" />
		</view> -->

		<view class="qiun-charts" v-if="Pie.series && Pie.series.length != 0">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			<!-- <view class="fenlei" v-for="(item,i) of pieData" :key='i'>
				<text></text>
				<text>{{item.name}}</text>
			</view> -->
		</view>
		<view class="qiun-charts noData" v-else>{{ msg }}</view>
	</view>
</template>

<script>
import PieChart from '@/components/stan-ucharts/PieChart.vue';
import uCharts from '@/components/u-charts/u-charts.js/';
var _self;
var canvaPie = null;

export default {
	data() {
		return {
			update: true,
			pieData: [],
			cWidth: uni.upx2px(750),
			cHeight: uni.upx2px(500),
			pixelRatio: 1,
			serverData: '',
			token: '',
			exercises_list: [], //习题列表
			subject_list: [],
			subject_id: 1,
			error_count: 0,
			key: 1,
			class_name: '',
			time: '',
			time2: '',
			dateList: [{ time: '近一周', dateStaus: true }, { time: '近一个月', dateStaus: false }, { time: '近一年', dateStaus: false }],
			it: 'day',
			msg: '该科目暂无错题!',
			Pie: { series: [] }
		};
	},
	onLoad() {
		_self = this;
		this.class_name = uni.getStorageSync('userInfo').school.grade_name + uni.getStorageSync('userInfo').true_name;
		this.selectDate(0);
	},
	onShow() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		this.subject_fenlei();
	},
	methods: {
		changeStyle(item) {
			item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
			item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
			return item;
		},
		//学科分类
		subject_fenlei() {
			this.$api.subject().then(res => {
				console.log(res);
				var list = res.data;
				list.forEach(function(elem, i, arr) {
					elem.status = false;
				});
				this.subject_list = list;
				this.selection(0);
				console.log(this.subject_list);
			});
		},
		//获取学情报告
		get_baogao() {
			this.$api
				.my_study_analysis({
					token: this.token,
					subject_id: this.subject_id,
					start_time: this.time,
					end_time: this.time2
				})
				.then(res => {
					if (res.data.length !== undefined) {
						this.Pie.series = res.data;
						this.pieData = res.data.count_list;
					} else {
						this.Pie.series = [];
						this.pieData = [];
					}
					this.showPie('canvasPie', this.Pie);
				});
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
		},
		selection(i) {
			let _this = this;
			_this.subject_id = _this.subject_list[i].id;
			_this.subject_list.forEach((e, j, arr) => {
				if (i == j) {
					e.status = true;
				} else {
					e.status = false;
				}
			});
			_this.get_baogao();
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
		bindMultiPickerChange: function(e) {
			this.time = e.detail.value;
			this.get_baogao();
		},
		bindMultiPickerChange2: function(e) {
			this.time2 = e.detail.value;
			this.get_baogao();
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
	margin: 0 30rpx;
	padding-bottom: 20rpx;
	border-radius: 0 0 30rpx 30rpx;
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
		background-color: #ffffff;
		margin: 0 auto;
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

.tabar {
	height: 100rpx;
	padding: 30rpx;
	border-bottom: 1rpx solid #e7e7e7;
	margin-bottom: 25rpx;
}
.c-title {
	margin: 20rpx 30rpx 0;
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
	margin: 20rpx 30rpx 0;
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
.pie_chart {
	background: #fff;
}
.c-c {
	color: #e50304 !important ;
}
.flex {
	border: 1rpx solid #e8e8e8;
	// display: flex;
	// justify-content: space-between;
	// align-items: center;
	background: #fff;
	margin: 0 30rpx;
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
			border-radius: 30rpx;
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
		height: 1rpx;
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
		height: 1rpx;
		background: #949292;
	}
}
</style>
