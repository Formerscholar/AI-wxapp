<template>
	<view>
		<view class="card" v-for="(item, i) of list" :key="i">
			<view class="flex">
				<view @click="add(item)" class="up">
					<view class="className">
						{{ item.get_grade.name+item.name }}
						<image class='guan' v-if="user_id == item.teacher_id" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/admin.png" mode="widthFix"></image>
					</view>
					<view class="num">ID:{{ item.classid }}</view>
				</view>
				<view class="up" @click="add(item)">
					学生
					<view class="num">{{ item.get_user_count }}</view>
				</view>
				<view class="up" @click="add(item)">
					老师
					<view class="num">{{ item.teacherCount }}</view>
				</view>
			</view>
			<view class="flex">
				<view class="down">
					<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/invent_stu.png" />
          <!-- #ifdef MP-WEIXIN -->
					<button class="downCon" open-type="share" :data-name="item.team_name" :data-class_id="item.classid" data-it="stu">邀请学生</button>
          <!-- #endif -->
          <!-- #ifdef APP-PLUS -->
					<button class="downCon" @click="InviteStudent(item,4)">邀请学生</button>
          <!-- #endif -->
				</view>
				<view class="down">
					<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/invent_ter.png" />
          <!-- #ifdef MP-WEIXIN -->
					<button class="downCon" open-type="share" :data-team_id="item.team_id" :data-name="item.team_name" :data-class_id="item.classid" data-it="ter">邀请老师</button>
          <!-- #endif -->
          <!-- #ifdef APP-PLUS -->
					<button class="downCon" @click="InviteStudent(item,3)">邀请老师</button>
          <!-- #endif -->
				</view>
			</view>
		</view>
    <!-- #ifdef MP-WEIXIN -->
    <view class="btn" @click="touser('/pages/person/addClass')">创建新的班级</view>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS -->
    <view class="btns_warp">
      <view class="btn_item" @click="touser('/pages/person/addClass')">创建新的班级</view>
      <view class="btn_item" @click="touser('/pages/person/bindClassID')">加入新的班级</view>
    </view>
    <!-- #endif -->
    <uniPopup ref="uniPopupShare" type="share">
      <uniPopupShare title="分享到" @select="selectShare"></uniPopupShare>
    </uniPopup>
	</view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue';
  import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
  
export default {
  components: {
    uniPopup,
    uniPopupShare
  },
	data() {
		return {
			token: '',
			list: [],
			team_name: '',
			user_id:'',
      shareItem:'',
      sharePath:'',
      school_name:''
		};
	},
	onShareAppMessage(e) {
		console.log(e.target.dataset.it);
		let path = '';
		if (e.target.dataset.it == 'stu') {
			path = `/pages/login/share?id=${uni.getStorageSync('userInfo').user_id}&school=${this.school_name}&name=${e.target.dataset.name}&teacher_name=${
				uni.getStorageSync('userInfo').true_name
			}&class_id=${e.target.dataset.class_id}`;
		} else {
			path = `/pages/login/share_ter?id=${uni.getStorageSync('userInfo').user_id}&school=${this.school_name}&name=${e.target.dataset.name}&teacher_name=${
				uni.getStorageSync('userInfo').true_name
			}&class_id=${e.target.dataset.class_id}&team_id=${e.target.dataset.team_id}`;
		}
		return {
			title: '错题宝',
			path: path
		};
	},
	onshow() {
		// this.get_class_list()
	},
	onLoad() {
		if (uni.getStorageSync('token')) {
			this.token = uni.getStorageSync('token');
		}
		if (uni.getStorageSync('userInfo')) {
			this.user_id = uni.getStorageSync('userInfo').user_id;
		}
		this.get_class_list();
	},
	methods: {
    selectShare({
      item,
      index
    }) {
      console.log('selectShare', item, index ,this.shareItem)
      switch (index) {
        case 0:
        uni.share({
          provider: 'weixin',
          scene: "WXSceneSession",
          type: 5,
          imageUrl: 'https://aictb.oss-cn-shanghai.aliyuncs.com/App/share_icon.png',
          title: `${uni.getStorageSync('userInfo').true_name}老师邀请您加入${this.shareItem.team_name}`,
          miniProgram: {
            id: 'gh_762f64585df2',
            path: this.sharePath,
            type: 0,
            webUrl: 'http://m.aictb.com/'
          },
          success: ret => {
            console.log(JSON.stringify(ret));
          },fail: function(err) {
            console.log("fail:" + JSON.stringify(err));
          }
        });
          // uni.share({
          //   provider: "weixin",
          //   scene: "WXSceneSession",
          //   type: 0,
          //   href: `https://www.aictb.com/app/invite/?team_id=${this.shareItem.team_id}`,
          //   title: `${uni.getStorageSync('userInfo').true_name}老师邀请您加入${this.shareItem.team_name}`,
          //   summary: `打开AI错题宝,输入班级ID（${this.shareItem.classid}）,加入我的班级吧~`,
          //   imageUrl: "https://aictb.oss-cn-shanghai.aliyuncs.com/App/share_icon.png",
          //   success: function (res) {
          //       console.log("success:" + JSON.stringify(res));
          //   },
          //   fail: function (err) {
          //       console.log("fail:" + JSON.stringify(err));
          //   }
          // });
          break;
        case 1:
          uni.share({
            provider: "qq",
            scene: "WXSceneSession",
            type: 1,
            title:`${uni.getStorageSync('userInfo').true_name}老师邀请您加入${this.shareItem.team_name}`,
            summary: `打开AI错题宝,输入班级ID（${this.shareItem.classid}）,加入我的班级吧~`,
            href:`https://www.aictb.com/app/invite/?team_id=${this.shareItem.team_id}`,
            success: function(res) {
              console.log("success:" + JSON.stringify(res));
            },
            fail: function(err) {
              console.log("fail:" + JSON.stringify(err));
            }
          });
          break;
        default:
          break;
      }
      this.$refs.uniPopupShare.close()
    },
    InviteStudent(item,index){
      if (index == 3) {
        this.sharePath = `pages/login/share_ter?id=${item.teacher_id}&name=${item.team_name}&class_id=${item.classid}&school=${uni.getStorageSync('userInfo').school.name}&teacher_name=${uni.getStorageSync('userInfo').true_name}&team_id=${item.team_id}`
      } else{
        this.sharePath = `pages/login/share?id=${item.teacher_id}&name=${item.team_name}&class_id=${item.classid}&school=${uni.getStorageSync('userInfo').school.name}&teacher_name=${uni.getStorageSync('userInfo').true_name}`
      }
      console.log('InviteStudent',item,this.sharePath)
      this.shareItem = item
      this.$refs.uniPopupShare.open()
    },
		get(name) {
			this.team_name = name;
		},
		//班级列表
		get_class_list() {
			this.$api.my_team_ids_list({ token: this.token }).then(res => {
				console.log(res);
        this.school_name = res.data.shcoolName
				this.list = res.data.teamList;
			});
		},
		add(item) {
			console.log(item);
			uni.navigateTo({
				url: '/pages/person/ListStudents?team_name=' + item.get_grade.name+item.name + '&team_id=' + item.id
			});
		},
		touser(url) {
			console.log(url);
			// var url=e.currentTarget.dataset.url
			uni.navigateTo({
				url: url
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
.card {
	width: 700rpx;
	margin: 25rpx;
	background: #fff;
	border-radius: 20rpx;
	border: 1rpx solid #e6e6e6;
	.flex {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
		/* >view.up{
				height: 100rpx;
			}
			>view.down{
				height:85rpx;
				line-height: 85rpx;
				font-size: 26rpx;
			} */
	}
	.flex:nth-of-type(1) {
		background: #fff;
		height: 130rpx;
		align-items: center;
		font-size: 28rpx;
		.up {
			width: 33.33%;
			text-align: center;
			position: relative;
			.className {
				position: relative;
				.guan {
					position: absolute;
					top: 5rpx;
					right: 10rpx;
					background: #e50304;
					border-radius: 50%;
					width: 28rpx;
					height: 28rpx;
					font-size: 20rpx;
					line-height: 28rpx;
					text-align: center;
					color: #fff;
				}
			}
			.num {
				margin-top: 15rpx;
				color: #808080;
			}
			&:after {
				height: 100%;
				width: 2rpx;
				background: #e7e7e7;
				position: absolute;
				top: 0;
				right: 0;
				content: '';
			}
		}
		.up:nth-last-of-type(1) {
			&::after {
				display: none;
			}
		}
	}
	.flex:nth-of-type(2) {
		background: #f2f2f2;
		border-radius: 0 0 20rpx 20rpx;
		color: #818181;
		padding: 0 15rpx 0 35rpx;
		box-sizing: border-box;
		.down {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			image {
				// transform: translateY(-50%);
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
				margin-top: 30rpx;
			}
			.downCon {
				font-size: 28rpx;
				line-height: 100rpx;
				height: 100rpx;
				display: inline-block;
				border-radius: 0 20rpx 0 0;
				background: #f2f2f2;
			}
		}
	}
}
.btns_warp{
  display: flex;
  justify-content: center;
  align-items: center;
  .btn_item{
    border: 1rpx solid #fff;
    font-size: 30rpx;
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 20rpx;
    color: #fff;
    background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
    margin: 50rpx auto 20rpx;
    border-radius: 20rpx;
  }
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
</style>
