<template>
  <view class="changePass">
    <image class="bg2" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/registe_bg.png" mode="widthFix"></image>
    <view class="registe">
      <view class="zhanhao">
        <input type="text" v-model="phone" placeholder="请输入手机号" />
        <image @click="phone = ''" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/input_del.png" v-show="phone.length>0"
          mode="widthFix"></image>
      </view>
      <view class="setcode">
        <input class="code" type="text" v-model="code" placeholder="验证码" />
        <text class="getCode" @click="getCodeClick">{{getText}}</text>
      </view>
      <button class="loginClick" type="default" @click="loginClick">绑定</button>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    data() {
      return {
        type: 0,
        phone: '',
        code: '',
        getText: '发送验证码',
        openid:''
      };
    },
    onLoad(options) {
      this.type =  uni.getStorageSync('type');
      const {
        openid
      } = options
      this.openid = openid
    },
    methods: {
       ...mapMutations(['login', 'set_type']),
      getCodeClick: function() {
        let reg =
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
        if (!reg.test(this.phone)) {
          uni.showToast({
            icon: 'none',
            title: '手机号不合法,请重新输入'
          })
          return
        }
        let num = 60
        let OutTimeinval = setInterval(() => {
          if (num == 0) {
            this.getText = '发送验证码'
            clearInterval(OutTimeinval)
          } else {
            this.getText = `${--num}秒后重试`
          }
        }, 1000)
        var data = {
          mobile: this.phone,
          type: 'update'
        }
        var reslove
        if (this.type == 4) {
          reslove = this.$api.get_app_verify_code(data)
        } else {
          reslove = this.$api.get_app_teacher_verify_code(data)
        }
        reslove.then(res => {
          if (res.code == 200) {
            uni.showToast({
              icon: 'none',
              title: '验证码已发送'
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      loginClick: function() {
        if (!this.code) {
          uni.showToast({
            icon: 'none',
            title: '验证码不能为空!'
          })
          return
        }
        var data = {
          mobile: this.phone,
          verify_code: this.code,
          openid:this.openid
        }
        var reslove
        if (this.type == 4) {
          reslove = this.$api.get_bind_mobile(data)
        } else {
          reslove = this.$api.get_teacher_bind_mobile(data)
        }
        reslove.then(res => {
          if (res.code == 200) {
            this.login(res.data)
            uni.showToast({
              title: '绑定成功!'
            })
            if (!res.data.is_bind) {
              setTimeout(() => {
                uni.navigateTo({
                  url: '/pages/login/bind_info'
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
      },
    }
  };
</script>

<style lang="scss">
  page {
    background: #fff;
    font-family: PingFang SC;
    width: 100vw;
    height: 100vh;
  }

  button::after {
    border: none;
  }

  .changePass {
    .bg2 {
      width: 100%;
    }

    .registe {
      padding: 0 80rpx;

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

        input {
          width: 80%;
          height: 80rpx;
        }

        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 30rpx;
        }
      }

      .setcode {
        position: relative;
        margin-top: 39rpx;

        .code {
          height: 80rpx;
          background: #F4F4F4;
          border-radius: 38rpx;
          padding-left: 30rpx;
          box-sizing: border-box;
        }

        .getCode {
          position: absolute;
          right: 50rpx;
          top: 50%;
          transform: translateY(-50%);
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E50304;
          z-index: 11;
        }
      }



      .loginClick {
        margin-top: 60rpx;
        height: 80rpx;
        background: linear-gradient(86deg, #E50304, #F74300);
        border-radius: 40rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;

      }

    }
  }
</style>
