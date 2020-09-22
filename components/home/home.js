import { getbanner } from '../../request/home'
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [],
  },

  lifetimes: {
    created: function () {
      // 调用全局状态中的方法
      this.sayHello()
      // 销毁事件总线中的事件
      app.bus.remove('newfunc')
      // 监听事件总线中的事件
      app.bus.on('newfunc', (a, b, c, d) => {
        console.log(a, b, c, d)
      })
      // wx set storage
      wx.setStorage('students', [
        {
          name: '丽丽',
          age: 12,
          sex: '女',
        },
        {
          name: '小明',
          age: 18,
          sex: '男',
        },
      ])

      console.log(wx.getStorage('students'))
      // wx提示吐司
      // wx.showToast({
      //   title: '成功',
      //   icon: 'success',
      //   duration: 2000,
      // })
    },
    attached() {
      this.getbannerList()
    },
  },

  methods: {
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
      // wx路由跳转传递ID
      wx.navigateTo({
        url: '/pages/good_list/index?productId=12345',
      })
    },
    mycarClick() {
      // wx路由跳转传递对象
      wx.navigateTo({
        url: '/pages/goods_detail/index',
        success: (res) => {
          let data = { productId: 'sadf2323', productName: '金龙鱼花生油' }
          res.eventChannel.emit('info', data)
        },
      })
    },
  },
})
