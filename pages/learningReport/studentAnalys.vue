<template>
  <div id="idstudentAnalys">
    <div class="top_box">
      <div class="lf_box">
        <div class="subject">
          【数学】
        </div>
        <div class="analys">
          不等式的解与解集
        </div>
      </div>
      <div class="rf_box">8道错题</div>
    </div>
    <div class="content">
      content
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        itemData: {},
        subject: '',
        team_id: '',
        start_time: '',
        end_time: ''
      }
    },
    onLoad(options) {
      // subject=数学&itemData={"id":4133,"title":"一元二次方程的定义","count":3,"proportion":50}&team_id=226&start_time=2021-01-12&end_time=2021-01-18
      console.log('options', options)
      this.itemData = JSON.parse(options.itemData)
      this.subject = options.subject
      this.team_id = options.team_id
      this.start_time = options.start_time
      this.end_time = options.end_time
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  #idstudentAnalys {
  background-color: #F8F8F8;

    .top_box {
      width: 100%;
      height: 70rpx;
      background-color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #CBCBCB;
      padding: 0 24rpx;
      box-sizing: border-box;

      .lf_box {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .subject {
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #E50304;

        }

        .analys {
          font-size: 30rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #303030;
          margin-left: 20rpx;
        }
      }

      .rf_box {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;

      }
    }
    .content{
      
    }
  }
</style>
