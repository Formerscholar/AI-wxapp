import { besaUrl } from './url'

export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: besaUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: (res) => {
        resolve(res.data)
      },
      fail: reject,
    })
  })
}
