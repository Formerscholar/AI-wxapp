<template>
  <view class="changePass">
    <image class="bg2" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/registe_bg.png" mode="widthFix"></image>
    <view class="registe">
      <view class="zhanhao">
        <input type="text" v-model="new_mobile" placeholder="请输入新手机号" />
        <image @click="new_mobile = ''" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/input_del.png" v-show="new_mobile.length>0"
          mode="widthFix"></image>
      </view>
      <view class="setcode">
        <input class="code" type="text" v-model="code2" placeholder="验证码" />
        <text class="getCode" @click="getcode2">{{getText}}</text>
      </view>
      <button class="loginClick" type="default" @click="baocun">修改</button>
    </view>
  </view>
	<!-- <view class="container">
    <view class="reg">
      <input type="text" v-model="new_mobile" placeholder="请输入新手机" placeholder-style="color:#dedede" />
      <image @click="del(1)" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/del2.png" v-show="new_mobile.length > 0" mode=""></image>
    </view>
    <view class="yzcode">
      <input type="text" v-model="code2" placeholder="请输入验证码" placeholder-style="color:#dedede" />
      <button @click="getcode2()">{{ codeStr2 }}</button>
    </view>
    <button class="btn" @click="baocun()">修改</button>
	</view> -->
</template>

<script>
export default {
	data() {
		return {
      getText: '发送验证码',
			new_mobile: '',
			code2: '',
      type: '',
      toType: '',
		};
	},
	onLoad(options) {
    const {
      type
    } = options
    this.toType = type
		if (uni.getStorageSync('userInfo').token) {
			this.token = uni.getStorageSync('userInfo').token;
      this.type = uni.getStorageSync('type');
		}
	},
	methods: {
		baocun() {
			var reg = /^1[2|3|4|5|8]\d{9,}/;
			if (!reg.test(this.new_mobile)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none'
				});
				return;
			}
			if (!this.code2) {
				uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});
				return;
			}
			let data = {
				new_mobile: this.new_mobile,
				verify_code: this.code2
			};
      var res
      if(this.type == 4){
        res = this.$api.change_mobile(data)
      }else{
        res = this.$api.teacher_change_mobile(data)
      }
      res.then(res => {
				console.log(res);
				if (res.code == 200) {
					uni.showToast({
						title: '修改成功！'
					});
					setTimeout(() => {
            if (this.toType = 'index') {
              uni.switchTab({
                url: '/pages/index/index'
              })
            } else{
              uni.navigateBack({
                delta:1
              })
            }
					}, 1000);
				} else {
					uni.showToast({
							title:res.msg,
							icon:'none'
					})
				}
			});
		},
		getcode2() {
      let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
      if (!reg.test(this.new_mobile)) {
      	uni.showToast({
      		title: '请输入正确的手机号',
      		icon: 'none'
      	});
      	return;
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
			if(this.type == 4){
			  this.$api.get_verify_code({  type: 'update', mobile: this.new_mobile });
			}else{
			  this.$api.get_teacher_verify_code({  type: 'update', mobile: this.new_mobile });
			}
			uni.showToast({
				title: '发送成功,请查看手机！',
				icon: 'none'
			});
		}
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
