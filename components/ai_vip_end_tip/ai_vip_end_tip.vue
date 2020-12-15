<template>
  <view class="end_tip" v-if="is_show" @click="closeClick">
    <image class="endtipclose" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/endtipclose.png" mode="widthFix"></image>
    <image class="endtipbody" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/endtipbody.png" mode="widthFix" @click.stop="pageToVip"></image>
    <image class="endtipbtn" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/endtipbtn.png" mode="widthFix"  @click.stop="pageToVip"></image>
  </view>
</template>

<script>
  export default {
    props: {
      is_show: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      closeClick: function() {
        this.$emit('CloseClickChild')
      },
      pageToVip: function() {
        uni.navigateTo({
          url:'/pages/person/vip'
        })
      }
    }
  }
</script>

<style lang="scss">
  .end_tip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: .618);
    z-index: 999;

    .endtipclose {
      width: 67rpx;
      position: absolute;
      top: 10%;
      right: 10%;
      z-index: 10;
    }

    .endtipbody {
      width: 561rpx;
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -30%);
    }

    .endtipbtn {
      width: 373rpx;
      position: absolute;
      bottom: 15%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
