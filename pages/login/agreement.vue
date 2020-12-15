<template>
  <view class="agreement" v-html="agreement"></view>
</template>

<script>
  export default {
    data() {
      return {
        agreement: '',
        type:''
      };
    },
    onLoad(options) {
      const {type} = options
      console.log('options',options)
      this.type = type
    },
    onShow() {
      this.get_agreements()
    },
    methods: {
      get_agreements: function() {
        this.$api.get_agreement({
          type: this.type
        }).then(res => {
          console.log(res.data)
          this.agreement = res.data.content
        })
      }
    }
  };
</script>

<style lang="scss">
  page {
    background: #fff;
  }
  .agreement{
    padding: 15rpx;
  }
</style>
