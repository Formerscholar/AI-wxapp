<template>
  <view :class="{ 'uni-collapse-cell--disabled': disabled,'uni-collapse-cell--notdisabled': !disabled, 'uni-collapse-cell--open': isOpen,'uni-collapse-cell--hide':!isOpen }"
    class="uni-collapse-cell">
    <view class="uni-collapse-cell__title" @click="onClick">
      <view class="uni-collapse-cell__title-lt">
        <image v-if="thumb" :src="thumb" class="uni-collapse-cell__title-img" />
        <text class="uni-collapse-cell__title-text">{{ title }}
        </text>
        <image  v-if="is_vip" src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/vipIcon.png" class="uni-collapse-cell__title-vip" />
      </view>
      <view class="rt_warp">
        <text class="uni-collapse-cell__title-arrow-text">已收集{{count}}道错题</text>
        <!-- #ifdef MP-ALIPAY -->
        <view :class="{ 'uni-collapse-cell__title-arrow-active': isOpen, 'uni-collapse-cell--animation': showAnimation === true }"
          class="uni-collapse-cell__title-arrow">
          <uni-icons color="#bbb" size="20" type="arrowdown" />
        </view>
        <!-- #endif -->
        <!-- #ifndef MP-ALIPAY -->
        <uni-icons :class="{ 'uni-collapse-cell__title-arrow-active': isOpen, 'uni-collapse-cell--animation': showAnimation === true }"
          class="uni-collapse-cell__title-arrow" color="#bbb" size="20" type="arrowdown" />
        <!-- #endif -->
      </view>
    </view>
    <view :class="{'uni-collapse-cell__content--hide':!isOpen}" class="uni-collapse-cell__content">
      <view :class="{ 'uni-collapse-cell--animation': showAnimation === true }" class="uni-collapse-cell__wrapper"
        :style="{'transform':isOpen?'translateY(0)':'translateY(-50%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-50%)'}">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
  import uniIcons from '../uni-icons/uni-icons.vue'
  export default {
    name: 'UniCollapseItem',
    components: {
      uniIcons
    },
    props: {
      title: {
        // 列表标题
        type: String,
        default: ''
      },
      name: {
        // 唯一标识符
        type: [Number, String],
        default: 0
      },
      count:{
        type: [Number, String],
        default: 0
      },
      disabled: {
        // 是否禁用
        type: Boolean,
        default: false
      },
      showAnimation: {
        // 是否显示动画
        type: Boolean,
        default: false
      },
      open: {
        // 是否展开
        type: Boolean,
        default: false
      },
      thumb: {
        // 缩略图
        type: String,
        default: ''
      },
      is_vip:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpen: false
      }
    },
    watch: {
      open(val) {
        this.isOpen = val
      }
    },
    inject: ['collapse'],
    created() {
      this.isOpen = this.open
      this.nameSync = this.name ? this.name : this.collapse.childrens.length
      this.collapse.childrens.push(this)
      if (String(this.collapse.accordion) === 'true') {
        if (this.isOpen) {
          let lastEl = this.collapse.childrens[this.collapse.childrens.length - 2]
          if (lastEl) {
            this.collapse.childrens[this.collapse.childrens.length - 2].isOpen = false
          }
        }
      }
    },
    methods: {
      onClick() {
        if (this.disabled) {
          return
        }
        if (String(this.collapse.accordion) === 'true') {
          this.collapse.childrens.forEach(vm => {
            if (vm === this) {
              return
            }
            vm.isOpen = false
          })
        }
        this.isOpen = !this.isOpen
        this.collapse.onChange && this.collapse.onChange()
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/uni.scss';

  .uni-collapse-cell {
    flex-direction: column;
    border-color: #fff;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }


  .uni-collapse-cell--hover {
    background-color: #fff;
  }

  .uni-collapse-cell--open {
    background-color: #fff;
  }

  .uni-collapse-cell--disabled {
    background-color: #fff;
    // opacity: 0.3;
  }


  .uni-collapse-cell--hide {
    height: 48px;
  }

  .uni-collapse-cell--animation {
    // transition: transform 0.3s ease;
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .uni-collapse-cell__title {
    padding: 12px 12px;
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    width: 100%;
    box-sizing: border-box;
    /* #endif */
    height: 48px;
    line-height: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .uni-collapse-cell__title-lt{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .uni-collapse-cell__title:active {
    background-color: $uni-bg-color-hover;
  }
  .uni-collapse-cell__title-arrow-text{
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-right: 10rpx;
  }

  .uni-collapse-cell__title-img {
    height: 80rpx;
    width: 80rpx;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
  }

  .uni-collapse-cell__title-arrow {
    width: 20px;
    height: 20px;
    transform: rotate(0deg);
    transform-origin: center center;

  }

  .uni-collapse-cell__title-arrow-active {
    transform: rotate(180deg);
  }

  .uni-collapse-cell__title-text {
    font-size: $uni-font-size-base;
    /* #ifndef APP-NVUE */
    white-space: nowrap;
    color: inherit;
    /* #endif */
    /* #ifdef APP-NVUE */
    lines: 1;
    /* #endif */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .uni-collapse-cell__title-vip{
    width: 42rpx;
    height: 20rpx;
    margin-left: 20rpx;
  }

  .uni-collapse-cell__content {
    overflow: hidden;
  }

  .uni-collapse-cell__wrapper {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
  }

  .uni-collapse-cell__content--hide {
    height: 0px;
    line-height: 0px;
  }
</style>
