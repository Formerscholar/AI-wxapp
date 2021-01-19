<template>
  <view>
    <view class="top" :class="type == 3 ? 'teacher' : ''">
      <view class="mineInfo" @click="touser('/pages/person/user')">
        <view class="tou">
          <image :src="user_info.avatar || user_info.avatar_file"></image>
        </view>
        <view class="info">
          <view class="nick" v-if="user_info.true_name">{{ user_info.true_name }}</view>
          <view class="schoolName" v-if="type == 4">
            <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/schoolIcon.png"></image>
            <text>{{ user_info.school.school_name || school }}</text>
          </view>
          <view class="schoolName" v-if="type == 3">
            <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/jifen.png"></image>
            <text>积分:{{ user_info.points ? user_info.points : 0 }}</text>
          </view>
        </view>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/rightWhite.png" class="detail"></image>
      </view>
      <view class="vip" v-if="user_info.is_vip == 1 && type == 4" @click="pageToVip">
        <view class="endTimeInfo">
          <view>我的VIP会员</view>
          <view>VIP到期时间: {{ user_info.vip_time * 1000 | timer }}</view>
        </view>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/vipEndTime.png" v-if="platform == 'ios'"></image>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/vipEndTime1.png" v-else></image>
      </view>
      <view class="vip" v-if="!user_info.is_vip == 1 && type == 4" @click="pageToVip">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/vip.png" v-if="platform == 'ios'"></image>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/vip1.png" v-else></image>
      </view>
      <view class="minePaper" @click="tocuoti()" v-if="type == 3">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/minePaper.png" mode=""></image>
        <view>
          <text>我的试卷</text>
          <view class="paperInfo">
            已生成试卷
            <text>{{ examCount || 0 }}</text>
            份,未生成试卷
            <text>{{ examBasketCount || 0 }}</text>
            题
          </view>
        </view>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
    </view>

    <!-- 教师端 -->
    <view class="card" v-if="type == 3">
      <view class="item" @click="toMyUploadPaper()">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/uploadPaper.png" mode=""></image>
        <text>我上传的试卷</text>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <view class="item" @click="toJifen()">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/mineJifen.png" mode=""></image>
        <text>我的积分</text>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <view class="item" @click="touser('/pages/person/classInfo')">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/classId.png" mode=""></image>
        <text>我的班级</text>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <view class="item" @click="touser('/pages/person/feedback')">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/advice.png" mode=""></image>
        <text>意见反馈</text>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <!-- <view class="item">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/share.png" mode=""></image>
				<button open-type="share">分享给老师</button>
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view> -->
    </view>

    <!-- 学生端 -->
    <view class="card student" v-if="type == 4">
      <view class="item" @click="toClassID()">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/classId.png" mode=""></image>
        <text>绑定班级</text>
        <view class="item_info">{{ grade_names ? grade_names : '' }}</view>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <view class="item" @click="touser('/pages/person/about')">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/aboutWe.png" mode=""></image>
        <text>关于我们</text>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <view class="item" @click="touser('/pages/person/feedback')">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/advice.png" mode=""></image>
        <text>意见反馈</text>
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <view class="item">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/share.png" mode=""></image>
        <!-- #ifdef MP-WEIXIN -->
        <button open-type="share">分享</button>
        <!-- #endif -->
        <!-- #ifdef APP-PLUS -->
        <button @click="AppShareClick">分享</button>
        <!-- #endif -->
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
      </view>
      <!-- <view class="item" @click="shopClick">
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/shop_icon.png" mode=""></image>
				<text>会员商城</text>
				<image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/right.png" mode=""></image>
			</view> -->
    </view>
    <button class="logout" @click="logout()" v-show="token">退出登录</button>
    <uniPopup ref="uniPopupShare" type="share">
      <uniPopupShare title="分享到" @select="selectShare"></uniPopupShare>
    </uniPopup>
  </view>
</template>

<script>
  let app = getApp()
  import uniPopup from '@/components/uni-popup/uni-popup.vue';
  import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    components: {
      uniPopup,
      uniPopupShare
    },
    data() {
      return {
        user_info: {},
        token: '',
        type: 4,
        info: {},
        school: '',
        flag: false,
        grade_names: '',
        is_vip: 0,
        platform: '',
        examCount:'',
        examBasketCount:'',
      };
    },
    onLoad() {
      this.platform = app.globalData.systemInfo.platform
      this.user_info = uni.getStorageSync('userInfo');
      this.grade_names = this.user_info?.get_grade?.name  + this.user_info?.get_team.name|| '未绑定班级';
      this.school = this.user_info?.get_school?.name || this.user_info.school.grade_name;
      this.is_vip = this.user_info?.is_vip
    },
    onShow() {
      this.token = uni.getStorageSync('token');
      this.type = uni.getStorageSync('type');
      this.examCount = uni.getStorageSync('examCount');
      this.examBasketCount = uni.getStorageSync('examBasketCount');
      this.getuserinfo()
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo'])
    },
    onShareAppMessage() {
      return {
        title: 'AI错题宝',
        path: '/pages/index/index'
      };
    },
    methods: {
      ...mapMutations(['login', 'logout']),
      selectShare({
        item,
        index
      }) {
        console.log('selectShare', item, index)
        switch (index) {
          case 0:
            uni.share({
              provider: 'weixin',
              scene: "WXSceneSession",
              type: 5,
              imageUrl: 'https://aictb.oss-cn-shanghai.aliyuncs.com/App/share_icon.png',
              title: 'AI错题宝',
              miniProgram: {
                id: 'gh_762f64585df2',
                path: 'pages/index/index',
                type: 0,
                webUrl: 'http://m.aictb.com/'
              },
              success: ret => {
                console.log(JSON.stringify(ret));
              },fail: function(err) {
                console.log("fail:" + JSON.stringify(err));
              }
            });
            break;
          case 1:
            uni.share({
              provider: "qq",
              scene: "WXSceneSession",
              type: 1,
              summary:'AI错题宝',
              href:'https://www.aictb.com/app/',
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
      getuserinfo() {
        if (uni.getStorageSync('type') == 4) {
          this.$api.get_user_info().then(res => {
            console.log(res.data.user);
            this.user_info = res.data.user
          });
        } else {
          this.$api.get_teacher_info().then(res => {
            this.user_info = res.data.teacher
          });
        }
      },
      AppShareClick() {
        this.$refs.uniPopupShare.open()
      },
      shopClick() {
        // #ifdef MP-WEIXIN
        if (app.globalData.systemInfo.platform == "ios") {
          uni.navigateTo({
            url: "/pages/mall/iostip"
          })
        } else {
          uni.navigateTo({
            url: '/pages/mall/index'
          })
        }
        // #endif

        // #ifdef APP-PLUS
        uni.navigateTo({
          url: "/pages/mall/iostip"
        })
        // #endif
      },
      pageToVip: function() {
        this.touser('/pages/person/vip')
        // if (app.globalData.systemInfo.platform == 'ios') {
        // 	uni.showToast({
        // 		title: '由于相关规范,ios功能暂不可用!',
        // 		icon: 'none'
        // 	});
        // } else {

        // }
      },
      get_vip_info() {
        this.$api.vip_info({
          token: this.token
        }).then(res => {
          console.log(res);
          this.info = res.data;
          this.is_vip = res.data.is_vip;
          // uni.setStorage({
          // 	key: 'is_vip',
          // 	data: this.is_vip
          // });
        });
      },
      touser(url) {
        console.log(url);
        // var url=e.currentTarget.dataset.url
        uni.navigateTo({
          url: url
        });
      },
      tocuoti() {
        uni.switchTab({
          url: '/pages/errorBook/errorBook'
        });
      },
      toClassID() {
        uni.navigateTo({
          url: '/pages/person/bindClassID'
        });
      },
      toMyUploadPaper: function() {
        uni.navigateTo({
          url: '/pages/person/mineUploadPaper?id=2'
        });
      },
      toJifen: function() {
        uni.navigateTo({
          url: '/pages/person/jifenRecord'
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

  .teacher {
    height: 210rpx !important;
  }

  .minePaper {
    position: relative;
    display: flex;
    align-items: center;
    height: 130rpx;
    margin: 0 25rpx 25rpx;
    background: #fff;
    border-radius: 16rpx;
    border: 1rpx solid #e6e6e6;

    image:first-child {
      width: 64rpx;
      height: 72rpx;
      margin: 0 20rpx 0 30rpx;
    }

    text {
      display: inline-block;
      width: 90%;
      font-size: 28rpx;
    }

    .paperInfo {
      font-size: 24rpx;
      color: #b3b3b3;
      margin-top: 10rpx;

      text {
        display: inline;
        margin: 0 10rpx;
        color: #e30405;
        font-weight: 700;
        font-size: 28rpx;
      }
    }

    image:last-child {
      width: 14rpx;
      height: 26rpx;
      position: absolute;
      right: 30rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .top {
    width: 100%;
    background: url(https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/personInfo_bg.png) no-repeat center center;
    background-size: cover;
    position: relative;
    margin-top: -2rpx;

    .vip {
      width: 700rpx;
      height: 120rpx;
      margin: 0 25rpx;
      position: relative;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
      overflow: hidden;

      .endTimeInfo {
        color: #ffeeb9;
        font-size: 28rpx;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 100rpx;
        z-index: 1;

        /* >view{
					height: 62rpx;
					line-height: 62rpx;
				} */
        >view:last-child {
          color: #947057;
          font-size: 22rpx;
          margin-top: 5rpx;
        }
      }

      image {
        height: 100%;
        width: 100%;
      }
    }

    .w-bg {
      z-index: -1;
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -35rpx;
      transform: translateX(-50%);
      background: #fafafa;
    }

    .mineInfo {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      position: relative;

      .tou {
        width: 120rpx;
        border: 5rpx solid #e9b4b4;
        border-radius: 50%;
        display: inline-block;
        margin: 20rpx 20rpx 40rpx 50rpx;

        image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          vertical-align: center;
          display: block;
        }
      }

      .info {
        margin-top: 35rpx;

        .nick {
          color: #fff;
          font-size: 36rpx;
        }

        .schoolName {
          margin-top: 15rpx;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 20rpx;
          padding: 10rpx 12rpx;
          font-size: 22rpx;
          color: #fff;

          image {
            width: 30rpx;
            height: 30rpx;
            margin: -8rpx 10rpx 0 0;
            vertical-align: middle;
          }
        }
      }

      .detail {
        width: 14rpx;
        height: 26rpx;
        position: absolute;
        top: 80rpx;
        right: 50rpx;
      }
    }
  }

  .student.card {
    margin: 25rpx 25rpx 50rpx;
  }

  .card {
    margin: 135rpx 25rpx 50rpx;
    padding: 0 30rpx;
    background: #fff;
    border-radius: 16rpx;
    border: 1rpx solid #e6e6e6;

    .item {
      position: relative;
      display: flex;
      align-items: center;
      height: 100rpx;
      border-bottom: 1rpx solid #f5f5f5;

      image:first-child {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }

      button::after {
        border: none;
      }

      button {
        margin: 0;
        display: inline-block;
        border: none;
        padding: 0;
        background: #fff;
        width: 90%;
        height: 100%;
        text-align: left;
        line-height: 100rpx;
        font-size: 32rpx;
      }

      text {
        display: inline-block;
        width: 90%;
        height: 100%;
        line-height: 100rpx;
        font-size: 28rpx;
      }

      .item_info {
        position: absolute;
        right: 30rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24rpx;
        color: #999;
      }

      image:last-child {
        width: 14rpx;
        height: 26rpx;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .item:last-child {
      text {
        border: none;
      }
    }
  }

  .logout {
    margin: 20rpx auto;
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    color: #fff;
    background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
  }

  .bg2 {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 220rpx;
  }
</style>
