<template>
  <view class="end_tip" v-if="is_show" @click="closeClick">
    <image class="endtipclose" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/endtipclose.png" mode="widthFix"></image>
    <image class="endtipbody" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/endtipbody.png" mode="widthFix" @click.stop="pageToVip"></image>
    <!-- <image class="endtipbtn" src="https://aictb.oss-cn-shanghai.aliyuncs.com/App/endtipbtn.png" mode="widthFix"  @click.stop="pageToVip"></image> -->
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: .618);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .endtipclose {
      width: 67rpx;
      z-index: 10;
      position: absolute;
      right: 10%;
      top: 15%;
    }

    .endtipbody {
      width: 561rpx;
    }
  }
</style>
