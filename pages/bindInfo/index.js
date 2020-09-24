// pages/bindInfo/bindInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    itemList: [
      {
        id: '0',
        text: '请选择省份',
        left_icon: 'province.png',
        type: 'province',
      },
      {
        id: '1',
        text: '请选择城市',
        left_icon: 'ctiy.png',
        type: 'city',
      },
      {
        id: '2',
        text: '请选择区/县',
        left_icon: 'district.png',
        type: 'district',
      },
      {
        id: '3',
        text: '请选择区/县',
        left_icon: 'district.png',
        type: 'district',
      },
      {
        id: '4',
        text: '请选择学校',
        left_icon: 'district.png',
        type: 'school',
      },
      {
        id: '5',
        text: '请选择科目',
        left_icon: 'district.png',
        type: 'subject',
      },
    ],
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
