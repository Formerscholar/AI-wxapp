import { besaUrl } from './url'

export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: besaUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || { 'content-type': 'application/json' },
      success: (res) => {
        resolve(res.data)
      },
      fail: reject,
    })
  })
}
