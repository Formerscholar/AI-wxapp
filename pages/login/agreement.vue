<template>
  <view v-html="agreement"></view>
</template>

<script>
  export default {
    data() {
      return {
        agreement: null
      };
    },
    onLoad() {
      this.get_agreements()
    },
    methods: {
      get_agreements: function() {
        this.$api.get_agreement({
          type: 'register'
        }).then(res => {
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
</style>
