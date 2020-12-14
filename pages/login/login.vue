<template>
  <view class="content">
    <!-- #ifdef MP-WEIXIN -->
    <view class='topBg'>
      <image src='//aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/loginBg.png'></image>
    </view>
    <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/aiFalse.png" mode="" class='aiFalse'>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS -->
      <image style="width: 100%;margin-bottom: 48rpx;" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/login_bg.png"
        mode="widthFix"></image>
      <!-- #endif -->
      <view class="login">
        <!-- #ifdef APP-PLUS -->
        <view class="btn_plus">
          <view :class="loginmode==4 ? 'itembtn b-b' :'itembtn'" @click="setlogin(4)">我是学生(家长)</view>
          <view :class="loginmode==3 ? 'itembtn b-b' :'itembtn'" @click="setlogin(3)">我是老师</view>
        </view>
        <view class="zhanhao" style="margin-top: 0;">
          <!-- <image src="../../static/img/wode.png" mode=""></image> -->
          <input type="text" v-model="account" placeholder="请输入手机号" placeholder-style="color:#dedede" />
          <!-- <image @click="del(1)" src="../../static/img/del.png" v-show="account.length>0" mode=""></image> -->
        </view>
        <view class="zhanhao">
          <!-- <image src="../../static/img/password.png" mode=""></image> -->
          <input type="password" v-model="password" placeholder="请输入密码" placeholder-style="color:#dedede" />
          <!-- <image @click="del(2)" src="../../static/img/del.png" v-show="password.length>0" mode=""></image> -->
        </view>
        <view class="login-btn" @click="login2">登 录</view>
        <view class="text">
          <text @click="toReg()" v-if="type==4">立即注册</text>
          <text @click="topassword()">忘记密码?</text>
        </view>
        <view class="wx_box">
          <view class="text_bg">
            <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/login_wx_icon.png" mode="widthFix"></image>
            <text class="span">其他登录方式</text>
            <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/login_wx_icon.png" mode="widthFix"></image>
          </view>
          <image class="img_wx" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/wechat_icon.png" mode="widthFix" @click="wx_login"></image>
        </view>
        <!-- #endif -->

        <!-- #ifdef MP-WEIXIN -->
        <view class="sf">
          请选择您的身份
        </view>
        <view class="weixin">
          <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo($event,4)">我是学生(家长)</button>
          <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo($event,3)">我是老师</button>
        </view>
        <!-- #endif -->
      </view>



      <uni-popup ref="popup" type="center">
        <view class="bindphone">
          <view>
            需要授权获取手机号
          </view>
          <button open-type="getPhoneNumber" @getphonenumber="getphone">授权</button>
        </view>
      </uni-popup>
  </view>
</template>

<script>
  import uniPopup from "@/components/uni-popup/uni-popup.vue"
  import {
    mapState,
    mapMutations
  } from 'vuex';

  export default {
    components: {
      uniPopup
    },
    data() {
      return {
        account: '13987654321',
        password: '123456',
        // account: '',
        // password: '',
        loginmode: 4,
        type: 4,
        user_id: '',
        userInfo: {},
        sessionkey: '',
        openid: '',
        code: '',
      };
    },
    onLoad() {

    },
    methods: {
      ...mapMutations(['login', 'set_type']),
      setlogin(i) {
        this.type = i
        this.loginmode = i
        this.set_type(i);
        uni.setStorage({
          key: 'type',
          data: i
        })
      },
      bindgetuserinfo(e, i) {
        uni.login({
          success: (res) => {
            this.code = res.code
            console.log(this.code)
            uni.setStorage({
              key: 'type',
              data: i,
            })
            console.log('bindgetuserinfo', e)
            this.userInfo = e.detail.userInfo
            uni.setStorageSync('info', e.detail.userInfo) //头像  姓名
            if (i == 3) {
              console.log(this.userInfo)
              this.$api.teacher_login({
                  code: this.code,
                })
                .then(res => {
                  this.sessionkey = res.data?.session_key
                  this.openid = res.data.openid

                  uni.setStorage({
                    key: "unionid",
                    data: res.data.unionid
                  })
                  uni.setStorage({
                    key: "openid",
                    data: this.openid
                  })
                  console.log('res.data.data ', res.data)
                  if (res.code == 200) {
                    this.login(res.data)
                    uni.setStorage({ //缓存用户登陆状态
                      key: 'userInfo',
                      data: res.data
                    })
                    uni.setStorage({
                      key: "type",
                      data: 3
                    })
                    uni.reLaunch({
                      url: '/pages/index/index'
                    })
                    // this.user_id=res.data.user_id 
                  } else {
                    uni.setStorage({
                      key: 'openid',
                      data: res.data.openid
                    })
                    this.$refs.popup.open()
                  }
                })
            } else {
              console.log('学生登录', this.userInfo, this.code);
              this.$api.student_login({
                  code: this.code
                })
                .then(res => {
                  this.sessionkey = res.data?.session_key
                  this.openid = res.data.openid
                  uni.setStorage({
                    key: "unionid",
                    data: res.data.unionid
                  })
                  uni.setStorage({
                    key: "openid",
                    data: this.openid
                  })
                  console.log('res', res)
                  if (res.code == 200) {
                    this.login(res.data)
                    uni.setStorage({
                      key: 'is_vip',
                      data: res.data.is_vip
                    })
                    uni.setStorage({ //缓存用户登陆状态
                      key: 'userInfo',
                      data: res.data
                    })
                    uni.setStorage({
                      key: "type",
                      data: 4
                    })
                    uni.reLaunch({
                      url: '/pages/index/index'
                    })
                  } else if (res.code == 300) {
                    uni.showToast({
                      title: res.msg,
                      icon: 'none'
                    });
                  } else {
                    uni.navigateTo({
                      url: '/pages/login/bindinfo'
                    })
                  }
                })
            }
          }
        })
      },
      getphone(e) {

        console.log(e)
        let data = {
          code: this.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          sessionkey: this.sessionkey,
          openid: this.openid,
          user_name: this.userInfo.nickName,
          avatar: this.userInfo.avatarUrl,
          gender: this.userInfo.gender,
        }
        this.$api.get_mobile(data)
          .then(res => {
            if (res.code == 200) {
              this.login(res.data)
              uni.reLaunch({
                url: '/pages/index/index'
              })
            } else if (res.code == 300) {
              uni.setStorageSync('mobile', res.data.mobile)
              uni.reLaunch({
                url: '/pages/login/bindinfo'
              })
            } else {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
            console.log(res)
          })
      },
      login2() {
        var user_type = this.loginmode
        uni.setStorage({
          key: 'type',
          data: user_type
        })
        var data = {
          mobile: this.account,
          password: this.password
        }
        var req = this.$api.app_login(data);
        if (user_type == 3) {
          req = this.$api.teacher_app_login(data);
        }
        req.then(res => {
          console.log(res)
          if (res.code == 200) {
            this.login(res.data)
            uni.showToast({
              title: '登录成功'
            })
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/index/index'
              })
            }, 500)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })

      },
      getuserinfo() {

      },
      toReg() {
        uni.navigateTo({
          url: '/pages/login/register'
        })
      },
      topassword() {
        uni.navigateTo({
          url: '/pages/login/changePassword'
        })
      },
      del(i) {
        if (i == 1) {
          this.account = ''
        } else {
          this.password = ''
        }
      },
      wx_login() {
        console.log("App微信拉起授权")
        let _this = this;
        var weixinService = null;
        plus.oauth.getServices(function(services) {
          console.log(services)
          if (services && services.length) {
            for (var i = 0, len = services.length; i < len; i++) {
              if (services[i].id === 'weixin') {
                weixinService = services[i];
                console.log('授权对象')
                console.log(weixinService)
                break;
              }
            }
            if (!weixinService) {
              console.log('没有微信登录授权服务');
              return;
            }
            weixinService.authorize(function(event) { //此处获取code的关键
              console.log(event.code)
              let data = {
                code: event.code
              };
              if (_this.loginmode == 3) {
                var req = _this.$api.teacher_app_wx_login(data);
              } else {
                var req = _this.$api.app_wx_login(data);
              }
              req.then(res => {
                console.log(res)
                if (res.code == 200) {
                  _this.login(res.data)
                  uni.showToast({
                    title: '登录成功'
                  })
                  if (!res.data.is_bind) {
                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/login/bindinfo'
                      })
                    }, 500)
                  } else {
                    setTimeout(() => {
                      uni.switchTab({
                        url: '/pages/index/index'
                      })
                    }, 500)
                  }
                } else {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none'
                  })
                }
              })
            }, function(error) {
              console.error('authorize fail:' + JSON.stringify(error));
            }, {

            });
          } else {
            console.log('无可用的登录授权服务');
          }
        }, function(error) {
          console.error('getServices fail:' + JSON.stringify(error));
        });

      }
    }
  }
</script>

<style lang="scss">
  page {
    font-family: PingFang SC;
  }

  .content {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .topBg {
    width: 100%;
    height: 518rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .aiFalse {
    width: 367rpx;
    height: 80rpx;
    margin: 72rpx auto 39rpx;
    display: block;
  }

  .btn {
    display: flex;
    justify-content: space-between;
    //margin-top: 387rpx;
    padding: 0 30rpx 0;

    view {
      text-align: center;
      width: 256rpx;
      height: 20rpx;
      background: #fff;
      border: 1rpx solid #fff;
      border-radius: 10rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: rgb(236, 119, 39);
      font-size: 35rpx;
    }
  }

  .login {
    width: 590rpx;
    background: #fff;
    margin: 0 auto;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;

    .sf {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 28rpx;
      color: #cccccc;
      text-align: left;
    }

    .weixin {
      button {
        // border: 1rpx solid #fff;
        width: 100%;
        height: 112rpx;
        margin: 26rpx auto 0;
        line-height: 112rpx;
        color: #fff;
        font-size: 42rpx;
        background: #ff2121;
      }

      button:nth-of-type(2) {
        margin-top: 34rpx;
      }
    }

    .zhanhao {
      width: 100%;
      height: 80rpx;
      margin-top: 35rpx;
      background: #F4F4F4;
      border-radius: 38rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30rpx;
      box-sizing: border-box;
      

      image {
        width: 40rpx;
        height: 40rpx;
      }

      input {
        width: 80%;
        height: 80rpx;
      }
    }
    .wx_box{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text_bg{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40rpx;
        .span{
          font-size: 24rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #999999;
          margin: 0 26rpx;
        }
        image{
          width: 54rpx;
          height: 2rpx;
        }
      }
      .img_wx{
         width: 66rpx;
         height: 66rpx;
      }
    }
  }

  .text {
    padding: 0 50rpx;
    height: 100rpx;
    line-height: 100rpx;
    display: flex;
    justify-content: space-between;
    color: #E50304;
  }

  .login-btn {
    width: 100%;
    height: 80rpx;
    color: #fff;
    background: linear-gradient(86deg, #E50304, #F74300);
    line-height: 80rpx;
    text-align: center;
    font-size: 30rpx;
    margin-top: 50rpx;
    border-radius: 40rpx;
  }

  .wx-btn {
    width: 580rpx;
    height: 80rpx;
    border-radius: 50rpx;
    border: 1rpx solid rgb(222, 81, 28);
    background: #fff;
    color: rgb(222, 81, 28);
    margin-top: 50rpx;
    line-height: 80rpx
  }

  .banquan {
    font-size: 20rpx;
    color: #dedede;
    text-align: center;
    margin-top: 50rpx;
  }

  .bindphone {
    background: #fff;
    width: 550rpx;
    height: 600rpx;
    border-radius: 20rpx;

    view {
      font-size: 35rpx;
      color: #888;
      text-align: center;
      height: 300rpx;
      line-height: 300rpx;
    }

    button {
      width: 60%;
      height: 100rpx;
      margin: 0rpx auto;
      line-height: 100rpx;
      color: #fff;
      font-size: 32rpx;
      border-radius: 20rpx;
      background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
    }
  }

  .btn_plus {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 64rpx;

    .itembtn {
      flex: 1;
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
      padding: 20rpx 40rpx;
      border-bottom: 4rpx solid #fff;
      text-align: center;
    }

    .b-b {
      border-bottom: 4rpx solid #E50304;
      color: #333333 !important;
    }
  }
</style>
