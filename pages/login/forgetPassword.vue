<template>
  <view class="changePass">
    <image class="bg2" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/registe_bg.png" mode="widthFix"></image>
    <view class="registe">
      <view class="zhanhao">
        <input :password="!pass_show2" v-model="passwordold" placeholder="请输入旧密码" />
        <image @click="pass_show2 = true" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/pass_false.png" v-if="!pass_show2"
          mode="widthFix"></image>
        <image @click="pass_show2 = false" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/pass_true.png" v-else
          mode="widthFix"></image>
      </view>
      <view class="zhanhao">
        <input :password="!pass_show" v-model="password" placeholder="请输入新密码" />
        <image @click="pass_show = true" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/pass_false.png" v-if="!pass_show"
          mode="widthFix"></image>
        <image @click="pass_show = false" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/pass_true.png" v-else
          mode="widthFix"></image>
      </view>
      <view class="zhanhao">
        <input :password="!pass_show1" v-model="password1" placeholder="请输入新密码" />
        <image @click="pass_show1 = true" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/pass_false.png" v-if="!pass_show1"
          mode="widthFix"></image>
        <image @click="pass_show1 = false" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/pass_true.png" v-else
          mode="widthFix"></image>
      </view>
      <button class="loginClick" type="default" @click="loginClick">提交</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        type: 0,
        passwordold: '',
        password: '',
        password1: '',
        pass_show: false,
        pass_show1: false,
        pass_show2: false,
        token:''
      };
    },
    onLoad(options) {
      const {
        type
      } = options
      console.log('options', options)
      this.type = type
      this.token = uni.getStorageSync('userInfo').token;
    },
    methods: {
      loginClick: function() {
        if (!this.passwordold) {
          uni.showToast({
            icon: 'none',
            title: '旧密码不能为空!'
          })
          return
        }
        if (!this.password) {
          uni.showToast({
            icon: 'none',
            title: '新密码不能为空!'
          })
          return
        }
        if (!this.password1) {
          uni.showToast({
            icon: 'none',
            title: '新密码不能为空!'
          })
          return
        }
        if (this.password != this.password1) {
          uni.showToast({
            icon: 'none',
            title: '两次新密码输入不一致!'
          })
          return
        }
        var data = {
          token: this.token,
          old_password: this.passwordold,
          password: this.password,
          password_again: this.password1,
        }
        var reslove
        if (this.type == 4) {
          reslove = this.$api.get_app_user_edit_password(data)
        } else {
          reslove = this.$api.get_app_teacher_edit_password(data)
        }
        reslove.then(res => {
          if (res.code == 200) {
            uni.showToast({
              icon:'success',
              title: '修改成功'
            })
            setTimeout(() => {
              uni.navigateBack({
                delta:1
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
