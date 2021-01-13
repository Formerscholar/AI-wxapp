<template>
  <view class="content">
    <view class="bg"></view>
    <swiper class="top" circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
      indicator-color="white" indicator-active-color="#e50304">
      <swiper-item v-for="(item, i) of banner_list" :key="i" >
        <image :src="item.img" mode=""></image>
      </swiper-item>
    </swiper>

    <!-- 教师端 -->
    <view class="teacher" v-if="type == 3">
      <view class="tab_info">
        <view class="tb">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/subject.png" mode=""></image>
          <text>学科</text>
          <text>{{ teacher_info.subject_name.title }}</text>
        </view>

        <view class="tb" @click="toclassinfo()">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/class.png" mode=""></image>
          <text>班级</text>
          <text>{{ teacher_info.team_count }}</text>
        </view>

        <view class="tb" @click="toclassinfo()">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/classmate.png" mode=""></image>
          <text>学生</text>
          <text>{{ teacher_info.student_count ? teacher_info.student_count : 0 }}</text>
        </view>
      </view>
      <view class="upload" @click="uploadPaper()">
        <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/upload.png"></image>
      </view>
      <view class="item left" @click="todetail(8)">
        <view class="title">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/report.png" mode="" class="report"></image>
          <text>学情报告</text>
          <text class="showDe" v-for="(item, i) of teacher_info.analysis" :key="i" v-if="teacher_info.analysis">
            {{ item.grade_name }}{{ item.team_name }},
            <text class="remark_red">{{ item.cnt ? item.cnt : 0 }}</text>
            道错题
          </text>
        </view>
      </view>
      <view class="right">
        <view class="item" @click="tobead">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mine_shijuan.png" mode=""></image>
          <view class="title">
            <text>校本试卷</text>
            <view>
              <text class="remark_red">{{ teacher_info.recent_paper ? teacher_info.recent_paper : 0 }}</text>
              份
            </view>
          </view>
        </view>
        <view class="item" @click="todetail(9)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaofu.png" mode=""></image>
          <view class="title">
            <text>名校资源</text>
            <view>
              <text class="remark_red">{{ teacher_info.recent_school_based ? teacher_info.recent_school_based : 0 }}</text>
              份
            </view>
          </view>
        </view>
      </view>
      <div class="clear"></div>
    </view>

    <!-- 学生端 -->
    <view class="student" v-else>
      <view class="item itemPhoto" @click="todetail(0)">
        <view>
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/photo.png" mode=""></image>
        </view>
        <view class="title">
          <text>拍照识题</text>
          <view>目前只支持教辅材料拍照识题</view>
        </view>
      </view>

      <view class="vipouttime" @click="pageToVip" v-if="invest">
        <image class="left_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/indexvipicon.png" mode="widthFix"></image>
        <view class="content_text">{{ is_vip ? `您的会员将于${setTimeType(vip_time * 1000) || 0}到期` : '申请VIP会员 · 了解更多特权' }}</view>
        <image class="right_btn" v-if="platform == 'ios'" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vip_info.png"
          mode="widthFix"></image>
        <image class="right_btn" v-else-if="is_vip" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/Renew.png"
          mode="widthFix"></image>
        <image class="right_btn" v-else src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/indexvipbtn.png"
          mode="widthFix"></image>
      </view>

      <view class="flex">
        <view class="item itemSpec0" @click="todetail(1)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaofu.png" mode=""></image>
          <view class="title">
            <text>我的教辅</text>
            <view>
              <text class="remark_red">{{ student_info.userTextbookCount || 0 }}</text>
              本
            </view>
          </view>
        </view>

        <view class="item itemSpec" @click="todetail(2)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mine_shijuan.png" mode=""></image>
          <view class="title">
            <text>校本试卷</text>
            <view>
              <text class="remark_red">{{ student_info.schoolResourcesCount || 0 }}</text>
              份
            </view>
          </view>
        </view>
      </view>

      <view class="flex">
        <view class="item itemSpec0" @click="todetail(9)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mingxiao.png" mode=""></image>
          <view class="title">
            <text>名校资源</text>
            <view>
              <text class="remark_red">{{ student_info.examsSchoolCount || 0 }}</text>
              份
            </view>
          </view>
        </view>

        <view class="item itemSpec" @click="todetail(4)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/mine_xueqingbaogao.png" mode=""></image>
          <view class="title">
            <text>学情报告</text>
            <view>
              <text class="remark_red">{{ student_info.userExercisesCount || 0 }}</text>
              道错题
              <!-- 知识分布为：<text v-for="(item,i) of student_info.analysis_detail" :key='i'>{{item.name+" "}}</text> -->
            </view>
          </view>
        </view>
      </view>
      <!-- <view class="tabbarshop_warp" @click="tabbarshopClick">
				<image class="tabbarshop" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/tabbarshop.png" mode="widthFix"></image>
			</view> -->
    </view>

    <view class="vip_totul" v-if="is_totul" @click="closeTotul">
      <view class="image_warp">
        <image class="home_vip_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/home_vip_icon.png"
          mode="widthFix" @click="closeTotul"></image>
      </view>
      <view class="centent_box" @click="pageToVip">
        <div class="tit_text">您的会员将于{{setTimeType(vip_time * 1000) || 0}}到期</div>
      </view>
      <!-- <image class="home_vip_image" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/home_vip_image.png" mode="widthFix"
			 @click="pageToVip"></image>
			<image class="home_vip_btn" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/home_vip_btn.png" mode="widthFix"
			 @click="pageToVip"></image>
			 <div class="tit_text">您的会员将于{{setTimeType(vip_time * 1000) || 0}}到期</div> -->
    </view>

  </view>


</template>

<script lang="ts">
  import Vue from 'vue';
  let app = getApp()
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default Vue.extend({
    data() {
      return {
        title: 'Hello',
        type: 4,
        banner_list: '',
        token: '',
        teacher_info: {
          subject_name: {
            title: ''
          }
        },
        teacher_infos: {},
        student_info: {},
        is_vip: '',
        vip_time: '',
        is_totul: false,
        invest: 0,
        renew: 0,
        platform: ""
      };
    },
    onLoad() {
      this.token = uni.getStorageSync('token');
      if (this.token == '') {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      }
      this.platform = app.globalData.systemInfo.platform
    },
    onShow() {
      this.token = uni.getStorageSync('token');
      this.type = uni.getStorageSync('type');
      if (uni.getStorageSync('is_vip')) {
        this.is_vip = uni.getStorageSync('is_vip');
      }
      if (this.type == 3) {
        uni.setTabBarItem({
          index: 1,
          text: '我的试卷',
          iconPath: '/static/imgs/icon/myPaper1.png',
          selectedIconPath: '/static/imgs/icon/myPaper.png'
        });
      } else {
        uni.setTabBarItem({
          index: 1,
          text: '错题本',
          iconPath: '/static/imgs/icon/cuotiben1.png',
          selectedIconPath: '/static/imgs/icon/cuotiben.png'
        });
      }
      if (this.token && this.type == 3) {
        this.get_teacher();
        this.get_teacher_info()
      }
      if (this.token && this.type == 4) {
        this.get_student();
      }
      // #ifdef MP-WEIXIN
      let _this = this;
      // 查看是否授权
      uni.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            uni.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                res.openid = uni.getStorageSync('userInfo').openid;
                _this.$api.update_userinfo(res).then(res => {
                  console.log(res);
                });
              }
            })
          } else {
            uni.login({
              success: (res) => {
                _this.$api.wx_login(res).then(res => {
                  console.log(res);
                });
              }
            })
          }
        }
      })
      // #endif
    },
    onShareAppMessage() {
      return {
        title: 'AI错题宝',
        path: '/pages/index/index'
      };
    },
    methods: {
      get_teacher_info(): void {
        let _this = this
        this.$api.get_teacher_info({
          token: _this.token
        }).then(res => {
          console.log(res, 'get_teacher_info')
          _this.teacher_infos = res.data
        })
      },
      tobead() {
        if (this.teacher_infos.cert == 1) {
          this.todetail(7)
        } else {
          console.log('tishi')
          uni.showToast({
            title: '您未认证无法查看校本试卷!',
            icon: 'none'
          });
        }
      },
      tabbarshopClick() {
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
      closeTotul() {
        this.is_totul = false
      },
      setTimeType(timer): string {
        let d = new Date(timer);
        let ConvertedYear = d.getFullYear().toString();
        let ConvertedMonth = (d.getMonth() + 1).toString();
        let ConvertedDate = d.getDate().toString();
        ConvertedMonth = ConvertedMonth.length < 2 ? '0' + ConvertedMonth : ConvertedMonth;
        ConvertedDate = ConvertedDate.length < 2 ? '0' + ConvertedDate : ConvertedDate;
        return `${ConvertedYear}-${ConvertedMonth}-${ConvertedDate}`;
      },
      pageToVip: function() {
        uni.navigateTo({
          url: '/pages/person/vip'
        });
        // if (app.globalData.systemInfo.platform == 'ios') {
        // 	uni.showToast({
        // 		title: '由于相关规范,ios功能暂不可用!',
        // 		icon: 'none'
        // 	});
        // } else {
        // 	uni.navigateTo({
        // 		url: '/pages/person/vip'
        // 	});
        // }
      },
      uploadPaper: function() {
        uni.navigateTo({
          url: '/pages/person/mineUploadPaper?id=1'
        });
      },
      toclassinfo() {
        uni.navigateTo({
          url: '/pages/person/classInfo'
        });
      },
      //获取学生信息
      get_student() {
        let _this = this;
        let istol = uni.getStorageSync('istol')
        let istolbool = uni.getStorageSync('istolbool')
        _this.$api.student_index().then(res => {
          console.log(res.data);
          _this.banner_list = res.data.banner;
          _this.student_info = res.data;
          // _this.is_vip = res.data.is_vip;
          // _this.vip_time = res.data.vip_time;
          // _this.invest = res.data.invest;
          // _this.renew = res.data.renew;
          // if (res.data.renew && istol === new Date().getDate() && istolbool) {
          //   _this.is_totul = true
          //   uni.setStorageSync('istolbool', false)
          // } else {
          //   _this.is_totul = false
          // }
          // uni.setStorage({
          //   key: 'is_vip',
          //   data: this.is_vip
          // });
        });
      },
      //获取老师信息
      get_teacher() {
        this.$api.teacher_index({
          token: this.token
        }).then(res => {
          console.log(res);
          this.teacher_info = res.data;
        });
      },
      todetail(i) {
        var url = '';
        if (i == 0) {
          url = '/pages/myteaching/myteachingPhoto?from=1';
        } else if (i == 1) {
          url = '/pages/myteaching/contentReference';
        } else if (i == 2) {
          url = '/pages/myPaper/myPaper';
        } else if (i == 3) {
          uni.switchTab({
            url: '/pages/errorBook/errorBook'
          });
        } else if (i == 4) {
          url = '/pages/learningReport/learningReport';
        } else if (i == 5) {
          url = '';
        } else if (i == 6) {
          uni.switchTab({
            url: '/pages/errorBook/errorBook'
          });
        } else if (i == 7) {
          url = '/pages/myPaper/myPaper';
        } else if (i == 8) {
          url = '/pages/learningReport/j-xueqingbaogao';
        } else if (i == 9) {
          url = '/pages/myPaper/new_paper';
        }
        uni.navigateTo({
          url: url
        });
      }
    }
  });
</script>

<style lang="scss">
  page {
    background: #eee;
    font-family: PingFang SC;
    width: 100vw;
    height: 100vh;
  }

  .tabbarshop_warp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24rpx;

    .tabbarshop {
      width: 702rpx;
      height: 219rpx;
      margin: 0 auto;
    }
  }

  .vip_totul {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: .5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .image_warp {
      width: 593rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .home_vip_icon {
        width: 67rpx;
        height: 67rpx;
      }
    }

    .centent_box {
      width: 593rpx;
      height: 672rpx;
      background: url(https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/new_home_vip_image.png) no-repeat;
      background-size: 100% 100%;
      position: relative;

      .tit_text {
        position: absolute;
        top: 43%;
        left: 22%;
        font-size: 26rpx;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #FFEC95;
      }
    }


  }

  .clear {
    clear: both;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 175rpx;
    background: #e50304;
  }

  .top {
    width: 100%;
    height: 350rpx;
    border-radius: 20rpx;

    .uni-swiper-dot {
      background-color: #fff !important;
    }

    .uni-swiper-dot-active {
      background-color: #e50304 !important;
    }

    image {
      width: 700rpx;
      height: 100%;
      margin: 0 25rpx;
      border-radius: 20rpx;
    }
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .teacher {
    margin: 25rpx;

    .upload {
      width: 100%;
      height: 150rpx;
      margin: 25rpx 0;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .item.left {
      float: left;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      height: 383rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      border: 1rpx solid #e7e7e7;

      .title {
        overflow: hidden;

        >text:nth-of-type(1) {
          text-align: center;
          font-weight: bold;
          font-size: 36rpx;
        }
      }

      .showDe {
        font-size: 26rpx;
        color: #afafaf;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        margin: 5rpx 0;

        .remark_red {
          margin-left: 10rpx;
        }
      }

      .title {
        margin-top: 0 !important;
      }

      image {
        margin: 45rpx auto 30rpx !important;
      }
    }

    .right {
      float: right;

      .item {
        .title {
          >text:nth-of-type(1) {
            font-weight: bold;
            margin-bottom: 15rpx;
          }
        }

        image {
          /* position:absolute;
					top:50%;
					transform: translateY(-50%);
					left:0; */
        }
      }
    }

    .item {
      position: relative;
      width: 340rpx;
      height: 180rpx;
      background-color: #fff;
      margin: 0 0 25rpx 0;
      border-radius: 20rpx;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      box-sizing: border-box;
      border: 1rpx solid #e7e7e7;
      overflow: hidden;

      .title {
        margin: auto 0;
        display: flex;
        flex-direction: column;
        position: relative;

        >text {
          color: #000;
          font-size: 36rpx;
        }

        >view {
          color: #afafaf;
          font-size: 26rpx;
        }

        .report {
          width: 86rpx;
          height: 89rpx;
          margin: 30rpx auto;
        }
      }

      >image {
        display: flex;
        margin: auto 0;
        margin-left: 50rpx;
        margin-right: 30rpx;
        width: 80rpx;
        height: 90rpx;
      }
    }
  }

  .student {
    .vipouttime {
      height: 120rpx;
      margin: 25rpx;
      background: url('https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/indexvipbg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;

      .left_icon {
        width: 58rpx;
        height: 58rpx;
      }

      .content_text {
        flex: 1;
        font-size: 28rpx;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: #f4deab;
        text-align: left;
        margin-left: 26rpx;
      }

      .right_btn {
        width: 150rpx;
        height: 52rpx;
      }
    }

    .item.itemSpec0 {
      flex: 1;
      height: 180rpx;
      margin: 0 25rpx 25rpx 25rpx;
    }

    .item.itemSpec {
      flex: 1;
      height: 180rpx;
      margin: 0 25rpx 25rpx 0;
    }

    .item.itemPhoto {
      width: 700rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .title {
        text:last-child {
          width: auto;
        }
      }

      image {
        width: 124rpx;
        height: 100rpx;
      }
    }

    .item {
      position: relative;
      height: 219rpx;
      background-color: #fff;
      margin: 25rpx;
      border-radius: 20rpx;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      box-sizing: border-box;

      .title {
        display: flex;
        flex-direction: column;
        margin: auto 0;
        box-sizing: border-box;

        >text {
          color: #000;
          font-weight: bold;
          font-size: 36rpx;
        }

        >view {
          color: #afafaf;
          font-size: 26rpx;
          padding-top: 15rpx;
        }
      }

      image {
        display: flex;
        align-items: center;
        margin: auto 0;
        margin-left: 50rpx;
        margin-right: 30rpx;
        width: 80rpx;
        height: 90rpx;
      }
    }
  }

  .tab_info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    // justify-content: space-evenly;
    .tb {
      width: 100%;
      height: 213rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-right: 25rpx;
      background: #fff;
      padding: 30rpx;
      box-sizing: border-box;
      border: 1rpx solid #e7e7e7;
      border-radius: 20rpx;

      image {
        width: 60rpx;
        height: 60rpx;
      }

      text:nth-child(2) {
        color: #333333;
        font-size: 30rpx;
      }

      text:nth-child(3) {
        color: #cccccc;
        font-size: 26rpx;
      }
    }

    .tb:last-child {
      margin-right: 0;
    }
  }
</style>
