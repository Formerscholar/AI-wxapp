<template>
  <view>
    <image class="bg2" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/registe_bg.png" mode="widthFix"></image>
    <view class="registe">
      <input class="phoneNum" type="text" v-model="phone"  placeholder="请输入手机号" />
      <view class="setcode">
        <input class="code" type="text" v-model="code" placeholder="验证码" />
        <text class="getCode" @click="getCodeClick">发送验证码</text>
      </view>
      <input class="passwordNum" type="password" v-model="password" placeholder="请设置登录密码" />
      <button class="loginClick" type="default" @click="loginClick">注册并登录</button>
      <radio-group @change="radioChange">
        <label class="radio_warp">
          <radio value="1" :checked="isCheck" color="#E50304" />
          <view class="text"> 注册即视为同意<text class="pageTo" @click.stop="pagetoAbout">《注册协议》</text></view>
        </label>
      </radio-group>
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
        phone: '',
        code: '',
        password: '',
        isCheck: 0,
        type:0,//4学生3老师
      };
    },
    onLoad(options) {
      const {type} = options
      console.log('options',options)
      this.type = type
    },
    methods: {
      ...mapMutations(['login', 'set_type']),
      radioChange: function(evt) {
        this.isCheck = evt.target.value
      },
      getCodeClick: function(){
        let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
        if (!reg.test(this.phone)) {
          uni.showToast({
            icon:'none',
            title:'手机号不合法,请重新输入'
          })
          return
        }
        var data = {
          mobile:this.phone,
          type:'register'
        }
        var reslove 
        if (this.type == 4) {
         reslove = this.$api.get_app_verify_code(data)
        } else{
         reslove = this.$api.get_app_teacher_verify_code(data)
        }
        reslove.then(res=>{
          if (res.code == 200) {
            uni.showToast({
              icon:'none',
              title:'验证码已发送'
            })
          } else{
            uni.showToast({
              icon:'none',
              title: res.msg
            })
          }
        })
      },
      loginClick:function(){
        if(!this.isCheck){
          uni.showToast({
            icon:'none',
            title:'请阅读并同意注册协议!'
          })
          return
        }
        if(!this.code) {
          uni.showToast({
            icon:'none',
            title:'验证码不能为空!'
          })
          return
        }
        if(!this.password) {
          uni.showToast({
            icon:'none',
            title:'密码不能为空!'
          })
          return
        }
        
        var data = {
          mobile:this.phone,
          password:this.password,
          verify_code:this.code
        }
        var reslove 
        if (this.type == 4) {
         reslove = this.$api.get_app_user_register(data)
        } else{
         reslove = this.$api.get_app_teacher_register(data)
        }
        reslove.then(res => {
          if (res.code == 200) {
            this.login(res.data)
            uni.showToast({
              title: '登录成功,请绑定信息'
            })
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages/login/bind_info'
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
      pagetoAbout:function(){
        uni.navigateTo({
            url: "/pages/login/agreement"
        });
      }
    }
  };
</script>

<style lang="scss">
  page {
    background: #fff;
    font-family: PingFang SC;
  }

  .bg2 {
    width: 100%;
  }

  .registe {
    padding: 0 80rpx;

    .phoneNum {
      margin-top: 80rpx;
      height: 80rpx;
      background: #F4F4F4;
      border-radius: 38rpx;
      padding-left: 50rpx;
      box-sizing: border-box;
    }

    .setcode {
      position: relative;
      margin-top: 39rpx;

      .code {
        height: 80rpx;
        background: #F4F4F4;
        border-radius: 38rpx;
        padding-left: 50rpx;
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

    .passwordNum {
      margin-top: 39rpx;
      height: 80rpx;
      background: #F4F4F4;
      border-radius: 38rpx;
      padding-left: 50rpx;
      box-sizing: border-box;
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

    .radio_warp {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 30rpx;
      padding-left: 50rpx;

      .text {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 15rpx;

        .pageTo {
          color: #E50304;
        }
      }
    }

  }
</style>
