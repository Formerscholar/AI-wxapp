<template>
	<view>
		<!-- 学生(校本试卷) -->
		<view class="list stu" v-show="type == 4">
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
			<view class="l-item" v-for="(item, i) of student_list" :key="i" @click="chakan(item.paper_id, item.title, item.subject_id, item.subject_name)">
				<view class="num">
					<image :src="item.icon"></image>
					<view>
						<view class="paperTitle">{{ item.title }}</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" class="right"></image>
			</view>
			<view v-if="is_more2 == 0" class="is_more">没有更多试卷了</view>
		</view>
		<!-- 老师（校本试卷） -->
		<view class="list" v-show="type == 3">
			<view class="l-item" v-for="(item, i) of xb_list" :key="i" @click="chakan(item.based_id, item.title, item.subject_id, item.subject_name)">
				<view class="num">
					<image :src="item.icon"></image>
					<view>
						<view class="paperTitle">{{ item.title }}</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" class="right"></image>
			</view>
			<view v-if="is_more == 0" class="is_more">没有更多试卷了</view>
		</view>

		<view class="kong" v-if="(student_list.length == 0 || !student_list) && type == 4">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
			<view>空空如也~</view>
			<view>本校暂未上传试卷!</view>
		</view>
		<view class="kong" v-if="(xb_list.length == 0 || !xb_list) && type == 3">
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
			<view>空空如也~</view>
			<view>您还没有校本试卷哦!</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			is_more: 1, //老师
			type: 4,
			xb_list: [],
			student_list: [],
			is_more2: 1, //学生
			subject_list: [],
			subject_id: ''
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
	onLoad() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		if (uni.getStorageSync('type') == 3) {
			this.type = uni.getStorageSync('type');
			uni.setNavigationBarTitle({
				title: '校本试卷'
			});
			this.school_test_paper();
		} else {
			this.subject_fenlei();
			// this.get_my_test_paper()
		}
	},
	methods: {
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
		//校本试卷（学生）
		get_my_test_paper() {
			this.$api.my_test_paper({ token: this.token, page: this.page, subject_id: this.subject_id }).then(res => {
				console.log(res);
				if (res.code != 200) {
					// uni.showToast({
					// 	title:res.msg,
					// 	icon:'none'
					// })
				}
				this.is_more2 = res.is_more;
				if (this.page == 1) {
					this.student_list = res.data.paper_list;
				} else {
					this.student_list = [...this.student_list, ...res.data.paper_list];
				}
			});
		},
		//校本试卷（老师）
		school_test_paper() {
			this.$api.school_test_paper({ token: this.token, page: this.page }).then(res => {
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
			width: 14rpx;
			height: 26rpx;
			display: flex;
			margin: auto 0;
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
</style>
