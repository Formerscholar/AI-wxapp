const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    created: function () {
      // 获取全局状态中的数据
      console.log(app.store.getState().msg)
      // 修改全局状态中的数据
      app.store.setState({
        msg: '呜呜呜',
      })
      // 调用全局状态中的方法
      this.sayHello()
      // 销毁事件总线中的事件
      app.bus.remove('newfunc')
      // 监听事件总线中的事件
      app.bus.on('newfunc', (a, b, c, d) => {
        console.log(a, b, c, d)
      })
      // wx set storage
      wx.setStorageSync('students', [
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

      // wx get  Storage
      console.log(wx.getStorageSync('students'))
      // wx提示吐司
      // wx.showToast({
      //   title: '成功',
      //   icon: 'success',
      //   duration: 2000,
      // })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
