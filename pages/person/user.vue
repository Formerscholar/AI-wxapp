<template>
	<view>
		<view class="touxiang">
			<view class="touxiangCon" @click="checkimg()">
				<image :src="img" mode=""></image>
				<view class="editIcon">
					<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/editHead.png" />
				</view>
			</view>
		</view>

		<view class="edit">
			<view class="center" @click="set('姓名')">
				<text>姓名</text>
				<text class="infoCon">{{ user_info.true_name ? user_info.true_name : '' }}</text>
				<image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center">
				<text>性别</text>
				<picker mode="selector" :range="sex" range-key="name" @change="bindChange2" class="infoCon">
					<view class="picker">{{ user_info.gender == 1 ? '男' : '女' }}</view>
				</picker>
				<image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
				<!-- <text>{{user_info.school_list.gender==1?'男':'女'}}</text> -->
			</view>
			<view class="center">
				<text>地区</text>
				<text class="infoCon" v-if="user_info.get_province">
					{{ user_info.get_province.name + ' ' + user_info.get_city.name + ' ' + user_info.get_area.name }}
				</text>
				<!-- <picker mode="region" :range="location"  @change="bindChange" class='infoCon'>
					<view class="picker">{{user_info.school_list.province_name+' '+user_info.school_list.city_name+' '+user_info.school_list.area_name}}</view>
				</picker> -->
				<image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center">
				<text>学校</text>
				<text class="infoCon">{{ user_info.get_school.name || '' }}</text>
				<!-- <picker mode="selector" :range="school" range-key="name"  @change="changesc" class='infoCon'>
					<view class="picker">{{user_info.school_list.school_name}}</view>
				</picker> -->
				<image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center" v-if="type == 4">
				<text>年级</text>
				<picker mode="selector" :range="grade" range-key="name" @change="changeGrade" class="infoCon" v-if="!user_info.get_grade.name">
					<view class="picker">{{ user_info.get_grade.name ||'' }}</view>
				</picker>
				<text class="infoCon" v-else>{{ user_info.get_grade.name ||''  }}</text>
				<image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
			<view class="center" v-if="type == 4" @click="touser('/pages/person/bindClassID')">
				<text>(班级)绑定</text>
				<text class="infoCon">{{ user_info.get_team.name || '' }}</text>
				<image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
			</view>
		</view>
    <view class="youxiang_warp">
      <view class="center youxiang" @click="changeEmail" :class="type == 3 ? 'teacherEmial' : ''">
        <text>邮箱</text>
        <text v-if="!user_info.email"></text>
        <text v-else="user_info.email">{{ user_info.email }}</text>
        <image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
      </view>
      <view class="center youxiang "  @click="touser('/pages/setting/setphone')">
        <text>手机号</text>
        <text class="infoCon">{{ user_info.mobile }}</text>
        <image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
      </view>
       <!-- #ifdef APP-PLUS -->
      <view class="center youxiang"  @click="pageToChangePass">
        <text>修改密码</text>
        <text class="infoCon"></text>
        <image class="right_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png"></image>
      </view>
      <!-- #endif -->
    </view>
    
    
		<!-- 修改姓名 -->
		<uniPopup ref="botpopup" type="center">
			<view class="botpopup">
				<view class="title_box">
					<image class="setinputicon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/setinputicon.png" mode="widthFix"></image>
					<span class="text">修改姓名</span>
				</view>
				<input type="text" :value="newName" @input="newNameChange" class="newnameinp" />
				<view class="btns">
					<button size="mini" type="default" class="cancle" @click="cancleClick">取消</button>
					<button size="mini" type="warn" class="confirm" @click="confirmClick">确定</button>
				</view>
			</view>
		</uniPopup>
    <!-- 修改邮箱 -->
    <uniPopup ref="botpopups" type="center">
    	<view class="botpopup">
    		<view class="title_box">
    			<image class="setinputicon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/setinputicon.png" mode="widthFix"></image>
    			<span class="text">修改邮箱</span>
    		</view>
    		<input type="text" :value="newEmail" @input="newEmailChange" class="newnameinp" />
    		<view class="btns">
    			<button size="mini" type="default" class="cancle" @click="newEmailcancleClick">取消</button>
    			<button size="mini" type="warn" class="confirm" @click="newEmailconfirmClick">确定</button>
    		</view>
    	</view>
    </uniPopup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				img: '',
				user_info: {school_list:{school_name:''},display_list:{mobile:''}},
				token: '',
				location: [],
				sex: [{
					name: '男',
					id: 1
				}, {
					name: '女',
					id: 2
				}],
				update: true,
				grade: [],
				school: [],
				type: '',
				newName: '',
				newEmail: '',
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
			if (!this.update) {
				this.getuserinfo();
			} else {
				this.update = true;
			}
		},
		methods: {
      pageToChangePass(){
        uni.navigateTo({
          url: '/pages/person/forgetPassword'
        })
      },
      changeEmail(){
        this.newEmail = this.user_info.email
        this.$refs.botpopups.open()
      },
      newEmailconfirmClick(){
        console.log('changeEmail',this.newEmail)
        this.$refs.botpopups.close()
        if (!this.newEmail) {
        	uni.showToast({
        		title: '不能为空！',
        		icon: 'none'
        	});
        	return;
        }
        if(this.newEmail == this.user_info.email){
          uni.showToast({
          	title: '新邮箱不可与原邮箱一致！',
          	icon: 'none'
          });
          return;
        }
        var data = {
        	email: this.newEmail,
        	token: this.token
        };
        var res
        if(this.type == 4){
           res = this.$api.save_email(data)
        }else{
          res = this.$api.save_teacher_email(data)
        }
        res.then(res => {
        	console.log(res);
        	if (res.code == 200) {
        		uni.showToast({
        			title: '修改成功'
        		});
        		setTimeout(() => {
        			this.newName = '';
        			this.getuserinfo();
        		}, 1000);
        	} else {
        		uni.showToast({
        			title: res.msg,
        			icon: 'none'
        		});
        	}
        });
      },
			confirmClick(){
        this.$refs.botpopup.close()
				if (!this.newName) {
					uni.showToast({
						title: '不能为空！',
						icon: 'none'
					});
					return;
				}
				var data = {
					name: this.newName,
					token: this.token
				};
        var res
        if(this.type == 4){
           res = this.$api.change_user_name(data)
        }else{
          res = this.$api.change_teacher_info(data)
        }
				res.then(res => {
					console.log(res);
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功'
						});
						setTimeout(() => {
							this.newName = '';
							this.getuserinfo();
						}, 1000);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			newNameChange(e){
				const {value} = e.detail 
				this.newName = value
			},
      newEmailChange(e){
				const {value} = e.detail 
				this.newEmail = value
			},
			cancleClick(){
				this.newName = '';
				this.$refs.botpopup.close()
			},
      newEmailcancleClick(){
				this.newEmail = '';
				this.$refs.botpopups.close()
			},
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
							url = _this.$api.url + 'applets/editPersonAvatarFile';
						} else {
							url = _this.$api.url + 'teacher/update_avatar/';
						}
						uni.uploadFile({
							url: url,
							filePath: _this.img,
							name: 'avatar_file',
							formData: {
								token: _this.token
							},
							success: res => {
								console.log('返回', res.data);
                setTimeout(() => {
                	this.getuserinfo();
                }, 1000);
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
				this.$api.get_location_list({
					token: this.token
				}).then(res => {
					console.log(res);
					this.location = res.data;
				});
			},
			//获取学校
			getschool() {
				let data = {
					// undefined
					province_id: this.user_info?.school_list?.province_id,
					city_id: this.user_info.school_list.city_id,
					area_id: this.user_info.school_list.area_id,
					token: this.token
				};
				this.$api.get_school(data).then(res => {
					console.log(res);
					if (res.data.length == 0) {
						this.school = [{
							name: '该省市区没有学校'
						}];
					} else {
						this.school = res.data;
					}
				});
			},
			//获取年级
			get_grade() {
				this.$api.get_grade({
					token: this.token
				}).then(res => {
					console.log(res);
					this.grade = res.data.grade_list;
				});
			},
			//获取用户信息
			getuserinfo() {
				if (uni.getStorageSync('type') == 4) {
					this.$api.get_user_info().then(res => {
						console.log(res);
						this.user_info = res.data.user;
						this.img = res.data.user.avatar_file;
            this.newName = res.data.user.true_name
            this.newEmail = res.data.user.email
						// this.getschool();
					});
				} else {
					this.$api.get_teacher_info().then(res => {
						console.log(res);
						this.user_info = res.data.user;
						this.img = res.data.user.avatar_file;
            this.newName = res.data.user.true_name
            this.newEmail = res.data.user.email
						// this.getschool();
					});
				}
			},
			//修改年级
			changeGrade(e) {
				if (uni.getStorageSync('type') == 4) {
					var req = this.$api.change_grade({
						token: this.token,
						grade_ids: this.grade[e.detail.value].grade_id
					});
				} else {
					var req = this.$api.change_teacher_info({
						token: this.token,
						grade_ids: this.grade[e.detail.value].grade_id
					});
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
					var req = this.$api.change_user_info({
						token: this.token,
						school_id: this.school[e.detail.value].id
					});
				} else {
					var req = this.$api.change_teacher_info({
						token: this.token,
						school_id: this.school[e.detail.value].id
					});
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
					var req = this.$api.change_user_info({
						token: this.token,
						region: code.toString()
					});
				} else {
					var req = this.$api.change_teacher_info({
						token: this.token,
						region: code.toString()
					});
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
					var req = this.$api.change_user_info({
						token: this.token,
						sex: id
					});
				} else {
					var req = this.$api.change_teacher_info({
						token: this.token,
						sex: id
					});
				}
				req.then(res => {
					this.getuserinfo();
				});
			},
			set(t) {
        this.newName = this.user_info.true_name
				console.log('打开弹窗');
				this.$refs.botpopup.open();
				// if (uni.getStorageSync('type') == 4) {
				// 	uni.navigateTo({
				// 		url: '/pages/person/setUser?title=' + t
				// 	});
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/person/setUser?title=' + t
				// 	});
				// }
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
		background: url(https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/editBg.png) no-repeat center center;
		background-size: cover;
		z-index: -1;

		.touxiangCon {
			position: relative;
			margin-top: -150rpx;

			>image {
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

		>text:first-child {
			color: #666666;
		}

		.infoCon {
			margin-right: 15rpx;
		}

		.right_icon {
			width: 14rpx;
			height: 27rpx;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
		}
	}
  
  .youxiang_warp{
    .center.youxiang {
    	background: #fff;
    	padding: 0 30rpx;
      
    	text {
    		margin-right: 30rpx;
    	}
    	image {
    		right: 30rpx;
    	}
      
    }
    >.youxiang:first-child {
      border-radius: 20rpx 20rpx 0 0;
    }
    >.youxiang:last-child {
      border-radius:  0 0 20rpx 20rpx;
    }
  }
  
  
  
	
	.teacherEmial {
		border-bottom: none !important;
		margin-bottom: 0 !important;
		border-radius: 20rpx 20rpx 0 0 !important;
	}

	
  

	.picker {
		height: 80rpx;
		// width: 300rpx;
		text-align: right;
		line-height: 80rpx;
		white-space: nowrap;
	}


	.botpopup {
		width: 490rpx;
		background-color: #fff;
		border: 1px solid #E5E5E5;
		border-radius: 16rpx;
		padding: 30rpx;

		.title_box {
			display: flex;
			justify-content: center;
			align-items: center;

			.setinputicon {
				width: 36rpx;
				height: 36rpx;
				margin-right: 12rpx;
			}

			.text {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}

		.newnameinp {
			box-sizing: border-box;
			width: 430rpx;
			height: 62rpx;
			border: 1px solid #E50304;
			border-radius: 16rpx;
			margin: 0 auto;
			margin-top: 50rpx;
			position: relative;
			padding-left: 77rpx;

			&::before {
				content: '';
				width: 27rpx;
				height: 30rpx;
				background: url('https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/setnameicon.png') no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 50%;
				left: 30rpx;
				transform: translateY(-50%);
			}
		}

		.btns {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50rpx;
			margin-bottom: 30rpx;

			.cancle {
				width: 200rpx;
				height: 54rpx;
				margin: 0;
				margin-right: 30rpx;
				border: 1px solid #B3B3B3;
				border-radius: 16rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;

			}

			.confirm {
				width: 200rpx;
				height: 54rpx;
				background: linear-gradient(86deg, #E50304, #F74300);
				border-radius: 16rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				margin: 0;
			}
		}





	}
</style>
