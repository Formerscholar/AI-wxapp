<template>
	<view>
		<view class="touxiang">
			<view class="touxiangCon" @click="checkimg()">
				<image :src="img" mode=""></image>
				<view class="editIcon"><image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/editHead.png" /></view>
			</view>
		</view>

		<view class="edit">
			<view class="center" @click="set('姓名')">
				<text>姓名</text>
				<text class="infoCon">{{ user_info.true_name ? user_info.true_name : '' }}</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center">
				<text>性别</text>
				<picker mode="selector" :range="sex" range-key="name" @change="bindChange2" class="infoCon">
					<view class="picker">{{ user_info.school_list.gender == 0 ? '女' : '男' }}</view>
				</picker>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
				<!-- <text>{{user_info.school_list.gender==1?'男':'女'}}</text> -->
			</view>
			<view class="center">
				<text>地区</text>
				<text class="infoCon" v-if="user_info.school_list">
					{{ user_info.school_list.province_name + ' ' + user_info.school_list.city_name + ' ' + user_info.school_list.area_name }}
				</text>
				<!-- <picker mode="region" :range="location"  @change="bindChange" class='infoCon'>
					<view class="picker">{{user_info.school_list.province_name+' '+user_info.school_list.city_name+' '+user_info.school_list.area_name}}</view>
				</picker> -->
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center">
				<text>学校</text>
				<text class="infoCon">{{ user_info.school_list.school_name ? user_info.school_list.school_name : '' }}</text>
				<!-- <picker mode="selector" :range="school" range-key="name"  @change="changesc" class='infoCon'>
					<view class="picker">{{user_info.school_list.school_name}}</view>
				</picker> -->
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center" v-if="type == 4">
				<text>年级</text>
				<picker mode="selector" :range="grade" range-key="name" @change="changeGrade" class="infoCon" v-if="!user_info.school_list.team_name">
					<view class="picker">{{ user_info.school_list.grade_names ? user_info.school_list.grade_names : '' }}</view>
				</picker>
				<text class="infoCon" v-else>{{ user_info.school_list.grade_names ? user_info.school_list.grade_names : '' }}</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center" v-if="type == 4" @click="touser('/pages/person/bindClassID')">
				<text>(班级)绑定</text>
				<text class="infoCon">{{ user_info.school_list.team_name ? user_info.school_list.team_name : '' }}</text>
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
		</view>
		<view class="center youxiang" @click="touser('/pages/login/changePassword')" :class="type == 3 ? 'teacherEmial' : ''">
			<text>邮箱</text>
			<text v-if="!user_info.email"></text>
			<text v-else="user_info.email">{{ user_info.email }}</text>
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
		</view>
		<view class="center youxiang phone" v-if="type == 3" @click="touser('/pages/setting/setphone')">
			<text>手机号</text>
			<text class="infoCon">{{ user_info.display_list.mobile }}</text>
			<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			img: '',
			user_info: {},
			token: '',
			location: [],
			sex: [{ name: '男', id: 1 }, { name: '女', id: 0 }],
			update: true,
			grade: [],
			school: [],
			type: ''
		};
	},
	onLoad() {
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
			this.type = uni.getStorageSync('type');
		}
		this.type = uni.getStorageSync('type');
		this.get_grade();
		this.getuserinfo();
		this.get_location_list();
	},
	onShow() {
		if (this.update) {
			this.getuserinfo();
		} else {
			this.update = true;
		}
	},
	methods: {
		checkimg() {
			this.update = false;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择
				success: res => {
					let _this = this;
					console.log(res.tempFilePaths);
					_this.img = res.tempFilePaths[0];
					let url = '';
					if (_this.type == 4) {
						url = _this.$api.url + 'user/update_avatar/';
					} else {
						url = _this.$api.url + 'teacher/update_avatar/';
					}
					uni.uploadFile({
						url: url,
						filePath: _this.img,
						name: 'file',
						formData: {
							token: _this.token
						},
						success: res => {
							console.log('返回', res.data);
						}
					});
				}
			});
		},
		//跳转邮箱
		touser(url) {
			console.log(url);
			// var url=e.currentTarget.dataset.url
			uni.navigateTo({
				url: url
			});
		},
		//获取省市区
		get_location_list() {
			this.$api.get_location_list({ token: this.token }).then(res => {
				console.log(res);
				this.location = res.data;
			});
		},
		//获取学校
		getschool() {
			let data = {
				province_id: this.user_info.school_list.province_id,
				city_id: this.user_info.school_list.city_id,
				area_id: this.user_info.school_list.area_id,
				token: this.token
			};
			this.$api.get_school(data).then(res => {
				console.log(res);
				if (res.data.length == 0) {
					this.school = [{ name: '该省市区没有学校' }];
				} else {
					this.school = res.data;
				}
			});
		},
		//获取年级
		get_grade() {
			this.$api.get_grade({ token: this.token }).then(res => {
				console.log(res);
				this.grade = res.data.grade_list;
			});
		},
		//获取用户信息
		getuserinfo() {
			if (uni.getStorageSync('type') == 4) {
				this.$api.get_user_info({ token: this.token }).then(res => {
					console.log(res);
					this.user_info = res.data;
					this.img = res.data.avatar;
					this.getschool();
				});
			} else {
				this.$api.get_teacher_info({ token: this.token }).then(res => {
					console.log(res);
					this.user_info = res.data;
					this.img = res.data.avatar;
					this.getschool();
				});
			}
		},
		//修改年级
		changeGrade(e) {
			if (uni.getStorageSync('type') == 4) {
				var req = this.$api.change_grade({ token: this.token, grade_ids: this.grade[e.detail.value].grade_id });
			} else {
				var req = this.$api.change_teacher_info({ token: this.token, grade_ids: this.grade[e.detail.value].grade_id });
			}
			req.then(res => {
				console.log(res);
				if (res.code != 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				this.getuserinfo();
			});
		},
		//修改学校
		changesc(e) {
			if (uni.getStorageSync('type') == 4) {
				var req = this.$api.change_user_info({ token: this.token, school_id: this.school[e.detail.value].id });
			} else {
				var req = this.$api.change_teacher_info({ token: this.token, school_id: this.school[e.detail.value].id });
			}
			req.then(res => {
				console.log(res);
				if (res.code != 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				this.getuserinfo();
			});
		},
		bindChange(e) {
			console.log(e);
			var code = e.detail.code;
			if (uni.getStorageSync('type') == 4) {
				var req = this.$api.change_user_info({ token: this.token, region: code.toString() });
			} else {
				var req = this.$api.change_teacher_info({ token: this.token, region: code.toString() });
			}
			req.then(res => {
				console.log(res);
				this.getuserinfo();
			});
		},
		bindChange2(e) {
			console.log(e);
			var id = this.sex[e.detail.value].id;
			if (uni.getStorageSync('type') == 4) {
				var req = this.$api.change_user_info({ token: this.token, gender: id });
			} else {
				var req = this.$api.change_teacher_info({ token: this.token, gender: id });
			}
			req.then(res => {
				this.getuserinfo();
			});
		},
		set(t) {
			if (uni.getStorageSync('type') == 4) {
				uni.navigateTo({
					url: '/pages/person/setUser?title=' + t
				});
			} else {
				uni.navigateTo({
					url: '/pages/person/setUser?title=' + t
				});
			}
		}
	}
};
</script>

<style lang="scss">
page {
	font-family: PingFang SC;
	background: #eee;
}
.touxiang {
	width: 100%;
	height: 500rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/editBg.png) no-repeat center center;
	background-size: cover;
	z-index: -1;
	.touxiangCon {
		position: relative;
		margin-top: -150rpx;
		> image {
			width: 155rpx;
			height: 155rpx;
			border: 5rpx solid #fff;
			margin: 0 auto;
			border-radius: 50%;
		}
		.editIcon {
			position: absolute;
			bottom: 0;
			right: 0;
			background: #fff;
			width: 55rpx;
			height: 55rpx;
			border-radius: 50%;
			line-height: 55rpx;
			text-align: center;
			image {
				width: 31rpx;
				height: 25rpx;
			}
		}
	}
}
.edit {
	background: #fff;
	margin: -150rpx 30rpx 30rpx;
	border: 1px solid #e6e6e6;
	border-radius: 20rpx;
}
.center {
	margin: 0 30rpx 0 30rpx;
	padding: 0 30rpx 0 0rpx;
	height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 28rpx;
	color: #888;
	position: relative;
	> text:first-child {
		color: #666666;
	}
	.infoCon {
		margin-right: 15rpx;
	}
	image {
		width: 14rpx;
		height: 27rpx;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
}
.youxiang.center {
	background: #fff;
	margin: 30rpx;
	border: 1px solid #e6e6e6;
	border-radius: 20rpx;
	padding: 0 30rpx;
	text {
		margin-right: 30rpx;
	}
	image {
		right: 30rpx;
	}
}
.teacherEmial {
	border-bottom: none !important;
	margin-bottom: 0 !important;
	border-radius: 20rpx 20rpx 0 0 !important;
}
.youxiang.center.phone {
	border-top: none;
	margin-top: 0;
	border-radius: 0 0 20rpx 20rpx;
}
.picker {
	height: 80rpx;
	// width: 300rpx;
	text-align: right;
	line-height: 80rpx;
	white-space: nowrap;
}
</style>
