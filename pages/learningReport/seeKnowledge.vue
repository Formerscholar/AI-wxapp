<template>
  <view>
    <view class="item" v-for="(item, i) of list" :key="i" v-if="list.length != 0">
      <view class="subtitle">
        <div class="div">
          <text class="div_text">【{{ subject_name ? subject_name : '' }}】</text>
          <text class="div_txt"> {{ title }} </text>
        </div>
        <div class="cont">
          {{count}}道错题
        </div>
      </view>

      <view class="rich-text-box" @click.stop="jiexi(item.exercises_id,6)">
        <rich-text class="rich-text-content" :nodes="changeStyle(item.get_exercises.content_all)"></rich-text>
        <!-- <uParse :content="item.content"/> -->
      </view>
      <view class="bottom">
        <view class="select" @click.stop="open(item)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/tongLei.png" mode="" />
          同类型题目
        </view>
        <view class="btn" :class="{ 's-b': item.is_error }" v-if="update" @click.stop="join_error(i, item.id)">
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRuDefault.png" mode="" v-if="!item.is_error" />
          <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRu.png" mode="" v-else />
          {{ item.is_error ? '取消加入'  : '加入错题' }}
        </view>
      </view>
    </view>
    <view v-if="is_more == 0" class="is_more">没有更多{{ type == 3 ? '试卷' : '错题' }}了</view>
    <view class="kong" v-if="!list || list.length == 0">
      <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/bg/noPaper.png" />
      <view>空空如也~</view>
      <view v-if="!is">无相关教辅内容查看哦!</view>
      <view v-else>无相关试卷内容查看哦!</view>
    </view>
    <uni-popup ref="popup" type="center">
      <view class="leixing">
        <view class="title">
          <view class="sameType">
            <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/sameType.png"></image>
            同类型题目
          </view>
          <view class="change" @click="changeData()">
            <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/change.png"></image>
            换一批
          </view>
        </view>
        <scroll-view scroll-y="true">
          <view class="list" v-for="(item, i) of same_type" :key="i" v-if="same_type.length != 0">
            <view class="">
              <rich-text :nodes="changeStyle(item.content_all)"></rich-text>
              <!-- <uParse :content="item.content"/> -->
            </view>
            <view class="btnCon">
              <view @click="jiexi(item.id,5)">
                <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiexi.png"></image>
                查看解析
              </view>
              <view></view>
              <view :class="{ 's-b': item.is_error }" v-if="update" @click="join_error2(i, item.id)">
                <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRuDefault.png" mode="" v-if="!item.is_error" />
                <image src="https://aictb.oss-cn-shanghai.aliyuncs.com/wx_xcx/icon/jiaRu.png" mode="" v-else />
                {{ item.is_error ? '取消加入' : type == 3 ? '加入试卷' : '加入错题' }}
              </view>
            </view>
          </view>
        </scroll-view>

        <view class="button">
          <button @click="hiddenmodal">取消</button>
          <button @click="hiddenmodal">确认</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  // import uParse from '@/components/u-parse/u-parse.vue'
  import uniPopup from '@/components/uni-popup/uni-popup.vue';
  export default {
    components: {
      uniPopup
    },
    data() {
      return {
        token: '',
        based_id: '',
        list: [],
        is_more: 1,
        page: 1,
        update: true,
        same_type: [],
        type: 4,
        subject: '',
        title: '',
        subject_name: '',
        status: '',
        page_change: 1,
        size_change: 5,
        know_point: '',
        subject_id: '',
        exercises_id: '',
        is: '',
        count: ''
      };
    },
    onReachBottom() {
      if (this.st == 1) {
        this.page++;
        this.get_errorbook_exercises();
      } else if (this.st != 1 && this.status != 'photo') {
        this.page++;
        this.get_list();
      }
    },
    onshow() {
      this.page_change = 1;
    },
    onLoad(options) {
      console.log('options', options);
      this.type = uni.getStorageSync('type');
      // this.subject = options.subject;
      this.title = options.title;
      this.count = options.count
      this.subject_name = options.subject_name;
      // this.status = options.status;
      // this.is = options.is;
      this.start_time = options.start_time
      this.end_time = options.end_time
      this.konw_id = options.id
      this.based_id = options.subject_id;
      if (uni.getStorageSync('token')) {
        this.token = uni.getStorageSync('token');
      }
      this.get_list();
    },
    /* onBackPress(e) {
    		
    	}, */
    methods: {
      //拍照返回
      /* backToMyteaching(){
      		uni.navigateBack({
      			delta: 2  
      		});
      	}, */
      changeStyle(item) {
        item = item.replace(new RegExp('<p', 'gi'), '<p style="color: #000;position:relative"');
        item = item.replace(new RegExp('<img', 'gi'), '<img style="max-width:95%;vertical-align: middle;width:auto;"');
        return item;
      },
      //修改标题
      changeTitle(title) {
        uni.setNavigationBarTitle({
          title: title
        });
      },
      //换一批
      changeData() {
        this.page_change++;
        this.open();
      },
      //查看解析
      jiexi(id, source) {
        uni.navigateTo({
          // url:'/pages/person/ListStudents?name='+item.team_name+'&team_id='+item.team_id
          url: '/pages/knowledgeBase/watchExplane?id=' + id + '&source=' + source
        });
      },
      //试卷内容列表
      get_errorbook_exercises() {
        if (uni.getStorageSync('type') == 3) {
          //生成的错题本查看（老师）
          var req = this.$api.get_teacher_errorbook_exercises({
            token: this.token,
            page: this.page,
            errorbook_id: this.based_id
          });
        } else {
          //生成的错题本查看（学生）
          var req = this.$api.get_errorbook_exercises({
            token: this.token,
            page: this.page,
            errorbook_id: this.based_id
          });
        }
        req.then(res => {
          this.is_more = res.data.is_more;
          console.log(res);
          if (this.page == 1) {
            this.list = res.data.exercises_list;
          } else {
            this.list = [...this.list, ...res.data.exercises_list];
          }
        });
      },
      get_list() {
        this.$api.my_study_analysis_exercise({
          token: this.token,
          subject_id: this.based_id,
          start_time: this.start_time,
          end_time: this.end_time,
          know_id: this.konw_id,
          page: this.page
        }).then(res => {
          if (this.page == 1) {
            this.list = res.data.knowPointExercises;
          } else {
            this.list = [...this.list, ...res.data.knowPointExercises];
          }
        });
      },
      //打开同类型题目
      open(item, status) {
        if (item) {
          this.exercises_id = item.exercises_id;
        }
        if (status != undefined) {
          this.exercises_id = this.list[status].id;
        }
        let data = {
          token: this.token,
          know_point: this.konw_id,
          type: this.type,
          subject_id: this.based_id,
          id: this.exercises_id,
          page: this.page_change,
        };
        if (uni.getStorageSync('type') == 4) {
          var req = this.$api.same_type(data);
        } else {
          var req = this.$api.teacher_same_type(data);
        }
        req.then(res => {
          console.log(res);
          if (res.code == 200) {
            this.same_type = res.data.exerciseList.data;
            if (!res.data.exerciseList.data.length) {
              this.$refs.popup.close();
              uni.showToast({
                title: '未找到同类型题目',
                icon: 'none'
              });
            } else{
              this.$refs.popup.open();
            }
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        });
      },
      //试卷列表加入错题
      join_error(i, id) {
        console.log('join_error_new', i, id, uni.getStorageSync('type'));
        if (this.list[i].status) {
          this.list[i].status = false;
        } else {
          this.list[i].status = true;
        }
        this.update = false;
        this.update = true;

        if (uni.getStorageSync('type') == 4) {
          var req = this.$api.join_error({
            exercises_id: id,
          });
        } else {
          var req = this.$api.teacher_join_error({
            exercises_id: id
          });
        }
        req.then(res => {
          console.log(res);
          if (res.code == 200) {
            if (this.list[i].is_error) {
              this.list[i].is_error = 0;
            } else {
              this.list[i].is_error = 1;
                if (res.data.is_same_type) {
                  this.open(id, 1);
                } 
            }
          } else {
            uni.showToast({
              title:res.msg,
              icon:'none'
            })
          }
        });
      },
      //同类型列表加入错题
      join_error2(i, id) {
        if (this.same_type[i].status) {
          this.same_type[i].status = false;
        } else {
          this.same_type[i].status = true;
        }
        this.update = false;
        this.update = true;
        if (uni.getStorageSync('type') == 4) {
          var req = this.$api.join_error({
            exercises_id: id,
          });
        } else {
          var req = this.$api.teacher_join_error({
            exercises_id: id,
          });
        }
        req.then(res => {
          console.log(res);
          if (res.code == 200) {
            if (this.same_type[i].is_error) {
              this.same_type[i].is_error = 0;
            } else {
              this.same_type[i].is_error = 1;
            }
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          // if(res.msg=='取消成功！'){
          // 	this.same_type[i].status=false
          // 	this.update=false
          // 	this.update=true
          // }
          // if(res.code==200){
          // 	uni.showToast({
          // 		title:'加入成功'
          // 	})
          // }else{
          // 	uni.showToast({
          // 		title:res.msg,
          // 		icon:'none'
          // 	})
          // }
        });
      },
      //取消/确认
      hiddenmodal() {
        this.$refs.popup.close();
      }
    }
  };
</script>

<style lang="scss">
  page {
    width: 100vw;
    height: 100vh;
    background: #eee;
    font-family: PingFang SC;
  }

  .subtitle {
    height: 70rpx;
    width: 100%;
    background: #fff;
    color: #2c2c2c;
    font-size: 32rpx;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    border-bottom: 1rpx solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    box-sizing: border-box;
    overflow: hidden;
      
    .div {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      .div_text{
        width: 130rpx;
        color: #e50304;
      }
      .div_txt {
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis; 
        white-space:nowrap;
      }
    }

    .cont {
      width: 115rpx;
      color: #666;
      font-size: 26rpx;
      
    }

  }

  .item:nth-of-type(1) {
    margin-top: 95rpx;
  }

  .item {
    padding: 30rpx 30rpx 0;
    box-sizing: border-box;
    width: 700rpx;
    margin: 25rpx;
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #999;
    border-radius: 20rpx;
    border: 1rpx solid #e7e7e7;
    overflow: hidden;

    .rich-text-box {
      .rich-text-content {
        color: #000;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      color: #666666;
      border-top: 1rpx solid #f5f5f5;
      padding: 15rpx 0 15rpx;
      margin-top: 30rpx;

      .select {
        image {
          width: 35rpx;
          height: 35rpx;
          vertical-align: middle;
          margin: 0 15rpx 0 0;
        }
      }

      .btn {
        image {
          width: 35rpx;
          height: 35rpx;
          vertical-align: middle;
          margin: 0 15rpx 0 0;
        }

        // border-radius: 8rpx;
        padding: 10rpx 0;
      }
    }
  }

  .item:nth-last-of-type(1) {
    margin-bottom: 50rpx;
  }

  .kong {
    margin-top: 0;

    image {
      margin: 225rpx auto 50rpx;
      width: 196rpx;
      height: 237rpx;
    }

    view {
      text-align: center;
      font-size: 30rpx;
      line-height: 50rpx;
      color: #c4c5c6;
    }
  }

  .s-b {
    // background-image:linear-gradient(left,#e50304 0%,#f74300 80%) !important;
    // color:#fff !important;
  }
</style>
