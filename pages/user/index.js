import { getuserinfo,getVip } from '../../request/user'

Page({
  data: {
    token: '',
    userInfo:{}
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        console.log('token', data)
        this.setData({
          token: data,
        })
        this.getuserinfoList()
        this.getIsVip()
      },
    })
  },

  handClick() {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  },
  async getuserinfoList() {
    const { data } = await getuserinfo({
      token: this.data.token,
    })
    console.log('getuserinfoList', data)
    this.setData({
      userInfo:data
    })
  },
  async getIsVip() {
    const { data } = await getVip({
      token: this.data.token,
    })
    console.log('getIsVip', data)
  },
})
