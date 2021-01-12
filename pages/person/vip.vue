<template>
  <view class="container">
    <view class="bg2"></view>
    <view class="card">
      <view class="price" v-if="platform != 'ios'">
        <view class="original" v-if="is_discount">￥{{ price }}</view>
        <view class="discount">￥{{ info.vip_money ? info.vip_money : '' }}</view>
      </view>
      <view class="time" v-if="info.user_vip_end_time">到期时间：{{ info.user_vip_end_time }}</view>
      <view class="time" v-if="!info.user_vip_end_time">到期时间：未开通</view>
    </view>
    <view class="b-title">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon1.png" />
      <text>电子错题本下载</text>
      <text>节省时间、方便快捷</text>
    </view>
    <view class="b-title">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon2.png" />
      <text>下载举一反三相似题</text>
      <text>加强同类知识点训练，提高学校效率</text>
    </view>
    <view class="b-title">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon3.png" />
      <text>查看答案和解析</text>
      <text>了解解题思路，掌握知识结构</text>
    </view>
    <view class="b-title">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon4.png" />
      <text>查看和下载名校资源</text>
      <text>拓展训练，方便区域错位比较</text>
    </view>
    <view class="b-title">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon6.png" />
      <text>知识库资源任意组卷和下载</text>
      <text>丰富学习资源，拓展训练好帮手</text>
    </view>
    <view class="b-title">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon5.png" />
      <text>学情报告统计错题数据</text>
      <text>总结学习过程，方便提优补差</text>
    </view>
    <!-- #ifdef APP-PLUS -->
    <view class="redio_warp" v-if="platform != 'ios'">
      <text class="redio_title">
        选择支付方式
      </text>
      <radio-group @change="e=> pay_type = e.target.value">
        <label class="item_redio_box" >
          <view class="item_redio_box_body">
            <image class="pay_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/wc_pay_icon.png" mode="widthFix"></image>
            <text class="item_redio_box_text">微信支付</text>
          </view>
            <radio value="wxpay" checked color="#E50304" />
        </label>
        <label class="item_redio_box" >
          <view class="item_redio_box_body">
            <image class="pay_icon" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/zfb_pay_icon.png" mode="widthFix"></image>
            <text class="item_redio_box_text">支付宝支付</text>
          </view>
            <radio value="alipay" color="#E50304" />
        </label>
      </radio-group>
    </view>
    <!-- #endif -->
    <view class="xufei" @click="pay()" v-if="platform != 'ios'">
      <text>{{ userInfo.is_vip ? '立即续费' : '开通会员' }}</text>
    </view>
    <view class="ios_tip" v-else>
      由于相关规范，IOS暂不可购买会员!
      <view class="paddbot">

      </view>
    </view>
  </view>
</template>

<script>
  const app = getApp();
  export default {
    data() {
      return {
        userInfo: {},
        info: {},
        price: 0,
        is_discount: 1,
        is_vip: 0,
        tpmid: '',
        platform: '',
        pay_type:'wxpay'
      };
    },
    onLoad() {
      this.token = uni.getStorageSync('userInfo').token;
      this.userInfo = uni.getStorageSync('userInfo');
      this.price = app.globalData.settings.vip_money;
      this.tpmid = app.globalData.settings.tmpid;
      console.log('this.tpmid', this.tpmid);
      this.platform = app.globalData.systemInfo.platform
      if (this.platform == 'ios') {
        uni.setNavigationBarTitle({
          title: '会员特权'
        });
      } else {
        uni.setNavigationBarTitle({
          title: '开通会员'
        });
      }
    },
    onShow() {
      this.get_info();
    },
    methods: {
      get_info() {
        this.$api.vip_info({
          token: this.token
        }).then(res => {
          console.log(res);
          this.info = res.data;
          if (res.data.vip_money == this.price) {
            this.is_discount = 0;
          }
        });
      },
      pay() {
        // #ifdef MP-WEIXIN
        uni.requestSubscribeMessage({
          tmplIds: this.tpmid.vip_notice,
          complete: res => {
            this.login_pay();
          },
          success: res => {},
          fail: function(res) {}
        });
        // #endif
        // #ifdef APP-PLUS
          this.login_pays()
        // #endif
      },
      login_pays(){
        this.$api.get_app_pay({ type: this.pay_type })
        .then(reslove => {
			console.log(reslove)
          if (reslove.code != 200) {
            uni.showModal({
              title: '温馨提示',
              content: reslove.msg,
              showCancel: false
            })
          } else {
            uni.requestPayment({
              provider: this.pay_type,
              orderInfo: reslove.data, //微信、支付宝订单数据
              success: function (res) {
                  console.log('success:' + JSON.stringify(res));
              },
              fail: function (err) {
                  console.log('fail:' + JSON.stringify(err));
              }
            });
          }
        });
      },
      login_pay() {
        this.$api.app_pay({
          platform: app.globalData.systemInfo.platform,
        }).then(reslove => {
          if (reslove.code != 200) {
            uni.showModal({
              title: '温馨提示',
              content: reslove.msg,
              showCancel: false
            })
          } else {
            let wx_pay = reslove.data.wx_pay;
            uni.requestPayment({
              provider: 'wxpay',
              timeStamp: wx_pay.timeStamp,
              nonceStr: wx_pay.nonceStr,
              package: wx_pay.package,
              signType: 'MD5',
              paySign: wx_pay.paySign,
              success: res => {
                console.log(res);
                uni.setStorage({
                  key: 'is_vip',
                  data: 1
                });
              },
              fail: err => {
                console.log(err);
              }
            });
          }
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

  .bg2 {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 150rpx;
    background: #e50304;
  }

  .card {
    background: url(https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vip-bg.png) no-repeat top left;
    background-size: cover;
    width: 700rpx;
    height: 244rpx;
    border-radius: 12rpx;
    margin: 25rpx auto 50rpx;
    position: relative;

    .price {
      font-size: 40rpx;
      position: absolute;
      bottom: 25%;
      right: 80rpx;

      .discount {
        color: rgba(225, 1, 1, 1);
        transform: translateY(-50%);
        color: #fff;
      }

      .original {
        text-decoration: line-through;
        color: rgba(89, 87, 87, 1);
        margin-bottom: 20rpx;
      }
    }

    .nick {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 17rpx;
      right: 28rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: rgba(89, 87, 87, 1);

      image {
        width: 97rpx;
        height: 97rpx;
        border-radius: 50%;
      }
    }

    .time {
      position: absolute;
      left: 60rpx;
      bottom: 30rpx;
      font-size: 22rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #cdc4c4;
    }
  }

  .redio_warp {
    margin: 0 55rpx;
    margin-top: 62rpx;
    padding-top: 50rpx;
    border-top: 1px solid #e5e5e5;
    .redio_title{
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .item_redio_box{
      margin-top: 50rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .item_redio_box_body{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        .pay_icon{
          width: 70rpx;
          height: 70rpx;
          margin-right: 24rpx;
        }
        .item_redio_box_text{
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;

        }
      }
    }
      
    
  }


  .xufei {
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 50rpx auto;
    background-image: linear-gradient(left, #e50304 0%, #f74300 80%);
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text:first-child {
      font-size: 30rpx;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
    }

    // text:last-child{
    // 	font-size:17rpx;
    // 	font-weight:400;
    // 	color:rgba(255,255,255,1);
    // }
  }

  .ios_tip {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    border-top: 1px solid #E5E5E5;
    padding-top: 45rpx;
    margin: 0 55rpx;
    margin-top: 60rpx;
    text-align: center;

    .paddbot {
      height: 90rpx;
      width: 100%;
      background-color: #fff;
    }
  }


  .b-title {
    width: 659rpx;
    height: 129rpx;
    background: #fff;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    padding: 20rpx 30rpx 0 120rpx;

    image {
      position: absolute;
      left: 30rpx;
      top: 50%;
      width: 60rpx;
      height: 55rpx;
      transform: translateY(-50%);
    }

    text:nth-of-type(1) {
      display: block;
      font-size: 28rpx;
      font-weight: bold;
      color: rgba(89, 87, 87, 1);
    }

    text:nth-of-type(2) {
      display: block;
      font-size: 28rpx;
      margin-top: 8rpx;
      color: #cdcdcd;
    }
  }
  

  .b-t {
    text-align: center;
    font-size: 14rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(89, 87, 87, 1);
    margin-top: 35rpx;
  }
</style>
