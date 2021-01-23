<template>
  <view id="idstudentAnalys">
    <view class="top_box">
      <view class="lf_box">
        <view class="subject">
          【{{subject}}】
        </view>
        <view class="analys">
          {{itemData.title}}
        </view>
      </view>
      <view class="rf_box">{{itemData.count}}道错题</view>
    </view>
    <view class="content">
      <uni-collapse v-for="item in knowPointExercises" :key="item.user_id">
        <uni-collapse-item :thumb="item.user_info.avatar_file" :title="item.user_info.true_name" :is_vip="item.user_info.is_vip == 1 ? true : false" :count="item.exercise_count">
          <rich-text class="collapse_warp" v-for="item1 in item.exercises" :key="item1.id" :nodes="changeStyle(item1.content_all)"></rich-text>
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>

<script>
  import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
  import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
  export default {
    components: {
      uniCollapse,
      uniCollapseItem
    },
    data() {
      return {
        itemData: {},
        subject: '',
        team_id: '',
        start_time: '',
        end_time: '',
        knowPointExercises: []
      }
    },
    onLoad(options) {
      // itemData={"id":4133,"title":"一元二次方程的定义","count":3,"proportion":50}&team_id=226&start_time=2021-01-12&end_time=2021-01-18
      this.itemData = JSON.parse(options.itemData)
      this.team_id = options.team_id
      this.start_time = options.start_time
      this.end_time = options.end_time
      this.getDataDetail()
    },
    methods: {
      changeStyle(item) {
        item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
        item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
        return item;
      },
      getDataDetail() {
        this.$api.teacher_AcademicReport_KnowledgeDetail({
          start_time: this.start_time,
          end_time: this.end_time,
          team_id: this.team_id,
          knowledge_id: this.itemData.id
        }).then(res => {
          this.subject = res.data.subject_name
          this.knowPointExercises = res.data.knowPointExercises
        })
      }
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

    .content {
      padding: 24rpx;
      box-sizing: border-box;
      height: 100vh;

      .collapse_warp {
        margin-top: 30rpx;
        border-top: 1px solid #E5E5E5;
        padding-top: 30rpx;
      }
    }
  }
</style>
