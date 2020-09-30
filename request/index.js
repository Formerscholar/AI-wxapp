import { besaUrl } from './url'

export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: besaUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || { 'content-type': 'application/json' },
      success: (res) => {
        const { statusCode, data } = res
        if (statusCode != 200) {
          wx.showToast({
            title: '服务器错误!',
            icon: 'none',
          })
        }
        if (data.code != 200) {
          wx.showToast({
            title: data.msg,
            icon: 'loading',
          })
        }
        // else {
        //   wx.showToast({
        //     title: '加载中',
        //     icon: 'loading',
        //   })
        // }
        resolve(data)
      },
      fail: (errer) => {
        wx.showToast({
          title: errer.errMsg,
          icon: 'none',
          success: () => {
            reject(errer)
          },
        })
      },
    })
  })
}
