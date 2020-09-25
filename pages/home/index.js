import { getbanner, getUserIndex } from '../../request/home'
const app = getApp()

Page({
  data: {
    cardCur: 0,
    swiperList: [],
    token: '',
    textbook_count: '',
    paper_total: '',
    recent_paper: '',
    error_exercises_total: '',
  },
  onShow: function () {
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        this.setData({
          token: data,
        })
        this.getUserIndexList()
      },
      fail: (data) => {
        console.log('fail', data)
        wx.navigateTo({
          url: '/pages/login/index',
        })
      },
    })
    this.getbannerList()
  },
  tabChange: function (e) {
    var key = e.detail.key
    if (key == 'new') {
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    } else {
      this.setData({
        choose_index: e.detail.index,
      })
    }
  },
  shotSearchClick(e) {
    console.log(e)
    wx.navigateTo({
      url:'/pages/shotSearch/index'
    })
  },
  async getUserIndexList() {
    const { data } = await getUserIndex({
      token: this.data.token,
    })
    console.log('getUserIndex', data)
    const {
      textbook_count,
      paper_total,
      recent_paper,
      error_exercises_total,
    } = data
    this.setData({
      textbook_count,
      paper_total,
      recent_paper,
      error_exercises_total,
    })
  },
  async getbannerList() {
    const { data } = await getbanner({
      type: 4,
    })
    data.banner_list.shift()
    this.setData({
      swiperList: data.banner_list,
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current,
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value,
    })
  },
  myClick() {
    wx.navigateTo({
      url: '/pages/good_list/index?productId=12345',
    })
  },
  mycarClick() {
    
  },
  Myteachingassistant(e) {
    console.log(e);
    // 
  }
})
