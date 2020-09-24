import request from './index'

export function getuserinfo(data) {
  return request({
    url: '/user/get_user_info/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}


export function getVip(data) {
  return request({
    url: '/user/vip/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}