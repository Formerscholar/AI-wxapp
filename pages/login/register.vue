<template>
	<view>
		<image class="bg2" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/registe_bg.png" mode="widthFix"></image>
    <view  class="registe">
      <input class="phoneNum" type="text" :value="phone" placeholder="请输入手机号" />
      <view class="setcode">
        <input class="code" type="text" :value="code" placeholder="验证码" />
        <text class="getCode">发送验证码</text>
      </view>
    </view>
  
  </view>
</template>

<script>
export default {
	data() {
		return {
			phone:'',
      code:''
		};
	},
	methods: {
		
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
.registe{
  padding: 0 80rpx;
  
  .phoneNum{
    margin-top: 80rpx;
    height: 80rpx;
    background: #F4F4F4;
    border-radius: 38rpx;
    padding-left: 50rpx;
    box-sizing: border-box;
  }
  .setcode{
    position: relative;
    .getCode{
      position: absolute;
      right: 50rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

</style>
