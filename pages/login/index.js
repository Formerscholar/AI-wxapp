import { teacher_login } from '../../request/login'

Page({
  data: {
    wxCode: '',
  },
  studentClick(e) {
    console.log(e)
  },
  teacherClick(e) {
    console.log(e)
    wx.login({
      success: async ({ code }) => {
        this.setData({
          wxCode: code,
        })
        this.getteacher_login()
      },
    })
  },
  async getteacher_login() {
    const { code, data } = await teacher_login({
      code: this.data.wxCode,
      user_name: '',
    })
    console.log('teacher_login', code, data)
    if (code != 200) {
      console.log('跳转选择信息绑定')
      wx.navigateTo({
        url: '../bindInfo/bindInfo',
      })
    }
  },
})
