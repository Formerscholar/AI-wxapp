import { getuserinfo, getVip } from '../../request/user'

Page({
  data: {
    token: '',
    userInfo: {},
    is_vip: '',
    end_time: '',
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
    wx.getStorage({
      key: 'is_vip',
      success: ({ data }) => {
        console.log('is_vip', data)
        this.setData({
          is_vip: data,
        })
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
      userInfo: data,
    })
  },
  async getIsVip() {
    const { data } = await getVip({
      token: this.data.token,
    })
    console.log('getIsVip', data)
    const { user_vip_end_time } = data
    this.setData({
      end_time: user_vip_end_time,
    })
  },
  Switchidentity(e) {
    wx.clearStorage({
      success: (data) => {
        wx.reLaunch({
          url: '/pages/login/index',
        })
      },
    })
  },
})
