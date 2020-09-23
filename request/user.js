import request from './index'

export function getuserinfo(data) {
  return request({
    url: '/v1/user/get_user_info/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}


export function getVip(data) {
  return request({
    url: '/v1/user/vip/',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data,
  })
}