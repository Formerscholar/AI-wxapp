import { get_settings, teacher_login, student_login } from '../../request/login'
const app = getApp()
Page({
  data: {
    wxCode: '',
    tpmid: [],
    nickName: '',
    gender: null,
    avatarUrl: '',
  },
  handleClick(e) {
    console.log(e)
    wx.login({
      success: async ({ code }) => {
        this.setData({
          wxCode: code,
        })
        this.get_settings_func()
        wx.getUserInfo({
          success: (data) => {
            wx.setStorage({
              key: 'info',
              data,
            })
            const { userInfo } = data
            const { nickName, gender, avatarUrl } = userInfo
            this.setData({
              nickName,
              gender,
              avatarUrl,
            })
            console.log(nickName, gender, avatarUrl)
            if (e.target.dataset.type == '1') {
              this.getteacher_login()
            } else {
              this.getstudent_login()
            }
          },
        })
      },
    })
  },
  async get_settings_func() {
    const { data } = await get_settings()
    const { tpmid } = data
    wx.setStorage({
      key: 'setting',
      data,
    })
    this.setData({
      tpmid,
    })
    console.log('get_settings', this.data.tpmid)
  },
  async getstudent_login() {
    const { code, data } = await student_login({
      code: this.data.wxCode,
      user_name: this.data.nickName,
      avatar: this.data.avatarUrl,
      gender: this.data.gender,
    })
    console.log('学生登录 student_login', code, data)
    wx.setStorage({
      key: 'userInfo',
      data,
    })
    const { token } = data
    app.store.setState({
      token,
    })
    if (code == 200) {
      console.log('跳转学生选择信息绑定')
      wx.navigateTo({
        url: '../student_bind_info/student_bind_info',
      })
    }
  },
  async getteacher_login() {
    const { code, data } = await teacher_login({
      code: this.data.wxCode,
      user_name: this.data.nickName,
      avatar: this.data.avatarUrl,
      gender: this.data.gender,
    })
    console.log('teacher_login', code, data)
    wx.setStorage({
      key: 'userInfo',
      data,
    })
    if (code == 200) {
      console.log('跳转选择信息绑定')
      wx.navigateTo({
        url: '../bindInfo/bindInfo',
      })
    }
  },
})
