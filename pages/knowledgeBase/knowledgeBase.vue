<template>
	<view>
		<!-- <view class="" v-if="false">
			<view class="select">
				<view class="xueke" >
					<view>学科</view>
					<text :class="{'s-b':item.subject_id==subject_id}" v-for="(item,i) of subject_list" :key='i' @click="select_xk(item.id)">{{item.title}}</text>
				</view>
			</view>

			<view class="jiaocai">
				<view class="left">
					<text>年级</text>
					<picker  :range="grade" range-key="name" @change="select_g">
						<view class="value">{{grade[num_g].name}}</view>
					</picker>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/xiala.png" mode=""></image>
				</view>		
				<view class="right left">
					<text>知识点</text>
					<picker  :range="know_point_list" range-key="title" @change="select_z">
						<view class="value" style="overflow: hidden;
						text-overflow: ellipsis;white-space: nowrap;">
						{{ know_point_list[num_z].title?know_point_list[num_z].title:'暂无' }}</view>
					</picker>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/xiala.png" mode=""></image>
				</view>
			</view>
			
			<view class="select">
				<view class="xueke">
					<view>难度</view>
					<text :class="{'s-b':item.id==level_id}" @click="select_n(item.id)" v-for="(item,i) of level_list" :key='i'>{{item.title}}</text>
				</view>
			</view>
			
			<view class="select m-t">
				<view class="xueke">
					<view>题型</view>
					<scroll-view scroll-x="true" >
						<text class="picker" :class="{'s-b':item.id==question_id}" @click="select_t(item.id)" v-for="(item,i) of question_type" :key='i'>{{item.title}}</text>
					</scroll-view>	
				</view>
			</view>
		</view> -->

		<!-- picker start -->
		<view class="pickes">
			<picker :range="subject_list" range-key="title" @change="select_s" v-if="type == 4 && subject_list">
				<view class="value">
					{{ subject_list[num_s].title ? subject_list[num_s].title : '学科' }}
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/xiala.png" mode=""></image>
				</view>
			</picker>
			<picker :range="know_point_list" range-key="title" @change="select_z" v-if="know_point_list">
				<view class="value">
					{{ know_point_list[num_z].title ? know_point_list[num_z].title : '知识点' }}
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/xiala.png" mode=""></image>
				</view>
			</picker>
			<picker :range="level_list" range-key="title" @change="select_l" v-if="level_list">
				<view class="value">
					{{ level_list[num_l].title ? level_list[num_l].title : '难度' }}
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/xiala.png" mode=""></image>
				</view>
			</picker>
			<picker :range="question_type" range-key="title" @change="select_ty" v-if="question_type">
				<view class="value">
					{{ question_type[num_t].title ? question_type[num_t].title : '题型' }}
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/xiala.png" mode=""></image>
				</view>
			</picker>
		</view>
		<!--picker end -->

		<!-- start -->
		<view class="list" style="padding: 70rpx 0 0;">
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
						{{ item.is_error ? '取消加入' : type == 3 ? '加入试卷' : '加入错题' }}
					</view>
				</view>
			</view>
			<view v-if="is_more == 0" class="is_more">没有更多{{ type == 3 ? '试卷' : '错题' }}了</view>
		</view>
		<!-- end -->

		<!-- start -->
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
		<!-- end -->

		<!-- <view class="zt" v-show="leixing" @click="hiddenmodal"></view> -->
	</view>
</template>

<script>
import uParse from '@/components/u-parse/u-parse.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: { uParse, uniPopup },
	data() {
		return {
			banben: [],
			know_point_list: [],
			num_b: 0, //版本选择
			num_z: 0, //知识点选择
			num_g: 0, //班级选择
			num_s: 0, //学科选择
			num_t: 0, //题型选择
			num_l: 0, //难度选择
			leixing: false, //同类型题目是否显示
			level_list: [], //难度列表
			subject_list: [], //学科列表
			version_list: [], //教材版本
			question_type: [], //题型
			subject_id: 19, //选中的学科id
			question_id: 0, //选中的题型id
			level_id: 0, //难度id
			token: '',
			update: true,
			page: 1,
			is_more: 1,
			same_type: [],
			type: 4,
			exercises_list: [],
			grade: [],
			page_change: 1,
			size_change: 5,
			exercises_id: '',
			is_vip: ''
		};
	},
	onReachBottom() {
		console.log(this.is_more);
		if (this.is_more) {
			this.page++;
			if (this.page != 1) {
				this.exercise_selection();
			}
		}
	},
	onShow() {
		this.type = uni.getStorageSync('type');
		this.page_change = 1;
		if (uni.getStorageSync('is_vip')) {
			this.is_vip = uni.getStorageSync('is_vip');
		}
	},
	onLoad() {
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		this.subject_fenlei();
		// this.exercise_type()
		this.get_level();
		this.get_grade();
	},
	methods: {
		changeStyle(item) {
			item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
			item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
			return item;
		},
		//换一批
		changeData() {
			this.page_change++;
			this.open(this.exercises_id, 0);
		},
		//查看解析
		jiexi(id) {
			uni.navigateTo({
				// url:'/pages/person/ListStudents?name='+item.team_name+'&team_id='+item.team_id
				url: '/pages/knowledgeBase/watchExplane?id=' + id
			});
		},
		//获取班级
		get_grade() {
			this.$api.get_grade({ token: this.token }).then(res => {
				console.log(res);
				this.grade = res.data.grade_list;
				this.exercise_selection();
			});
		},
		rn(str) {
			if (str.length > 4) {
				return str.splice(0, 3) + '...';
			} else {
				return str;
			}
		},
		//学科分类
		subject_fenlei() {
			this.$api.subject({ token: this.token }).then(res => {
				var list = res.data;
				list.forEach(function(elem, i, arr) {
					elem.status = false;
				});
				this.subject_list = list;
				// this.select_xk(this.subject_list[0].subject_id)
				this.exercise_type();
				this.get_konw();
				// this.select_s()
				console.log(this.subject_list);
			});
		},
		//教辅版本列表
		version() {
			// this.get_konw()
			this.$api.version().then(res => {
				console.log(res);
				if (res.code != 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
				}
				this.version_list = [{ title: '版本', id: 0 }, ...res.data.version_list];
				this.exercise_selection();
			});
		},
		//知识点
		get_konw() {
			if (this.subject_id == 1) return false;
			if (uni.getStorageSync('type') == 3) {
				var req = this.$api.teacher_know_point({ token: this.token });
			} else {
				var req = this.$api.know_point({ subject_id: this.subject_id, token: this.token });
			}
			req.then(res => {
				console.log(res);
				if (res.code != 200) {
					this.know_point_list = [];
					this.exercises_list = [];
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
				} else {
					this.know_point_list = [{ title: '知识点', id: 0 }, ...res.data.know_point_list];
					console.log('this.know_point_list3433', this.know_point_list);
				}
				this.exercise_selection();
			});
		},
		//习题难度
		get_level() {
			this.$api.level().then(res => {
				console.log(res);
				this.level_list = [{ title: '难度', id: 0 }, ...res.data];
			});
		},
		//题型
		exercise_type() {
			this.$api.exercise_type({ subject_id: this.subject_id }).then(res => {
				console.log('题型列表1', res);
				this.question_type = [{ title: '题型', id: 0 }, ...res.data];
			});
		},
		//筛选习题
		exercise_selection() {
			console.log('123', this.know_point_list);
			console.log('this.know_point_list[this.num_z]', this.know_point_list[this.num_z].id);
			if (uni.getStorageSync('type') == 3) {
				let data = {
					token: this.token,
					// version_id:this.version_list[this.num_b].version_id,
					type: this.question_id,
					level: this.level_id,
					grade_id: this.grade[this.num_g].grade_id,
					know_point: this.know_point_list[this.num_z].id,
					page: this.page
				};
				var req = this.$api.teacher_textbook_exercises(data);
			} else {
				let data = {
					token: this.token,
					subject_id: this.subject_id,
					// version_id:this.version_list[this.num_b].version_id,
					type: this.question_id,
					level: this.level_id,
					grade_id: this.grade[this.num_g].grade_id,
					know_point: this.know_point_list[this.num_z].id,
					page: this.page
				};
				var req = this.$api.textbook_exercises(data);
			}
			req.then(res => {
				this.is_more = res.is_more;
				if (res.code != 200) {
					this.exercises_list = [];
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
				} else {
					if (this.page == 1) {
						this.exercises_list = res.data.exercises_list;
						console.log('000', this.exercises_list);
					} else {
						this.exercises_list = [...this.exercises_list, ...res.data.exercises_list];
						console.log('789', this.exercises_list);
					}
				}
			});
		},
		//加入错题
		join_error(i, id) {
			if (uni.getStorageSync('type') == 3) {
				var req = this.$api.teacher_join_error({ token: this.token, exercises_id: id, is_vip: 1 });
			} else {
				var req = this.$api.join_error({ token: this.token, exercises_id: id, is_vip: 1 });
			}
			req.then(res => {
				if (res.code == 200) {
					if (this.exercises_list[i].is_error) {
						this.exercises_list[i].is_error = 0;
					} else {
						this.exercises_list[i].is_error = 1;
					}
					if (this.type == 4) {
						if (res.msg == '取消成功！') {
							// this.exercises_list[i].status=false
							return true;
						} else if (res.msg == '加入成功') {
							// this.exercises_list[i].status=true
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
		select_s(e) {
			this.num_b = 0;
			this.num_z = 0;
			console.log('e', e);
			if (e == undefined) {
				this.num_s = 0;
			} else {
				this.num_s = e.detail.value;
			}

			this.is_more = 1;
			this.page = 1;
			this.subject_id = this.subject_list[this.num_s].id;
			this.get_konw();
			this.exercise_type();
		},
		// //选择学科
		// select_xk(id){
		// 	this.num_b=0
		// 	this.num_z=0
		// 	this.is_more=1
		// 	this.page=1
		// 	this.subject_id=id
		// 	// this.version()
		// 	this.get_konw()
		// 	// this.exercise_selection()
		// },
		// //选择教材版本
		// select_b(e){
		// 	this.is_more=1
		// 	this.page=1
		// 	console.log(e)
		// 	this.num_b=e.detail.value
		// 	this.exercise_selection()
		// },
		select_g(e) {
			this.is_more = 1;
			this.page = 1;
			console.log(e);
			this.num_g = e.detail.value;
			this.exercise_selection();
		},
		//选择知识点
		select_z(e) {
			this.is_more = 1;
			this.page = 1;
			console.log(e);
			this.num_z = e.detail.value;
			this.exercise_selection();
		},
		//选择题型2
		select_ty(e) {
			this.is_more = 1;
			this.page = 1;
			this.num_t = e.detail.value;
			this.question_id = this.question_type[e.detail.value].id;
			this.exercise_selection();
		},
		// //选择题型
		// select_t(id){
		// 	this.page=1
		// 	this.question_id=id
		// 	this.exercise_selection()
		// },
		select_l(e) {
			this.is_more = 1;
			this.page = 1;
			this.num_l = e.detail.value;
			this.level_id = this.level_list[e.detail.value].id;
			this.exercise_selection();
		},
		// //选择难度
		// select_n(id){
		// 	this.is_more=1
		// 	this.page=1
		// 	this.level_id=id
		// 	this.exercise_selection()
		// },
		toStr(str) {
			if (str.length > 5) {
				return str.splice(0, 5);
			} else {
				return str;
			}
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
				if (this.is_vip == 1) {
					var req = this.$api.same_type(data);
				} else {
					// var req=this.$api.same_type(data)

					//1是不要提示 0是要提示
					if (status != 1) {
						uni.showToast({
							title: '非会员用户不可查看同类型题目',
							icon: 'none'
						});
						return;
					} else {
						return;
					}
				}
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
		hiddenmodal() {
			this.$refs.popup.close();
		}
	}
};
</script>

<style lang="scss">
page {
	//font-family:PingFang SC;
	background: #eee;
}
button::after {
	border: none;
}
/* .m-t{
		margin-bottom:20rpx ;
	}
	.xueke{
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 30rpx;
		scroll-view{
			white-space: nowrap;
			width: 80%;
		}
		.picker{
			margin-right: 20rpx;
			width: auto;
			padding: 0 20rpx;
		}
		view{
			width: 120rpx;
			color:#f75e1b ;
			font-size: 30rpx;
			text-align: justify;
			text-align-last:justify ;
			margin-right: 10rpx;
		}
		text{
			font-size: 24rpx;
			display: inline-block;
			width: 100rpx;
			color: #f75e1b;
			border: 1rpx solid #f75e1b;		
			// margin-right: 20rpx;
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 10rpx;
			text-align: center;
		}
	}
	
	.jiaocai{
		background: #fff;
		padding: 10rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #f75e1b;
		font-size: 30rpx;
			.left{
				display: flex;
				align-items: center;
				position: relative;
				text{
					text-align: justify;
					text-align-last: justify;
					width: 120rpx;
					display: inline-block;
					margin-right: 20rpx;
				}
				picker{
					.value{
						border: 1rpx solid #f75e1b;
						border-radius: 8rpx;
						padding: 0 20rpx;
						width: 140rpx;
						height: 40rpx;
						font-size: 24rpx;
						line-height: 40rpx;
					}
				}
				image{
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					right: 10rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
	} */

.item {
	padding: 30rpx 30rpx 0;
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
		border-top: 1rpx solid #f9f9f9;
		padding: 15rpx 0 15rpx;
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
			padding: 10rpx 30rpx;
		}
	}
}
/* img .latex{
		height:10px;
	}
	.kfformula{
		height: 10px;
	} */
.leixing {
	z-index: 999;
	width: 650rpx;
	background: #fff;
	padding: 30rpx;
	box-sizing: border-box;
	border-radius: 20rpx;
	.title {
		text-align: center;
		color: #e50304;
		font-size: 34rpx;
		padding: 0 0 30rpx 0;
		border-bottom: 1rpx solid #e6e6e6;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		margin-bottom: 30rpx;
		.sameType {
			color: #4c4c4c;
			font-weight: bold;
		}
		image {
			width: 36rpx;
			height: 36rpx;
			vertical-align: middle;
			margin-right: 20rpx;
		}
	}
	scroll-view {
		width: 100%;
		height: 500rpx;
		.list {
			z-index: 999;
			overflow: hidden;
			button {
				float: right;
				margin: 20rpx;
				color: #f8601c;
				border-radius: 8rpx;
				padding: 0;
				background: #fff;
				width: 159rpx;
				font-size: 20rpx;
			}
		}
		.btnCon {
			text-align: center;
			color: #666666;
			font-size: 30rpx;
			padding: 30rpx 0 30rpx 0;
			border-bottom: 1rpx solid #e6e6e6;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			margin-bottom: 30rpx;
			image {
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}
		.list:nth-last-of-type(1) {
			.btnCon {
				border-bottom: none;
			}
		}
	}

	.button {
		display: flex;
		justify-content: center;
		border-top: 1rpx solid #e6e6e6;
		button {
			margin: 30rpx 30rpx 0 0;
			font-size: 24rpx;
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #fff;
			background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
		}
		button:nth-of-type(1) {
			border: 1rpx solid #e7e7e7;
			color: #b4b4b4;
			background: none;
		}
	}
}
.zt {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: #666;
	opacity: 0.5;
	z-index: 99;
}
.s-b {
	// background-image:linear-gradient(left,#e50304 0%,#f74300 80%) !important;
	// color:#fff !important;
}
.pickes {
	height: 70rpx;
	line-height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	position: fixed;
	background: #fff;
	border-bottom: 1rpx solid #e7e7e7;
	z-index: 99;
	picker {
		width: 25%;
	}
	.value {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		position: relative;
		color: #4c4c4c;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		image {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 13rpx;
			height: 11rpx;
			margin: 0 0 0 8rpx;
		}
	}
}
</style>
