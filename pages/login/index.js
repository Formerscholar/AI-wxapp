import { getlogin } from '../../request/home'

Page({
  data: {
    username: '18083795906',
    password: '123456',
  },
  async handleClick() {
    const { code, data } = await getlogin({
      username: this.data.username,
      password: this.data.password,
    })
    if (code == 200) {
      wx.setStorageSync('username', this.data.username)
      wx.setStorageSync('password', this.data.password)
      wx.setStorageSync('customers', data.customers)
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1888,
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    console.log('getlogin', code, data)
  },
  studentClick(e) {
    console.log(e)
  },
  teacherClick(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
