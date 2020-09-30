<template>
	<view>
		<view class="container">
			<view class="joinClassBg"></view>
			<view class="item firstItem">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/provice.png" class="icon" />
				<picker :range="Province" range-key="name" @change="bindPickerChange">
					<view class="select" :class="{ 'c-d': index == 0 }">{{ Province[index].name }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" class="down"></image>
				</picker>
			</view>
			<view class="item">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/city.png" class="icon" />
				<picker :range="city" range-key="name" @change="bindPickerChange1">
					<view class="select" :class="{ 'c-d': index1 == 0 }">{{ city[index1].name }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" class="down"></image>
				</picker>
			</view>
			<view class="item">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/area.png" class="icon" />
				<picker :range="area" range-key="name" @change="bindPickerChange2">
					<view class="select" :class="{ 'c-d': index2 == 0 }">{{ area[index2].name }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" class="down"></image>
				</picker>
			</view>
			<view class="item">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/school.png" class="icon" />
				<picker :range="school" range-key="name" @change="change">
					<view class="select school_name" :class="{ 'c-d': s_num == 0 }">{{ school[s_num].name }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" class="down"></image>
				</picker>
			</view>
			<view class="item" v-if="type == 4">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/subject.png" class="icon" />
				<picker :range="grade" range-key="name" @change="change4">
					<view class="select" :class="{ 'c-d': g_num == 0 }">{{ grade[g_num].name }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" class="down"></image>
				</picker>
			</view>
			<view class="item" v-if="type == 3">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/subject.png" class="icon" />
				<picker :range="subject" range-key="title" @change="changeSub">
					<view class="select" :class="{ 'c-d': s_num1 == 0 }">{{ subject[s_num1].title }}</view>
					<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/down.png" mode="" class="down"></image>
				</picker>
			</view>
			<view class="item">
				<image src="//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/name.png" class="icon" />
				<input type="text" placeholder="请输入姓名" v-model="name" placeholder-style="color:#dedede" />
			</view>
			<!-- <view class="item" v-if="type==4" >
				<image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/ID.png' class='icon'/>
				<input type="text" placeholder="请输入班级ID号(选填)" v-model="class_id"  placeholder-style="color:#dedede"/>
			</view> -->

			<!-- <view class="item">
				<input type="text" placeholder="请输入家长电话" v-model="phone" placeholder-style="color:#dedede"/>
			</view> -->
			<!-- <view class="item">
				<input type="text" placeholder="请输入邮箱" v-model="email" placeholder-style="color:#dedede"/>
			</view> -->
			<button class="btn" @click="tijiao()">绑定信息</button>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			Province: ['请选择省份'],
			city: [{ name: '请选择城市' }],
			area: [{ name: '请选择区' }],
			grade: [],
			school: [{ name: '请先选择学校' }],
			location: [],
			subject: [],
			index: 0,
			index1: 0,
			index2: 0,
			g_num: 0,
			s_num: 0,
			s_num1: 0,
			class_id: '',
			name: '',
			phone: '',
			email: '',
			type: 4,
			token: ''
		};
	},
	onLoad() {
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
		}
		if (uni.getStorageSync('type') == 3) {
			this.type = uni.getStorageSync('type');
		}
		this.get_location_list();
		this.get_grade();
		this.get_subject();
	},
	methods: {
		...mapMutations(['login', 'set_type']),
		tijiao() {
			if (this.s_num == 0) {
				uni.showToast({
					title: '请选择学校！',
					icon: 'none'
				});
				return;
			}
			if (this.type == 3) {
				if (this.s_num1 == 0) {
					uni.showToast({
						title: '请选择科目！',
						icon: 'none'
					});
					return;
				}

				let data = {
					province_id: this.Province[this.index].value,
					city_id: this.city[this.index1].value,
					area_id: this.area[this.index2].value,
					school_id: this.school[this.s_num].id,
					subject_id: this.subject[this.s_num1].id,
					true_name: this.name,
					mobile: uni.getStorageSync('mobile'),
					openid: uni.getStorageSync('openid'),
					nickName: uni.getStorageSync('info').nickName,
					avatar: uni.getStorageSync('info').avatarUrl,
					gender: uni.getStorageSync('info').gender,
					token: this.token
				};
				this.$api.teacher_bind_info(data).then(res => {
					console.log(res);
					if (res.code == 200) {
						this.login(res.data);
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}, 1000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			} else {
				if (this.g_num == 0) {
					uni.showToast({
						title: '请选择年级！',
						icon: 'none'
					});
					return;
				}
				let data = {
					province_id: this.Province[this.index].value,
					city_id: this.city[this.index1].value,
					area_id: this.area[this.index2].value,
					grade_ids: this.grade[this.g_num].grade_id,
					school_id: this.school[this.s_num].id,
					team_ids: this.class_id,
					true_name: this.name,
					parent_mobile: this.phone,
					email: this.email,
					token: uni.getStorageSync('userInfo').token,
					user_id: uni.getStorageSync('userInfo').user_id
				};
				console.log(data);
				this.$api.bind_info(data).then(res => {
					console.log(res);
					this.login(res.data);
					if (res.code == 200) {
						uni.setStorage({
							//缓存用户登陆状态
							key: 'userInfo',
							data: res.data
						});
						uni.setStorage({
							key: 'is_vip',
							data: res.data.is_vip
						});
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						setTimeout(() => {
							if (this.token) {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						}, 1000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			}
		},
		//获取学校
		getschool() {
			let data = {
				province_id: this.Province[this.index].value,
				city_id: this.city[this.index1].value,
				area_id: this.area[this.index2].value,
				token: this.token
			};
			this.$api.get_school(data).then(res => {
				console.log(res);
				if (res.data.length == 0) {
					this.school = [{ name: '该省市区没有学校' }];
				} else {
					this.school = [{ name: '请选择学校' }, ...res.data];
				}
			});
		},
		//获取班级
		get_grade() {
			if (uni.getStorageSync('type') == 4) {
				this.$api.get_grade({ token: this.token }).then(res => {
					console.log(res);
					this.grade = [{ name: '请选择年级' }, ...res.data.grade_list];
				});
			}
		},
		//获取学科
		get_subject() {
			if (uni.getStorageSync('type') == 3) {
				this.$api.subject({ token: this.token }).then(res => {
					console.log('科目', res.data);
					this.subject = [{ title: '请选择科目' }, ...res.data];
				});
			}
		},
		//获取省市区
		get_location_list() {
			this.$api.get_location_list({ token: this.token }).then(res => {
				console.log(res);
				this.location = res.data;
				this.Province = [{ name: '请选择省' }, ...res.data[0]];
			});
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			console.log(this.Province[e.target.value].value);
			this.city = [{ name: '请选择市' }];
			this.index1 = 0;
			this.area = [{ name: '请选择区' }];
			this.index2 = 0;
			let value = this.Province[e.target.value].value;
			this.index = e.target.value;
			let location2 = this.location[1];
			for (let key in location2) {
				if (location2[key].parent_id == value) {
					this.city.push(location2[key]);
				}
			}
		},
		bindPickerChange1: function(e) {
			this.area = [{ name: '请选择区' }];
			this.index2 = 0;
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index1 = e.target.value;
			console.log(this.city[e.target.value].value);
			let value = this.city[e.target.value].value;
			this.index1 = e.target.value;
			let location2 = this.location[2];
			for (let key in location2) {
				if (location2[key].parent_id == value) {
					this.area.push(location2[key]);
				}
			}
		},
		bindPickerChange2: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index2 = e.target.value;
			console.log(this.area[e.target.value].value);
			this.getschool();
		},
		//班级
		change4(e) {
			console.log(e);
			this.g_num = e.detail.value;
		},
		//学校
		change(e) {
			console.log(e);
			this.s_num = e.detail.value;
		},
		//科目
		changeSub(e) {
			console.log(e);
			this.s_num1 = e.detail.value;
		}
	}
};
</script>

<style lang="scss">
page {
	background: rgb(250, 250, 250);
	font-family: PingFang SC;
}
.y-bg {
	position: absolute;
	background-image: linear-gradient(left, #f6a136 0%, #f8b25a 100%);
	top: 0;
	left: 0;
	width: 100%;
	height: 200rpx;
	z-index: -1;
	border-bottom-right-radius: 100rpx;
	border-bottom-left-radius: 100rpx;
}
.container {
	background: #fff;
	width: 100vw;
	height: 100vh;
}
.item {
	width: 700rpx;
	height: 100rpx;
	line-height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid #efefef;
	border-radius: 8rpx;
	margin: 0 25rpx;
	position: relative;
	picker {
		height: 100%;
		width: 90%;
		padding-left: 65rpx;
		font-size: 28rpx;
		color: #333;
	}
	input {
		height: 100%;
		width: 90%;
		padding-left: 75rpx;
		font-size: 28rpx;
	}
	image.icon {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	}
	image.down {
		width: 22rpx;
		height: 12rpx;
		// margin-right: 30rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 30rpx;
		z-index: 0;
	}
	.school_name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
.firstItem {
	margin-top: 50rpx;
}
.btn {
	border: 1rpx solid #fff;
	width: 400rpx;
	font-size: 30rpx;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	color: #fff;
	background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
	margin: 50rpx auto 20rpx;
	border-radius: 20rpx;
}
.c-d {
	color: #343434;
}
.joinClassBg {
	width: 100%;
	height: 110rpx;
	background: url(//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/bindInfoBg.png) no-repeat top left;
	background-size: cover;
}
</style>
